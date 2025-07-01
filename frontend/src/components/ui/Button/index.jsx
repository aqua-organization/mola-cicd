import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type,
  size = "medium",
  variant = "contained",
  buttonType = "button",
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`${buttonType} button-${variant} button-${size}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  buttonType: PropTypes.string,
  loading: PropTypes.bool,
};

export default Button;
