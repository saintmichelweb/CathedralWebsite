import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'
// import { TbUserSearch } from 'react-icons/tb'
import { MdOutlineMessage } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { GiSunPriest } from "react-icons/gi";
import { IoImages, IoLocationOutline } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { TbClockHour10 } from "react-icons/tb";
import { MdGroups2 } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import Cookies from 'universal-cookie'

import { getUserProfile } from '../api/users'
import { useUserContext } from './UserContext'
import { PortalUserStatus } from '../../../shared-lib/src'

export const NAV_ITEMS = [
  {
    name: 'Homepage',
    to: '/home-page',
    label: 'Go to home page',
    icon: FaHouse,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Locations',
    to: '/locations',
    label: 'Go to locations',
    icon: IoLocationOutline,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Languages',
    to: '/languages',
    label: 'Go to languages',
    icon: FaLanguage,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Mass Times',
    to: '/mass-times',
    label: 'Go to mass times',
    icon: IoTimeOutline,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Recent Events',
    to: '/recent-events',
    label: 'Go to recent events',
    icon: MdEventNote,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Top News And Notices',
    to: '/top-news-and-notices',
    label: 'Go to top news and notices',
    icon: FaRegNewspaper,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Banner Images',
    to: '/banner-images',
    label: 'Go to banner images',
    icon: IoImages,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Cathedral History, Mission and Vision',
    to: '/parish-history',
    label: 'Go to History, Mission and Vision',
    icon: FaHistory,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Priests',
    to: '/priests',
    label: 'Go to Priests',
    icon: GiSunPriest,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Welcome Message',
    to: '/welcomeMessage',
    label: 'Go to welcome message',
    icon: MdOutlineMessage,
    // permissions: ['View Transactions'],
  },
  {
    name: 'Services',
    to: '/services',
    label: 'Go to services',
    icon: FaServicestack,
    // permissions: ['View Transactions'],
  },
  {
    name: 'parish Committee Council',
    to: '/parishCommitteeCouncil',
    label: 'Go to Parish Committee Council',
    icon: MdGroups2,
    // permissions: ['View Transactions'],
  },
  {
    name: 'commissions',
    to: '/commissions',
    label: 'Go to commissions',
    icon: TiGroupOutline,
    // permissions: ['View Transactions'],
  },
  {
    name: 'OfficeHours',
    to: '/OfficeHours',
    label: 'Go to OfficeHours',
    icon: TbClockHour10,
    // permissions: ['View Transactions'],
  },
  // {
  //   name: 'Portal User Management',
  //   label: 'Open portal user management nav menu',
  //   icon: TbUserSearch,
  //   // permissions: ['View Portal Users'],
  //   subNavItems: [
  //     {
  //       name: 'User Management',
  //       shortName: 'User',
  //       to: '/portal-user-management/user-management',
  //       // permissions: ['View Portal Users'],
  //     },
  //     {
  //       name: 'Role Management',
  //       shortName: 'Role',
  //       to: '/portal-user-management/role-management',
  //       // permissions: ['View Roles'],
  //     },
  //   ],
  // },
]

interface NavItemsContextProps {
  navItems: typeof NAV_ITEMS
  setNavItems: React.Dispatch<React.SetStateAction<typeof NAV_ITEMS>>
}

export const NavItemsContext = createContext<NavItemsContextProps | null>(null)

export const useNavItems = () => {
  const context = useContext(NavItemsContext)

  if (!context) {
    throw new Error('`useNavItems` hook must be called inside `NavItemsProvider`')
  }

  return context
}

const NavItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [navItems, setNavItems] = useState(NAV_ITEMS)
  const cookies = new Cookies()
  const token = cookies.get('token')
  const navigate = useNavigate()
  const { setLoggedUser } = useUserContext()

  const logOutFn = () => {
    cookies.remove('token')
    navigate('/login', { replace: true })
    return
  }

  const fetchUser = () => {
    getUserProfile()
      .then((userProfile) => {
        if (userProfile.data.status === PortalUserStatus.DISABLED) {
          logOutFn()
        }
        console.log('user', userProfile)

        setLoggedUser(userProfile.data)

        // if (userProfile.name === 'Portal Super Admin') {
          return
        // }
        // Remove navigation item from sidebar if the user doesn't have the required permissions

        // const filteredNavItems = NAV_ITEMS.map(navItem => {
        //   // Copy the navItem to avoid mutating the original
        //   const newItem = { ...navItem }

        //   if (newItem.subNavItems) {
        //     newItem.subNavItems = newItem.subNavItems.filter(subNavItem => {
        //       return subNavItem.permissions
        //         ? subNavItem.permissions.some(permission =>
        //             userPermissions.includes(permission)
        //           )
        //         : true
        //     })
        //   }

        //   // Check the main navItem
        //   if (
        //     newItem.permissions &&
        //     !newItem.permissions.some(permission => userPermissions.includes(permission))
        //   ) {
        //     return null // Exclude the main navItem if user lacks permissions
        //   }

        //   return newItem
        // }).filter(item => item !== null) // Remove null items

        // setNavItems(filteredNavItems as typeof NAV_ITEMS)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })
  }

  useEffect(() => {
    if (!token) return

    fetchUser()
  }, [navigate])

  return (
    <NavItemsContext.Provider value={{ navItems, setNavItems }}>
      {children}
    </NavItemsContext.Provider>
  )
}

export default NavItemsProvider
