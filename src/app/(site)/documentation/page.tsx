import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Featurs | Homely',
}

export default function Page() {
  notFound()
}
