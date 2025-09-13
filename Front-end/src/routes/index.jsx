import { createBrowserRouter } from 'react-router-dom'
import {MainLayout} from '../layouts/'
import { HomePage, AboutPage, ContactPage,ServicePage, ChoralDetails,Chorals, NotFoundPage, CatholicAction, CommunityPage, ParishCommitteePage, MassSchedulePage, SacramentsPage, ServicesListPage, ServicesOfficePage } from '../pages/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,   
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/service', element: <ServicePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/about/our-chorals', element: <Chorals/> },
      { path: '/about/catholic-actions', element: <CatholicAction/> },
      { path: '/chorals/:id', element: <ChoralDetails/> },
      { path: '/about/community', element: <CommunityPage/> },
      { path: '/about/parish-committee', element: <ParishCommitteePage/> },
      { path: '/services/mass-schedule', element: <MassSchedulePage/> },
      {path: '/services/sacraments',element:<SacramentsPage/>},
      {path: '/services/parish-office',element:<ServicesListPage/>},
      {path: '/services/parish-office/:id',element:<ServicesOfficePage/>},
      { path: '*', element: <NotFoundPage/>}
    ]
  }
])
