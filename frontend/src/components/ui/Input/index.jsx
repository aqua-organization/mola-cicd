import PropTypes from "prop-types";
import React from "react";
import "./Input.css";

const Input = React.forwardRef(
  ({ type, placeholder, value, onChange, icon, ...props }, ref) => {
    return (
      <div className="input-container">
        <div className="input-container-input-wrapper">
          {icon && <div className="input-container-icon-wrapper">{icon}</div>}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.node,
};

export default Input;
