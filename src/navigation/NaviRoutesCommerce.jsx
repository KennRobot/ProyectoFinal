import { createBrowserRouter } from "react-router-dom";
import Home from "../ecommerce/home/pages/Home";
import Products from "../ecommerce/products/pages/Products";
import Prices from "../ecommerce/prices/pages/Prices";
import Orders from "../ecommerce/orders/pages/Orders.jsx";
import Payments from "../ecommerce/payments/pages/Payments";
import Shippings from "../ecommerce/shippings/pages/Shippings";
import Inventories from "../ecommerce/inventories/pages/Inventories.jsx";
//FIC: Share 
import Error from "../share/errors/pages/Errors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "products", // No es necesario incluir un "/" al inicio
        element: <Products />,
      },
      {
        path: "prices", // Lo mismo aquí, el path es relativo al padre
        element: <Prices />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "shippings",
        element: <Shippings />,
      },
      {
        path: "inventories",
        element: <Inventories />,
      },
    ],
  },
]);

export default router;
