import { createBrowserRouter } from "react-router-dom";
import { Chorals, HomePage, ServicePage, CatholicActionsPage, LayLeadersPage } from "../pages";
import { LandingPagesLayout } from "../layouts/LandingPagesLayout";
import { AboutPage } from "../pages";
import { NotFoundPage } from "../pages";
import { CommissionPage } from "../pages/aboutPages/CommissionPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPagesLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'chorals', element: <Chorals /> },
            { path: 'catholicAction', element: <CatholicActionsPage /> },
            { path: 'layLeader', element: <LayLeadersPage /> },
            { path: 'commissionPage/:id', element: <CommissionPage /> },
            { path: 'service', element: <ServicePage /> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])
