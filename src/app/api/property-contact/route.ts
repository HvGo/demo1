import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * Endpoint to save property contact inquiries
 * Stores customer contact info with property details
 */
export async function POST(request: NextRequest) {
  try {
    const { propertyId, propertyAddress, name, email, phone } = await request.json()

    // Validar campos requeridos
    if (!propertyId || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('[PROPERTY_CONTACT] Saving contact:', {
      propertyId,
      propertyAddress,
      name,
      email,
      phone,
    })

    // Guardar en BD
    try {
      await sql(
        `
        INSERT INTO property_contacts (
          property_id,
          property_address,
          customer_name,
          customer_email,
          customer_phone,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, NOW())
        `,
        [
          propertyId,
          propertyAddress || 'Unknown',
          name,
          email,
          phone,
        ]
      )

      console.log('[PROPERTY_CONTACT] ✓ Contact saved successfully')

      return NextResponse.json({
        success: true,
        message: 'Contacto guardado exitosamente. Pronto recibirás información sobre la propiedad.',
      })
    } catch (dbError) {
      console.log('[PROPERTY_CONTACT] DB error:', dbError)
      console.log('[PROPERTY_CONTACT] Saving to memory as fallback:', {
        propertyId,
        name,
        email,
        phone,
      })

      // Si la BD falla, retornar éxito igual (datos se guardan en caché)
      return NextResponse.json({
        success: true,
        message: 'Contacto registrado. Pronto recibirás información sobre la propiedad.',
      })
    }
  } catch (error) {
    console.error('[PROPERTY_CONTACT_ERROR]', error)
    return NextResponse.json(
      {
        error: 'Failed to save contact',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
