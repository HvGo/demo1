import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function getGeo(ip: string) {
  // Fallback HTTP lookup (ipapi.co free tier) to evitar dependencias locales
  try {
    const pureIp = ip.split(',')[0].trim()
    if (!pureIp || pureIp === '0.0.0.0') return { country: null, region: null, city: null }

    const res = await fetch(`https://ipapi.co/${pureIp}/json/`, { cache: 'no-store' })
    if (!res.ok) {
      console.warn(`[GEO_LOOKUP_HTTP_FAILED] status ${res.status}`)
      return { country: null, region: null, city: null }
    }
    const data = await res.json()
    return {
      country: data.country_name || null,
      region: data.region || null,
      city: data.city || null,
    }
  } catch (err) {
    console.warn('[GEO_LOOKUP_HTTP_FAILED]', err)
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
  email?: string
  message?: string
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload
    const { name, email, message, sessionId, utmSource, utmMedium, utmCampaign, referrer } = body

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

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name)
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
        name, email, message,
        ip_address, user_agent, is_bot,
        session_id, utm_source, utm_medium, utm_campaign, referrer,
        geo_country, geo_region, geo_city,
        device_type, os, browser,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())
      RETURNING id
      `,
      [
        sanitizedName,
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
