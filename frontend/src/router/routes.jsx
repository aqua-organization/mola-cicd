import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
];

export default routes;
