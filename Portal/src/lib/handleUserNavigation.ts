/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserProfile } from '@/api/users';
import { NAV_ITEMS } from '@/contexts/NavItemsContext';
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export async function handleUserNavigation(setLoggedUser:any, setNavItems: any, queryClient: any, navigate: any) {

  const logOutFn = () => {
    queryClient.removeQueries()
    cookies.remove('token')
    navigate('/login', { replace: true })
    return
  }
    
    getUserProfile().then(userProfile => {
      if (userProfile.status === 'Disabled') {
        logOutFn()
      }

      setLoggedUser(userProfile)
      
      if (userProfile.name === 'Portal Super Admin') {
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


  