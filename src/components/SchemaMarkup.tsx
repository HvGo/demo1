/* eslint-disable react-hooks/rules-of-hooks */
interface SchemaMarkupProps {
  schema?: Record<string, any> | null
}

/**
 * Componente para inyectar Schema Markup en el <head>
 * Debe ser usado en un Server Component
 */
export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  if (!schema || Object.keys(schema).length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}

export default SchemaMarkup
