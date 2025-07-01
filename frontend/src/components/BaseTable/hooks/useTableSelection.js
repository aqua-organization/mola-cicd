import { useState, useCallback, useEffect, useMemo } from "react";

const useTableSelection = (data = [], options = {}) => {
  const {
    // Auto-clear selection when data changes
    autoClearOnDataChange = true,
    // Key field for unique identification
    keyField = "id",
    // Initial selected items
    initialSelection = new Set(),
    // Callback when selection changes
    onSelectionChange = null,
  } = options;

  const [selectedRows, setSelectedRows] = useState(initialSelection);

  // Auto-clear selection when data changes (e.g., after filtering)
  useEffect(() => {
    if (autoClearOnDataChange) {
      setSelectedRows(new Set());
    }
  }, [data.length, autoClearOnDataChange]);

  // Get item key (supports both 'id' and custom key fields)
  const getItemKey = useCallback(
    (item, index) => {
      return item[keyField] || item.id || index;
    },
    [keyField]
  );

  // Handle single row selection
  const handleRowSelect = useCallback(
    (itemKeyOrIndex, checked) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);

        if (checked) {
          newSelected.add(itemKeyOrIndex);
        } else {
          newSelected.delete(itemKeyOrIndex);
        }

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, itemKeyOrIndex, checked);
        }

        return newSelected;
      });
    },
    [onSelectionChange]
  );

  // Handle select all/none
  const handleSelectAll = useCallback(
    (checked) => {
      setSelectedRows(() => {
        let newSelected;

        if (checked) {
          // Select all items in current data
          newSelected = new Set(
            data.map((item, index) => getItemKey(item, index))
          );
        } else {
          // Clear all selection
          newSelected = new Set();
        }

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, null, checked);
        }

        return newSelected;
      });
    },
    [data, getItemKey, onSelectionChange]
  );

  // Clear all selection
  const clearSelection = useCallback(() => {
    setSelectedRows((prev) => {
      if (prev.size === 0) return prev; // No change needed

      const newSelected = new Set();

      // Trigger callback if provided
      if (onSelectionChange) {
        onSelectionChange(newSelected, null, false);
      }

      return newSelected;
    });
  }, [onSelectionChange]);

  // Toggle single item selection
  const toggleRowSelection = useCallback(
    (itemKeyOrIndex) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        const isSelected = newSelected.has(itemKeyOrIndex);

        if (isSelected) {
          newSelected.delete(itemKeyOrIndex);
        } else {
          newSelected.add(itemKeyOrIndex);
        }

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, itemKeyOrIndex, !isSelected);
        }

        return newSelected;
      });
    },
    [onSelectionChange]
  );

  // Select range of items (useful for Shift+click functionality)
  const selectRange = useCallback(
    (startKey, endKey) => {
      const startIndex = data.findIndex(
        (item, index) => getItemKey(item, index) === startKey
      );
      const endIndex = data.findIndex(
        (item, index) => getItemKey(item, index) === endKey
      );

      if (startIndex === -1 || endIndex === -1) return;

      const minIndex = Math.min(startIndex, endIndex);
      const maxIndex = Math.max(startIndex, endIndex);

      setSelectedRows((prev) => {
        const newSelected = new Set(prev);

        for (let i = minIndex; i <= maxIndex; i++) {
          const key = getItemKey(data[i], i);
          newSelected.add(key);
        }

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, null, true);
        }

        return newSelected;
      });
    },
    [data, getItemKey, onSelectionChange]
  );

  // Select items by predicate function
  const selectByPredicate = useCallback(
    (predicate) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);

        data.forEach((item, index) => {
          if (predicate(item, index)) {
            const key = getItemKey(item, index);
            newSelected.add(key);
          }
        });

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, null, true);
        }

        return newSelected;
      });
    },
    [data, getItemKey, onSelectionChange]
  );

  // Computed values
  const selectedRowsCount = selectedRows.size;

  const isAllSelected = useMemo(() => {
    return selectedRows.size === data.length && data.length > 0;
  }, [selectedRows.size, data.length]);

  const isIndeterminate = useMemo(() => {
    return selectedRows.size > 0 && selectedRows.size < data.length;
  }, [selectedRows.size, data.length]);

  const hasSelection = selectedRows.size > 0;

  // Get selected items data
  const getSelectedItems = useCallback(() => {
    return data.filter((item, index) => {
      const key = getItemKey(item, index);
      return selectedRows.has(key);
    });
  }, [data, selectedRows, getItemKey]);

  // Get selected keys as array
  const getSelectedKeys = useCallback(() => {
    return Array.from(selectedRows);
  }, [selectedRows]);

  // Check if specific item is selected
  const isItemSelected = useCallback(
    (itemKeyOrIndex) => {
      return selectedRows.has(itemKeyOrIndex);
    },
    [selectedRows]
  );

  // Get selection statistics
  const getSelectionStats = useCallback(() => {
    return {
      total: data.length,
      selected: selectedRows.size,
      unselected: data.length - selectedRows.size,
      percentage:
        data.length > 0
          ? Math.round((selectedRows.size / data.length) * 100)
          : 0,
    };
  }, [data.length, selectedRows.size]);

  // Batch operations
  const batchSelect = useCallback(
    (keys) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        keys.forEach((key) => newSelected.add(key));

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, keys, true);
        }

        return newSelected;
      });
    },
    [onSelectionChange]
  );

  const batchDeselect = useCallback(
    (keys) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        keys.forEach((key) => newSelected.delete(key));

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(newSelected, keys, false);
        }

        return newSelected;
      });
    },
    [onSelectionChange]
  );

  // Set selection directly (useful for controlled components)
  const setSelection = useCallback(
    (newSelection) => {
      const selectionSet =
        newSelection instanceof Set ? newSelection : new Set(newSelection);

      setSelectedRows((prev) => {
        if (
          prev.size === selectionSet.size &&
          Array.from(prev).every((key) => selectionSet.has(key))
        ) {
          return prev; // No change needed
        }

        // Trigger callback if provided
        if (onSelectionChange) {
          onSelectionChange(selectionSet, null, null);
        }

        return selectionSet;
      });
    },
    [onSelectionChange]
  );

  return {
    // Selection state
    selectedRows,
    selectedRowsCount,
    isAllSelected,
    isIndeterminate,
    hasSelection,

    // Action handlers
    handleRowSelect,
    handleSelectAll,
    clearSelection,
    toggleRowSelection,
    selectRange,
    selectByPredicate,
    batchSelect,
    batchDeselect,
    setSelection,

    // Utility functions
    getSelectedItems,
    getSelectedKeys,
    isItemSelected,
    getSelectionStats,
    getItemKey,
  };
};

export default useTableSelection;
