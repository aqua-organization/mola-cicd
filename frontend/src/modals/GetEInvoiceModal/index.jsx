import "./GetEInvoiceModal.css";
import Modal from "react-modal";
import PropTypes from "prop-types";
import GetEInvoiceForm from "./components/GetEInvoiceForm";
import { X, FileText, Download, AlertCircle } from "lucide-react";
import { useGetEInvoiceModal } from "./hooks/useGetEInvoiceModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "520px",
    maxWidth: "90vw",
    height: "auto",
    maxHeight: "90vh",
    backgroundColor: "white",
    borderRadius: "12px",
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

const GetEInvoiceModal = ({ isOpen, onClose, onSuccess, onPrevious }) => {
  const { isLoading, error, handleGetInvoices, resetError } =
    useGetEInvoiceModal();

  const handleFormSubmit = async (formData) => {
    try {
      const result = await handleGetInvoices(formData);
      if (result.success && onSuccess) {
        console.log("result.data", result.data);
        console.log("result.crawlInfo", result.crawlInfo);
        onSuccess(result.data, result.crawlInfo);
      }
    } catch (err) {
      console.error("Get invoices failed:", err.message);
    }
  };

  const handleClose = () => {
    resetError();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      className="get-e-invoice-modal"
      style={customStyles}
      contentLabel="Lấy dữ liệu Hóa đơn điện tử"
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="get-e-invoice-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon">
              <Download size={24} />
            </div>
            <div className="modal-title-group">
              <h2 className="modal-title">Lấy dữ liệu Hóa đơn điện tử</h2>
              <p className="modal-subtitle">
                Chọn khoảng thời gian và loại hóa đơn để lấy dữ liệu
              </p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Đóng modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="security-notice">
            <FileText size={16} />
            <span>Dữ liệu được lấy từ cổng thông tin hóa đơn điện tử</span>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-alert">
              <AlertCircle size={16} />
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

          <GetEInvoiceForm
            onSubmit={handleFormSubmit}
            onCancel={handleClose}
            onPrevious={onPrevious}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

GetEInvoiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onPrevious: PropTypes.func,
};

export default GetEInvoiceModal;

// Export custom hook for external use
export { useGetEInvoiceModal };
