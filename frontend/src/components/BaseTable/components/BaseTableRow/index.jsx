import { TableRow, TableCell, TableCheckbox } from "../../../ui/Table";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { formatCurrency, formatDate } from "../../../../utils/invoiceUtil";
import { Trash2 } from "lucide-react";

const SelectCheckbox = React.memo(({ isSelected, onSelect }) => (
  <input
    type="checkbox"
    checked={isSelected}
    onChange={onSelect}
    className="row-checkbox"
  />
));

SelectCheckbox.displayName = "SelectCheckbox";

SelectCheckbox.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const ActionButtons = React.memo(({ item, onDelete }) => {
  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();
      onDelete(item);
    },
    [item, onDelete]
  );

  return (
    <div className="action-buttons">
      <button
        className="btn-icon btn-danger"
        onClick={handleDeleteClick}
        title="Xóa"
        name="delete"
      >
        <Trash2 size={14} name="delete" />
      </button>
    </div>
  );
});

ActionButtons.displayName = "ActionButtons";

ActionButtons.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const renderCellContent = ({ row, column }) => {
  const value = row[column.key];
  if (!value && value !== 0) return "";

  if (column.type === "currency") {
    return formatCurrency(value);
  } else if (column.type === "date") {
    return formatDate(value);
  } else {
    return value;
  }
};

const BaseTableRow = ({
  row,
  index,
  onRowClick,
  enableRowClick,
  columns,
  className,
  enableSelection,
  enableAction,
  isSelected,
  onRowSelect,
  onDelete,
}) => {
  const handleRowClick = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    const isActionButton = e.target.closest(".action-buttons") !== null;

    if (isCheckbox || isActionButton) {
      return;
    }

    if (enableRowClick) {
      onRowClick?.(row);
    }
  };

  return (
    <TableRow
      key={index}
      data-row-id={row.id || row.stt}
      onClick={handleRowClick}
      clickable={enableRowClick && !!onRowClick}
      className={className}
    >
      {enableSelection && (
        <TableCheckbox
          checked={isSelected}
          onChange={() => onRowSelect(row._id)}
        />
      )}
      <TableCell>{index + 1}</TableCell>
      {columns.map((column) => {
        const cellContent = renderCellContent({ row, column });
        return <TableCell key={column.key}>{cellContent}</TableCell>;
      })}
      {enableAction && (
        <TableCell>
          <ActionButtons item={row} onDelete={onDelete} />
        </TableCell>
      )}
    </TableRow>
  );
};

BaseTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onRowClick: PropTypes.func,
  enableRowClick: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  className: PropTypes.string,
  enableSelection: PropTypes.bool,
  isSelected: PropTypes.bool,
  onRowSelect: PropTypes.func,
  enableAction: PropTypes.bool,
  onDelete: PropTypes.func,
  index: PropTypes.number,
};

export default BaseTableRow;
