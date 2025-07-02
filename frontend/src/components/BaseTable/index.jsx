import "./BaseTable.css";
import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

// Components
import { TableContainer, TableBody } from "../ui/Table";
import BaseTableHeader from "./components/BaseTableHeader";
import BaseTableRow from "./components/BaseTableRow";
import BaseTableControl from "./components/BaseTableControl";
import { Download, Trash2, X } from "lucide-react";

// Hooks
import useSearchField from "./hooks/useSearchField";
import useSelected from "./hooks/useSelected";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useScrollObserver from "./hooks/useScrollObserver";
import useBaseTable from "./hooks/useBaseTable";

// Configs
import { purchaseInvoiceFieldConfigs } from "./baseTableConfig";
import Button from "../ui/Button";

const BaseTable = ({
  data: listData,
  columns,
  fetchData,
  onRowClick,
  enableSelection,
  enableAction,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, initialLoading, hasNextPage, loadMore, loading, refresh } =
    useInfiniteScroll({
      fetchData,
      pageSize: 10,
      initialData: listData,
      dataKey: "invoices",
    });
  const {
    searchFieldOptions,
    selectedField,
    setSelectedField,
    filterDataByField,
  } = useSearchField(columns);

  const { selectedItems, selectAll, handleSelectItem, handleSelectAll } =
    useSelected({
      data,
    });

  const bottomRef = useScrollObserver({
    onIntersect: () => {
      console.log("onIntersect");
      if (hasNextPage && !loading) {
        loadMore();
      }
    },
    enabled: true,
  });

  const filteredData = useMemo(() => {
    return filterDataByField(data, searchQuery);
  }, [data, searchQuery, filterDataByField]);

  const {
    data: baseTableData,
    handleUpdateItem,
    handleSaveChanges,
    hasUnsavedChanges,
  } = useBaseTable({
    initialData: filteredData,
  });

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleShowSettingDefaultValueModal = () => {
    setIsOpen(true);
  };

  const handleDelete = (data) => {
    onDelete(data);
    refresh();
  };

  const handleBulkDelete = () => {
    console.log("handleBulkDelete");
  };

  const handleBulkExport = () => {
    console.log("handleBulkExport");
  };

  const handleSaveSettingDefaultValue = (formData) => {
    const selectedData = filteredData.filter((item) =>
      selectedItems.has(item._id)
    );

    const newData = selectedData.map((item) => {
      Object.keys(formData).forEach((key) => {
        item[key] = formData[key];
      });
      return { ...item, isModified: true };
    });

    if (newData.length > 0) {
      newData.forEach((item) => {
        handleUpdateItem(item._id, item);
      });
    }
  };

  return (
    <div className="base-table">
      {selectedItems.size > 0 && (
        <div className="bulk-actions-bar">
          <div className="bulk-actions-info">
            <span>Đã chọn {selectedItems.size} mục</span>
          </div>
          <div className="bulk-actions-controls">
            <Button
              onClick={handleBulkExport}
              size="small"
              title="Xuất các mục đã chọn"
            >
              <Download size={16} />
              Xuất {selectedItems.size} mục
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={handleBulkDelete}
              title="Xóa các mục đã chọn"
            >
              <Trash2 size={16} />
              Xóa {selectedItems.size} mục
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                handleSelectAll(true);
              }}
              title="Bỏ chọn tất cả"
            >
              <X size={16} />
              Bỏ chọn
            </Button>
          </div>
        </div>
      )}
      <BaseTableControl
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSaveSettingDefaultValue={handleSaveSettingDefaultValue}
        allowFieldsUpdate={purchaseInvoiceFieldConfigs}
        searchFieldOptions={searchFieldOptions}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        handleSearch={handleSearch}
        handleShowSettingDefaultValueModal={handleShowSettingDefaultValueModal}
        dataLength={filteredData.length}
        selectedItems={selectedItems}
      />

      {initialLoading ? (
        <div className="base-table-loading">Đang tải dữ liệu...</div>
      ) : filteredData.length > 0 ? (
        <div className="base-table-content-area">
          <div className="base-table-scroll-container">
            <TableContainer
              responsive
              striped
              hover
              className="base-table-container"
            >
              <BaseTableHeader
                columns={columns}
                enableSelection={enableSelection}
                isAllSelected={selectAll}
                onSelectAll={() => handleSelectAll(false)}
                enableAction={enableAction}
              />
              <TableBody>
                {baseTableData.map((row, index) => {
                  return (
                    <BaseTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      onRowClick={onRowClick}
                      onRowSelect={handleSelectItem}
                      isSelected={selectedItems.has(row._id)}
                      enableRowClick={true}
                      enableSelection={enableSelection}
                      enableAction={enableAction}
                      columns={columns}
                      onDelete={handleDelete}
                      className={`${row.isNew ? "row-new" : ""} ${
                        row.isModified ? "row-modified" : ""
                      } ${row.isImported ? "row-imported" : ""} ${
                        selectedItems.has(row._id)
                          ? "base-table-row-selected"
                          : ""
                      }`}
                    />
                  );
                })}
                {loading ? (
                  <tr ref={bottomRef} style={{ height: "1px", color: "red" }} />
                ) : (
                  <tr ref={bottomRef} style={{ height: "1px" }}>
                    {hasNextPage && (
                      <td colSpan={columns.length + 3}>
                        <div className="base-table-loading">
                          Đang tải thêm dữ liệu...
                        </div>
                      </td>
                    )}
                  </tr>
                )}
              </TableBody>
            </TableContainer>
          </div>
        </div>
      ) : (
        <div className="base-table-empty">Không có dữ liệu</div>
      )}
      <div className="base-table-footer">
        {hasUnsavedChanges && (
          <div className="base-table-unsaved-changes">
            Có thay đổi chưa được lưu
          </div>
        )}
        <div className="base-table-footer-actions">
          <Button onClick={handleSaveChanges} size="small" variant="none">
            Hủy
          </Button>
          <Button onClick={handleSaveChanges} size="small" variant="contained">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

BaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  enableSelection: PropTypes.bool,
  enableAction: PropTypes.bool,
  onRowClick: PropTypes.func,
  allowFieldsUpdate: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default BaseTable;
