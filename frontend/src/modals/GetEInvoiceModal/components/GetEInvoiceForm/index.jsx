import "./GetEInvoiceForm.css";
import { useForm } from "react-hook-form";
import {
  RefreshCw,
  Calendar,
  FileText,
  Download,
  ChevronDown,
} from "lucide-react";
import PropTypes from "prop-types";

const GetEInvoiceForm = ({ onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      type: 1,
      startDate: "",
      endDate: "",
    },
    mode: "onChange",
  });

  // Watch values for cross-field validation
  const startDate = watch("startDate");

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // Format date for display (DD/MM/YYYY)
  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Custom validation for date range
  const validateEndDate = (value) => {
    if (!value) return "Vui lòng chọn ngày kết thúc";
    if (!startDate) return true;

    const start = new Date(startDate);
    const end = new Date(value);

    if (end < start) {
      return "Ngày kết thúc phải sau ngày bắt đầu";
    }

    // Check if date range is not more than 30 days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1000) {
      return "Khoảng thời gian không được quá 30 ngày";
    }

    return true;
  };

  const validateStartDate = (value) => {
    if (!value) return "Vui lòng chọn ngày bắt đầu";

    const today = new Date();
    const selected = new Date(value);

    // Don't allow future dates
    if (selected > today) {
      return "Không thể chọn ngày trong tương lai";
    }

    return true;
  };

  // Validation rules
  const validationRules = {
    type: {
      required: "Vui lòng chọn loại hóa đơn",
    },
    startDate: {
      required: "Vui lòng chọn ngày bắt đầu",
      validate: validateStartDate,
    },
    endDate: {
      required: "Vui lòng chọn ngày kết thúc",
      validate: validateEndDate,
    },
  };

  // Transform data before submit
  const transformFormData = (data) => {
    return {
      ...data,
      startDate: formatDateForAPI(data.startDate),
      endDate: formatDateForAPI(data.endDate),
    };
  };

  const handleFormSubmit = (data) => {
    const transformedData = transformFormData(data);
    onFormSubmit(transformedData);
  };

  return (
    <form
      className="get-e-invoice-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Invoice Type Field */}
      <div className="form-group">
        <label htmlFor="type" className="form-label">
          <FileText size={16} />
          Loại hóa đơn
        </label>
        <div className="select-wrapper">
          <select
            id="type"
            {...register("type", validationRules.type)}
            className={`form-select ${errors.type ? "error" : ""}`}
            disabled={isLoading}
          >
            <option value={1}>Hóa đơn bán ra</option>
            <option value={2}>Hóa đơn mua vào</option>
          </select>
          <ChevronDown size={16} className="select-icon" />
        </div>
        {errors.type && (
          <span className="error-message">{errors.type.message}</span>
        )}
      </div>

      {/* Date Range Fields */}
      <div className="date-range-group">
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            <Calendar size={16} />
            Từ ngày
          </label>
          <input
            type="date"
            id="startDate"
            {...register("startDate", validationRules.startDate)}
            className={`form-input ${errors.startDate ? "error" : ""}`}
            disabled={isLoading}
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            <Calendar size={16} />
            Đến ngày
          </label>
          <input
            type="date"
            id="endDate"
            {...register("endDate", validationRules.endDate)}
            className={`form-input ${errors.endDate ? "error" : ""}`}
            disabled={isLoading}
          />
          {errors.endDate && (
            <span className="error-message">{errors.endDate.message}</span>
          )}
        </div>
      </div>

      {/* Info Note */}
      <div className="info-notice">
        <FileText size={16} />
        <span>
          Chỉ có thể lấy dữ liệu trong khoảng thời gian tối đa 30 ngày
        </span>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Hủy
        </button>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw size={16} className="spin" />
              Đang lấy dữ liệu...
            </>
          ) : (
            <>
              <Download size={16} />
              Lấy dữ liệu
            </>
          )}
        </button>
      </div>
    </form>
  );
};

GetEInvoiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default GetEInvoiceForm;
