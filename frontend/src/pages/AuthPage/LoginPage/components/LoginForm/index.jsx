import PropTypes from "prop-types";
import { Mail, Lock } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { FormField } from "../../../components";
import LoginActions from "../LoginActions";

const LoginForm = ({ register, handleSubmit, errors, isSubmitting }) => {
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
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự",
          },
        })}
        type="password"
        placeholder="Nhập mật khẩu"
        id="password"
        label="Mật khẩu"
        icon={<Lock />}
        error={errors.password?.message}
      />

      <LoginActions register={register} />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        style={{ width: "100%" }}
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default LoginForm;
