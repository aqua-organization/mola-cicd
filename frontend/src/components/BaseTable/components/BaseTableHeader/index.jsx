import { TableHead, TableHeader, TableRow } from "../../../ui/Table";
import PropTypes from "prop-types";

const BaseTableHeader = ({
  columns = [],
  enableSelection,
  isAllSelected,
  onSelectAll,
  enableAction,
}) => {
  return (
    <TableHeader>
      <TableRow>
        {enableSelection && (
          <TableHead width="50px">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="header-checkbox"
            />
          </TableHead>
        )}
        <TableHead width="50px">
          <span>STT</span>
        </TableHead>
        {columns.map((column) => (
          <TableHead key={column.key} width={column.width} align={column.align}>
            {column.label}
          </TableHead>
        ))}
        {enableAction && (
          <TableHead width="120px">
            <span>Thao tác</span>
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

BaseTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  enableSelection: PropTypes.bool.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  enableAction: PropTypes.bool.isRequired,
};

export default BaseTableHeader;
