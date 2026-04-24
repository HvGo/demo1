import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { 
  sendRealtorLatinoSellerConfirmation, 
  sendRealtorLatinoBuyerConfirmation,
  sendRealtorLatinoSellerAdminNotification,
  sendRealtorLatinoBuyerAdminNotification
} from '@/lib/email/resend'

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitizar input contra XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000)
}

type RealtorAnalysisPayload = {
  name?: string
  email?: string
  phone?: string
  address?: string
  type?: 'seller' | 'buyer'
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
    const body = await request.json() as RealtorAnalysisPayload
    const { name, email, phone, address, type } = body

    // Detectar si es seller o buyer basándose en el referrer o parámetro type
    let analysisType = type || 'seller'
    if (!type) {
      const referrer = request.headers.get('referer') || ''
      if (referrer.includes('buyer')) {
        analysisType = 'buyer'
      }
    }

    // Validación de campos requeridos
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // Para seller, address es requerido
    if (analysisType === 'seller' && !address) {
      return NextResponse.json(
        { error: 'Address is required for seller analysis' },
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

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedPhone = sanitizeInput(phone)
    const sanitizedAddress = address ? sanitizeInput(address) : null

    // Obtener IP del cliente
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0'

    // Obtener User Agent
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const { device_type, os, browser } = parseUserAgent(userAgent)

    // Detectar si es bot
    const isBot = detectBot(userAgent)

    // Guardar en BD (tabla contacts existente)
    const { rows } = await sql<{ id: number }>(
      `
      INSERT INTO contacts (
        name, email, phone, address, message,
        ip_address, user_agent, is_bot,
        device_type, os, browser,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING id
      `,
      [
        sanitizedName,
        sanitizedEmail,
        sanitizedPhone,
        sanitizedAddress,
        `Solicitud de análisis de propiedad desde realtor-latino-utah-seller`,
        ipAddress,
        userAgent,
        isBot,
        device_type,
        os,
        browser
      ]
    )

    const contactId = rows[0]?.id

    if (!contactId) {
      return NextResponse.json(
        { error: 'Failed to save analysis request' },
        { status: 500 }
      )
    }

    // Log para monitoreo
    console.log(`[REALTOR_ANALYSIS] New ${analysisType} analysis request: ${contactId} from ${sanitizedEmail}`)

    // Enviar emails (no bloquear si fallan)
    // - Confirmación al usuario (siempre)
    // - Notificación a emails dinámicos desde BD
    try {
      if (analysisType === 'seller' && sanitizedAddress) {
        await Promise.all([
          sendRealtorLatinoSellerConfirmation(sanitizedName, sanitizedEmail, sanitizedAddress),
          sendRealtorLatinoSellerAdminNotification(sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedAddress)
        ])
      } else if (analysisType === 'buyer') {
        await Promise.all([
          sendRealtorLatinoBuyerConfirmation(sanitizedName, sanitizedEmail),
          sendRealtorLatinoBuyerAdminNotification(sanitizedName, sanitizedEmail, sanitizedPhone)
        ])
      }
    } catch (emailError) {
      console.error('[REALTOR_ANALYSIS_EMAIL_ERROR]', emailError)
    }

    // Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We will analyze your property and send you the results soon.',
        contactId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[REALTOR_ANALYSIS ERROR]', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}

// GET para verificar que el endpoint existe
export async function GET() {
  return NextResponse.json(
    { message: 'Realtor Analysis API endpoint. Use POST to submit an analysis request.' },
    { status: 200 }
  )
}
