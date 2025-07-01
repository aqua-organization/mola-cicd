import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for search functionality
 * @param {Object} options - Configuration options
 * @param {number} options.debounceMs - Debounce delay in milliseconds (default: 300)
 * @param {number} options.minSearchLength - Minimum search length to trigger search (default: 1)
 * @param {boolean} options.enableHistory - Enable search history (default: true)
 * @param {number} options.maxHistoryItems - Maximum history items to store (default: 10)
 * @param {Function} options.onSearch - Callback function when search is triggered
 * @param {Function} options.fetchResults - Function to fetch search results
 * @returns {Object} Search state and methods
 */
const useSearch = (options = {}) => {
  const {
    debounceMs = 300,
    minSearchLength = 1,
    enableHistory = true,
    maxHistoryItems = 10,
    onSearch,
    fetchResults,
  } = options;

  // State management
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const debounceRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Clear previous search when starting new one
  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Add to history
  const addToHistory = useCallback(
    (searchQuery) => {
      if (!enableHistory || !searchQuery.trim()) return;

      setHistory((prev) => {
        const filtered = prev.filter((item) => item !== searchQuery);
        const newHistory = [searchQuery, ...filtered];
        return newHistory.slice(0, maxHistoryItems);
      });
    },
    [enableHistory, maxHistoryItems]
  );

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Remove item from history
  const removeFromHistory = useCallback((item) => {
    setHistory((prev) => prev.filter((historyItem) => historyItem !== item));
  }, []);

  // Perform search
  const performSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery || searchQuery.length < minSearchLength) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        let searchResults = [];

        // If fetchResults function is provided, use it
        if (fetchResults && typeof fetchResults === "function") {
          searchResults = await fetchResults(searchQuery, {
            signal: abortControllerRef.current.signal,
          });
        }

        // Only update if request wasn't aborted
        if (!abortControllerRef.current.signal.aborted) {
          setResults(searchResults);
          addToHistory(searchQuery);

          // Call onSearch callback if provided
          if (onSearch && typeof onSearch === "function") {
            onSearch(searchQuery, searchResults);
          }
        }
      } catch (err) {
        if (!abortControllerRef.current.signal.aborted) {
          setError(err.message || "Search failed");
          setResults([]);
        }
      } finally {
        if (!abortControllerRef.current.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [minSearchLength, fetchResults, onSearch, addToHistory]
  );

  // Handle query change with debouncing
  const handleQueryChange = useCallback(
    (newQuery) => {
      setQuery(newQuery);

      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Clear results immediately if query is empty
      if (!newQuery.trim()) {
        clearSearch();
        setIsLoading(false);
        return;
      }

      // Set debounced search
      debounceRef.current = setTimeout(() => {
        performSearch(newQuery);
      }, debounceMs);
    },
    [debounceMs, performSearch, clearSearch]
  );

  // Handle search submission (immediate search without debounce)
  const handleSubmit = useCallback(
    (searchQuery = query) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      performSearch(searchQuery);
    },
    [query, performSearch]
  );

  // Reset search state
  const reset = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
    setIsLoading(false);
    setIsOpen(false);
    clearSearch();
  }, [clearSearch]);

  // Toggle dropdown/results visibility
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close dropdown
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Open dropdown
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Select from history
  const selectFromHistory = useCallback(
    (historyItem) => {
      setQuery(historyItem);
      performSearch(historyItem);
    },
    [performSearch]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    query,
    results,
    isLoading,
    error,
    history,
    isOpen,

    // Actions
    setQuery: handleQueryChange,
    handleSubmit,
    reset,
    clearSearch,

    // History actions
    clearHistory,
    removeFromHistory,
    selectFromHistory,

    // Dropdown actions
    open,
    close,
    toggleOpen,

    // Utility
    hasResults: results.length > 0,
    hasQuery: query.length >= minSearchLength,
    isEmpty:
      results.length === 0 &&
      !isLoading &&
      !error &&
      query.length >= minSearchLength,
  };
};

export default useSearch;
