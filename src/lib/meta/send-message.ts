/**
 * Servicio para enviar mensajes a través de Meta API
 */

import { META_CONFIG, PLATFORMS } from './constants'

interface SendMessageResponse {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Obtener el endpoint correcto según la plataforma
 * Nota: Instagram Messenger usa el mismo endpoint que Facebook (graph.facebook.com)
 * No usar graph.instagram.com para mensajes
 */
function getGraphEndpoint(platform: string): string {
  // Instagram Messenger usa graph.facebook.com, no graph.instagram.com
  return 'https://graph.facebook.com'
}

/**
 * Enviar mensaje de texto a un usuario de Meta
 */
export async function sendTextMessage(
  recipientId: string,
  text: string,
  platform: string = PLATFORMS.FACEBOOK
): Promise<SendMessageResponse> {
  try {
    const endpoint = getGraphEndpoint(platform)
    // Instagram requiere usar el ID de la cuenta de negocio, no /me
    const accountId = platform === PLATFORMS.INSTAGRAM 
      ? META_CONFIG.BUSINESS_ACCOUNT_ID 
      : 'me'
    const url = `${endpoint}/${META_CONFIG.API_VERSION}/${accountId}/messages`
    
    console.log('🔐 Sending message:', {
      platform,
      endpoint,
      url,
      recipientId,
      textLength: text.length,
      tokenPresent: !!META_CONFIG.ACCESS_TOKEN,
      tokenLength: META_CONFIG.ACCESS_TOKEN?.length || 0,
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${META_CONFIG.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    })

    console.log('📡 Response status:', response.status, response.statusText)

    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Meta API error:', {
        status: response.status,
        error: error.error,
        url,
        platform,
      })
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
      `https://graph.facebook.com/${META_CONFIG.API_VERSION}/me/messages`,
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
      `https://graph.facebook.com/${META_CONFIG.API_VERSION}/me/messages`,
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
      `https://graph.facebook.com/${META_CONFIG.API_VERSION}/me/messages`,
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
      `https://graph.facebook.com/${META_CONFIG.API_VERSION}/me/messages`,
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

/**
 * Obtener perfil del usuario desde Meta API
 */
export async function getUserProfile(
  metaSenderId: string,
  platform: string = PLATFORMS.FACEBOOK
): Promise<{ firstName: string; lastName: string } | null> {
  try {
    const endpoint = getGraphEndpoint(platform)
    
    // Instagram no tiene campos first_name/last_name, solo username
    const fields = platform === PLATFORMS.INSTAGRAM 
      ? 'username,name' 
      : 'first_name,last_name'
    
    const response = await fetch(
      `${endpoint}/${META_CONFIG.API_VERSION}/${metaSenderId}?fields=${fields}&access_token=${META_CONFIG.ACCESS_TOKEN}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta API error getting user profile:', error)
      return null
    }

    const data = await response.json()
    
    // Para Instagram, usar username o name
    if (platform === PLATFORMS.INSTAGRAM) {
      return {
        firstName: data.name || data.username || '',
        lastName: '',
      }
    }
    
    // Para Facebook, usar first_name y last_name
    return {
      firstName: data.first_name || '',
      lastName: data.last_name || '',
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}
