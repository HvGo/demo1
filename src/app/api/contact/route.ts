import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { sendContactConfirmation, sendContactAdminNotification } from '@/lib/email/resend'

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function getGeo(ip: string) {
  try {
    console.log('[CONTACT_GEO] Trying ipinfo.io...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const res = await fetch('https://ipinfo.io/json', {
      signal: controller.signal,
      cache: 'no-store',
    })

    clearTimeout(timeoutId)
    
    if (!res.ok) {
      console.warn('[CONTACT_GEO] ipinfo.io status:', res.status)
      return { country: null, region: null, city: null }
    }
    
    const data = await res.json()
    console.log('[CONTACT_GEO] ipinfo.io success:', { country: data.country, city: data.city })
    
    return {
      country: data.country || null,
      region: null,
      city: data.city || null,
    }
  } catch (err) {
    console.warn('[CONTACT_GEO] ipinfo.io failed:', err instanceof Error ? err.message : err)
    return { country: null, region: null, city: null }
  }
}

// Sanitizar input contra XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000)
}

type ContactPayload = {
  name?: string
  phone?: string
  email?: string
  message?: string
  website?: string // Honeypot field
  sessionId?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase()
  const device_type = /mobile|android|iphone|ipad/.test(lower) ? 'mobile' : 'desktop'

  let os = 'Unknown'
  if (lower.includes('windows')) os = 'Windows'
  else if (lower.includes('mac os')) os = 'MacOS'
  else if (lower.includes('android')) os = 'Android'
  else if (lower.includes('iphone') || lower.includes('ipad')) os = 'iOS'
  else if (lower.includes('linux')) os = 'Linux'

  let browser = 'Unknown'
  if (lower.includes('edg')) browser = 'Edge'
  else if (lower.includes('chrome')) browser = 'Chrome'
  else if (lower.includes('safari') && !lower.includes('chrome')) browser = 'Safari'
  else if (lower.includes('firefox')) browser = 'Firefox'
  else if (lower.includes('opr') || lower.includes('opera')) browser = 'Opera'
  else if (lower.includes('msie') || lower.includes('trident')) browser = 'IE'

  return { device_type, os, browser }
}

// Detectar si es bot (básico)
function detectBot(userAgent: string): boolean {
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python'
  ]
  return botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  )
}

