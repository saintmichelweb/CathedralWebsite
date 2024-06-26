import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {
  ChakraProvider,
  createStandaloneToast,
} from '@chakra-ui/react'
import theme from './theme'
import './index.css'
import UserProvider from './contexts/UserContext.tsx'
import NavItemsProvider from './contexts/NavItemsContext.tsx'
import DrawerDisclosureProvider from './contexts/DrawerDisclosureContext.tsx'
const { ToastContainer } = createStandaloneToast(theme)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: { variant: 'subtle', position: 'top', isClosable: true },
        }}
      >
        <UserProvider>
          <NavItemsProvider>
            <DrawerDisclosureProvider>
              <ToastContainer />
              <App />
            </DrawerDisclosureProvider>
          </NavItemsProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
