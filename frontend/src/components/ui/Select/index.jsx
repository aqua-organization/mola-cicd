import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Select.css";

const Select = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Chọn...",
  disabled = false,
  searchable = false,
  clearable = false,
  className = "",
  style = {},
  renderOption = null,
  renderValue = null,
  maxHeight = "200px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions =
    searchable && searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  // Find selected option
  const selectedOption = options.find((option) => option.value === value);

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option.value, option);
    setIsOpen(false);
    setSearchQuery("");
  };

  // Handle clear
  const handleClear = (e) => {
    e.stopPropagation();
    onChange("", null);
  };

  // Handle toggle dropdown
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (searchable && !isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  // Render display value
  const renderDisplayValue = () => {
    if (renderValue && selectedOption) {
      return renderValue(selectedOption);
    }
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div
      className={`select-container ${className} ${
        disabled ? "select-disabled" : ""
      } ${isOpen ? "select-open" : ""}`}
      style={style}
      ref={selectRef}
    >
      <div className="select-trigger" onClick={handleToggle}>
        <div className="select-value">{renderDisplayValue()}</div>

        <div className="select-actions">
          {clearable && selectedOption && (
            <button
              className="select-clear"
              onClick={handleClear}
              type="button"
            >
              ✕
            </button>
          )}
          <div className={`select-arrow ${isOpen ? "select-arrow-up" : ""}`}>
            ▼
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="select-dropdown" style={{ maxHeight }}>
          {searchable && (
            <div className="select-search">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="select-search-input"
              />
            </div>
          )}

          <div className="select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value || index}
                  className={`select-option ${
                    option.value === value ? "select-option-selected" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {renderOption ? renderOption(option) : option.label}
                </div>
              ))
            ) : (
              <div className="select-no-options">Không có lựa chọn nào</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  clearable: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  renderOption: PropTypes.func,
  renderValue: PropTypes.func,
  maxHeight: PropTypes.string,
};

export default Select;
