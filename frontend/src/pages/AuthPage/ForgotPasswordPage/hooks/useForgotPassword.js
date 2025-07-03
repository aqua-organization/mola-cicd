import { useState } from "react";

const useForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");

  const handleSendOtpSuccess = (userEmail) => {
    setEmail(userEmail);
    setCurrentStep(2);
  };

  const handleVerifyOtpSuccess = (token) => {
    setOtpToken(token);
    setCurrentStep(3);
  };

  const handleNewPasswordSuccess = () => {
    // Redirect to login page or show success message
    console.log("Password reset successfully!");
    // Reset all state
    setCurrentStep(1);
    setEmail("");
    setOtpToken("");
  };

  const handleBackToSendOtp = () => {
    setCurrentStep(1);
    setEmail("");
  };

  const handleBackToVerifyOtp = () => {
    setCurrentStep(2);
    setOtpToken("");
  };

  return {
    currentStep,
    email,
    otpToken,
    handleSendOtpSuccess,
    handleVerifyOtpSuccess,
    handleNewPasswordSuccess,
    handleBackToSendOtp,
    handleBackToVerifyOtp,
  };
};

export default useForgotPassword;
