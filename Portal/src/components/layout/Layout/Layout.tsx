import { Navigate, Outlet } from 'react-router-dom'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Header, Sidebar } from '../../../components/layout'
import Cookies from 'universal-cookie'

const Layout = () => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  if (!token) return <Navigate to='/login' replace />

  return (
    <Stack spacing='0'>
      <Header />

      <Flex h='100vh'>
        <Sidebar />

        <Box
          id='main'
          position='relative'
          as='main'
          ml={{ base: '0', lg: '24' }}
          mt='14'
          w={{ base: 'full', lg: 'calc(100vw - 6rem)' }}
          overflow='scroll'
        >
          <Outlet />
        </Box>
      </Flex>
    </Stack>
  )
}

export default Layout
