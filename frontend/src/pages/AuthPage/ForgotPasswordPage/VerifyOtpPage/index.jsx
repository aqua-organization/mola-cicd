import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "../../components";
import VerifyOtpForm from "../components/VerifyOtpForm";
import useVerifyOtp from "../hooks/useVerifyOtp";
import "../ForgotPasswordPage.css";

const VerifyOtpPage = ({ email, onSuccess, onBack }) => {
  const { register, handleSubmit, errors, isSubmitting, handleResendOtp } =
    useVerifyOtp(email, onSuccess);

  return (
    <>
      <AuthHeader
        subtitle={
          <>
            Nhập mã xác thực đã được gửi đến
            <br />
            <strong>{email}</strong>
          </>
        }
      />
      <VerifyOtpForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onResendOtp={handleResendOtp}
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

VerifyOtpPage.propTypes = {
  email: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default VerifyOtpPage;
