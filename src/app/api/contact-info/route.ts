import { getContactInfo } from '@/lib/queries/content'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const contactInfo = await getContactInfo()
    
    return NextResponse.json(contactInfo, { status: 200 })
  } catch (error) {
    console.error('[CONTACT_INFO_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    )
  }
}
