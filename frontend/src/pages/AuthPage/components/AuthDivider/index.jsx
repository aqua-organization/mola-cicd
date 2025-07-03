import PropTypes from "prop-types";
import "./AuthDivider.css";

const AuthDivider = ({ text = "Hoặc" }) => {
  return (
    <div className="auth-divider">
      <div className="auth-divider-line"></div>
      <p className="auth-divider-text">{text}</p>
      <div className="auth-divider-line"></div>
    </div>
  );
};

AuthDivider.propTypes = {
  text: PropTypes.string,
};

export default AuthDivider;
