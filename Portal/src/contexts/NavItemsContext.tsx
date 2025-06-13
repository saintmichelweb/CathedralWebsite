import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { GiSunPriest } from "react-icons/gi";
import { IoImages, IoTextSharp } from "react-icons/io5";
import { FaHandsHelping, FaUserCircle } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import Cookies from "universal-cookie";
import { CgMoreO } from "react-icons/cg";
import { BiSolidNews } from "react-icons/bi";

import { getUserProfile } from "../api/users";
import { useUserContext } from "./UserContext";
import { PortalUserStatus } from "../../../shared-lib/src";
import { AiFillSchedule } from "react-icons/ai";
import { RiCommunityFill } from "react-icons/ri";

export const NAV_ITEMS = [
  {
    name: "Homepage",
    to: "/home-page",
    label: "Go to home page",
    icon: FaHouse,
  },
  {
    name: "Locations & languages",
    label: "Open portal location & languages management nav menu",
    icon: CgMoreO,
    subNavItems: [
      {
        name: "Locations",
        to: "/locations",
        shortName: "Locations",
      },
      {
        name: "Mass languages",
        to: "/languages",
        shortName: "Mass languages",
      },
    ],
  },
  {
    name: "Schedules",
    label: "Open portal schedules nav menu",
    icon: AiFillSchedule,
    subNavItems: [
      {
        name: "Mass schedule",
        to: "/mass-schedule",
        shortName: "Mass schedule",
      },
      {
        name: "Office hours",
        to: "/OfficeHours",
        shortName: "Offices hours",
      },
    ],
  },
  {
    name: "News and events",
    label: "Open portal news and events nav menu",
    icon: BiSolidNews,
    subNavItems: [
      {
        name: "Recent events",
        to: "/recent-events",
        shortName: "Recent events",
      },
      {
        name: "Top news and notices",
        to: "/top-news-and-notices",
        shortName: "Top news and notices",
      },
    ],
  },
  {
    name: "History & welcome message",
    label: "Open portal history & welcome message nav menu",
    icon: IoTextSharp,
    subNavItems: [
      {
        name: "History, Mission and Vision",
        to: "/parish-history",
        shortName: "History, Mission and Vision",
      },
      {
        name: "Welcome message",
        to: "/welcomeMessage",
        shortName: "Welcome message",
      },
    ],
  },
  {
    name: "Services and actions",
    label: "Open Services and Catholic actions nav menu",
    icon: FaHandsHelping,
    subNavItems: [
      {
        name: "Services",
        to: "/services",
        shortName: "services",
      },
      {
        name: "catholic actions",
        to: "/catholic-actions",
        shortName: "catholic actions",
      },
    ],
  },
  {
    name: "Committees, Commissions &choirs",
    label: "Open Committees, Commissions and choirs nav menu",
    icon: TiGroupOutline,
    subNavItems: [
      {
        name: "parish committee council",
        to: "/parishCommitteeCouncil",
        shortName: "committee council",
      },
      {
        name: "Commissions",
        to: "/commissions",
        shortName: "Commissions",
      },
      {
        name: "Choirs",
        to: "/choirs",
        shortName: "Choirs",
      },
    ],
  },
  {
    name: "communities, Mpuza & miryango remezo",
    label: "Open communities, Mpuza miryango remezo and miryango remezo nav menu",
    icon: RiCommunityFill,
    subNavItems: [
      {
        name: "Communities",
        to: "/communities",
        shortName: "Communities",
      },
      {
        name: "Mpuza Miryango Remezo",
        to: "/mpuza",
        shortName: "Mpuza miryango remezo",
      },
      {
        name: "Miryango remezo",
        to: "/miryangoremezo",
        shortName: "Miryango remezo",
      },
    ],
  },
  {
    name: "Banner images",
    to: "/banner-images",
    label: "Go to banner images",
    icon: IoImages,
  },
  {
    name: "Priests information",
    to: "/priests",
    label: "Go to Priests information",
    icon: GiSunPriest,
  },
  {
    name: "Users Management",
    label: "Go to users management",
    to: "/users",
    icon: FaUserCircle,
  },
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
      setLoggedUser(userProfile.data);
      return;
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
