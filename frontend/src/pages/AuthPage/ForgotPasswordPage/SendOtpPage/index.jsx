import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "../../components";
import SendOtpForm from "../components/SendOtpForm";
import useSendOtp from "../hooks/useSendOtp";
import "./SendOtpPage.css";

const SendOtpPage = ({ onSuccess }) => {
  const { register, handleSubmit, errors, isSubmitting } =
    useSendOtp(onSuccess);

  return (
    <>
      <AuthHeader subtitle="Nhập email của bạn để nhận mã xác thực" />
      <SendOtpForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <div className="send-otp-page-back-container">
        <a href="/auth/login" className="send-otp-page-back-link">
          <ArrowLeft size={16} />
          Quay lại đăng nhập
        </a>
      </div>
    </>
  );
};

SendOtpPage.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SendOtpPage;
