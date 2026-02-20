-- Extender tabla contacts con columnas de atribución/geo/device
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100),
  ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100),
  ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(150),
  ADD COLUMN IF NOT EXISTS referrer VARCHAR(255),
  ADD COLUMN IF NOT EXISTS geo_country VARCHAR(100),
  ADD COLUMN IF NOT EXISTS geo_region VARCHAR(100),
  ADD COLUMN IF NOT EXISTS geo_city VARCHAR(100),
  ADD COLUMN IF NOT EXISTS device_type VARCHAR(50),
  ADD COLUMN IF NOT EXISTS os VARCHAR(100),
  ADD COLUMN IF NOT EXISTS browser VARCHAR(100),
  ADD COLUMN IF NOT EXISTS session_id VARCHAR(100);

-- Índices útiles para reporting
CREATE INDEX IF NOT EXISTS idx_contacts_utm_source ON contacts(utm_source);
CREATE INDEX IF NOT EXISTS idx_contacts_referrer ON contacts(referrer);
CREATE INDEX IF NOT EXISTS idx_contacts_geo ON contacts(geo_country, geo_region, geo_city);
CREATE INDEX IF NOT EXISTS idx_contacts_session ON contacts(session_id);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Tabla de engagement por sesión/página
CREATE TABLE IF NOT EXISTS session_engagement (
  session_id VARCHAR(100) NOT NULL,
  page TEXT NOT NULL,
  depth_reached INT DEFAULT 0, -- porcentaje máximo: 0-100
  active_ms BIGINT DEFAULT 0,  -- tiempo activo en milisegundos
  last_event_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (session_id, page)
);

CREATE INDEX IF NOT EXISTS idx_session_engagement_page ON session_engagement(page);
CREATE INDEX IF NOT EXISTS idx_session_engagement_last_event ON session_engagement(last_event_at);

-- Vista rápida de engagement promedio por página
CREATE OR REPLACE VIEW session_engagement_summary AS
SELECT
  page,
  AVG(depth_reached)::INT AS avg_depth,
  AVG(active_ms) AS avg_active_ms,
  COUNT(*) AS sessions
FROM session_engagement
GROUP BY page;