// Validar que el nombre sea real (no caracteres aleatorios)
function isValidName(name: string): boolean {
  // Rechazar si contiene números consecutivos (ej: "qcWUFucCyqgdyW")
  if (/\d{3,}/.test(name)) return false
  
  // Rechazar si tiene más de 3 caracteres especiales
  const specialChars = (name.match(/[^a-zA-Z0-9\s\-']/g) || []).length
  if (specialChars > 3) return false
  
  // Rechazar si tiene menos de 2 palabras
  const words = name.trim().split(/\s+/).length
  if (words < 2) return false
  
  // Rechazar si contiene patrones de spam comunes
  const spamPatterns = ['viagra', 'casino', 'poker', 'lottery', 'click', 'buy', 'cheap']
  if (spamPatterns.some(pattern => name.toLowerCase().includes(pattern))) return false
  
  // Validar que sea principalmente letras + espacios
  const letterRatio = (name.match(/[a-zA-Z]/g) || []).length / name.length
  if (letterRatio < 0.7) return false
  
  return true
}

// Validar que el mensaje contenga palabras reales (no texto aleatorio)
function isValidMessage(message: string): boolean {
  // Rechazar si contiene URLs
  if (/https?:\/\/|www\.|\.com|\.net|\.org/.test(message)) return false
  
  // Rechazar si tiene demasiados números consecutivos
  if (/\d{5,}/.test(message)) return false
  
  // Rechazar si contiene patrones de spam comunes
  const spamPatterns = ['viagra', 'casino', 'poker', 'lottery', 'click here', 'buy now', 'cheap']
  if (spamPatterns.some(pattern => message.toLowerCase().includes(pattern))) return false
  
  // Validar que tenga al menos 2-3 palabras reales (no solo caracteres aleatorios)
  const words = message.trim().split(/\s+/)
  if (words.length < 3) return false
  
  // Validar que la mayoría de caracteres sean letras (no aleatorios)
  const letterRatio = (message.match(/[a-zA-Z]/g) || []).length / message.length
  if (letterRatio < 0.6) return false
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload
    const { name, phone, email, message, website, sessionId, utmSource, utmMedium, utmCampaign, referrer } = body

    // HONEYPOT: Si el campo "website" está lleno, es un bot
    if (website && website.trim().length > 0) {
      console.log('[CONTACT SPAM] Honeypot field filled - rejecting bot submission')
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 400 }
      )
    }

    // Validación de campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validación de email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validación de longitud de mensaje
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      )
    }

    // Validación de nombre (detectar caracteres aleatorios)
    if (!isValidName(name)) {
      console.log('[CONTACT SPAM] Invalid name format - rejecting submission:', name)
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 400 }
      )
    }

    // Validación de mensaje (detectar texto aleatorio)
    if (!isValidMessage(message)) {
      console.log('[CONTACT SPAM] Invalid message format - rejecting submission')
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 400 }
      )
    }

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedPhone = phone ? sanitizeInput(phone).slice(0, 20) : null
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)
    const sanitizedSessionId = sessionId ? sanitizeInput(sessionId).slice(0, 100) : null
    const sanitizedUtmSource = utmSource ? sanitizeInput(utmSource).slice(0, 100) : null
    const sanitizedUtmMedium = utmMedium ? sanitizeInput(utmMedium).slice(0, 100) : null
    const sanitizedUtmCampaign = utmCampaign ? sanitizeInput(utmCampaign).slice(0, 150) : null
    const sanitizedReferrer = referrer ? sanitizeInput(referrer).slice(0, 255) : null

    // Obtener IP del cliente
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0'

    // Geo por IP (http fallback)
    const geoInfo = await getGeo(ipAddress)
    const geo_country = geoInfo.country
    const geo_region = geoInfo.region
    const geo_city = geoInfo.city
    
    // Obtener User Agent
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const { device_type, os, browser } = parseUserAgent(userAgent)

    // Detectar si es bot
    const isBot = detectBot(userAgent)

    // Guardar en BD (según esquema existente)
    const { rows } = await sql<{ id: number }>(
      `
      INSERT INTO contacts (
        name, phone, email, message,
        ip_address, user_agent, is_bot,
        session_id, utm_source, utm_medium, utm_campaign, referrer,
        geo_country, geo_region, geo_city,
        device_type, os, browser,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
      RETURNING id
      `,
      [
        sanitizedName,
        sanitizedPhone,
        sanitizedEmail,
        sanitizedMessage,
        ipAddress,
        userAgent,
        isBot,
        sanitizedSessionId,
        sanitizedUtmSource,
        sanitizedUtmMedium,
        sanitizedUtmCampaign,
        sanitizedReferrer,
        geo_country,
        geo_region,
        geo_city,
        device_type,
        os,
        browser
      ]
    )

    const contactId = rows[0]?.id

    if (!contactId) {
      return NextResponse.json(
        { error: 'Failed to save contact' },
        { status: 500 }
      )
    }

    // Log para monitoreo
    console.log(`[CONTACT] New contact submitted: ${contactId} from ${sanitizedEmail}`)

    // Enviar emails SOLO si NO es bot
    // - Confirmación al usuario (siempre que no sea bot)
    // - Notificación a emails dinámicos desde BD (siempre que no sea bot)
    if (!isBot) {
      try {
        await Promise.all([
          sendContactConfirmation(sanitizedName, sanitizedEmail),
          sendContactAdminNotification(sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedMessage)
        ])
      } catch (emailError) {
        console.error('[CONTACT EMAIL ERROR]', emailError)
        // No fallar la respuesta si los emails no se envían
      }
    } else {
      console.log(`[CONTACT SPAM] Bot submission saved to DB but emails not sent: ${contactId}`)
    }

    // Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        contactId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[CONTACT ERROR]', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}

// GET para verificar que el endpoint existe
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint. Use POST to submit a contact form.' },
    { status: 200 }
  )
}
