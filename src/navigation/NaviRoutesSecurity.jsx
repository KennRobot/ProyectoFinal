import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Labels from "../security/labels/pages/Labels";
import Institutes from "../security/institutes/pages/Institute";
import Users from "../security/users/pages/Users";
import Periods from "../security/periods/pages/Periods";
//FIC: Share
import Error from "../share/errors/pages/Errors";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/labels",
          element: <Labels />,
        },
        {
          path: "/institutes",
          element: <Institutes />,
        },
        {
            path: "/users",
            element: <Users />,
        },
        {
            path: "/periods",
            element: <Periods />,
        },
      ], 
    },
  ]);
  export default router;