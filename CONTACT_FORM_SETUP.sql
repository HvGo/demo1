-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, responded, spam
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  response_message TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Crear índices para búsqueda y performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_phone ON contacts(phone);

-- Crear tabla de audit log para contactos
CREATE TABLE IF NOT EXISTS contacts_audit_log (
  id BIGSERIAL PRIMARY KEY,
  contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  old_status VARCHAR(50),
  new_status VARCHAR(50),
  changed_by VARCHAR(255),
  changed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- Crear índice para audit log
CREATE INDEX idx_contacts_audit_contact_id ON contacts_audit_log(contact_id);

-- Crear vista para estadísticas de contactos
CREATE OR REPLACE VIEW contacts_stats AS
SELECT
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as count_last_7_days,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as count_last_30_days
FROM contacts
GROUP BY status;

-- Insertar datos de ejemplo (opcional)
-- INSERT INTO contacts (name, email, phone, message, status)
-- VALUES ('John Doe', 'john@example.com', '+1-555-1234', 'I am interested in your properties', 'new');

-- Verificar que las tablas se crearon correctamente
SELECT 'contacts' as table_name, COUNT(*) as row_count FROM contacts
UNION ALL
SELECT 'contacts_audit_log' as table_name, COUNT(*) as row_count FROM contacts_audit_log;
