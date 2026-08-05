# Guía de Implementación - Sistema de Clasificación de Contactos

## 🚀 Pasos para Activar el Sistema

### Paso 1: Ejecutar Migración de Base de Datos

Conectarse a la base de datos Neon y ejecutar la migración:

```bash
# Opción 1: Desde psql
psql $DATABASE_URL -f db/migrations/006_add_contact_classification.sql

# Opción 2: Desde Neon Console
# Copiar y pegar el contenido de 006_add_contact_classification.sql
```

**Verificar que las columnas se agregaron:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'contacts'
  AND column_name IN ('intent', 'intent_confidence', 'classification_tags');
```

---

### Paso 2: Verificar Variables de Entorno

El sistema reutiliza las credenciales de Gemini ya configuradas para Meta Messenger:

```bash
# .env.local (ya debe existir)
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-2.0-flash
```

**No se requiere configuración adicional** - el sistema usa la misma API key.

---

### Paso 3: Compilar y Desplegar

```bash
# Compilar localmente para verificar
pnpm build

# Si hay errores de TypeScript, revisar
pnpm type-check

# Commit y push
git add .
git commit -m "feat: Agregar sistema de clasificación inteligente de contactos"
git push origin main
```

---

### Paso 4: Desplegar en Producción

```bash
# SSH al servidor
ssh root@your-server

# Navegar al proyecto
cd /var/www/demo2

# Pull cambios
git pull origin main

# Instalar dependencias (si es necesario)
pnpm install

# Compilar
pnpm build

# Reiniciar aplicación
pm2 restart demo2

# Verificar logs
pm2 logs demo2 --lines 50
```

---

### Paso 5: Testing Inicial

**Probar con contacto genuino:**
```bash
curl -X POST https://ivanutahrealtor.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@gmail.com",
    "phone": "555-1234",
    "message": "Hola, estoy interesado en comprar una casa en Salt Lake City"
  }'
```

**Verificar en logs:**
```bash
pm2 logs demo2 | grep CONTACT_CLASSIFICATION
```

**Esperado:**
```
[CONTACT_CLASSIFICATION] { intent: 'genuine_buyer', confidence: 85, shouldSendEmail: true }
[CONTACT] New contact submitted: 123 from juan@gmail.com - Intent: genuine_buyer (85%)
[CONTACT] Emails sent successfully for contact 123
```

---

**Probar con spam:**
```bash
curl -X POST https://ivanutahrealtor.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SEO Company",
    "email": "marketing@seo.com",
    "phone": null,
    "message": "We offer SEO services to boost your ranking. Visit our website."
  }'
```

**Esperado:**
```
[CONTACT_CLASSIFICATION] { intent: 'spam', confidence: 95, shouldSendEmail: false }
[CONTACT] AI classified as spam - emails not sent: 124
```

---

### Paso 6: Monitorear Primeras 24 Horas

**Query para ver clasificaciones:**
```sql
SELECT 
  id,
  name,
  email,
  intent,
  intent_confidence,
  email_sent,
  admin_notified,
  created_at
FROM contacts
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

**Verificar distribución:**
```sql
SELECT 
  intent,
  COUNT(*) as total,
  AVG(intent_confidence) as avg_confidence,
  COUNT(*) FILTER (WHERE email_sent = true) as emails_sent
FROM contacts
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY intent;
```

---

## 🔧 Configuración Opcional

### Activar Templates Personalizados (Opcional)

Por defecto, el sistema usa los templates existentes. Para activar templates personalizados:

**Modificar `src/app/api/contact/route.ts`:**

```typescript
// Importar templates personalizados
import { getEmailTemplateByIntent } from '@/lib/email/templates'

// En la sección de envío de emails (línea ~323)
if (!isBot && classification.shouldSendEmail) {
  try {
    const emailPromises: Promise<any>[] = []
    
    // NUEVO: Usar template personalizado según intención
    if (classification.confidence > 80) {
      const { subject, html } = getEmailTemplateByIntent(
        classification.intent,
        sanitizedName
      )
      
      emailPromises.push(
        sendEmail({
          to: sanitizedEmail,
          subject,
          html,
          replyTo: emailConfig.adminEmail[0]
        })
      )
    } else {
      // Baja confianza: usar template genérico
      emailPromises.push(
        sendContactConfirmation(sanitizedName, sanitizedEmail)
      )
    }
    
    // ... resto del código
  }
}
```

---

## 📊 Dashboard de Análisis (Futuro)

Queries útiles para crear un dashboard:

