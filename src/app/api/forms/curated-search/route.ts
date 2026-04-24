import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { validateCuratedSearchForm } from '@/lib/validators'
import { sendCuratedSearchConfirmation, sendCuratedSearchAdminNotification } from '@/lib/email/resend'

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase()
  const device_type = /mobile|android|iphone|ipad/.test(lower) ? 'mobile' : 'desktop'

  let os = 'Unknown'
  if (lower.includes('windows')) os = 'Windows'
  else if (lower.includes('mac')) os = 'macOS'
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

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
  return ip
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const formData = {
      selectedReality: body.selectedReality || '',
      selectedCounty: body.selectedCounty || '',
      fullName: body.fullName || '',
      phone: body.phone || '',
      email: body.email || ''
    }

    // Validar datos
    const validation = validateCuratedSearchForm(formData)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }

    // Obtener información del dispositivo
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const { device_type, os, browser } = parseUserAgent(userAgent)
    const ipAddress = getClientIp(req)
    const sessionId = body.sessionId || ''

    // Guardar en BD
    await sql(
      `
      INSERT INTO curated_search (
        session_id, selected_reality, selected_county, full_name, phone, email,
        user_agent, ip_address, device_type, os, browser
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `,
      [
        sessionId,
        formData.selectedReality,
        formData.selectedCounty,
        formData.fullName,
        formData.phone,
        formData.email,
        userAgent,
        ipAddress,
        device_type,
        os,
        browser
      ]
    )

    // Enviar emails (no bloquear si fallan)
    try {
      await Promise.all([
        sendCuratedSearchConfirmation(formData.fullName, formData.email),
        sendCuratedSearchAdminNotification(formData.fullName, formData.email, formData.phone)
      ])
    } catch (emailError) {
      console.error('[CURATED_SEARCH_EMAIL_ERROR]', emailError)
    }

    return NextResponse.json({ success: true, message: 'Formulario guardado exitosamente' })
  } catch (error) {
    console.error('[CURATED_SEARCH_POST]', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar el formulario' },
      { status: 500 }
    )
  }
}
