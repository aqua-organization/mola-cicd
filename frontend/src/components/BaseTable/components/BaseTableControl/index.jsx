import SetValueTableModal from "../../../../modals/SetValueTableModal";
import { Settings } from "lucide-react";
import Select from "../../../ui/Select";
import Search from "../../../ui/Search";

import PropTypes from "prop-types";
import Button from "../../../ui/Button";

const BaseTableControl = ({
  isOpen,
  setIsOpen,
  searchFieldOptions,
  selectedField,
  setSelectedField,
  selectedItems,
  allowFieldsUpdate,
  handleSearch,
  handleShowSettingDefaultValueModal,
  handleSaveSettingDefaultValue,
  dataLength,
}) => {
  return (
    <div className="base-table-controls">
      <div className="base-table-controls-left">
        <SetValueTableModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSaveSettingDefaultValue}
          fieldConfigs={allowFieldsUpdate}
        />
        <Button
          className="btn btn-add-new-invoice btn-primary"
          onClick={handleShowSettingDefaultValueModal}
          disabled={selectedItems.size <= 0}
        >
          <Settings size={16} />
          Thiết lập
        </Button>
        <div className="base-table-search-controls">
          <Select
            options={searchFieldOptions}
            value={selectedField}
            onChange={setSelectedField}
            placeholder="Tìm trong..."
            className="search-field-select"
          />
          <Search
            placeholder="Tìm kiếm..."
            onChange={handleSearch}
            onSearch={handleSearch}
            debounceMs={100}
          />
        </div>
      </div>

      <div className="base-table-controls-right">
        <span className="data-count">
          Hiển thị {dataLength} bản ghi
          {selectedItems.size > 0 && (
            <span className="selected-count" style={{ marginLeft: "8px" }}>
              {" "}
              {selectedItems.size} đã chọn
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

BaseTableControl.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleSaveSettingDefaultValue: PropTypes.func.isRequired,
  allowFieldsUpdate: PropTypes.object.isRequired,
  searchFieldOptions: PropTypes.array.isRequired,
  selectedField: PropTypes.string.isRequired,
  setSelectedField: PropTypes.func.isRequired,
  selectedItems: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleShowSettingDefaultValueModal: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default BaseTableControl;
