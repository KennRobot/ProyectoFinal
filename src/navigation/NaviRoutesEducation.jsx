import { createBrowserRouter } from "react-router-dom";
import Home from "../education/home/pages/Home";
import Courses from "../education/courses/pages/Course";
import Groups from "../education/groups/pages/Groups";
//FIC: Share
import Error from "../share/errors/pages/Errors";
const router = createBrowserRouter([  
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
      ], 
    },
   /*{
      path: "/courses", 
      element: <Courses />, 
    },
    {
      path: "/groups", 
      element: <Groups />, 
    },*/
  ]);
  export default router;