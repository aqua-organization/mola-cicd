import "./LoginEInvoiceForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  User,
  Shield,
  LogIn,
} from "lucide-react";
import PropTypes from "prop-types";
import { useCaptcha } from "../../hooks/useCaptcha";

const LoginEInvoiceForm = ({ onSubmit, onCancel, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    captchaData,
    isLoading: captchaLoading,
    refreshCaptcha,
  } = useCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taxCode: "0302147168",
      password: "pTEZ1aA@",
      captcha: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const onFormSubmit = async (data) => {
    try {
      // Auto-include captcha key with form data
      await onSubmit(data, captchaData.key);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Form submission error:", error);
      // Don't reset form on error so user can correct and retry
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // Validation rules
  const validationRules = {
    taxCode: {
      required: "Vui lòng nhập mã số thuế",
      pattern: {
        value: /^\d{10}$|^\d{13}$/,
        message: "Mã số thuế phải có 10 hoặc 13 chữ số",
      },
    },
    password: {
      required: "Vui lòng nhập mật khẩu",
      minLength: {
        value: 1,
        message: "Mật khẩu không được để trống",
      },
    },
    captcha: {
      required: "Vui lòng nhập mã captcha",
      minLength: {
        value: 1,
        message: "Mã captcha không được để trống",
      },
    },
  };

  return (
    <form
      className="login-e-invoice-form"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {/* Tax Code Field */}
      <div className="form-group">
        <label htmlFor="taxCode" className="form-label">
          <User size={16} />
          Mã số thuế doanh nghiệp
        </label>
        <input
          type="text"
          id="taxCode"
          {...register("taxCode", validationRules.taxCode)}
          className={`form-input ${errors.taxCode ? "error" : ""}`}
          placeholder="Nhập mã số thuế (10 hoặc 13 số)"
          maxLength="13"
          disabled={isLoading}
        />
        {errors.taxCode && (
          <span className="error-message">{errors.taxCode.message}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          <Lock size={16} />
          Mật khẩu
        </label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", validationRules.password)}
            className={`form-input ${errors.password ? "error" : ""}`}
            placeholder="Nhập mật khẩu"
            disabled={isLoading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      {/* Captcha Field */}
      <div className="form-group">
        <label htmlFor="captcha" className="form-label">
          <Shield size={16} />
          Mã xác thực
        </label>

        <div className="captcha-container">
          <div className="captcha-image-wrapper">
            {captchaLoading ? (
              <div className="captcha-loading">
                <RefreshCw size={20} className="spin" />
                <span>Đang tải...</span>
              </div>
            ) : captchaData.type === "svg" ? (
              <div
                className="captcha-svg"
                dangerouslySetInnerHTML={{ __html: captchaData.content }}
              />
            ) : (
              <img
                src={captchaData.content}
                alt="Captcha"
                className="captcha-image"
                onError={() => console.error("Failed to load captcha image")}
              />
            )}
          </div>

          <button
            type="button"
            className="captcha-refresh-btn"
            onClick={refreshCaptcha}
            disabled={captchaLoading || isLoading}
            title="Làm mới mã captcha"
          >
            <RefreshCw size={16} className={captchaLoading ? "spin" : ""} />
          </button>
        </div>

        <input
          type="text"
          id="captcha"
          {...register("captcha", validationRules.captcha)}
          className={`form-input ${errors.captcha ? "error" : ""}`}
          placeholder="Nhập mã xác thực"
          maxLength="6"
          disabled={isLoading}
        />
        {errors.captcha && (
          <span className="error-message">{errors.captcha.message}</span>
        )}
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
              Đang đăng nhập...
            </>
          ) : (
            <>
              <LogIn size={16} />
              Đăng nhập
            </>
          )}
        </button>
      </div>
    </form>
  );
};

LoginEInvoiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginEInvoiceForm;
