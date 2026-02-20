interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

// Esquemas de validación para cada tipo
const SCHEMA_REQUIREMENTS: Record<string, {
  required: string[]
  optional: string[]
  type: string
}> = {
  Organization: {
    required: ['@context', '@type', 'name', 'url'],
    optional: ['logo', 'description', 'sameAs', 'contactPoint', 'address'],
    type: 'Organization'
  },
  LocalBusiness: {
    required: ['@context', '@type', 'name', 'address'],
    optional: ['telephone', 'email', 'url', 'priceRange', 'aggregateRating', 'openingHoursSpecification'],
    type: 'LocalBusiness'
  },
  RealEstateProperty: {
    required: ['@context', '@type', 'name', 'address', 'price', 'priceCurrency'],
    optional: ['description', 'image', 'numberOfBedrooms', 'numberOfBathroomsUnitComplete', 'floorSize', 'agent'],
    type: 'RealEstateProperty'
  },
  BreadcrumbList: {
    required: ['@context', '@type', 'itemListElement'],
    optional: [],
    type: 'BreadcrumbList'
  },
  FAQPage: {
    required: ['@context', '@type', 'mainEntity'],
    optional: [],
    type: 'FAQPage'
  }
}

/**
 * Valida que un schema JSON-LD sea válido
 */
export function validateSchema(schema: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validar que es un objeto
  if (!schema || typeof schema !== 'object') {
    errors.push('Schema must be a valid JSON object')
    return { valid: false, errors, warnings }
  }

  // Validar @context
  if (!schema['@context']) {
    errors.push('Missing required field: @context')
  } else if (schema['@context'] !== 'https://schema.org') {
    warnings.push(`@context should be 'https://schema.org', got '${schema['@context']}'`)
  }

  // Validar @type
  if (!schema['@type']) {
    errors.push('Missing required field: @type')
  } else {
    const schemaType = schema['@type']
    const requirements = SCHEMA_REQUIREMENTS[schemaType]

    if (!requirements) {
      warnings.push(`Unknown schema type: ${schemaType}`)
    } else {
      // Validar campos requeridos
      for (const field of requirements.required) {
        if (!(field in schema)) {
          errors.push(`Missing required field for ${schemaType}: ${field}`)
        }
      }

      // Validar que no hay campos desconocidos
      const validFields = new Set([...requirements.required, ...requirements.optional, '@context', '@type'])
      for (const field of Object.keys(schema)) {
        if (!validFields.has(field) && !field.startsWith('@')) {
          warnings.push(`Unknown field: ${field}`)
        }
      }
    }
  }

  // Validar tipos de datos
  if (schema.price !== undefined && typeof schema.price !== 'string' && typeof schema.price !== 'number') {
    errors.push('Field "price" must be a string or number')
  }

  if (schema.numberOfBedrooms !== undefined && typeof schema.numberOfBedrooms !== 'number' && typeof schema.numberOfBedrooms !== 'string') {
    errors.push('Field "numberOfBedrooms" must be a number or string')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Sanitiza entrada de usuario para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  // Escape HTML entities para prevenir XSS
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Sanitiza un objeto schema completo
 */
export function sanitizeSchema(schema: any): any {
  if (typeof schema !== 'object' || schema === null) {
    return schema
  }

  if (Array.isArray(schema)) {
    return schema.map(item => sanitizeSchema(item))
  }

  const sanitized: any = {}
  for (const [key, value] of Object.entries(schema)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeSchema(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Valida consistencia entre datos de página y schema
 */
export function validateConsistency(pageData: any, schema: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validar precio
  if (pageData.price !== undefined && schema.price !== undefined) {
    if (String(pageData.price) !== String(schema.price)) {
      errors.push(`Price mismatch: page has ${pageData.price}, schema has ${schema.price}`)
    }
  }

  // Validar dirección
  if (pageData.address && schema.address) {
    if (pageData.address !== schema.address?.streetAddress) {
      warnings.push(`Address mismatch: page and schema differ`)
    }
  }

  // Validar URL
  if (pageData.url && schema.url) {
    if (pageData.url !== schema.url) {
      warnings.push(`URL mismatch: page has ${pageData.url}, schema has ${schema.url}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Valida que el schema tenga valores válidos (no vacíos)
 */
export function validateSchemaValues(schema: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const validateValue = (value: any, path: string = '') => {
    if (value === null || value === undefined) {
      warnings.push(`Empty value at ${path}`)
    } else if (typeof value === 'string' && value.trim() === '') {
      warnings.push(`Empty string at ${path}`)
    } else if (typeof value === 'number' && value === 0) {
      warnings.push(`Zero value at ${path}`)
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      for (const [key, val] of Object.entries(value)) {
        validateValue(val, `${path}.${key}`)
      }
    } else if (Array.isArray(value) && value.length === 0) {
      warnings.push(`Empty array at ${path}`)
    }
  }

  validateValue(schema)

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}
