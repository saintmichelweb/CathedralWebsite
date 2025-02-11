import { createBrowserRouter } from "react-router-dom";
import { HomePage, ServicePage, CatholicActionsPage,ChoralDetailPage, LayLeadersPage, PriestPage, CommunityDetailsPage, AnnouncementsPage, ContactPage, ChoralsPage, CommunityPage } from "../pages";
import { LandingPagesLayout } from "../layouts/LandingPagesLayout";
import { AboutPage } from "../pages";
import { NotFoundPage } from "../pages";
import { CommissionPage } from "../pages/aboutPages/CommissionPage";
import { ChoralDetailPages } from "../components/aboutComponents";
import { CatholicActionsDetailsPage } from "../pages/aboutPages/CatholicAtionsDetailsPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPagesLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'chorals', element: <ChoralsPage /> },
            { path: 'chorals/:id', element: <ChoralDetailPages /> },
            { path: 'catholicAction', element: <CatholicActionsPage /> },
            { path: 'catholicActionDetails/:id', element: <CatholicActionsDetailsPage /> },
            { path: 'community', element: <CommunityPage /> },
            { path: '/community/:id', element: <CommunityDetailsPage /> },
            { path: 'layLeader', element: <LayLeadersPage /> },
            { path: 'commissionPage/:id', element: <CommissionPage /> },
            { path: 'chorals/:id', element: <ChoralDetailPage /> },
            { path: 'priest', element: <PriestPage /> },
            { path: 'service', element: <ServicePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'announcements', element: <AnnouncementsPage /> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])
