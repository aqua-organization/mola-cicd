import PropTypes from "prop-types";
import React from "react";
import "./Checkbox.css";

const Checkbox = React.forwardRef(({ label, id, ...props }, ref) => {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="checkbox-container">
      <input ref={ref} type="checkbox" id={checkboxId} {...props} />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default Checkbox;
