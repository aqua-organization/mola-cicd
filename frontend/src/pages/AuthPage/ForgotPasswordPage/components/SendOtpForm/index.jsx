import PropTypes from "prop-types";
import { Mail } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { FormField } from "../../../components";

const SendOtpForm = ({ register, handleSubmit, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        {...register("email", {
          required: "Email là bắt buộc.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ",
          },
        })}
        type="email"
        placeholder="Nhập email của bạn"
        id="email"
        label="Email"
        icon={<Mail />}
        error={errors.email?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang gửi mã..." : "Gửi mã xác thực"}
      </Button>
    </form>
  );
};

SendOtpForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default SendOtpForm;
