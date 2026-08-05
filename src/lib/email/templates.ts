/**
 * Templates de Email Condicionales según Intención
 * Genera contenido personalizado basado en la clasificación de IA
 */

import type { ContactIntent } from '@/lib/contact/intent-classifier'

export interface EmailTemplate {
  subject: string
  html: string
}

/**
 * Obtener template de email según intención clasificada
 */
export function getEmailTemplateByIntent(
  intent: ContactIntent,
  name: string
): EmailTemplate {
  
  switch (intent) {
    case 'genuine_buyer':
      return generateBuyerTemplate(name)
    
    case 'genuine_seller':
      return generateSellerTemplate(name)
    
    case 'genuine_inquiry':
      return generateInquiryTemplate(name)
    
    default:
      // Fallback: usar template genérico
      return generateGenericTemplate(name)
  }
}

/**
 * Template para compradores (genuine_buyer)
 */
function generateBuyerTemplate(name: string): EmailTemplate {
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
          .highlight { background-color: #e8f5e9; padding: 10px; border-radius: 4px; margin: 10px 0; }
          ul { margin: 10px 0; padding-left: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Gracias por tu Interés en Comprar!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>¡Qué emocionante que estés buscando tu nuevo hogar en Utah! Hemos recibido tu mensaje y nuestro equipo de expertos está preparando información personalizada para ti.</p>
            </div>
            
            <div class="highlight">
              <p><strong>En las próximas 24 horas te contactaremos con:</strong></p>
              <ul>
                <li>Propiedades disponibles que se ajusten a tus necesidades</li>
                <li>Información sobre financiamiento y opciones de préstamo</li>
                <li>Guía del proceso de compra paso a paso</li>
                <li>Respuestas a todas tus preguntas</li>
              </ul>
            </div>
            
            <p>Mientras tanto, te invitamos a explorar nuestras propiedades disponibles en nuestro sitio web.</p>
            
            <p>Si tienes alguna pregunta urgente, no dudes en contactarnos directamente.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
          <div class="footer">
            <p>© 2024 Ivan Utah Realtor. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return {
    subject: '¡Gracias por tu interés en comprar! - Ivan Utah Realtor',
    html
  }
}

/**
 * Template para vendedores (genuine_seller)
 */
function generateSellerTemplate(name: string): EmailTemplate {
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
          .highlight { background-color: #fff3e0; padding: 10px; border-radius: 4px; margin: 10px 0; }
          ul { margin: 10px 0; padding-left: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Gracias por Confiar en Nosotros!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>¡Gracias por considerarnos para vender tu propiedad! Hemos recibido tu mensaje y estamos emocionados de ayudarte a obtener el mejor valor por tu hogar.</p>
            </div>
            
            <div class="highlight">
              <p><strong>Nuestro equipo te contactará pronto con:</strong></p>
              <ul>
                <li>Análisis Comparativo de Mercado (CMA) gratuito</li>
                <li>Estrategia de venta personalizada</li>
                <li>Información sobre nuestros servicios y comisiones</li>
                <li>Próximos pasos en el proceso de venta</li>
              </ul>
            </div>
            
            <p>Con nuestra experiencia en el mercado de Utah, te ayudaremos a vender tu propiedad al mejor precio y en el menor tiempo posible.</p>
            
            <p>Te responderemos en las próximas 24 horas.</p>
            
            <p>Saludos,<br><strong>Ivan Utah Realtor</strong></p>
          </div>
          <div class="footer">
            <p>© 2024 Ivan Utah Realtor. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return {
    subject: '¡Gracias por confiar en nosotros para vender! - Ivan Utah Realtor',
    html
  }
}

/**
 * Template para consultas generales (genuine_inquiry)
 */
function generateInquiryTemplate(name: string): EmailTemplate {
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
            <h1>¡Hemos Recibido tu Consulta!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <div class="message">
              <p>Muchas gracias por ponerte en contacto con nosotros. Hemos recibido tu consulta y nuestro equipo está revisando tu mensaje.</p>
            </div>
            
            <p>Te responderemos con la información que necesitas en las próximas 24 horas.</p>
            
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

  return {
    subject: '¡Hemos recibido tu consulta! - Ivan Utah Realtor',
    html
  }
}

/**
 * Template genérico (fallback)
 */
function generateGenericTemplate(name: string): EmailTemplate {
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

  return {
    subject: '¡Hemos recibido tu mensaje! - Ivan Utah Realtor',
    html
  }
}
