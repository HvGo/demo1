/**
 * Endpoint webhook para recibir mensajes de Meta
 * GET: Verificación inicial del webhook
 * POST: Recibir mensajes de Facebook, Instagram, WhatsApp
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  validateMetaSignature,
  validateWebhookChallenge,
  isValidMetaWebhook,
  isValidMetaMessage,
} from '@/lib/meta/validate-webhook'
import { processMetaMessage } from '@/lib/meta/process-message'
import { sql } from '@/lib/db'
import { MetaWebhookPayload } from '@/types/meta'

/**
 * GET: Verificación del webhook
 * Meta envía un challenge durante la configuración inicial
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  console.log('🔍 WEBHOOK VERIFICATION REQUEST RECEIVED')
  console.log('🔍 Webhook verification request:', {
    token: token ? `${token.substring(0, 10)}...` : 'MISSING',
    challenge: challenge ? `${challenge.substring(0, 20)}...` : 'MISSING',
    expectedToken: process.env.META_VERIFY_TOKEN ? `${process.env.META_VERIFY_TOKEN.substring(0, 10)}...` : 'MISSING',
  })

  const validChallenge = validateWebhookChallenge(token, challenge)

  if (validChallenge) {
    console.log('✅ WEBHOOK VERIFIED SUCCESSFULLY')
    console.log('✅ Webhook verified successfully, returning challenge:', validChallenge)
    return new NextResponse(validChallenge, { status: 200 })
  }

  console.error('❌ WEBHOOK VERIFICATION FAILED - Invalid token')
  console.error('❌ Invalid webhook verification token', {
    receivedToken: token ? `${token.substring(0, 10)}...` : 'MISSING',
    expectedToken: process.env.META_VERIFY_TOKEN ? `${process.env.META_VERIFY_TOKEN.substring(0, 10)}...` : 'MISSING',
  })
  return new NextResponse('Invalid token', { status: 403 })
}

/**
 * POST: Recibir mensajes de Meta
 */
export async function POST(request: NextRequest) {
  let body: string = ''
  let payload: MetaWebhookPayload | null = null

  try {
    // Log inicial para confirmar que el webhook fue recibido
    console.log('🔔 WEBHOOK RECEIVED - POST request started')
    
    // Leer el body como string para validar firma
    body = await request.text()
    console.log('📦 Webhook body received, length:', body.length)

    // Validar firma del webhook
    const signature = request.headers.get('x-hub-signature-256') || undefined
    console.log('🔐 Signature validation:', { signaturePresent: !!signature })
    
    if (!validateMetaSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      await logWebhookEvent('webhook_received', {}, 'error', 'Invalid signature')
      return new NextResponse('Invalid signature', { status: 403 })
    }
    
    console.log('✅ Signature validated')

    // Parsear payload
    payload = JSON.parse(body) as MetaWebhookPayload

    // Validar estructura del webhook
    if (!isValidMetaWebhook(payload)) {
      console.error('❌ Invalid Meta webhook structure')
      await logWebhookEvent(
        'webhook_received',
        payload,
        'error',
        'Invalid webhook structure'
      )
      return new NextResponse('Invalid webhook', { status: 400 })
    }

    // Log del webhook recibido
    await logWebhookEvent('webhook_received', payload, 'success')

    // Procesar cada entrada del webhook
    let processedCount = 0
    for (const entry of payload.entry) {
      console.log('📨 Entry received with', entry.messaging?.length || 0, 'messaging events')
      
      for (const message of entry.messaging || []) {
        // Log detallado de qué tipo de evento es
        const msg = message as any
        const eventType = message.message ? 'message' : message.postback ? 'postback' : msg.read ? 'read' : msg.delivery ? 'delivery' : 'unknown'
        console.log(`📬 Event type: ${eventType}`, {
          senderId: message.sender?.id,
          hasMessage: !!message.message,
          hasPostback: !!message.postback,
          hasRead: !!msg.read,
          hasDelivery: !!msg.delivery,
        })
        
        // Validar mensaje
        if (!isValidMetaMessage(message)) {
          console.warn('⚠️ Invalid message structure - skipping event:', eventType)
          continue
        }

        try {
          // Procesar mensaje de forma asíncrona (no esperar)
          processMetaMessage(message).catch((error) => {
            console.error('Error processing message:', error)
            logWebhookEvent(
              'message_processed',
              message,
              'error',
              error instanceof Error ? error.message : 'Unknown error'
            ).catch(console.error)
          })

          processedCount++
        } catch (error) {
          console.error('Error queuing message for processing:', error)
          await logWebhookEvent(
            'message_processed',
            message,
            'error',
            error instanceof Error ? error.message : 'Unknown error'
          )
        }
      }
    }

    console.log(`✅ Processed ${processedCount} messages from webhook`)

    // Responder a Meta inmediatamente (no esperar procesamiento)
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('❌ Webhook error:', error)

    // Log del error
    if (payload) {
      await logWebhookEvent(
        'webhook_error',
        payload,
        'error',
        error instanceof Error ? error.message : 'Unknown error'
      ).catch(console.error)
    }

    // Responder a Meta con 200 de todas formas (para no reintentar)
    return new NextResponse('OK', { status: 200 })
  }
}

/**
 * Registrar evento de webhook en BD
 */
async function logWebhookEvent(
  eventType: string,
  payload: any,
  status: 'success' | 'error' | 'pending',
  errorMessage?: string
): Promise<void> {
  try {
    const query = `
      INSERT INTO meta_webhook_logs (
        event_type,
        payload,
        status,
        error_message,
        created_at
      )
      VALUES ($1, $2, $3, $4, NOW())
    `

    await sql(query, [
      eventType,
      JSON.stringify(payload),
      status,
      errorMessage || null,
    ])
  } catch (error) {
    console.error('Error logging webhook event:', error)
    // No lanzar error para no interrumpir el flujo principal
  }
}

/**
 * Configuración de CORS y headers
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
