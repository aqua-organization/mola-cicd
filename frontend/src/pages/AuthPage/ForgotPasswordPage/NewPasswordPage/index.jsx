import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "../../components";
import NewPasswordForm from "../components/NewPasswordForm";
import useNewPassword from "../hooks/useNewPassword";
import "../ForgotPasswordPage.css";

const NewPasswordPage = ({ email, otpToken, onSuccess, onBack }) => {
  const { register, handleSubmit, errors, isSubmitting, newPassword } =
    useNewPassword(email, otpToken, onSuccess);

  return (
    <>
      <AuthHeader subtitle="Tạo mật khẩu mới cho tài khoản của bạn" />
      <NewPasswordForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        newPassword={newPassword}
      />
      <div className="back-container">
        <button type="button" className="back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>
    </>
  );
};

NewPasswordPage.propTypes = {
  email: PropTypes.string.isRequired,
  otpToken: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default NewPasswordPage;
