/**
 * Script para probar el webhook de Meta localmente
 * Simula un mensaje de Meta enviado a http://localhost:3005/api/meta-webhook
 * 
 * Ejecutar: node scripts/test-webhook-local.js
 */

const crypto = require('crypto');

// Configuración
const WEBHOOK_URL = 'http://localhost:3005/api/meta-webhook';
const WEBHOOK_SECRET = process.env.META_WEBHOOK_SECRET || '8d5b630c5851370d29fae3fac6d5f497';
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'SYyz3Th7LFKpwC46rUIWmHQNDaEP0tVX';

// Payload simulado de un mensaje de Meta
const payload = {
  object: 'page',
  entry: [
    {
      id: '483729750482350',
      time: Date.now(),
      messaging: [
        {
          sender: {
            id: '123456789', // ID del usuario que envía el mensaje
          },
          recipient: {
            id: '483729750482350', // ID de la página
          },
          timestamp: Date.now(),
          message: {
            mid: 'mid.$cAABCDEF123456', // ID único del mensaje
            text: 'Hola, esto es una prueba del webhook', // Texto del mensaje
          },
        },
      ],
    },
  ],
};

// Crear firma HMAC-SHA256
const bodyString = JSON.stringify(payload);
const signature = `sha256=${crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(bodyString)
  .digest('hex')}`;

console.log('📤 Enviando mensaje de prueba al webhook...\n');
console.log('URL:', WEBHOOK_URL);
console.log('Payload:', JSON.stringify(payload, null, 2));
console.log('Signature:', signature);
console.log('\n⏳ Esperando respuesta...\n');

// Enviar solicitud POST
fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-hub-signature-256': signature,
  },
  body: bodyString,
})
  .then((response) => {
    console.log(`✅ Respuesta: ${response.status} ${response.statusText}`);
    return response.text();
  })
  .then((text) => {
    console.log('Body:', text);
    console.log('\n✅ Prueba completada');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Verifica en Neon que hay registros en meta_messages');
    console.log('2. Verifica en Neon que hay registros en meta_webhook_logs');
    console.log('3. Si hay errores, revisa el error_message en meta_webhook_logs');
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️ Asegúrate de que:');
    console.log('1. El servidor está corriendo: npm run dev');
    console.log('2. El puerto es 3005 (o ajusta WEBHOOK_URL)');
    console.log('3. Las variables de entorno están configuradas en .env.local');
  });
