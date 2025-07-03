import "./LoginEInvoiceModal.css";
import Modal from "react-modal";
import PropTypes from "prop-types";
import LoginEInvoiceForm from "./components/LoginEInvoiceForm";
import { X, FileText, Shield, AlertCircle } from "lucide-react";
import { useLoginEInvoiceModal } from "./hooks/useLoginEInvoiceModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "480px",
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

const LoginEInvoiceModal = ({ isOpen, onClose, onSuccess }) => {
  const { isLoading, error, handleLogin, resetError } = useLoginEInvoiceModal();

  const handleFormSubmit = async (formData, captchaKey) => {
    try {
      const result = await handleLogin(formData, captchaKey);
      if (result.success && onSuccess) {
        onSuccess(result.data);
      }
    } catch (err) {
      // Error is already handled in the hook
      console.error("Login failed:", err.message);
    }
  };

  const handleClose = () => {
    resetError();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      className="login-e-invoice-modal"
      style={customStyles}
      contentLabel="Đăng nhập Hóa đơn điện tử"
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="login-e-invoice-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon">
              <FileText size={24} />
            </div>
            <div className="modal-title-group">
              <h2 className="modal-title">Đăng nhập Hóa đơn điện tử</h2>
              <p className="modal-subtitle">
                Vui lòng nhập thông tin để tiếp tục
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
            <Shield size={16} />
            <span>Kết nối an toàn với cổng thông tin hóa đơn điện tử</span>
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

          <LoginEInvoiceForm
            onSubmit={handleFormSubmit}
            onCancel={handleClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

LoginEInvoiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default LoginEInvoiceModal;

// Export custom hook for external use
