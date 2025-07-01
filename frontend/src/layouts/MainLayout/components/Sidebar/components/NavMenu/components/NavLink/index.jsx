import "./NavLink.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useActive } from "../../../../hooks/useActive";

const NavLink = ({ icon, label, to }) => {
  const isActive = useActive(to);
  return (
    <li className={`nav-link ${isActive ? "active" : ""}`}>
      <Link to={to}>
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

NavLink.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default NavLink;
