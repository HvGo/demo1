# Sistema de Clasificación Inteligente de Contactos

## 📋 Descripción General

Sistema de clasificación automática de contactos usando IA (Gemini) para detectar spam, bots y clasificar clientes genuinos. Reduce emails innecesarios y mejora la calidad de leads.

---

## 🎯 Objetivos

1. **Detectar spam automáticamente** - Filtrar publicidad y ofertas de servicios
2. **Identificar bots** - Detectar mensajes automatizados
3. **Clasificar clientes genuinos** - Diferenciar entre compradores, vendedores y consultas
4. **Optimizar emails** - Enviar solo a contactos legítimos
5. **Mejorar conversión** - Templates personalizados según intención

---

## 🏗️ Arquitectura del Sistema

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                    Formulario de Contacto                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              API Route (/api/contact)                        │
│  1. Validaciones básicas (honeypot, formato)                │
│  2. Sanitización de inputs                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         Clasificador de Intención (Gemini AI)               │
│  - Analiza: nombre, email, teléfono, mensaje                │
│  - Retorna: intent, confidence, shouldSendEmail, tags       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Guardar en Base de Datos                        │
│  - Datos del contacto + clasificación                       │
│  - Columnas: intent, intent_confidence, tags, reasoning     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Decisión de Envío de Emails                     │
│  SI: shouldSendEmail = true && !isBot                       │
│  NO: spam, bot, test                                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         Templates Condicionales (según intent)               │
│  - genuine_buyer → Template para compradores                │
│  - genuine_seller → Template para vendedores                │
│  - genuine_inquiry → Template genérico                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Estructura de Archivos

```
src/
├── lib/
│   ├── contact/
│   │   └── intent-classifier.ts       # Servicio de clasificación con IA
│   └── email/
│       ├── resend.ts                  # Servicio de envío de emails (existente)
│       └── templates.ts               # Templates condicionales (nuevo)
├── app/
│   └── api/
│       └── contact/
│           └── route.ts               # API route modificado
└── db/
    └── migrations/
        └── 006_add_contact_classification.sql  # Migración de BD
```

---

## 🔍 Tipos de Intención

### 1. `genuine_buyer` - Cliente Real (Comprador)
**Características:**
- Menciona interés en comprar propiedad
- Pregunta sobre propiedades disponibles
- Consulta sobre financiamiento
- Busca casa/departamento/terreno
- Menciona presupuesto o ubicación

**Acción:**
- ✅ Enviar email de confirmación personalizado
- ✅ Notificar al admin
- 📧 Template: Información sobre compra, financiamiento, propiedades

**Ejemplo:**
> "Hola, estoy interesado en comprar una casa en Salt Lake City. Mi presupuesto es de $400k. ¿Tienen propiedades disponibles?"

---

### 2. `genuine_seller` - Cliente Real (Vendedor)
**Características:**
- Quiere vender su propiedad
- Solicita valuación o CMA
- Pregunta sobre proceso de venta
- Menciona tener propiedad para vender

**Acción:**
- ✅ Enviar email de confirmación personalizado
- ✅ Notificar al admin
- 📧 Template: Información sobre CMA, estrategia de venta, comisiones

**Ejemplo:**
> "Necesito vender mi casa en Provo. ¿Pueden hacer una valuación gratuita?"

---

### 3. `genuine_inquiry` - Consulta Legítima
**Características:**
- Pregunta general sobre servicios
- Consulta profesional
- No es compra/venta directa pero es legítimo

**Acción:**
- ✅ Enviar email de confirmación genérico
- ✅ Notificar al admin
- 📧 Template: Confirmación estándar

**Ejemplo:**
> "¿Qué servicios ofrecen para inversionistas?"

---

### 4. `spam` - Publicidad/Marketing
**Características:**
- Contiene URLs o links
- Ofrece servicios (SEO, marketing, desarrollo web)
- Lenguaje comercial agresivo
- Email genérico (marketing@, info@)
- Menciona aumentar ventas, tráfico, ranking

**Acción:**
- ❌ NO enviar emails
- ❌ NO notificar al admin
- 📊 Guardar en BD para análisis

**Ejemplo:**
> "We offer SEO services to increase your website traffic. Visit our website..."

---

### 5. `bot` - Bot Automatizado
**Características:**
- Texto aleatorio sin sentido
- Caracteres extraños
- Nombre no realista
- Menos de 70% de letras

**Acción:**
- ❌ NO enviar emails
- ❌ NO notificar al admin
- 📊 Guardar en BD para análisis

**Ejemplo:**
> Nombre: "qcWUFucCyqgdyW", Mensaje: "asdfjkl qwerty 12345"

---

### 6. `test` - Mensaje de Prueba
**Características:**
- Mensaje muy corto: "test", "prueba", "testing"
- Sin contenido real
- Menos de 5 palabras

**Acción:**
- ❌ NO enviar emails
- ❌ NO notificar al admin
- 📊 Guardar en BD para análisis

**Ejemplo:**
> "test"

---

### 7. `unknown` - No Clasificable
**Características:**
- No encaja en ninguna categoría
- Información insuficiente

**Acción:**
- ✅ Enviar email genérico (conservador)
- ✅ Notificar al admin
- 🏷️ Tag: `needs_review`

---

## 🗄️ Esquema de Base de Datos

### Nuevas Columnas en `contacts`

