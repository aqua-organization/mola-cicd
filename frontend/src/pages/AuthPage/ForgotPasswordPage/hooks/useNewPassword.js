import { useForm } from "react-hook-form";

const useNewPassword = (email, otpToken, onSuccess) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      console.log("Setting new password for:", email, "with token:", otpToken);
      console.log("New password data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call success callback
      onSuccess();
    } catch (error) {
      console.error("Set new password error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    newPassword,
  };
};

export default useNewPassword;
