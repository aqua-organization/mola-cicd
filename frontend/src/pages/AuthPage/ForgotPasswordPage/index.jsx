import SendOtpPage from "./SendOtpPage";
import VerifyOtpPage from "./VerifyOtpPage";
import NewPasswordPage from "./NewPasswordPage";
import useForgotPassword from "./hooks/useForgotPassword";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const {
    currentStep,
    email,
    otpToken,
    handleSendOtpSuccess,
    handleVerifyOtpSuccess,
    handleNewPasswordSuccess,
    handleBackToSendOtp,
    handleBackToVerifyOtp,
  } = useForgotPassword();

  return (
    <div className="forgot-password-page">
      {currentStep === 1 && <SendOtpPage onSuccess={handleSendOtpSuccess} />}
      {currentStep === 2 && (
        <VerifyOtpPage
          email={email}
          onSuccess={handleVerifyOtpSuccess}
          onBack={handleBackToSendOtp}
        />
      )}
      {currentStep === 3 && (
        <NewPasswordPage
          email={email}
          otpToken={otpToken}
          onSuccess={handleNewPasswordSuccess}
          onBack={handleBackToVerifyOtp}
        />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
