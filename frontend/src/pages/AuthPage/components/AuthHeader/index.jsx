import { BookOpen } from "lucide-react";
import PropTypes from "prop-types";
import "./AuthHeader.css";

const AuthHeader = ({ subtitle }) => {
  return (
    <div className="auth-header">
      <div className="auth-header-logo-wrapper">
        <BookOpen />
      </div>
      <h1 className="auth-header-title">Mola</h1>
      <p className="auth-header-subtitle">{subtitle}</p>
    </div>
  );
};

AuthHeader.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

export default AuthHeader;
