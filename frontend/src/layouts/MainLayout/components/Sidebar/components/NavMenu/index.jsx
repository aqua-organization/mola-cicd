import "./NavMenu.css";
import NavLink from "./components/NavLink";
import { Home, ShoppingCart, Store } from "lucide-react";

const NavMenu = () => {
  return (
    <ul className="nav-menu">
      <NavLink icon={<Home />} label="Trang chủ" to="/" />
      <NavLink icon={<ShoppingCart />} label="Mua hàng" to="/purchase" />
      <NavLink icon={<Store />} label="Bán hàng" to="/sales" />
    </ul>
  );
};

export default NavMenu;
