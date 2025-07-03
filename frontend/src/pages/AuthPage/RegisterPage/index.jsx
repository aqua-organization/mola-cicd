import { AuthHeader } from "../components";
import RegisterForm from "./components/RegisterForm";
import useRegister from "./hooks/useRegister";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { register, handleSubmit, errors, isSubmitting, password } =
    useRegister();

  return (
    <div className="register-page">
      <AuthHeader subtitle="Tạo tài khoản để bắt đầu học tập" />
      <RegisterForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        password={password}
      />

      <div className="register-page-form-login-container">
        <p className="register-page-form-login-text">Bạn đã có tài khoản?</p>
        <Link to="/auth/login" className="register-page-form-login-link">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
