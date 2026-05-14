import { NavLinks } from '@/types/navlink'

export const navLinks: NavLinks[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'For Buyers', 
    href: '/buyers',
    submenu: [
      { label: 'Find Properties', href: '/buscar_casas_utah' },
      { label: 'Buying Guide', href: '/buyers/guide' },
      { label: 'Mortgage Calculator', href: '/buyers/calculator' },
      { label: 'FAQ', href: '/buyers/faq' }
    ]
  },
  { label: 'For Sellers', href: '/sellers' },
  { label: 'About Us', href: '/about' },
  { label: 'Properties', href: '/buscar_casas_utah' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contactus' },
]
