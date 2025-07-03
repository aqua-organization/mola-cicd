import { useForm } from "react-hook-form";

const useVerifyOtp = (email, onSuccess) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Verifying OTP:", data.otp, "for email:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate OTP verification success
      const mockToken = "otp_verified_token_" + Date.now();
      onSuccess(mockToken);
    } catch (error) {
      console.error("Verify OTP error:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      console.log("Resending OTP to:", email);
      // Simulate resend OTP API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Mã xác thực đã được gửi lại!");
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    handleResendOtp,
  };
};

export default useVerifyOtp;
