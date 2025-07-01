import "./style.css";
import PropTypes from "prop-types";
import React, { useState, useMemo, useCallback, forwardRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";

// Enhanced Table Container
export const TableContainer = forwardRef(
  (
    {
      children,
      className = "",
      responsive = true,
      striped = false,
      bordered = true,
      hover = false,
      size = "default",
      minWidth = null,
      ...props
    },
    ref
  ) => {
    const tableClasses = [
      "custom-table",
      responsive && "table-responsive",
      striped && "table-striped",
      bordered && "table-bordered",
      hover && "table-hover",
      `table-${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const tableStyle = minWidth ? { minWidth } : {};

    return (
      <div className="table-wrapper" ref={ref}>
        <table className={tableClasses} style={tableStyle} {...props}>
          {children}
        </table>
      </div>
    );
  }
);

TableContainer.displayName = "TableContainer";

// Enhanced Table Header
export const TableHeader = ({
  children,
  sticky = false,
  className = "",
  ...props
}) => {
  const headerClasses = [
    "table-header",
    sticky && "table-header-sticky",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <thead className={headerClasses} {...props}>
      {children}
    </thead>
  );
};

// Enhanced Table Body
export const TableBody = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <tbody className={`table-body ${className}`} {...props} ref={ref}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

// Enhanced Table Footer
export const TableFooter = ({ children, className = "", ...props }) => {
  return (
    <tfoot className={`table-footer ${className}`} {...props}>
      {children}
    </tfoot>
  );
};

// Enhanced Table Row
export const TableRow = ({
  children,
  className = "",
  selected = false,
  clickable = false,
  onClick,
  ...props
}) => {
  const rowClasses = [
    "table-row",
    selected && "table-row-selected",
    clickable && "table-row-clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <tr
      className={rowClasses}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {children}
    </tr>
  );
};

TableRow.displayName = "TableRow";

// Sortable Table Head
export const TableHead = ({
  children,
  className = "",
  sortable = false,
  sortDirection = null, // "asc", "desc", null
  onSort,
  align = "left",
  width = null, // Custom width for the header
  minWidth = null, // Custom minimum width
  maxWidth = null, // Custom maximum width
  ...props
}) => {
  const headClasses = [
    "table-head",
    sortable && "table-head-sortable",
    `text-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleSort = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  const getSortIcon = () => {
    if (!sortable) return null;

    switch (sortDirection) {
      case "asc":
        return <ChevronUp className="sort-icon" size={16} />;
      case "desc":
        return <ChevronDown className="sort-icon" size={16} />;
      default:
        return <ChevronsUpDown className="sort-icon" size={16} />;
    }
  };

  const headStyle = {};
  if (width) headStyle.width = width;
  if (minWidth) headStyle.minWidth = minWidth;
  if (maxWidth) headStyle.maxWidth = maxWidth;

  return (
    <th
      className={headClasses}
      onClick={handleSort}
      style={Object.keys(headStyle).length > 0 ? headStyle : undefined}
      {...props}
    >
      <div className="table-head-content">
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          {children}
        </div>
        {getSortIcon()}
      </div>
    </th>
  );
};

// Enhanced Table Cell
export const TableCell = ({
  children,
  className = "",
  align = "left",
  truncate = false,
  width = null, // Custom width for the cell
  minWidth = null, // Custom minimum width
  maxWidth = null, // Custom maximum width
  wrap = false, // Allow text wrapping
  ...props
}) => {
  const cellClasses = [
    "table-cell",
    `text-${align}`,
    truncate && "table-cell-truncate",
    wrap && "table-cell-wrap",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cellStyle = {};
  if (width) cellStyle.width = width;
  if (minWidth) cellStyle.minWidth = minWidth;
  if (maxWidth) cellStyle.maxWidth = maxWidth;

  return (
    <td
      className={cellClasses}
      style={Object.keys(cellStyle).length > 0 ? cellStyle : undefined}
      {...props}
    >
      {children}
    </td>
  );
};

// Checkbox Cell Component
export const TableCheckbox = ({
  checked = false,
  onChange,
  indeterminate = false,
  ...props
}) => {
  return (
    <TableCell className="table-checkbox-cell" align="center">
      <input
        type="checkbox"
        className="table-checkbox"
        checked={checked}
        onChange={onChange}
        ref={(input) => {
          if (input) input.indeterminate = indeterminate;
        }}
        {...props}
      />
    </TableCell>
  );
};

// Action Menu Cell
export const TableActions = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TableCell className="table-actions-cell" align="center" {...props}>
      <div className="table-actions">
        <button
          className="table-actions-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal size={16} />
        </button>
        {isOpen && (
          <>
            <div
              className="table-actions-backdrop"
              onClick={() => setIsOpen(false)}
            />
            <div className="table-actions-menu">{children}</div>
          </>
        )}
      </div>
    </TableCell>
  );
};

// Complete Advanced Table Component
export const AdvancedTable = ({
  data = [],
  columns = [],
  sortable = true,
  selectable = false,
  pagination = false,
  pageSize = 10,
  searchable = false,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  onRowClick,
  onSelectionChange,
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedData;

    return sortedData.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];
        return (
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [sortedData, searchQuery, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  // Handle sorting
  const handleSort = useCallback((key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === "asc") {
          return { key, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          return { key: null, direction: null };
        }
      }
      return { key, direction: "asc" };
    });
  }, []);

  // Handle row selection
  const handleRowSelect = useCallback(
    (rowIndex, checked) => {
      const newSelectedRows = new Set(selectedRows);
      if (checked) {
        newSelectedRows.add(rowIndex);
      } else {
        newSelectedRows.delete(rowIndex);
      }
      setSelectedRows(newSelectedRows);
      onSelectionChange?.(Array.from(newSelectedRows));
    },
    [selectedRows, onSelectionChange]
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (checked) => {
      if (checked) {
        const allRowIndices = new Set(paginatedData.map((_, index) => index));
        setSelectedRows(allRowIndices);
        onSelectionChange?.(Array.from(allRowIndices));
      } else {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
      }
    },
    [paginatedData, onSelectionChange]
  );

  const isAllSelected =
    selectedRows.size === paginatedData.length && paginatedData.length > 0;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < paginatedData.length;

  const totalPages = Math.ceil(filteredData.length / pageSize);

  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`advanced-table-container ${className}`}>
      {searchable && (
        <div className="table-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="table-search-input"
          />
        </div>
      )}

      <TableContainer responsive striped hover {...props}>
        <TableHeader sticky>
          <TableRow>
            {selectable && (
              <TableHead align="center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  className="table-checkbox"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                sortable={sortable && column.sortable !== false}
                sortDirection={
                  sortConfig.key === column.key ? sortConfig.direction : null
                }
                onSort={() => handleSort(column.key)}
                align={column.align || "left"}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                align="center"
                className="table-empty"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                selected={selectedRows.has(index)}
                clickable={!!onRowClick}
                onClick={() => onRowClick?.(row, index)}
              >
                {selectable && (
                  <TableCheckbox
                    checked={selectedRows.has(index)}
                    onChange={(e) => handleRowSelect(index, e.target.checked)}
                  />
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align || "left"}
                    truncate={column.truncate}
                  >
                    {column.render
                      ? column.render(row[column.key], row, index)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </TableContainer>

      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <div className="table-pagination-info">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="table-pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="table-pagination-button"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 2
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="table-pagination-ellipsis">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`table-pagination-button ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="table-pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes
TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  responsive: PropTypes.bool,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "default", "lg"]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sticky: PropTypes.bool,
  className: PropTypes.string,
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sortable: PropTypes.bool,
  sortDirection: PropTypes.oneOf(["asc", "desc", null]),
  onSort: PropTypes.func,
  align: PropTypes.oneOf(["left", "center", "right"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  truncate: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.bool,
};

TableCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  indeterminate: PropTypes.bool,
};

TableActions.propTypes = {
  children: PropTypes.node.isRequired,
};

AdvancedTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      align: PropTypes.oneOf(["left", "center", "right"]),
      truncate: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  sortable: PropTypes.bool,
  selectable: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  searchable: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

export default AdvancedTable;
