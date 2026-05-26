-- Ejecutar en Neon SQL Editor para verificar si el webhook registró datos

-- Ver últimos logs del webhook
SELECT id, event_type, status, error_message, created_at
FROM meta_webhook_logs
ORDER BY created_at DESC
LIMIT 10;

-- Ver últimos mensajes registrados
SELECT id, meta_sender_id, message_text, intent, created_at
FROM meta_messages
ORDER BY created_at DESC
LIMIT 10;

-- Contar totales
SELECT 
  (SELECT COUNT(*) FROM meta_webhook_logs) as total_webhook_logs,
  (SELECT COUNT(*) FROM meta_messages) as total_messages;
