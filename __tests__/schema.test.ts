import {
  validateSchema,
  sanitizeInput,
  sanitizeSchema,
  validateConsistency,
  validateSchemaValues
} from '@/lib/schema/validator'

describe('Schema Validation', () => {
  describe('validateSchema', () => {
    it('should validate a correct Organization schema', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Test Company',
        'url': 'https://example.com'
      }
      const result = validateSchema(schema)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject schema without @context', () => {
      const schema = {
        '@type': 'Organization',
        'name': 'Test Company'
      }
      const result = validateSchema(schema)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Missing required field: @context')
    })

    it('should reject schema without @type', () => {
      const schema = {
        '@context': 'https://schema.org',
        'name': 'Test Company'
      }
      const result = validateSchema(schema)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Missing required field: @type')
    })

    it('should reject schema without required fields', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization'
      }
      const result = validateSchema(schema)
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should validate RealEstateProperty schema', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateProperty',
        'name': 'Luxury Home',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '123 Main St'
        },
        'price': '500000',
        'priceCurrency': 'USD'
      }
      const result = validateSchema(schema)
      expect(result.valid).toBe(true)
    })

    it('should warn about wrong @context', () => {
      const schema = {
        '@context': 'https://wrong.org',
        '@type': 'Organization',
        'name': 'Test Company',
        'url': 'https://example.com'
      }
      const result = validateSchema(schema)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should handle non-object input', () => {
      const result = validateSchema(null)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Schema must be a valid JSON object')
    })
  })

  describe('sanitizeInput', () => {
    it('should escape HTML entities', () => {
      const input = '<script>alert("XSS")</script>'
      const result = sanitizeInput(input)
      expect(result).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;')
    })

    it('should escape quotes', () => {
      const input = 'Test "quoted" text'
      const result = sanitizeInput(input)
      expect(result).toContain('&quot;')
    })

    it('should escape ampersands', () => {
      const input = 'Tom & Jerry'
      const result = sanitizeInput(input)
      expect(result).toBe('Tom &amp; Jerry')
    })

    it('should handle empty string', () => {
      const result = sanitizeInput('')
      expect(result).toBe('')
    })

    it('should handle non-string input', () => {
      const result = sanitizeInput(null as any)
      expect(result).toBe('')
    })
  })

  describe('sanitizeSchema', () => {
    it('should sanitize string values in schema', () => {
      const schema = {
        name: '<script>alert("XSS")</script>',
        description: 'Normal text'
      }
      const result = sanitizeSchema(schema)
      expect(result.name).toContain('&lt;script&gt;')
      expect(result.description).toBe('Normal text')
    })

    it('should sanitize nested objects', () => {
      const schema = {
        address: {
          streetAddress: '<img src=x>',
          city: 'New York'
        }
      }
      const result = sanitizeSchema(schema)
      expect(result.address.streetAddress).toContain('&lt;img')
      expect(result.address.city).toBe('New York')
    })

    it('should sanitize arrays', () => {
      const schema = {
        images: ['<script>alert(1)</script>', 'normal.jpg']
      }
      const result = sanitizeSchema(schema)
      expect(result.images[0]).toContain('&lt;script&gt;')
      expect(result.images[1]).toBe('normal.jpg')
    })

    it('should preserve non-string values', () => {
      const schema = {
        price: 500000,
        bedrooms: 4,
        available: true
      }
      const result = sanitizeSchema(schema)
      expect(result.price).toBe(500000)
      expect(result.bedrooms).toBe(4)
      expect(result.available).toBe(true)
    })
  })

  describe('validateConsistency', () => {
    it('should detect price mismatch', () => {
      const pageData = { price: 500000 }
      const schema = { price: 400000 }
      const result = validateConsistency(pageData, schema)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('Price mismatch'))).toBe(true)
    })

    it('should pass with matching prices', () => {
      const pageData = { price: 500000 }
      const schema = { price: 500000 }
      const result = validateConsistency(pageData, schema)
      expect(result.valid).toBe(true)
    })

    it('should warn about address mismatch', () => {
      const pageData = { address: '123 Main St' }
      const schema = { address: { streetAddress: '456 Oak Ave' } }
      const result = validateConsistency(pageData, schema)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should handle missing data gracefully', () => {
      const pageData = {}
      const schema = { price: 500000 }
      const result = validateConsistency(pageData, schema)
      expect(result.valid).toBe(true)
    })
  })

  describe('validateSchemaValues', () => {
    it('should warn about empty strings', () => {
      const schema = {
        name: '',
        description: 'Valid'
      }
      const result = validateSchemaValues(schema)
      expect(result.warnings.some(w => w.includes('Empty string'))).toBe(true)
    })

    it('should warn about null values', () => {
      const schema = {
        name: 'Valid',
        description: null
      }
      const result = validateSchemaValues(schema)
      expect(result.warnings.some(w => w.includes('Empty value'))).toBe(true)
    })

    it('should warn about zero values', () => {
      const schema = {
        price: 0,
        bedrooms: 4
      }
      const result = validateSchemaValues(schema)
      expect(result.warnings.some(w => w.includes('Zero value'))).toBe(true)
    })

    it('should warn about empty arrays', () => {
      const schema = {
        images: [],
        name: 'Valid'
      }
      const result = validateSchemaValues(schema)
      expect(result.warnings.some(w => w.includes('Empty array'))).toBe(true)
    })

    it('should pass with valid values', () => {
      const schema = {
        name: 'Valid Property',
        price: 500000,
        bedrooms: 4,
        images: ['image1.jpg', 'image2.jpg']
      }
      const result = validateSchemaValues(schema)
      expect(result.valid).toBe(true)
    })
  })
})
