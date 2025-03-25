import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { GiSunPriest } from "react-icons/gi";
import { IoImages, IoTextSharp } from "react-icons/io5";
import { FaHandsHelping, FaUserCircle } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { MdGroups2 } from "react-icons/md";
import { BsMusicNoteList } from "react-icons/bs";
import Cookies from "universal-cookie";
import { CgMoreO } from "react-icons/cg";
import { BiSolidNews } from "react-icons/bi";

import { getUserProfile } from "../api/users";
import { useUserContext } from "./UserContext";
import { PortalUserStatus } from "../../../shared-lib/src";
import { AiFillSchedule } from "react-icons/ai";

export const NAV_ITEMS = [
  {
    name: "Homepage",
    to: "/home-page",
    label: "Go to home page",
    icon: FaHouse,
    // permissions: ['View Transactions'],
  },
  {
    name: "Locations & languages",
    label: "Open portal location & languages management nav menu",
    icon: CgMoreO,
    // permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: "Locations",
        to: "/locations",
        shortName: "Locations",
        // icon: IoTimeOutline,
        // permissions: ['View Transactions'],
      },
      {
        name: "Mass languages",
        to: "/languages",
        shortName: "Mass languages",
        // icon: FaLanguage,
        // permissions: ['View Transactions'],
      },
    ],
  },
  {
    name: "Schedules",
    label: "Open portal schedules nav menu",
    icon: AiFillSchedule,
    // permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: "Mass schedule",
        to: "/mass-schedule",
        shortName: "Mass schedule",
        // icon: IoTimeOutline,
        // permissions: ['View Transactions'],
      },
      {
        name: "Office hours",
        to: "/OfficeHours",
        shortName: "Offices hours",
        // icon: FaLanguage,
        // permissions: ['View Transactions'],
      },
    ],
  },
  {
    name: "News and events",
    label: "Open portal news and events nav menu",
    icon: BiSolidNews,
    // permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: "Recent events",
        to: "/recent-events",
        shortName: "Recent events",
        // icon: IoTimeOutline,
        // permissions: ['View Transactions'],
      },
      {
        name: "Top news and notices",
        to: "/top-news-and-notices",
        shortName: "Top news and notices",
        // icon: FaLanguage,
        // permissions: ['View Transactions'],
      },
    ],
  },
  {
    name: "Banner images",
    to: "/banner-images",
    label: "Go to banner images",
    icon: IoImages,
    // permissions: ['View Transactions'],
  },
  {
    name: "History & welcome message",
    label: "Open portal history & welcome message nav menu",
    icon: IoTextSharp,
    // permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: "History, Mission and Vision",
        to: "/parish-history",
        shortName: "History, Mission and Vision",
        // icon: IoTimeOutline,
        // permissions: ['View Transactions'],
      },
      {
        name: "Welcome message",
        to: "/welcomeMessage",
        shortName: "Welcome message",
        // icon: FaLanguage,
        // permissions: ['View Transactions'],
      },
    ],
  },
  {
    name: "Priests information",
    to: "/priests",
    label: "Go to Priests information",
    icon: GiSunPriest,
    // permissions: ['View Transactions'],
  },
  {
    name: "Services",
    to: "/services",
    label: "Go to services",
    icon: FaHandsHelping,
    // permissions: ['View Transactions'],
  },
  {
    name: "Commissions and Committees",
    label: "Open Commissions and Committees nav menu",
    icon: TiGroupOutline,
    // permissions: ['View Portal Users'],
    subNavItems: [
      {
        name: "parish committee council",
    to: "/parishCommitteeCouncil",
        shortName: "committee council",
        // icon: IoTimeOutline,
        // permissions: ['View Transactions'],
      },
      {
        name: "Commissions",
    to: "/commissions",
        shortName: "Commissions",
        // icon: FaLanguage,
        // permissions: ['View Transactions'],
      },
    ],
  },
  {
    name: "Choirs",
    to: "/choirs",
    label: "Go to choirs",
    icon: BsMusicNoteList,
    // permissions: ['View Transactions'],
  },
  {
    name: "Users Management",
    label: "Go to users management",
    to: "/users",
    icon: FaUserCircle ,
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
];

interface NavItemsContextProps {
  navItems: typeof NAV_ITEMS;
  setNavItems: React.Dispatch<React.SetStateAction<typeof NAV_ITEMS>>;
}

export const NavItemsContext = createContext<NavItemsContextProps | null>(null);

export const useNavItems = () => {
  const context = useContext(NavItemsContext);

  if (!context) {
    throw new Error(
      "`useNavItems` hook must be called inside `NavItemsProvider`"
    );
  }

  return context;
};

const NavItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [navItems, setNavItems] = useState(NAV_ITEMS);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const { setLoggedUser } = useUserContext();

  const logOutFn = () => {
    cookies.remove("token");
    navigate("/login", { replace: true });
    return;
  };

  const fetchUser = () => {
    getUserProfile().then((userProfile) => {
      if (userProfile.data.status === PortalUserStatus.DISABLED) {
        logOutFn();
      }
      console.log("user", userProfile);

      setLoggedUser(userProfile.data);

      // if (userProfile.name === 'Portal Super Admin') {
      return;
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
    });
  };

  useEffect(() => {
    if (!token) return;

    fetchUser();
  }, [navigate]);

  return (
    <NavItemsContext.Provider value={{ navItems, setNavItems }}>
      {children}
    </NavItemsContext.Provider>
  );
};

export default NavItemsProvider;
