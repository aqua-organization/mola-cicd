import { useState, useEffect, useMemo, useCallback } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "../../components/ui/Button";
import { Settings, X } from "lucide-react";
import "./SetValueTableModal.css";

const defaultFieldConfigs = {
  documentType: {
    label: "Loại chứng từ",
    values: [
      {
        id: 1,
        value: "MHNK - tiền mặt",
        label: "MHNK - tiền mặt",
        isEditing: false,
      },
      {
        id: 2,
        value: "MHNK - chuyển khoản",
        label: "MHNK - chuyển khoản",
        isEditing: false,
      },
      {
        id: 3,
        value: "MHNK - chưa thanh toán",
        label: "MHNK - chưa thanh toán",
        isEditing: false,
      },
      {
        id: 4,
        value: "MHKQK - tiền mặt",
        label: "MHKQK - tiền mặt",
        isEditing: false,
      },
      {
        id: 5,
        value: "MHKQK - chuyển khoản",
        label: "MHKQK - chuyển khoản",
        isEditing: false,
      },
      {
        id: 6,
        value: "MHKQK - chưa thanh toán",
        label: "MHKQK - chưa thanh toán",
        isEditing: false,
      },
    ],
  },
  accountCostOrLiability: {
    label: "TK công nợ/chi phí",
    values: [
      {
        id: 1,
        value: "131",
        label: "131 - Phải thu khách hàng",
        isEditing: false,
      },
      {
        id: 2,
        value: "331",
        label: "331 - Phải trả người bán",
        isEditing: false,
      },
      {
        id: 3,
        value: "641",
        label: "641 - Chi phí bán hàng",
        isEditing: false,
      },
      {
        id: 4,
        value: "642",
        label: "642 - Chi phí quản lý doanh nghiệp",
        isEditing: false,
      },
    ],
  },
  accountRevenue: {
    label: "TK doanh thu",
    values: [
      {
        id: 1,
        value: "511",
        label: "511 - Doanh thu bán hàng và cung cấp dịch vụ",
        isEditing: false,
      },
      {
        id: 2,
        value: "515",
        label: "515 - Doanh thu hoạt động tài chính",
        isEditing: false,
      },
      {
        id: 3,
        value: "521",
        label: "521 - Chiết khấu thương mại",
        isEditing: false,
      },
    ],
  },
  discountAccount: {
    label: "TK chiết khấu",
    values: [
      {
        id: 1,
        value: "521",
        label: "521 - Chiết khấu thương mại",
        isEditing: false,
      },
      {
        id: 2,
        value: "532",
        label: "532 - Giảm giá hàng bán",
        isEditing: false,
      },
    ],
  },
  unit: {
    label: "Đơn vị tính",
    values: [
      { id: 1, value: "Cái", label: "Cái", isEditing: false },
      { id: 2, value: "Kg", label: "Kilogram", isEditing: false },
      { id: 3, value: "Mét", label: "Mét", isEditing: false },
      { id: 4, value: "Lít", label: "Lít", isEditing: false },
      { id: 5, value: "Bộ", label: "Bộ", isEditing: false },
    ],
  },
};

