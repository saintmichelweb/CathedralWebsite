import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Divider,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'

import type { NavAccordion } from '../../../types/navItems'
import TooltipShell from './TooltipShell'

interface SidebarNavAccordionProps {
  navAccordion: NavAccordion
}

const SidebarNavAccordion = ({
  navAccordion: { name, label, icon, subNavItems },
}: SidebarNavAccordionProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <Menu autoSelect={false} offset={[70, -40]}>
      <TooltipShell label={name} isOpen={tooltipOpen}>
        <MenuButton
          _hover={{ bg: 'secondary', color: 'white' }}
          onClick={() => setTooltipOpen(false)}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          p='0'
          aria-label={label}
          h='10'
          w='10'
          display='flex'
          alignItems='center'
          justifyContent='center'
          bg={
            subNavItems.some(subNavItem => location.pathname.includes(subNavItem.to))
              ? 'secondary'
              : 'transparent'
          }
          fontSize='20px'
          color={
            subNavItems.some(subNavItem => location.pathname.includes(subNavItem.to))
              ? 'white'
              : 'primary'
          }
          rounded='md'
        >
          <Icon as={icon} mt={1.5} />
        </MenuButton>
      </TooltipShell>
      <MenuList minW='0' w={'8rem'} p={0}>
        {subNavItems.map(({ name, shortName, to }, index) => {
          const hasDivider = index < subNavItems.length - 1
          return (
            <Stack key={index} gap={0}>
              <MenuItem px={0} _focus={{ bg: 'transparent' }} borderRadius={8}>
                <TooltipShell key={name} label={name}>
                  <Link
                    as={NavLink}
                    to={to}
                    w='100%'
                    py='1'
                    px={2}
                    bg={location.pathname.includes(to) ? 'secondary' : 'transparent'}
                    textColor={location.pathname.includes(to) ? 'white' : ''}
                    textAlign='left'
                    fontSize='sm'
                    fontWeight='medium'
                    _hover={{ bg: 'secondary', textColor: 'white' }}
                  >
                    {shortName}
                  </Link>
                </TooltipShell>
              </MenuItem>
              {hasDivider && <Divider />}
            </Stack>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default SidebarNavAccordion
