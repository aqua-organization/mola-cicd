import { useState, useMemo, useCallback } from "react";

const useSearchField = (columns = [], customSearchableFields = []) => {
  const [selectedField, setSelectedField] = useState("all");

  // Generate search field options
  const searchFieldOptions = useMemo(() => {
    let searchableColumns = [];

    if (customSearchableFields.length > 0) {
      // Use custom fields (for Invoice table or specific use cases)
      searchableColumns = customSearchableFields;
    } else {
      // Extract from columns config (for TableGeneral)
      searchableColumns = columns.filter((col) => col.searchable);
    }

    const options = [{ value: "all", label: "Tất cả trường" }];

    searchableColumns.forEach((column) => {
      options.push({
        value: column.key,
        label: column.label,
      });
    });

    return options;
  }, [columns, customSearchableFields]);

  // Get searchable keys based on selected field
  const getSearchableKeys = useCallback(() => {
    if (selectedField === "all") {
      if (customSearchableFields.length > 0) {
        return customSearchableFields.map((field) => field.key);
      }
      return columns.filter((col) => col.searchable).map((col) => col.key);
    }
    return [selectedField];
  }, [selectedField, customSearchableFields, columns]);

  // Vietnamese text normalization
  const normalizeVietnamese = useCallback((text) => {
    if (!text) return "";
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();
  }, []);

  // Enhanced filtering with multiple search terms
  const filterDataByField = useCallback(
    (data, searchQuery) => {
      if (!searchQuery || !searchQuery.trim()) return data;

      const searchableKeys = getSearchableKeys();
      const normalizedQuery = normalizeVietnamese(searchQuery.trim());

      // Support multiple search terms (space separated)
      const searchTerms = normalizedQuery
        .split(" ")
        .filter((term) => term.length > 0);

      return data.filter((row) => {
        // Create searchable text from all relevant fields
        const searchableText = searchableKeys
          .map((key) => {
            const value = row[key];
            return value ? String(value) : "";
          })
          .join(" ");

        const normalizedText = normalizeVietnamese(searchableText);

        // All terms must be found (AND logic)
        return searchTerms.every((term) => normalizedText.includes(term));
      });
    },
    [getSearchableKeys, normalizeVietnamese]
  );

  // Advanced search with specific field matching
  const searchInField = useCallback(
    (data, searchQuery, fieldKey) => {
      if (!searchQuery || !searchQuery.trim()) return data;

      const normalizedQuery = normalizeVietnamese(searchQuery.trim());

      return data.filter((row) => {
        const fieldValue = row[fieldKey];
        if (!fieldValue) return false;

        const normalizedValue = normalizeVietnamese(String(fieldValue));
        return normalizedValue.includes(normalizedQuery);
      });
    },
    [normalizeVietnamese]
  );

  // Get highlighted text for search results (utility function)
  const highlightSearchText = useCallback(
    (text, searchQuery) => {
      if (!searchQuery || !text) return text;

      const normalizedQuery = normalizeVietnamese(searchQuery);
      const normalizedText = normalizeVietnamese(text);

      // Simple highlighting check - UI implementation can enhance this
      if (normalizedText.includes(normalizedQuery)) {
        return text; // Return original text, highlighting can be done in UI
      }

      return text;
    },
    [normalizeVietnamese]
  );

  // Search with OR logic (any term matches)
  const filterDataByFieldOr = useCallback(
    (data, searchQuery) => {
      if (!searchQuery || !searchQuery.trim()) return data;

      const searchableKeys = getSearchableKeys();
      const normalizedQuery = normalizeVietnamese(searchQuery.trim());
      const searchTerms = normalizedQuery
        .split(" ")
        .filter((term) => term.length > 0);

      return data.filter((row) => {
        const searchableText = searchableKeys
          .map((key) => {
            const value = row[key];
            return value ? String(value) : "";
          })
          .join(" ");

        const normalizedText = normalizeVietnamese(searchableText);

        // Any term matches (OR logic)
        return searchTerms.some((term) => normalizedText.includes(term));
      });
    },
    [getSearchableKeys, normalizeVietnamese]
  );

  // Exact match search
  const filterDataExact = useCallback(
    (data, searchQuery) => {
      if (!searchQuery || !searchQuery.trim()) return data;

      const searchableKeys = getSearchableKeys();
      const normalizedQuery = normalizeVietnamese(searchQuery.trim());

      return data.filter((row) => {
        return searchableKeys.some((key) => {
          const value = row[key];
          if (!value) return false;

          const normalizedValue = normalizeVietnamese(String(value));
          return normalizedValue === normalizedQuery;
        });
      });
    },
    [getSearchableKeys, normalizeVietnamese]
  );

  // Get search suggestions based on existing data
  const getSearchSuggestions = useCallback(
    (data, currentQuery = "", maxSuggestions = 5) => {
      if (!currentQuery.trim()) return [];

      const searchableKeys = getSearchableKeys();
      const normalizedQuery = normalizeVietnamese(currentQuery.trim());
      const suggestions = new Set();

      data.forEach((row) => {
        searchableKeys.forEach((key) => {
          const value = row[key];
          if (value) {
            const stringValue = String(value);
            const normalizedValue = normalizeVietnamese(stringValue);

            if (
              normalizedValue.includes(normalizedQuery) &&
              stringValue !== currentQuery
            ) {
              suggestions.add(stringValue);
            }
          }
        });
      });

      return Array.from(suggestions).slice(0, maxSuggestions);
    },
    [getSearchableKeys, normalizeVietnamese]
  );

  return {
    // State
    selectedField,
    setSelectedField,

    // Options
    searchFieldOptions,
    getSearchableKeys,

    // Core filtering functions
    filterDataByField, // AND logic (default)
    filterDataByFieldOr, // OR logic
    filterDataExact, // Exact match
    searchInField, // Single field search

    // Utility functions
    normalizeVietnamese,
    highlightSearchText,
    getSearchSuggestions,
  };
};

export default useSearchField;