**Efectividad del clasificador:**
```sql
SELECT 
  intent,
  COUNT(*) as total,
  ROUND(AVG(intent_confidence), 2) as avg_confidence,
  COUNT(*) FILTER (WHERE email_sent = true) as emails_sent,
  ROUND(100.0 * COUNT(*) FILTER (WHERE email_sent = true) / COUNT(*), 2) as email_rate
FROM contacts
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY intent
ORDER BY total DESC;
```

**Spam bloqueado (ahorro de emails):**
```sql
SELECT 
  COUNT(*) as spam_blocked,
  COUNT(*) FILTER (WHERE intent = 'spam') as spam_count,
  COUNT(*) FILTER (WHERE intent = 'bot') as bot_count,
  COUNT(*) FILTER (WHERE intent = 'test') as test_count
FROM contacts
WHERE intent IN ('spam', 'bot', 'test')
  AND created_at > NOW() - INTERVAL '30 days';
```

**Leads de alta calidad:**
```sql
SELECT 
  id,
  name,
  email,
  phone,
  intent,
  intent_confidence,
  message,
  created_at
FROM contacts
WHERE intent IN ('genuine_buyer', 'genuine_seller')
  AND intent_confidence > 80
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY intent_confidence DESC, created_at DESC;
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@google/generative-ai'"

**Causa:** El paquete ya está instalado pero TypeScript no lo reconoce.

**Solución:**
```bash
# Reinstalar dependencias
pnpm install

# Si persiste, verificar que existe
ls node_modules/@google/generative-ai

# Limpiar caché de TypeScript
rm -rf .next
pnpm build
```

---

### Error: "GOOGLE_API_KEY not configured"

**Causa:** Variable de entorno no está disponible.

**Solución:**
```bash
# Verificar en .env.local
cat .env.local | grep GOOGLE_API_KEY

# Si no existe, agregar
echo 'GOOGLE_API_KEY=your_key_here' >> .env.local

# Reiniciar servidor de desarrollo
pnpm dev
```

---

### Error: "Column 'intent' does not exist"

**Causa:** Migración de BD no se ejecutó.

**Solución:**
```bash
# Ejecutar migración
psql $DATABASE_URL -f db/migrations/006_add_contact_classification.sql

# Verificar
psql $DATABASE_URL -c "\d contacts"
```

---

### Clasificación siempre retorna 'unknown'

**Causa:** Prompt de Gemini no está funcionando correctamente.

**Solución:**
1. Verificar logs de Gemini en Google Cloud Console
2. Revisar cuota de API
3. Ajustar prompt en `src/lib/contact/intent-classifier.ts`

---

### Emails se envían a spam

**Causa:** Clasificación incorrecta.

**Solución:**
1. Revisar casos en BD:
```sql
SELECT * FROM contacts 
WHERE intent = 'spam' AND email_sent = true 
LIMIT 10;
```

2. Ajustar criterios de clasificación en prompt
3. Aumentar threshold de confianza

---

## 📈 Métricas de Éxito

**KPIs a monitorear:**

1. **Tasa de detección de spam:** > 90%
2. **Falsos positivos:** < 5%
3. **Confianza promedio:** > 75%
4. **Reducción de emails:** 20-30%
5. **Tiempo de respuesta de IA:** < 2 segundos

---

## ✅ Checklist de Implementación

- [ ] Ejecutar migración de BD
- [ ] Verificar variables de entorno
- [ ] Compilar localmente sin errores
- [ ] Desplegar en producción
- [ ] Probar con contacto genuino
- [ ] Probar con spam
- [ ] Verificar logs de clasificación
- [ ] Revisar emails enviados
- [ ] Monitorear por 24h
- [ ] Analizar primeras métricas
- [ ] Ajustar prompt si es necesario
- [ ] Documentar hallazgos

---

## 🎯 Próximos Pasos (Opcional)

1. **Crear dashboard de admin** para revisar clasificaciones
2. **Implementar feedback loop** para mejorar el modelo
3. **A/B testing** de diferentes prompts
4. **Caché de clasificaciones** para reducir costos
5. **Webhooks** para notificaciones en tiempo real
6. **Integración con CRM** para sincronizar leads

---

## 📞 Soporte

Si encuentras problemas durante la implementación:

1. Revisar logs: `pm2 logs demo2`
2. Verificar BD: Ejecutar queries de diagnóstico
3. Revisar documentación: `docs/CONTACT_CLASSIFICATION_SYSTEM.md`
4. Consultar código base: `src/lib/meta/gemini.ts` (sistema similar)
