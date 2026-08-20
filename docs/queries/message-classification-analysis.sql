-- ═══════════════════════════════════════════════════════════════════════════════
-- QUERIES PARA ANÁLISIS DE BASE DE CONOCIMIENTO - CLASIFICACIÓN DE MENSAJES
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. DISTRIBUCIÓN DE TIPOS DE MENSAJES (últimos 30 días)
-- Muestra cuántos mensajes de cada tipo se han recibido
SELECT 
  metadata->>'classification'->>'intent' as tipo_mensaje,
  COUNT(*) as total,
  ROUND(AVG((metadata->>'classification'->>'confidence')::numeric), 2) as confianza_promedio,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as porcentaje
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL
GROUP BY metadata->>'classification'->>'intent'
ORDER BY total DESC;

-- 2. OPORTUNIDADES B2B DETECTADAS
-- Lista todas las oportunidades de negocio B2B
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  metadata->>'user_profile'->>'last_name' as apellido,
  message_text,
  metadata->>'classification'->>'confidence' as confianza,
  metadata->>'classification'->>'reasoning' as razon,
  platform,
  created_at
FROM meta_messages
WHERE metadata->>'classification'->>'is_b2b' = 'true'
ORDER BY created_at DESC
LIMIT 50;

-- 3. MENSAJES PERSONALES (amigos/familiares)
-- Identifica mensajes de amigos o familiares
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  message_text,
  metadata->>'classification'->>'confidence' as confianza,
  platform,
  created_at
FROM meta_messages
WHERE metadata->>'classification'->>'intent' = 'personal_friend'
ORDER BY created_at DESC
LIMIT 50;

-- 4. SPAM BLOQUEADO
-- Lista mensajes clasificados como spam
SELECT 
  meta_sender_id,
  message_text,
  metadata->>'classification'->>'reasoning' as razon,
  metadata->>'classification'->>'confidence' as confianza,
  platform,
  created_at
FROM meta_messages
WHERE metadata->>'classification'->>'is_spam' = 'true'
ORDER BY created_at DESC
LIMIT 50;

-- 5. MENSAJES QUE REQUIEREN REVISIÓN HUMANA
-- Clasificaciones con baja confianza (< 70%)
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  message_text,
  metadata->>'classification'->>'intent' as tipo,
  metadata->>'classification'->>'confidence' as confianza,
  metadata->>'classification'->>'reasoning' as razon,
  platform,
  created_at
FROM meta_messages
WHERE (metadata->>'classification'->>'requires_human_review')::boolean = true
ORDER BY created_at DESC
LIMIT 50;

-- 6. TENDENCIAS POR PLATAFORMA (últimos 7 días)
-- Compara Facebook vs Instagram
SELECT 
  platform,
  metadata->>'classification'->>'intent' as tipo_mensaje,
  COUNT(*) as total,
  ROUND(AVG((metadata->>'classification'->>'confidence')::numeric), 2) as confianza_promedio
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND metadata->>'classification' IS NOT NULL
GROUP BY platform, metadata->>'classification'->>'intent'
ORDER BY platform, total DESC;

-- 7. CONSULTAS DE NEGOCIO (business_inquiry)
-- Clientes potenciales interesados en comprar/vender
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  metadata->>'user_profile'->>'last_name' as apellido,
  message_text,
  metadata->>'classification'->>'confidence' as confianza,
  metadata->>'classification'->>'tags' as tags,
  platform,
  created_at
FROM meta_messages
WHERE metadata->>'classification'->>'intent' = 'business_inquiry'
ORDER BY created_at DESC
LIMIT 50;

-- 8. ESTADÍSTICAS GENERALES POR DÍA (últimos 30 días)
-- Volumen de mensajes por día y tipo
SELECT 
  DATE(created_at) as fecha,
  metadata->>'classification'->>'intent' as tipo,
  COUNT(*) as total
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL
GROUP BY DATE(created_at), metadata->>'classification'->>'intent'
ORDER BY fecha DESC, total DESC;

-- 9. USUARIOS MÁS ACTIVOS
-- Top 10 usuarios que más mensajes envían
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  metadata->>'user_profile'->>'last_name' as apellido,
  COUNT(*) as total_mensajes,
  COUNT(DISTINCT metadata->>'classification'->>'intent') as tipos_diferentes,
  MAX(created_at) as ultimo_mensaje
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL
GROUP BY meta_sender_id, metadata->>'user_profile'->>'first_name', metadata->>'user_profile'->>'last_name'
ORDER BY total_mensajes DESC
LIMIT 10;

