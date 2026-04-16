export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Validadores básicos
export const validators = {
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  phone: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '')
    return cleaned.length >= 10
  },

  name: (value: string): boolean => {
    return value.trim().length >= 2 && value.trim().length <= 100
  },

  required: (value: string | number): boolean => {
    return String(value).trim().length > 0
  },

  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min
  },

  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max
  },

  url: (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  number: (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim().length > 0
  }
}

// Validador para Golden Questions Form
export function validateGoldenQuestionsForm(data: {
  firstTimebuyer: string
  creditScore: string
  constructionType: string
  contactPreference: string
  name: string
  email: string
  phone: string
}): ValidationResult {
  const errors: ValidationError[] = []

  if (!validators.required(data.firstTimebuyer)) {
    errors.push({ field: 'firstTimebuyer', message: 'Por favor selecciona una opción' })
  }

  if (!validators.required(data.creditScore)) {
    errors.push({ field: 'creditScore', message: 'Por favor selecciona tu rango de crédito' })
  }

  if (!validators.required(data.constructionType)) {
    errors.push({ field: 'constructionType', message: 'Por favor selecciona una opción' })
  }

  if (!validators.required(data.contactPreference)) {
    errors.push({ field: 'contactPreference', message: 'Por favor selecciona tu preferencia de contacto' })
  }

  if (!validators.required(data.name)) {
    errors.push({ field: 'name', message: 'El nombre completo es requerido' })
  } else if (!validators.name(data.name)) {
    errors.push({ field: 'name', message: 'El nombre debe tener entre 2 y 100 caracteres' })
  }

  if (!validators.required(data.email)) {
    errors.push({ field: 'email', message: 'El email es requerido' })
  } else if (!validators.email(data.email)) {
    errors.push({ field: 'email', message: 'Por favor ingresa un email válido' })
  }

  if (!validators.required(data.phone)) {
    errors.push({ field: 'phone', message: 'El teléfono es requerido' })
  } else if (!validators.phone(data.phone)) {
    errors.push({ field: 'phone', message: 'Por favor ingresa un teléfono válido' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validador para Curated Search Form
export function validateCuratedSearchForm(data: {
  selectedReality: string
  selectedCounty: string
  fullName: string
  phone: string
  email: string
}): ValidationResult {
  const errors: ValidationError[] = []

  if (!validators.required(data.selectedReality)) {
    errors.push({ field: 'selectedReality', message: 'Por favor selecciona un tipo de realidad' })
  }

  if (!validators.required(data.selectedCounty)) {
    errors.push({ field: 'selectedCounty', message: 'Por favor selecciona un condado' })
  }

  if (!validators.required(data.fullName)) {
    errors.push({ field: 'fullName', message: 'El nombre completo es requerido' })
  } else if (!validators.name(data.fullName)) {
    errors.push({ field: 'fullName', message: 'El nombre debe tener entre 2 y 100 caracteres' })
  }

  if (!validators.required(data.phone)) {
    errors.push({ field: 'phone', message: 'El teléfono es requerido' })
  } else if (!validators.phone(data.phone)) {
    errors.push({ field: 'phone', message: 'Por favor ingresa un teléfono válido' })
  }

  if (!validators.required(data.email)) {
    errors.push({ field: 'email', message: 'El email es requerido' })
  } else if (!validators.email(data.email)) {
    errors.push({ field: 'email', message: 'Por favor ingresa un email válido' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validador para Reports & Open Houses Form
export function validateReportsOpenHousesForm(data: {
  selectedRepairs: string
  selectedMarketingTool: string
  selectedConcern: string
  name: string
  email: string
  whatsapp: string
}): ValidationResult {
  const errors: ValidationError[] = []

  if (!validators.required(data.selectedRepairs)) {
    errors.push({ field: 'selectedRepairs', message: 'Por favor selecciona una opción' })
  }

  if (!validators.required(data.selectedMarketingTool)) {
    errors.push({ field: 'selectedMarketingTool', message: 'Por favor selecciona una herramienta de marketing' })
  }

  if (!validators.required(data.selectedConcern)) {
    errors.push({ field: 'selectedConcern', message: 'Por favor selecciona tu mayor preocupación' })
  }

  if (!validators.required(data.name)) {
    errors.push({ field: 'name', message: 'El nombre es requerido' })
  } else if (!validators.name(data.name)) {
    errors.push({ field: 'name', message: 'El nombre debe tener entre 2 y 100 caracteres' })
  }

  if (!validators.required(data.email)) {
    errors.push({ field: 'email', message: 'El email es requerido' })
  } else if (!validators.email(data.email)) {
    errors.push({ field: 'email', message: 'Por favor ingresa un email válido' })
  }

  if (!validators.required(data.whatsapp)) {
    errors.push({ field: 'whatsapp', message: 'El número de WhatsApp es requerido' })
  } else if (!validators.phone(data.whatsapp)) {
    errors.push({ field: 'whatsapp', message: 'Por favor ingresa un número de WhatsApp válido' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validador para CMA Form
export function validateCMAForm(data: {
  address: string
  sellingGoal: string
  propertyCondition: string
  moveTimeline: string
  name: string
  email: string
  phone: string
}): ValidationResult {
  const errors: ValidationError[] = []

  if (!validators.required(data.address)) {
    errors.push({ field: 'address', message: 'La dirección es requerida' })
  } else if (!validators.minLength(data.address, 5)) {
    errors.push({ field: 'address', message: 'La dirección debe tener al menos 5 caracteres' })
  }

  if (!validators.required(data.sellingGoal)) {
    errors.push({ field: 'sellingGoal', message: 'Por favor selecciona tu objetivo de venta' })
  }

  if (!validators.required(data.propertyCondition)) {
    errors.push({ field: 'propertyCondition', message: 'Por favor selecciona la condición de la propiedad' })
  }

  if (!validators.required(data.moveTimeline)) {
    errors.push({ field: 'moveTimeline', message: 'Por favor selecciona tu timeline de mudanza' })
  }

  if (!validators.required(data.name)) {
    errors.push({ field: 'name', message: 'El nombre es requerido' })
  } else if (!validators.name(data.name)) {
    errors.push({ field: 'name', message: 'El nombre debe tener entre 2 y 100 caracteres' })
  }

  if (!validators.required(data.email)) {
    errors.push({ field: 'email', message: 'El email es requerido' })
  } else if (!validators.email(data.email)) {
    errors.push({ field: 'email', message: 'Por favor ingresa un email válido' })
  }

  if (!validators.required(data.phone)) {
    errors.push({ field: 'phone', message: 'El teléfono es requerido' })
  } else if (!validators.phone(data.phone)) {
    errors.push({ field: 'phone', message: 'Por favor ingresa un teléfono válido' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validador para Realtor Latino Utah Form
export function validateRealtorLatinoUtahForm(data: {
  name: string
  email: string
  phone: string
  address: string
}): ValidationResult {
  const errors: ValidationError[] = []

  if (!validators.required(data.name)) {
    errors.push({ field: 'name', message: 'El nombre es requerido' })
  } else if (!validators.name(data.name)) {
    errors.push({ field: 'name', message: 'El nombre debe tener entre 2 y 100 caracteres' })
  }

  if (!validators.required(data.email)) {
    errors.push({ field: 'email', message: 'El email es requerido' })
  } else if (!validators.email(data.email)) {
    errors.push({ field: 'email', message: 'Por favor ingresa un email válido' })
  }

  if (!validators.required(data.phone)) {
    errors.push({ field: 'phone', message: 'El teléfono es requerido' })
  } else if (!validators.phone(data.phone)) {
    errors.push({ field: 'phone', message: 'Por favor ingresa un teléfono válido' })
  }

  if (!validators.required(data.address)) {
    errors.push({ field: 'address', message: 'La dirección es requerida' })
  } else if (!validators.minLength(data.address, 5)) {
    errors.push({ field: 'address', message: 'La dirección debe tener al menos 5 caracteres' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
