// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import { Layout } from '../components/layout'
import {
  // Dashboard,
  ForgotPassword,
  Login,
  // SetPassword,
} from '../pages'
import AddNewUser from '../pages/AddNewUser/AddNewUser'

const Routes = () => {
  // const [isLoading, setIsLoading] = useState(false)

  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      errorElement: <div>Oops! something went wrong</div>,
      children: [
        {
          index: true,
          element: <AddNewUser />,
        },
      ]
    },
    {
      path: '/login',
      element: <Login />,
      caseSensitive: true,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
      caseSensitive: true,
    },
    // {
    //   path: `/set-password`,
    //   element: <SetPassword />,
    //   caseSensitive: true,
    // },
    
  ])
  // if (isLoading) {
  //   return <div></div>
  // }
  return element
}

export default Routes
