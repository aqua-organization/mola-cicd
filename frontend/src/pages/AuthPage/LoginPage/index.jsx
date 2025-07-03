import { AuthHeader, AuthDivider } from "../components";
import LoginForm from "./components/LoginForm";
import useLogin from "./hooks/useLogin";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="login-page">
      <AuthHeader subtitle="Đăng nhập để bắt đầu học tập" />
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <AuthDivider />
      <div className="login-page-form-register-container">
        <p className="login-page-form-register-text">Bạn chưa có tài khoản?</p>
        <Link to="/auth/register" className="login-page-form-register-link">
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
