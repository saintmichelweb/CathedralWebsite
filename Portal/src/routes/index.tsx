// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import { Layout } from '../components/layout'
import {
  // Dashboard,
  ForgotPassword,
  LocationsManagement,
  Login,
  // SetPassword,
} from '../pages'
import AddNewUser from '../pages/AddNewUser/AddNewUser'
import UpdateHomePage from '../pages/UpdateHomePage/updateHomePage'

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
        {
          path: 'home-page',
          index: true,
          element: <UpdateHomePage />,
        },
        {
          path: 'locations',
          index: true,
          element: <LocationsManagement />,
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