-- 10. TASA DE CONVERSIÓN (inquiry → lead)
-- Usuarios que preguntaron y luego iniciaron proceso de compra
SELECT 
  COUNT(DISTINCT CASE 
    WHEN metadata->>'classification'->>'intent' = 'business_inquiry' 
    THEN meta_sender_id 
  END) as usuarios_con_inquiry,
  COUNT(DISTINCT CASE 
    WHEN EXISTS (
      SELECT 1 FROM purchase_leads pl 
      WHERE pl.meta_sender_id = meta_messages.meta_sender_id
    ) 
    THEN meta_sender_id 
  END) as usuarios_con_lead,
  ROUND(
    COUNT(DISTINCT CASE 
      WHEN EXISTS (
        SELECT 1 FROM purchase_leads pl 
        WHERE pl.meta_sender_id = meta_messages.meta_sender_id
      ) 
      THEN meta_sender_id 
    END) * 100.0 / 
    NULLIF(COUNT(DISTINCT CASE 
      WHEN metadata->>'classification'->>'intent' = 'business_inquiry' 
      THEN meta_sender_id 
    END), 0),
    2
  ) as tasa_conversion_pct
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL;

-- 11. MENSAJES POR HORA DEL DÍA
-- Identifica las horas pico de mensajes
SELECT 
  EXTRACT(HOUR FROM created_at) as hora,
  COUNT(*) as total_mensajes,
  COUNT(CASE WHEN metadata->>'classification'->>'intent' = 'business_inquiry' THEN 1 END) as consultas_negocio
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND metadata->>'classification' IS NOT NULL
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hora;

-- 12. TAGS MÁS FRECUENTES
-- Analiza los tags asignados por el clasificador
SELECT 
  jsonb_array_elements_text((metadata->'classification'->'tags')::jsonb) as tag,
  COUNT(*) as frecuencia
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL
  AND metadata->'classification'->'tags' IS NOT NULL
GROUP BY tag
ORDER BY frecuencia DESC;

-- 13. RESUMEN EJECUTIVO (últimos 30 días)
-- Vista general de métricas clave
SELECT 
  COUNT(*) as total_mensajes,
  COUNT(DISTINCT meta_sender_id) as usuarios_unicos,
  COUNT(CASE WHEN metadata->>'classification'->>'intent' = 'business_inquiry' THEN 1 END) as consultas_negocio,
  COUNT(CASE WHEN metadata->>'classification'->>'is_b2b' = 'true' THEN 1 END) as oportunidades_b2b,
  COUNT(CASE WHEN metadata->>'classification'->>'is_spam' = 'true' THEN 1 END) as spam_bloqueado,
  COUNT(CASE WHEN metadata->>'classification'->>'is_personal' = 'true' THEN 1 END) as mensajes_personales,
  COUNT(CASE WHEN (metadata->>'classification'->>'requires_human_review')::boolean = true THEN 1 END) as requieren_revision,
  ROUND(AVG((metadata->>'classification'->>'confidence')::numeric), 2) as confianza_promedio
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL;

-- 14. COMPARACIÓN SEMANAL
-- Compara esta semana vs semana anterior
WITH esta_semana AS (
  SELECT 
    metadata->>'classification'->>'intent' as tipo,
    COUNT(*) as total
  FROM meta_messages
  WHERE created_at >= NOW() - INTERVAL '7 days'
    AND metadata->>'classification' IS NOT NULL
  GROUP BY metadata->>'classification'->>'intent'
),
semana_anterior AS (
  SELECT 
    metadata->>'classification'->>'intent' as tipo,
    COUNT(*) as total
  FROM meta_messages
  WHERE created_at >= NOW() - INTERVAL '14 days'
    AND created_at < NOW() - INTERVAL '7 days'
    AND metadata->>'classification' IS NOT NULL
  GROUP BY metadata->>'classification'->>'intent'
)
SELECT 
  COALESCE(e.tipo, a.tipo) as tipo_mensaje,
  COALESCE(e.total, 0) as esta_semana,
  COALESCE(a.total, 0) as semana_anterior,
  COALESCE(e.total, 0) - COALESCE(a.total, 0) as diferencia,
  CASE 
    WHEN a.total > 0 THEN ROUND((COALESCE(e.total, 0) - a.total) * 100.0 / a.total, 2)
    ELSE NULL
  END as cambio_porcentual
FROM esta_semana e
FULL OUTER JOIN semana_anterior a ON e.tipo = a.tipo
ORDER BY esta_semana DESC NULLS LAST;

-- 15. EXPORT PARA ANÁLISIS EXTERNO (CSV)
-- Datos completos para análisis en Excel/Python
SELECT 
  meta_sender_id,
  metadata->>'user_profile'->>'first_name' as nombre,
  metadata->>'user_profile'->>'last_name' as apellido,
  message_text,
  metadata->>'classification'->>'intent' as tipo,
  metadata->>'classification'->>'confidence' as confianza,
  metadata->>'classification'->>'reasoning' as razon,
  metadata->>'classification'->>'tags' as tags,
  metadata->>'classification'->>'is_b2b' as es_b2b,
  metadata->>'classification'->>'is_spam' as es_spam,
  metadata->>'classification'->>'is_personal' as es_personal,
  platform,
  created_at
FROM meta_messages
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND metadata->>'classification' IS NOT NULL
ORDER BY created_at DESC;
