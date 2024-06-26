import { NavLink } from 'react-router-dom'
import { Icon, Link } from '@chakra-ui/react'

import type { NavItem } from '../../../types/navItems'
import TooltipShell from './TooltipShell'

interface SidebarNavItemProps {
  navItem: NavItem
}

const SidebarNavItem = ({ navItem: { name, to, label, icon } }: SidebarNavItemProps) => {

  return (
    <TooltipShell key={name} label={name}>
      <Link
        as={NavLink}
        to={to}
        p='0'
        aria-label={label}
        h='10'
        w='10'
        display='flex'
        alignItems='center'
        justifyContent='center'
        bg={
          location.pathname.includes(name.toLowerCase()) ||
          (location.pathname === '/' && name === 'Dashboard')
            ? 'secondary'
            : 'transparent'
        }
        fontSize='20px'
        color={
          location.pathname.includes(name.toLowerCase()) ||
          (location.pathname === '/' && name === 'Dashboard')
            ? 'white'
            : 'primary'
        }
        _hover={{ bg: 'secondary', color: 'white' }}
        rounded='md'
      >
        <Icon as={icon} />
      </Link>
    </TooltipShell>
  )
}

export default SidebarNavItem
