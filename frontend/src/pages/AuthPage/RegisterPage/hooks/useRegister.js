import { useForm } from "react-hook-form";

const useRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log("Register data:", data);
      // Add your registration logic here
      // e.g., await registerUser(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    password,
  };
};

export default useRegister;
