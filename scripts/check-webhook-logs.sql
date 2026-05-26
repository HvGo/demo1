-- Ejecutar en Neon SQL Editor para ver los logs del webhook

-- Ver últimos 10 logs
SELECT id, event_type, status, error_message, created_at
FROM meta_webhook_logs
ORDER BY created_at DESC
LIMIT 10;

-- Ver resumen de eventos
SELECT event_type, status, COUNT(*) as count
FROM meta_webhook_logs
GROUP BY event_type, status
ORDER BY created_at DESC;

-- Ver si hay mensajes en meta_messages
SELECT COUNT(*) as total_messages FROM meta_messages;

-- Ver últimos mensajes
SELECT id, meta_sender_id, message_text, intent, created_at
FROM meta_messages
ORDER BY created_at DESC
LIMIT 5;
