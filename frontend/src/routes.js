import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";

import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------
import PrivateRoute from "src/authentication/PrivateRoute";
import AdminRoute from "src/authentication/AdminRoute";
import Profile from "src/pages/Profile";
import Inspection from "src/pages/Inspection";

import Incident from "./pages/Incident";
import IncidentHome from "./pages/IncidentHome";
import IncidentOverview from "./pages/IncidentOverview";
import InspectionHome from "./pages/InspectionHome";

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "app",
          element: (
            <PrivateRoute>
              <Inspection />
            </PrivateRoute>
          ),
        },
        {
          path: "incident",
          element: (
            <PrivateRoute>
              <Incident />
            </PrivateRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },

        {
          path: "incident_home",
          element: (
            <PrivateRoute>
              <IncidentHome />
            </PrivateRoute>
          ),
        },
        {
          path: "inspection_home",
          element: (
            <PrivateRoute>
              <InspectionHome />
            </PrivateRoute>
          ),
        },
        {
          path: "incident_overview",
          element: (
            <PrivateRoute>
              <IncidentOverview />
            </PrivateRoute>
          ),
        },
        // {
        //   path: "member_board",
        //   element: (
        //     <PrivateRoute>
        //       <MemberBoard />
        //     </PrivateRoute>
        //   ),
        // },
        // {
        //   path: "admin_professionals",
        //   element: (
        //     <AdminRoute>
        //       <AdminProfessionals />
        //     </AdminRoute>
        //   ),
        // },
        // {
        //   path: "admin_events",
        //   element: (
        //     <AdminRoute>
        //       <AdminEvents />
        //     </AdminRoute>
        //   ),
        // },
      ],
    },
    {
      path: "/",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot_pass", element: <ForgotPass /> },
        { path: "404", element: <NotFound /> },
        { path: "400", element: <NotFound /> }, // bad request
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
