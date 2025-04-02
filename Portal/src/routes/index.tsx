// import { useState } from 'react'
import { useRoutes } from "react-router-dom";

import { Layout } from "../components/layout";
import {
  BannerImagesManagement,
  ChoirsManagement,
  CommissionManagement,
  // Dashboard,
  ForgotPassword,
  LanguagesManagement,
  LocationsManagement,
  Login,
  MassTimesManagement,
  OfficeTimesManagement,
  ParishCommitteeCouncilManagement,
  ParishHistoryManagement,
  PriestsManagement,
  RecentEventsManagement,
  ServicesManagement,
  TopNewsAndNoticesManagement,
  WelcomeMessageManagement,
  SetPassword,
  UsersManagement,
  Actions,
} from "../pages";
import UpdateHomePage from "../pages/UpdateHomePage/updateHomePage";

const Routes = () => {
  // const [isLoading, setIsLoading] = useState(false)

  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Oops! something went wrong</div>,
      children: [
        {
          index: true,
          element: <UpdateHomePage />,
        },
        {
          path: "home-page",
          index: true,
          element: <UpdateHomePage />,
        },
        {
          path: "locations",
          index: true,
          element: <LocationsManagement />,
        },
        {
          path: "languages",
          index: true,
          element: <LanguagesManagement />,
        },
        {
          path: "mass-schedule",
          index: true,
          element: <MassTimesManagement />,
        },
        {
          path: "recent-events",
          index: true,
          element: <RecentEventsManagement />,
        },
        {
          path: "top-news-and-notices",
          index: true,
          element: <TopNewsAndNoticesManagement />,
        },
        {
          path: "banner-images",
          index: true,
          element: <BannerImagesManagement />,
        },
        {
          path: "parish-history",
          index: true,
          element: <ParishHistoryManagement />,
        },
        {
          path: "priests",
          index: true,
          element: <PriestsManagement />,
        },
        {
          path: "welcomeMessage",
          index: true,
          element: <WelcomeMessageManagement />,
        },
        {
          path: "Services",
          index: true,
          element: <ServicesManagement />,
        },
        {
          path: "parishCommitteeCouncil",
          index: true,
          element: <ParishCommitteeCouncilManagement />,
        },
        {
          path: "commissions",
          index: true,
          element: <CommissionManagement />,
        },
        {
          path: "OfficeHours",
          index: true,
          element: <OfficeTimesManagement />,
        },
        {
          path: "choirs",
          index: true,
          element: <ChoirsManagement />,
        },
        {
          path: " UsersManagement",
          index: true,
          element: <UsersManagement />,
        },

        {
          path: "actions",
          index: true,
          element: <Actions onClose={function (): void {
            throw new Error("Function not implemented.");
          } } fetchActions={function (): void {
            throw new Error("Function not implemented.");
          } } action={undefined}/>
        },
    {
      path: "/login",
      element: <Login />,
      caseSensitive: true,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      caseSensitive: true,
    },
    {
      path: `/set-password`,
      element: <SetPassword />,
      caseSensitive: true,
    },
  ]);
  // if (isLoading) {
  //   return <div></div>
  // }
  return element;
};

export default Routes;
