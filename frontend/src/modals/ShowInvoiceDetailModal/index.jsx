import "./ShowInvoiceDetailModal.css";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { X, Database, AlertTriangle, Save, Download } from "lucide-react";
import { useHandleTable } from "./hooks/useHandleTable";
import { useState, useRef } from "react";
import BaseTable from "../../components/BaseTable";
import {
  tableSalesInvoiceFields,
  tablePurchaseInvoiceFields,
  mockPurchaseInvoiceData,
} from "./invoiceDetailConfig";
import Button from "../../components/ui/Button";

// Configs
import { INVOICE_TYPE } from "../../configs/invoiceConfig";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "95vw",
    maxWidth: "1400px",
    height: "90vh",
    maxHeight: "90vh",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "0",
    border: "none",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)",
  },
};

const ShowInvoiceDetailModal = ({
  isOpen,
  onClose,
  initialData = mockPurchaseInvoiceData,
  crawlInfo = null,
}) => {
  const {
    data,
    isLoading,
    error,
    hasUnsavedChanges,
    handleExportExcel,
    handleSaveChanges,
    resetError,
  } = useHandleTable(initialData);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const tableWrapperRef = useRef(null);

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  const handleSaveAndClose = async () => {
    try {
      await handleSaveChanges();
      setShowConfirmDialog(false);
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className="show-invoice-detail-modal"
        style={customStyles}
        contentLabel="Quản lý dữ liệu hóa đơn"
        onRequestClose={handleCloseAttempt}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="show-invoice-detail-modal-content">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-left">
              <div className="modal-icon">
                <Database size={24} />
              </div>
              <div className="modal-title-group">
                <h2 className="modal-title">Quản lý dữ liệu hóa đơn</h2>
                <p className="modal-subtitle">
                  {crawlInfo
                    ? `Dữ liệu từ ${crawlInfo.startDate} đến ${
                        crawlInfo.endDate
                      } - ${
                        crawlInfo.type === INVOICE_TYPE.SALES
                          ? "Hóa đơn bán ra"
                          : "Hóa đơn mua vào"
                      }`
                    : "Quản lý và chỉnh sửa dữ liệu hóa đơn"}
                  {hasUnsavedChanges && (
                    <span className="unsaved-indicator">
                      ● Có thay đổi chưa lưu
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="modal-header-actions">
              {/* Import/Export Buttons */}
              {/* <button
                className="action-btn import-btn"
                onClick={handleImportExcel}
                disabled={isLoading}
                title="Import từ Excel"
              >
                <Upload size={16} />
                Import
              </button> */}

              {/* <ExcelImportGuide /> */}

              <button
                className="action-btn export-btn"
                onClick={handleExportExcel}
                disabled={isLoading || data.length === 0}
                title="Export ra Excel"
              >
                <Download size={16} />
                Export
              </button>

              <Button
                buttonType="button-close"
                size="small"
                onClick={handleCloseAttempt}
                aria-label="Đóng modal"
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Error Display */}
            {error && (
              <div className="error-alert">
                <AlertTriangle size={16} />
                <span>{error}</span>
                <button
                  className="error-close-btn"
                  onClick={resetError}
                  aria-label="Đóng thông báo lỗi"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Data Table */}
            <BaseTable
              fetchData={crawlInfo?.fetchData}
              data={initialData}
              enableSelection={true}
              enableAction={false}
              isLoading={isLoading}
              tableWrapperRef={tableWrapperRef}
              columns={
                crawlInfo?.type === INVOICE_TYPE.SALES
                  ? tableSalesInvoiceFields
                  : tablePurchaseInvoiceFields
              }
            />
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <Button variant="none" onClick={handleCancelClose}>
                Hủy
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={!hasUnsavedChanges}
                loading={isLoading}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <Modal
          isOpen={showConfirmDialog}
          className="confirmation-dialog"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "auto",
              backgroundColor: "white",
              position: "absolute",
              borderRadius: "12px",
              padding: "24px",
              border: "none",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
          contentLabel="Xác nhận đóng"
        >
          <div className="confirm-dialog-content">
            <div className="confirm-icon">
              <AlertTriangle size={32} color="#f59e0b" />
            </div>
            <h3 className="confirm-title">Bạn có chắc chắn muốn đóng?</h3>
            <p className="confirm-message">
              Bạn có thay đổi chưa được lưu. Nếu đóng bây giờ, các thay đổi sẽ
              bị mất.
            </p>
            <div className="confirm-actions">
              <Button variant="none" onClick={handleCancelClose}>
                Hủy
              </Button>
              <Button onClick={handleSaveAndClose} disabled={isLoading}>
                <Save size={16} />
                Lưu & Đóng
              </Button>
              <Button className="btn btn-danger" onClick={handleConfirmClose}>
                Đóng không lưu
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

ShowInvoiceDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.array,
  crawlInfo: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    type: PropTypes.number,
  }),
};

export default ShowInvoiceDetailModal;

// Export custom hook for external use
