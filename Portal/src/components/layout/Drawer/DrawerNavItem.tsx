import { NavLink } from 'react-router-dom'
import { Box, Flex, HStack, Icon, Link, type LinkProps } from '@chakra-ui/react'

import type { NavItem } from '../../../types/navItems'
import { useDrawerDisclosure } from '../../../contexts/DrawerDisclosureContext'

interface DrawerNavItemProps extends LinkProps {
  navItem: NavItem
}

const DrawerNavItem = ({ navItem: { name, to, icon }, ...props }: DrawerNavItemProps) => {
  const { onClose } = useDrawerDisclosure()

  return (
    <Link
      as={NavLink}
      to={to}
      onClick={onClose}
      w='full'
      px='3'
      py='2'
      display='flex'
      borderRadius='md'
      bg={
        location.pathname.includes(name.toLowerCase()) ||
        (location.pathname === '/' && name === 'Dashboard')
          ? 'secondary'
          : 'transparent'
      }
      _hover={{ bg: 'secondary' }}
      {...props}
    >
      <HStack>
        {icon && (
          <Flex w='5' justify='center' align='center'>
            <Icon as={icon} color='primary' fontSize='20px'/>
          </Flex>
        )}
        <Box as='span' fontSize='sm' fontWeight='medium' whiteSpace='nowrap' color={location.pathname.includes(name.toLowerCase()) ||
        (location.pathname === '/' && name === 'Dashboard') ?'white':''} _hover={{ color: 'white' }}>
          {name}
        </Box>
      </HStack>
    </Link>
  )
}

export default DrawerNavItem
