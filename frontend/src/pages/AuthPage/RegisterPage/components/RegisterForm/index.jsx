import PropTypes from "prop-types";
import { Mail, Lock, User } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { FormField } from "../../../components";
import TermsCheckbox from "../TermsCheckbox";

const RegisterForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        {...register("fullName", {
          required: "Họ và tên là bắt buộc.",
          minLength: {
            value: 2,
            message: "Họ và tên phải có ít nhất 2 ký tự",
          },
        })}
        type="text"
        placeholder="Nhập họ và tên"
        id="fullName"
        label="Họ và tên"
        icon={<User />}
        error={errors.fullName?.message}
      />

      <FormField
        {...register("email", {
          required: "Email là bắt buộc.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ",
          },
        })}
        type="email"
        placeholder="Nhập email"
        id="email"
        label="Email"
        icon={<Mail />}
        error={errors.email?.message}
      />

      <FormField
        {...register("password", {
          required: "Mật khẩu là bắt buộc.",
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
        placeholder="Nhập mật khẩu"
        id="password"
        label="Mật khẩu"
        icon={<Lock />}
        error={errors.password?.message}
      />

      <FormField
        {...register("confirmPassword", {
          required: "Xác nhận mật khẩu là bắt buộc.",
          validate: (value) =>
            value === password || "Mật khẩu xác nhận không khớp",
        })}
        type="password"
        placeholder="Nhập lại mật khẩu"
        id="confirmPassword"
        label="Xác nhận mật khẩu"
        icon={<Lock />}
        error={errors.confirmPassword?.message}
      />

      <TermsCheckbox register={register} errors={errors} />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        style={{ width: "100%" }}
      >
        {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  password: PropTypes.string,
};

export default RegisterForm;
