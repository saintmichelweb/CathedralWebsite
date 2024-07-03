import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { AiOutlineAudit } from 'react-icons/ai'
// import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { MdDashboard, MdHub } from 'react-icons/md'
// import { RiGitPullRequestFill, RiShieldUserLine } from 'react-icons/ri'
import { TbFileText, TbUserSearch } from 'react-icons/tb'
import Cookies from 'universal-cookie'

import { getUserProfile } from '../api/users'
import { useUserContext } from './UserContext'

export const NAV_ITEMS = [
  {
    name: 'Dashboard',
    to: '/',
    label: 'Go to dashboard page',
    icon: MdDashboard,
    permissions: ['View Transactions'],
  },
  // {
  //   name: 'Transactions',
  //   to: '/transactions',
  //   label: 'Go to transactions page',
  //   icon: FaMoneyBillTrendUp,
  //   permissions: ['View Transactions'],
  // },
  // {
  //   name: 'Reconciliations',
  //   to: '/reconciliations',
  //   label: 'Go to the reconciliations page',
  //   icon: RiGitPullRequestFill,
  //   permissions: ['View Reconcilitions'],
  // },
  // {
  //   name: 'DFSP',
  //   to: '/dfsp',
  //   label: 'go to dfsp list page',
  //   icon: RiShieldUserLine,
  //   permissions: ['View DFSPs'],
  // },
  // {
  //   name: 'Merchant Records',
  //   label: 'Open merchant records nav menu',
  //   icon: TbFileText,
  //   permissions: ['View Merchants'],
  //   subNavItems: [
  //     {
  //       name: 'All Merchant Records',
  //       shortName: 'All',
  //       to: '/merchant-records/all-merchant-records',
  //       permissions: ['View Merchants'],
  //     },
  //     {
  //       name: 'Pending Merchant Records',
  //       shortName: 'Pending',
  //       to: '/merchant-records/pending-merchant-records',
  //       permissions: ['View Merchants'],
  //     },
  //     {
  //       name: 'Approved Merchant Records',
  //       shortName: 'Approved',
  //       to: '/merchant-records/alias-generated-merchant-records',
  //       permissions: ['View Merchants'],
  //     },
  //     {
  //       name: 'Batch file logs',
  //       shortName: 'Batch file logs',
  //       to: '/merchant-records/batch-logs',
  //       permissions: ['View Merchants'],
  //     },
  //   ],
  // },
  {
    name: 'Portal User Management',
    label: 'Open portal user management nav menu',
    icon: TbUserSearch,
    permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: 'User Management',
        shortName: 'User',
        to: '/portal-user-management/user-management',
        permissions: ['View Portal Users'],
      },
      {
        name: 'Role Management',
        shortName: 'Role',
        to: '/portal-user-management/role-management',
        permissions: ['View Roles'],
      },
    ],
  },
  // {
  //   name: 'Audit-Log',
  //   to: '/audit-log',
  //   label: 'Go to audit log page',
  //   icon: AiOutlineAudit,
  //   permissions: ['View Audit Logs'],
  // },
  // {
  //   name: 'HUB',
  //   label: 'Open merchant records nav menu',
  //   icon: MdHub,
  //   permissions: ['Create Hub Admin'],
  //   subNavItems: [
  //     {
  //       name: 'Hub Currencies',
  //       shortName: 'Currencies',
  //       to: '/hub/currencies',
  //       permissions: ['Create Hub Admin'],
  //     },
  //     {
  //       name: 'Oracles',
  //       shortName: 'Oracles',
  //       to: '/hub/oracles',
  //       permissions: ['Create Hub Admin'],
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
      .then(userProfile => {
        if (userProfile.status === 'Disabled') {
          logOutFn()
        }

        setLoggedUser(userProfile)

        if (userProfile.name === 'Hub Super Admin') {
          return
        }
        // Remove navigation item from sidebar if the user doesn't have the required permissions
        const userPermissions = userProfile?.role?.permissions || []

        const filteredNavItems = NAV_ITEMS.map(navItem => {
          // Copy the navItem to avoid mutating the original
          const newItem = { ...navItem }

          if (newItem.subNavItems) {
            newItem.subNavItems = newItem.subNavItems.filter(subNavItem => {
              return subNavItem.permissions
                ? subNavItem.permissions.some(permission =>
                    userPermissions.includes(permission)
                  )
                : true
            })
          }

          // Check the main navItem
          if (
            newItem.permissions &&
            !newItem.permissions.some(permission => userPermissions.includes(permission))
          ) {
            return null // Exclude the main navItem if user lacks permissions
          }

          return newItem
        }).filter(item => item !== null) // Remove null items

        setNavItems(filteredNavItems as typeof NAV_ITEMS)
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