const SetValueTableModal = ({
  isOpen,
  onClose,
  onSave,
  fieldConfigs = defaultFieldConfigs,
  selectedValues: initialSelectedValues = {},
}) => {
  const [activeTab, setActiveTab] = useState(
    Object.keys(fieldConfigs).length > 0
      ? Object.keys(fieldConfigs)[0]
      : "documentType"
  );
  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
  }, []);

  const [editingItem, setEditingItem] = useState(null);
  const [customInputValue, setCustomInputValue] = useState("");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (Object.keys(selectedValues).length > 0) {
      onSave(selectedValues);
    }
    onClose();
  }, [selectedValues, onSave, onClose]);

  const handleRowClick = useCallback(
    (item) => {
      setSelectedValues((prev) => ({
        ...prev,
        [activeTab]: item.value,
      }));
    },
    [activeTab]
  );

  const handleInputChange = useCallback(
    (field, value) => {
      if (editingItem) {
        setEditingItem((prev) => ({ ...prev, [field]: value }));
      }
    },
    [editingItem]
  );

  const handleCustomInputChange = useCallback((value) => {
    setCustomInputValue(value);
  }, []);

  const handleCustomInputSave = useCallback(() => {
    if (customInputValue.trim()) {
      setSelectedValues((prev) => ({
        ...prev,
        [activeTab]: customInputValue.trim(),
      }));
      setCustomInputValue("");
    }
  }, [customInputValue, activeTab]);

  const currentFieldData = useMemo(() => {
    return fieldConfigs[activeTab] || { label: "", values: [] };
  }, [fieldConfigs, activeTab]);

  const selectedValueForCurrentTab = useMemo(() => {
    return selectedValues[activeTab] || "";
  }, [selectedValues, activeTab]);

  const hasValues = useMemo(() => {
    return currentFieldData.values && currentFieldData.values.length > 0;
  }, [currentFieldData.values]);

  const tabs = useMemo(() => {
    return Object.entries(fieldConfigs).map(([fieldKey, fieldData]) => ({
      key: fieldKey,
      label: fieldData.label,
      count: fieldData.values ? fieldData.values.length : 0,
      isActive: activeTab === fieldKey,
    }));
  }, [fieldConfigs, activeTab]);

  const tableRows = useMemo(() => {
    if (!hasValues) return [];
    return currentFieldData.values.map((item) => ({
      ...item,
      isSelected: selectedValueForCurrentTab === item.value,
      isEditing: item.isEditing,
    }));
  }, [currentFieldData.values, selectedValueForCurrentTab, hasValues]);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Set Default Value Modal"
      style={styles}
    >
      <div className="set-default-value-modal">
        <div className="set-default-value-modal-header">
          <div className="set-default-value-modal-header-left">
            <div className="set-default-value-modal-icon">
              <Settings size={24} />
            </div>
            <div className="set-default-value-modal-title-group">
              <h2>Thiết lập giá trị mặc định</h2>
              <p>Chọn giá trị mặc định cho các trường</p>
            </div>
          </div>
          <div className="set-default-value-modal-header-right">
            <Button
              buttonType="button-close"
              size="small"
              onClick={handleClose}
              aria-label="Đóng modal"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="set-default-value-modal-body">
          <div className="set-default-value-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`set-default-value-tab ${
                  tab.isActive ? "set-default-value-tab-active" : ""
                }`}
                onClick={() => handleActiveTab(tab.key)}
              >
                {tab.label}
                {/* <span className="set-default-value-tab-count">
                  ({tab.count})
                </span> */}
              </button>
            ))}
          </div>

          <div className="set-default-value-tab-content">
            {hasValues && (
              <div className="set-default-value-table-container">
                <table className="set-default-value-table">
                  <thead>
                    <tr>
                      <th>Giá trị</th>
                      <th>Nhãn</th>
                      {/* <th>Thao tác</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((item) => (
                      <tr
                        key={item.id}
                        className={`table-row ${
                          item.isSelected ? "set-default-value-selected" : ""
                        } ${item.isEditing ? "set-default-value-editing" : ""}`}
                        onClick={() => !item.isEditing && handleRowClick(item)}
                      >
                        <td>
                          {item.isEditing ? (
                            <input
                              type="text"
                              value={editingItem?.value || ""}
                              onChange={(e) =>
                                handleInputChange("value", e.target.value)
                              }
                              className="set-default-value-edit-input"
                            />
                          ) : (
                            <span>{item.value}</span>
                          )}
                        </td>
                        <td>
                          {item.isEditing ? (
                            <input
                              type="text"
                              value={editingItem?.label || ""}
                              onChange={(e) =>
                                handleInputChange("label", e.target.value)
                              }
                              className="set-default-value-edit-input"
                            />
                          ) : (
                            <span>{item.label}</span>
                          )}
                        </td>
                        {/* <td className="set-default-value-action-cell">
                          {item.isEditing ? (
                            <div className="set-default-value-action-buttons">
                              <button
                                className="set-default-value-btn-icon set-default-value-btn-success"
                                onClick={handleSaveEdit}
                                title="Lưu"
                              >
                                <Save size={14} />
                              </button>
                              <button
                                className="set-default-value-btn-icon set-default-value-btn-secondary"
                                onClick={handleCancelEdit}
                                title="Hủy"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="set-default-value-action-buttons">
                              <button
                                className="set-default-value-btn-icon set-default-value-btn-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(item);
                                }}
                                title="Sửa"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                className="set-default-value-btn-icon set-default-value-btn-danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.id);
                                }}
                                title="Xóa"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* <div className="set-default-value-add-new-section">
              <h3>Thêm mới cho {currentFieldData.label}</h3>
              <div className="set-default-value-add-new-form">
                <input
                  type="text"
                  placeholder="Giá trị"
                  value={newItem.value}
                  onChange={(e) => handleNewItemChange("value", e.target.value)}
                  className="set-default-value-add-input"
                />
                <input
                  type="text"
                  placeholder="Nhãn"
                  value={newItem.label}
                  onChange={(e) => handleNewItemChange("label", e.target.value)}
                  className="set-default-value-add-input"
                />
                <button
                  className="set-default-value-btn set-default-value-btn-primary"
                  onClick={handleAddNew}
                  disabled={!newItem.value.trim() || !newItem.label.trim()}
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
            </div> */}

            {selectedValueForCurrentTab && (
              <div className="set-default-value-selected-info">
                <p>
                  Đã chọn cho {currentFieldData.label}:{" "}
                  <strong>{selectedValueForCurrentTab}</strong>
                </p>
              </div>
            )}
            {!currentFieldData.values && (
              <div className="set-default-value-custom-input-section">
                <h3>
                  {hasValues
                    ? `Nhập giá trị tùy chỉnh cho ${currentFieldData.label}`
                    : `Nhập giá trị cho ${currentFieldData.label}`}
                </h3>
                <div className="set-default-value-custom-input-form">
                  <input
                    type="text"
                    placeholder={`Nhập giá trị cho ${currentFieldData.label}...`}
                    value={customInputValue}
                    onChange={(e) => handleCustomInputChange(e.target.value)}
                    className="set-default-value-custom-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCustomInputSave();
                      }
                    }}
                  />
                  <Button
                    onClick={handleCustomInputSave}
                    disabled={!customInputValue.trim()}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* {Object.keys(selectedValues).length > 0 && (
            <div className="set-default-value-summary">
              <h3>Tổng kết các giá trị đã chọn:</h3>
              <div className="set-default-value-summary-list">
                {Object.entries(selectedValues).map(([fieldKey, value]) => (
                  <div
                    key={fieldKey}
                    className="set-default-value-summary-item"
                  >
                    <span className="set-default-value-summary-label">
                      {fieldConfigs[fieldKey]?.label}:
                    </span>
                    <span className="set-default-value-summary-value">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        <div className="set-default-value-modal-footer">
          <Button variant="none" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={Object.keys(selectedValues).length === 0}
          >
            Lưu tất cả
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    maxWidth: "90vw",
    maxHeight: "85vh",
    padding: "0",
    borderRadius: "12px",
    border: "none",
    background: "white",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
};

SetValueTableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.object,
  selectedValues: PropTypes.object,
};

export default SetValueTableModal;
