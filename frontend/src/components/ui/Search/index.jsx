import { Search as SearchIcon } from "lucide-react";
import "./search.css";
import PropTypes from "prop-types";
import useSearch from "./hooks/useSearch";

const Search = ({
  onChange,
  onSearch,
  fetchResults,
  debounceMs = 300,
  placeholder = "Tìm kiếm theo tên, email, số điện thoại...",
  showHistory = false,
  enableHistory = true,
}) => {
  const {
    query,
    setQuery,
    handleSubmit,
    history,
    selectFromHistory,
    clearHistory,
    isLoading,
    error,
  } = useSearch({
    debounceMs,
    enableHistory,
    onSearch,
    fetchResults,
  });

  const handleChange = (e) => {
    const keyword = e.target.value;
    setQuery(keyword);
    onChange?.(keyword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-border">
        <form onSubmit={handleFormSubmit} className="search-container">
          <button
            type="submit"
            className="search-icon reset-button"
            disabled={isLoading}
          >
            <SearchIcon />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            aria-label="Search"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {isLoading && (
            <div className="search-loading">
              <span>🔄</span>
            </div>
          )}
        </form>
      </div>

      {error && (
        <div className="search-error">
          <span>❌ {error}</span>
        </div>
      )}

      {showHistory && history.length > 0 && (
        <div className="search-history">
          <div className="search-history-header">
            <span>Recent searches</span>
            <button onClick={clearHistory} className="search-history-clear">
              Clear
            </button>
          </div>
          <ul className="search-history-list">
            {history.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => selectFromHistory(item)}
                  className="search-history-item"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  fetchResults: PropTypes.func,
  debounceMs: PropTypes.number,
  placeholder: PropTypes.string,
  showHistory: PropTypes.bool,
  enableHistory: PropTypes.bool,
};

export default Search;
