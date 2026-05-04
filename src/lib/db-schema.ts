/**
 * Database Schema for Property Captures
 * Stores property data captured from IDX Broker
 */

export interface PropertyCapture {
  id: string
  propertyId: string
  propertyUrl: string
  address: string
  price: string
  beds: number
  baths: number
  sqft: number
  yearBuilt?: number
  lotSize?: string
  type?: string
  status?: string
  capturedAt: Date
  contactFormId?: string // Link to contact form submission
}

export interface ContactFormSubmission {
  id: string
  propertyId?: string
  propertyUrl?: string
  address?: string
  price?: string
  beds?: number
  baths?: number
  sqft?: number
  // Contact info
  name: string
  email: string
  phone: string
  message: string
  // Metadata
  submittedAt: Date
  ipAddress?: string
  userAgent?: string
}

/**
 * SQL Schema for PostgreSQL (using Neon)
 * 
 * CREATE TABLE property_captures (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   property_id VARCHAR(255) NOT NULL,
 *   property_url TEXT NOT NULL,
 *   address VARCHAR(255),
 *   price VARCHAR(50),
 *   beds INTEGER,
 *   baths INTEGER,
 *   sqft INTEGER,
 *   year_built INTEGER,
 *   lot_size VARCHAR(100),
 *   type VARCHAR(100),
 *   status VARCHAR(100),
 *   captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   contact_form_id UUID REFERENCES contact_form_submissions(id),
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 *
 * CREATE TABLE contact_form_submissions (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   property_id VARCHAR(255),
 *   property_url TEXT,
 *   address VARCHAR(255),
 *   price VARCHAR(50),
 *   beds INTEGER,
 *   baths INTEGER,
 *   sqft INTEGER,
 *   name VARCHAR(255) NOT NULL,
 *   email VARCHAR(255) NOT NULL,
 *   phone VARCHAR(20),
 *   message TEXT,
 *   submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   ip_address VARCHAR(45),
 *   user_agent TEXT,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 *
 * CREATE INDEX idx_property_captures_property_id ON property_captures(property_id);
 * CREATE INDEX idx_property_captures_captured_at ON property_captures(captured_at);
 * CREATE INDEX idx_contact_submissions_property_id ON contact_form_submissions(property_id);
 * CREATE INDEX idx_contact_submissions_email ON contact_form_submissions(email);
 */
