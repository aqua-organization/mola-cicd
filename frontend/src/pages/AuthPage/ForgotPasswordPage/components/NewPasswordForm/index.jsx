import PropTypes from "prop-types";
import { Lock } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { FormField } from "../../../components";

const NewPasswordForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  newPassword,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        {...register("newPassword", {
          required: "Mật khẩu mới là bắt buộc.",
          minLength: {
            value: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message:
              "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
          },
        })}
        type="password"
        placeholder="Nhập mật khẩu mới"
        id="newPassword"
        label="Mật khẩu mới"
        icon={<Lock />}
        error={errors.newPassword?.message}
      />

      <FormField
        {...register("confirmNewPassword", {
          required: "Xác nhận mật khẩu mới là bắt buộc.",
          validate: (value) =>
            value === newPassword || "Mật khẩu xác nhận không khớp",
        })}
        type="password"
        placeholder="Nhập lại mật khẩu mới"
        id="confirmNewPassword"
        label="Xác nhận mật khẩu mới"
        icon={<Lock />}
        error={errors.confirmNewPassword?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
      </Button>
    </form>
  );
};

NewPasswordForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  newPassword: PropTypes.string,
};

export default NewPasswordForm;
