import PropTypes from "prop-types";
import React from "react";
import Input from "../ui/Input";
import "./FormField.css";

const FormField = React.forwardRef(
  ({ label, error, icon, className = "", ...inputProps }, ref) => {
    return (
      <div className={`form-field ${className}`}>
        <label htmlFor={inputProps.id} className="form-field-label">
          {label}
        </label>
        <Input ref={ref} icon={icon} {...inputProps} />
        {error && <p className="form-field-error">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default FormField;
