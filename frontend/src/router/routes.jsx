import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import AuthLayout from "../layouts/AuthLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/purchase", element: <PurchasePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <RegisterPage /> },
    ],
  },
];

export default routes;
