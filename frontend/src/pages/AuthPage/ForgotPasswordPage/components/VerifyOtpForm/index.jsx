import PropTypes from "prop-types";
import { Shield } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { FormField } from "../../../components";
import "./VerifyOtpForm.css";

const VerifyOtpForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onResendOtp,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        {...register("otp", {
          required: "Mã xác thực là bắt buộc.",
          pattern: {
            value: /^\d{6}$/,
            message: "Mã xác thực phải là 6 chữ số",
          },
        })}
        type="text"
        placeholder="Nhập mã 6 chữ số"
        id="otp"
        label="Mã xác thực"
        icon={<Shield />}
        maxLength={6}
        error={errors.otp?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang xác thực..." : "Xác thực"}
      </Button>

      <div className="verify-otp-form-actions">
        <button
          type="button"
          className="verify-otp-form-resend-link"
          onClick={onResendOtp}
        >
          Gửi lại mã xác thực
        </button>
      </div>
    </form>
  );
};

VerifyOtpForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onResendOtp: PropTypes.func.isRequired,
};

export default VerifyOtpForm;
