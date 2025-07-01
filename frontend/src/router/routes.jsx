import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/purchase", element: <PurchasePage /> },
    ],
  },
];

export default routes;
