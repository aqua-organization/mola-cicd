import { useLocation } from "react-router-dom";

export const useActive = (path) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === path;
  return isActive;
};
