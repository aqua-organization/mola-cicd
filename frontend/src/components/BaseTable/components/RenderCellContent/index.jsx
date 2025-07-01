import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { TableCell } from "../../../../components/ui/Table";
import { formatCurrency } from "../../../../utils/invoiceUtil";

// Tách currency fields ra ngoài để tránh tạo lại array mỗi lần render
const CURRENCY_FIELDS = new Set([
  "exchangeRate",
  "quantity",
  "unitPrice",
  "amountBeforeVAT",
  "vatRate",
  "vatAmount",
  "discount",
  "totalDiscount",
  "totalFee",
  "totalPayment",
  "amount",
  "totalAmount",
  "discountAmount",
  "vatAmount",
  "totalPayment",
  "purchasingCost",
  "warehouseValue",
]);

// Component cho checkbox selection
const SelectCheckbox = React.memo(({ isSelected, onSelect }) => (
  <input
    type="checkbox"
    checked={isSelected}
    onChange={onSelect}
    className="row-checkbox"
  />
));

SelectCheckbox.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Component cho action buttons
const ActionButtons = React.memo(({ item, onDelete }) => {
  const handleDeleteClick = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  return (
    <div className="action-buttons">
      <button
        className="btn-icon btn-danger"
        onClick={handleDeleteClick}
        title="Xóa"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
});

ActionButtons.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Component chính được tối ưu
export const RenderCellContent = React.memo(
  ({ item, column, selectedItems, handleSelectItem, numberOrder }) => {
    // Memoize value để tránh tính toán lại
    const value = useMemo(() => item[column.key], [item, column.key]);

    const handleDelete = useCallback(() => {
      console.log("handleDelete", item);
    }, [item]);

    // Memoize isSelected để tránh tính toán lại
    const isSelected = useMemo(
      () => selectedItems.has(item._id),
      [selectedItems, item]
    );

    // Memoize handleSelect callback
    const handleSelect = useCallback(() => {
      handleSelectItem(item);
    }, [handleSelectItem, item]);

    // Memoize cell content dựa trên column type
    const cellContent = useMemo(() => {
      // Select checkbox
      if (column.key === "select") {
        return (
          <SelectCheckbox isSelected={isSelected} onSelect={handleSelect} />
        );
      }

      if (column.key === "stt") {
        return numberOrder;
      }

      // Special field handling
      if (column.key === "discountAccount") {
        return value ? value : "Không có";
      }

      if (column.key === "isDelivered") {
        return value ? "Đã xuất" : "Chưa xuất";
      }

      if (column.key === "isInvoiced") {
        return value ? "Đã lập" : "Chưa lập";
      }

      if (column.key === "actions") {
        return <ActionButtons item={item} onDelete={handleDelete} />;
      }

      // Currency fields
      if (CURRENCY_FIELDS.has(column.key)) {
        return formatCurrency(value);
      }

      // Default value
      return value !== null && value !== undefined ? value : "";
    }, [column.key, value, isSelected, handleSelect, item, handleDelete]);

    return (
      <TableCell key={`${item.id}-${column.key}`} align={column.align}>
        {cellContent}
      </TableCell>
    );
  }
);

RenderCellContent.propTypes = {
  item: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  selectedItems: PropTypes.instanceOf(Set).isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  numberOrder: PropTypes.number.isRequired,
};

// Thêm display name cho debugging
RenderCellContent.displayName = "RenderCellContent";
SelectCheckbox.displayName = "SelectCheckbox";
ActionButtons.displayName = "ActionButtons";
