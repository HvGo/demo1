/**
 * Servicio para enviar mensajes a través de Meta API
 */

import { META_CONFIG } from './constants'

interface SendMessageResponse {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Enviar mensaje de texto a un usuario de Meta
 */
export async function sendTextMessage(
  recipientId: string,
  text: string
): Promise<SendMessageResponse> {
  try {
    console.log('🔐 Sending message with token:', {
      tokenLength: META_CONFIG.ACCESS_TOKEN?.length || 0,
      tokenPrefix: META_CONFIG.ACCESS_TOKEN?.substring(0, 10) || 'UNDEFINED',
      tokenSuffix: META_CONFIG.ACCESS_TOKEN?.substring(META_CONFIG.ACCESS_TOKEN.length - 10) || 'UNDEFINED',
      fullToken: META_CONFIG.ACCESS_TOKEN,
    })

    const response = await fetch(
      `https://graph.instagram.com/${META_CONFIG.API_VERSION}/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error:', error)
      return {
        success: false,
        error: error.error?.message || 'Failed to send message',
      }
    }

    const data = await response.json()
    return {
      success: true,
      messageId: data.message_id,
    }
  } catch (error) {
    console.error('Error sending text message:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Enviar mensaje con botones
 */
export async function sendButtonMessage(
  recipientId: string,
  text: string,
  buttons: Array<{ title: string; payload: string }>
): Promise<SendMessageResponse> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${META_CONFIG.API_VERSION}/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text,
                buttons: buttons.map((btn) => ({
                  type: 'postback',
                  title: btn.title,
                  payload: btn.payload,
                })),
              },
            },
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error:', error)
      return {
        success: false,
        error: error.error?.message || 'Failed to send button message',
      }
    }

    const data = await response.json()
    return {
      success: true,
      messageId: data.message_id,
    }
  } catch (error) {
    console.error('Error sending button message:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Enviar mensaje con imagen
 */
export async function sendImageMessage(
  recipientId: string,
  imageUrl: string,
  caption?: string
): Promise<SendMessageResponse> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${META_CONFIG.API_VERSION}/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: {
            attachment: {
              type: 'image',
              payload: {
                url: imageUrl,
                is_reusable: true,
              },
            },
            caption,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error:', error)
      return {
        success: false,
        error: error.error?.message || 'Failed to send image message',
      }
    }

    const data = await response.json()
    return {
      success: true,
      messageId: data.message_id,
    }
  } catch (error) {
    console.error('Error sending image message:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Marcar mensaje como leído
 */
export async function markMessageAsRead(
  messageId: string
): Promise<SendMessageResponse> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${META_CONFIG.API_VERSION}/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          recipient: { id: messageId },
          sender_action: 'mark_seen',
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error:', error)
      return {
        success: false,
        error: error.error?.message || 'Failed to mark message as read',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error marking message as read:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Enviar indicador de "escribiendo"
 */
export async function sendTypingIndicator(
  recipientId: string
): Promise<SendMessageResponse> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${META_CONFIG.API_VERSION}/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          sender_action: 'typing_on',
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error:', error)
      return {
        success: false,
        error: error.error?.message || 'Failed to send typing indicator',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending typing indicator:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
