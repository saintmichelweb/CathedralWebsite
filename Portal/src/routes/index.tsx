// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import { Layout } from '../components/layout'
import {
  // Dashboard,
  ForgotPassword,
  LanguagesManagement,
  LocationsManagement,
  Login,
  MassTimesManagement,
  RecentEventsManagement,
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
        {
          path: 'languages',
          index: true,
          element: <LanguagesManagement />,
        },
        {
          path: 'mass-times',
          index: true,
          element: <MassTimesManagement />,
        },
        {
          path: 'recent-events',
          index: true,
          element: <RecentEventsManagement />,
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
