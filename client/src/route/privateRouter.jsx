// dependencies
import Layout from "./Layout";
import PrivateGuard from "./PrivateGuard";

// create private router
const privateRouter = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "my-account",
            element: <h2>My account</h2>,
          },
        ],
      },
    ],
  },
];

// export private router
export default privateRouter;
