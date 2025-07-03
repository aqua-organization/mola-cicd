import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./AuthLayout.css";

const AuthLayout = ({ className = "" }) => {
  return (
    <div className={`auth-layout ${className}`}>
      <div className="auth-layout-container">
        <Outlet />
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  className: PropTypes.string,
};

export default AuthLayout;
