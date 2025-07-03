import { useForm } from "react-hook-form";

const useSendOtp = (onSuccess) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Sending OTP to:", data.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call success callback with email
      onSuccess(data.email);
    } catch (error) {
      console.error("Send OTP error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};

export default useSendOtp;