```sql
-- Clasificación de intención
intent VARCHAR(50)                    -- Tipo de intención clasificada
intent_confidence INTEGER             -- Confianza 0-100
classification_tags TEXT[]            -- Tags adicionales
classification_reasoning TEXT         -- Explicación de la clasificación

-- Control de emails
email_sent BOOLEAN DEFAULT false      -- Email de confirmación enviado
admin_notified BOOLEAN DEFAULT false  -- Admin fue notificado
```

### Índices

```sql
CREATE INDEX idx_contacts_intent ON contacts(intent);
CREATE INDEX idx_contacts_email_sent ON contacts(email_sent);
CREATE INDEX idx_contacts_admin_notified ON contacts(admin_notified);
CREATE INDEX idx_contacts_intent_confidence ON contacts(intent_confidence DESC);
```

### Vistas de Análisis

```sql
-- Estadísticas de clasificación
CREATE VIEW contact_classification_analysis AS
SELECT
  intent,
  COUNT(*) as total,
  AVG(intent_confidence) as avg_confidence,
  COUNT(*) FILTER (WHERE email_sent = true) as emails_sent,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7_days
FROM contacts
WHERE intent IS NOT NULL
GROUP BY intent;
```

---

## 🔧 Configuración

### Variables de Entorno

```bash
# Gemini AI (ya configurado para Meta Messenger)
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-2.0-flash

# Email (ya configurado)
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@example.com,admin2@example.com
```

---

## 📊 Monitoreo y Métricas

### Queries Útiles

**Análisis de clasificación (últimos 7 días):**
```sql
SELECT 
  intent,
  COUNT(*) as total,
  AVG(intent_confidence) as avg_confidence,
  COUNT(*) FILTER (WHERE email_sent = true) as emails_sent
FROM contacts
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY intent
ORDER BY total DESC;
```

**Spam detectado:**
```sql
SELECT COUNT(*) as spam_blocked
FROM contacts
WHERE intent IN ('spam', 'bot', 'test')
  AND created_at > NOW() - INTERVAL '30 days';
```

**Tasa de conversión de emails:**
```sql
SELECT 
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_sent = true) / COUNT(*), 2) as email_rate
FROM contacts
WHERE created_at > NOW() - INTERVAL '30 days';
```

---

## 🧪 Testing

### Casos de Prueba

**1. Cliente Comprador Genuino:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "phone": "555-1234",
  "message": "Hola, estoy buscando una casa en Salt Lake City con 3 habitaciones. Mi presupuesto es de $350k."
}
```
**Esperado:** `genuine_buyer`, confidence > 80%, emails enviados

---

**2. Spam de SEO:**
```json
{
  "name": "Marketing Agency",
  "email": "info@seocompany.com",
  "phone": null,
  "message": "We offer SEO services to increase your website ranking. Visit https://seocompany.com"
}
```
**Esperado:** `spam`, confidence > 90%, NO enviar emails

---

**3. Bot con Texto Aleatorio:**
```json
{
  "name": "qcWUFucCyqgdyW",
  "email": "random@test.com",
  "phone": null,
  "message": "asdfjkl qwerty 12345 zxcvbn"
}
```
**Esperado:** `bot`, confidence > 85%, NO enviar emails

---

## 🚨 Troubleshooting

### Problema: Clasificación falla constantemente

**Síntomas:**
- Todos los contactos clasificados como `unknown`
- Logs muestran `[CONTACT_CLASSIFICATION_ERROR]`

**Solución:**
1. Verificar `GOOGLE_API_KEY` en `.env`
2. Verificar cuota de Gemini API
3. Revisar logs de Gemini en Google Cloud Console

---

### Problema: Emails no se envían a clientes genuinos

**Síntomas:**
- `email_sent = false` para `genuine_buyer`
- Logs muestran "emails not sent"

**Solución:**
1. Verificar que `shouldSendEmail = true` en clasificación
2. Revisar logs de Resend
3. Verificar que `isBot = false`

---

### Problema: Demasiados falsos positivos (spam marcado como genuino)

**Síntomas:**
- Spam recibe emails
- `intent = genuine_inquiry` para mensajes obvios de spam

**Solución:**
1. Ajustar prompt en `intent-classifier.ts`
2. Agregar más keywords de spam
3. Aumentar peso de detección de URLs

---

## 📈 Mejoras Futuras

1. **Dashboard de Admin** - Vista para revisar clasificaciones
2. **Feedback Loop** - Marcar falsos positivos/negativos para reentrenar
3. **A/B Testing** - Probar diferentes prompts
4. **Caché de Clasificaciones** - Evitar llamadas duplicadas a IA
5. **Webhooks** - Notificaciones en tiempo real para leads de alta prioridad
6. **Integración con CRM** - Sincronizar leads clasificados

---

## 📝 Notas Importantes

1. **Conservador por defecto** - Si la IA falla, trata como `genuine_inquiry`
2. **No rompe funcionalidad actual** - Emails genéricos siguen funcionando
3. **Backward compatible** - Contactos antiguos sin clasificación siguen visibles
4. **Privacidad** - Datos no se envían a terceros (solo a Gemini para clasificación)
5. **Costos** - Gemini API tiene costo por token (~$0.001 por clasificación)

---

## 🔗 Referencias

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Resend Email API](https://resend.com/docs)
- Código base: `src/lib/meta/gemini.ts` (sistema similar para Meta Messenger)
