import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Icon } from '@iconify/react'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname()
  const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const hasSubmenu = item.submenu && item.submenu.length > 0

  const linkclasses = clsx(
    'py-2 text-lg sm:text-2xl font-medium text-white/80 rounded-xl tracking-tight transition-colors duration-200 group-hover:text-white',
    {
      '!text-white': item.href === path,
      'text-white': path.startsWith(itemLabelToPath),
    }
  )

  const liststyle = clsx(
    'w-0 h-0.5 bg-primary transition-all duration-300',
    {
      '!block w-6 mr-4': item.href === path,
      'block w-6': path.startsWith(itemLabelToPath),
      'group-hover:block group-hover:w-6 group-hover:mr-4': true,
    }
  )

  return (
    <li className='flex flex-col w-full'>
      <div className='flex items-center group w-fit'>
        <div className={liststyle} />
        <div className='flex items-center gap-2'>
          <Link href={item.href} className={linkclasses} onClick={onClick}>
            {item.label}
          </Link>
          {hasSubmenu && (
            <button
              onClick={() => setSubmenuOpen(!submenuOpen)}
              className='text-white/80 hover:text-white transition-colors'
              aria-label='Toggle submenu'
            >
              <Icon 
                icon='ph:caret-down' 
                width={16} 
                height={16}
                className={`transition-transform ${submenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
      </div>
      {hasSubmenu && submenuOpen && (
        <ul className='ml-6 mt-2 space-y-2 border-l border-white/20 pl-4'>
          {item.submenu?.map((subitem, subindex) => (
            <li key={subindex}>
              <Link 
                href={subitem.href}
                className={`text-base sm:text-lg font-medium text-white/70 hover:text-white transition-colors ${
                  path === subitem.href ? 'text-primary font-semibold' : ''
                }`}
                onClick={onClick}
              >
                {subitem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default NavLink
