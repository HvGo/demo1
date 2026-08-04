import { Resend } from 'resend'
import { sql } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailConfig = {
  from: process.env.RESEND_FROM || 'ivanutahrealtor.com <contact@ivanutahrealtor.com>',
  adminEmail: process.env.ADMIN_EMAIL || 'lissy@teambluekeyrealty.com'
}

export interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail(payload: EmailPayload) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[EMAIL] RESEND_API_KEY not configured, skipping email send')
      return { success: false, error: 'Email service not configured' }
    }

    const response = await resend.emails.send({
      from: emailConfig.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo
    })

    if (response.error) {
      console.error('[EMAIL ERROR]', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('[EMAIL SUCCESS]', response.data?.id)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('[EMAIL EXCEPTION]', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getNotificationEmails(formType: string): Promise<string[]> {
  try {
    const { rows } = await sql<{ email: string }>(
      `
      SELECT email FROM email_notifications
      WHERE form_type = $1 AND is_active = true
      `,
      [formType]
    )

    return rows.map(row => row.email).filter(email => email)
  } catch (error) {
    console.error('[EMAIL_NOTIFICATIONS_QUERY_ERROR]', error)
    return []
  }
}

export async function sendContactConfirmation(name: string, email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          h1 { margin: 0; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Mensaje Recibido!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Muchas gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
            </div>
            
            <p>Nuestro equipo revisará tu solicitud y te responderemos en las próximas 24 horas.</p>
            
            <p>Si tienes alguna pregunta urgente, no dudes en llamarnos directamente.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
          <div class="footer">
            <p>© 2024 Ivan Utah Realtor. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: '¡Hemos recibido tu mensaje!',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendContactAdminNotification(
  name: string,
  email: string,
  phone: string | null,
  message: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
          .message-box { background-color: white; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Contacto Recibido</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo mensaje de contacto:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            ${phone ? `
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            ` : ''}
            
            <div class="message-box">
              <span class="label">Mensaje:</span>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  // Obtener emails de notificación desde BD
  const notificationEmails = await getNotificationEmails('contact')
  
  // Si no hay emails en BD, usar el email del admin por defecto
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo contacto: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendGoldenQuestionsConfirmation(name: string, email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Gracias por tu interés!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Hemos recibido tus respuestas a nuestras preguntas de oro. Estamos analizando tu información para ofrecerte las mejores opciones de propiedades que se ajusten a tus necesidades.</p>
            </div>
            
            <p>Nuestro equipo de expertos se pondrá en contacto contigo pronto con recomendaciones personalizadas.</p>
            
            <p>¡Esperamos ayudarte a encontrar tu hogar ideal!</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  // Email de confirmación al usuario (siempre al email del formulario)
  return sendEmail({
    to: email,
    subject: '¡Hemos recibido tus respuestas!',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendGoldenQuestionsAdminNotification(
  name: string,
  email: string,
  phone: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: Golden Questions</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario de Golden Questions:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  // Obtener emails de notificación desde BD
  const notificationEmails = await getNotificationEmails('golden_questions')
  
  // Si no hay emails en BD, usar el email del admin por defecto
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo Golden Questions: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendCMAFormConfirmation(name: string, email: string, address: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
          .address { background-color: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Análisis de Mercado Iniciado!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Hemos recibido tu solicitud para un Análisis Comparativo de Mercado (CMA) para tu propiedad.</p>
            </div>
            
            <div class="address">
              <strong>Propiedad:</strong> ${address}
            </div>
            
            <p>Nuestro equipo de expertos está analizando el mercado actual para tu propiedad. Te enviaremos un reporte detallado en las próximas 24-48 horas.</p>
            
            <p>Este análisis incluirá:</p>
            <ul>
              <li>Comparables recientes en tu área</li>
              <li>Tendencias del mercado</li>
              <li>Recomendaciones de precio</li>
              <li>Estrategia de venta personalizada</li>
            </ul>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Tu Análisis de Mercado está en proceso',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendCMAFormAdminNotification(
  name: string,
  email: string,
  phone: string,
  address: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: CMA</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario CMA:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            
            <div class="field">
              <span class="label">Dirección:</span> ${address}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const notificationEmails = await getNotificationEmails('cma_form')
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo CMA: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendCuratedSearchConfirmation(name: string, email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Tu Búsqueda Personalizada está Activa!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Hemos recibido tus preferencias para una búsqueda de propiedades personalizada. Nuestro equipo está analizando las opciones disponibles que se ajustan a tus criterios.</p>
            </div>
            
            <p>Pronto te enviaremos una lista curada de propiedades que coinciden con tus necesidades y presupuesto.</p>
            
            <p>Estaremos en contacto contigo en las próximas 24 horas con las mejores opciones disponibles.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: '¡Tu búsqueda personalizada está en proceso!',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendCuratedSearchAdminNotification(
  name: string,
  email: string,
  phone: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: Búsqueda Curada</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario de búsqueda curada:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const notificationEmails = await getNotificationEmails('curated_search')
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo Curated Search: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendReportsOpenHousesConfirmation(name: string, email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Hemos Recibido tu Solicitud!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Gracias por completar nuestro formulario de reportes y casas abiertas. Hemos recibido tus respuestas y preferencias.</p>
            </div>
            
            <p>Nuestro equipo está preparando información personalizada basada en tus necesidades, incluyendo:</p>
            <ul>
              <li>Reportes de mercado actualizados</li>
              <li>Información sobre casas abiertas próximas</li>
              <li>Recomendaciones personalizadas</li>
            </ul>
            
            <p>Te contactaremos en las próximas 24 horas con toda la información.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: '¡Hemos recibido tu solicitud de reportes!',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendReportsOpenHousesAdminNotification(
  name: string,
  email: string,
  whatsapp: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: Reports & Open Houses</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario de Reports & Open Houses:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">WhatsApp:</span> ${whatsapp}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const notificationEmails = await getNotificationEmails('reports_open_houses')
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo Reports & Open Houses: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendRealtorLatinoSellerConfirmation(name: string, email: string, address: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
          .address { background-color: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Tu Análisis de Propiedad está en Proceso!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>¡Gracias por confiar en nosotros! Hemos recibido tu solicitud de análisis de propiedad.</p>
            </div>
            
            <div class="address">
              <strong>Propiedad:</strong> ${address}
            </div>
            
            <p>Nuestro equipo de expertos está analizando tu propiedad para ofrecerte la mejor estrategia de venta. Te enviaremos un análisis detallado en las próximas 24-48 horas.</p>
            
            <p>Mientras tanto, si tienes alguna pregunta, no dudes en contactarnos directamente.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: '¡Tu análisis de propiedad está en proceso!',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendRealtorLatinoBuyerConfirmation(name: string, email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .message { background-color: white; padding: 15px; border-left: 4px solid #00A86B; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Bienvenido a tu Camino hacia la Homeownership!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>¡Gracias por ponerte en contacto con nosotros! Hemos recibido tu información y estamos emocionados de ayudarte a encontrar tu hogar ideal en Utah.</p>
            </div>
            
            <p>Nuestro equipo de expertos está revisando tu perfil para identificar las mejores opciones de propiedades que se ajusten a tus necesidades y presupuesto.</p>
            
            <p>Te contactaremos en las próximas 24 horas con recomendaciones personalizadas y próximos pasos.</p>
            
            <p>¡Esperamos ayudarte a alcanzar tu sueño de tener tu propio hogar!</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: '¡Bienvenido! Tu solicitud ha sido recibida',
    html,
    replyTo: emailConfig.adminEmail
  })
}

export async function sendRealtorLatinoSellerAdminNotification(
  name: string,
  email: string,
  phone: string,
  address: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: Realtor Latino Seller</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario de Realtor Latino Seller:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            
            <div class="field">
              <span class="label">Dirección:</span> ${address}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const notificationEmails = await getNotificationEmails('realtor_latino_seller')
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo Realtor Latino Seller: ${name}`,
    html,
    replyTo: email
  })
}

export async function sendRealtorLatinoBuyerAdminNotification(
  name: string,
  email: string,
  phone: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00A86B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #00A86B; }
          .label { font-weight: bold; color: #00A86B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Formulario: Realtor Latino Buyer</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo formulario de Realtor Latino Buyer:</p>
            
            <div class="field">
              <span class="label">Nombre:</span> ${name}
            </div>
            
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            
            <div class="field">
              <span class="label">Teléfono:</span> ${phone}
            </div>
            
            <p><strong>Responde directamente a este email para contactar al usuario.</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const notificationEmails = await getNotificationEmails('realtor_latino_buyer')
  const recipientEmails = notificationEmails.length > 0 ? notificationEmails : [emailConfig.adminEmail]

  return sendEmail({
    to: recipientEmails,
    subject: `Nuevo Realtor Latino Buyer: ${name}`,
    html,
    replyTo: email
  })
}
