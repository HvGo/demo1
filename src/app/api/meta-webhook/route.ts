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
import { PLATFORMS } from '@/lib/meta/constants'
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

  console.log('🔍 Webhook verification request:', {
    token,
    challenge,
    expectedToken: process.env.META_VERIFY_TOKEN,
  })

  const validChallenge = validateWebhookChallenge(token, challenge)

  if (validChallenge) {
    console.log('✅ Webhook verified successfully, returning challenge:', validChallenge)
    return new NextResponse(validChallenge, { status: 200 })
  }

  console.error('❌ Invalid webhook verification token', {
    receivedToken: token,
    expectedToken: process.env.META_VERIFY_TOKEN,
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
    // Leer el body como string para validar firma
    body = await request.text()

    // Validar firma del webhook
    const signature = request.headers.get('x-hub-signature-256') || undefined
    if (!validateMetaSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      await logWebhookEvent('webhook_received', {}, 'error', 'Invalid signature')
      return new NextResponse('Invalid signature', { status: 403 })
    }

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
      // Extraer plataforma del webhook (payload.object es 'page' para Facebook o 'instagram' para Instagram)
      const platform = payload.object === 'instagram' ? PLATFORMS.INSTAGRAM : PLATFORMS.FACEBOOK
      console.log('📱 Platform detected:', platform)
      
      for (const message of entry.messaging || []) {
        // Validar mensaje
        if (!isValidMetaMessage(message)) {
          console.warn('⚠️ Invalid message structure:', message)
          continue
        }

        try {
          // Procesar mensaje de forma asíncrona (no esperar)
          processMetaMessage(message, platform).catch((error) => {
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
