// dependencies
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage"
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import DonorRegister from "../pages/auth/DonorRegister";
import PublicGuard from "./PublicGuard";

// create public route
const publicRouter = [
  {
    element: <PublicGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <h1>Home</h1>,
          },
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/donor-register",
            element: <DonorRegister />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />
          }
        ],
      },
    ]
  }
];


// export publicRouter 
export default publicRouter;
