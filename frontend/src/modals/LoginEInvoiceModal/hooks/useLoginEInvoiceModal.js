import { useState, useCallback } from "react";
// import { invoiceApi } from "../../../features/invoice/invoiceApi";
import { login } from "../../../services/eInvoiceService";

export const useLoginEInvoiceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setError(null);
  }, []);

  const handleLogin = useCallback(
    async (formData, captchaKey) => {
      setIsLoading(true);
      setError(null);

      try {
        // Prepare login data with captcha key
        const loginPayload = {
          username: formData.taxCode,
          password: formData.password,
          captcha: formData.captcha,
          ckey: captchaKey, // Auto-include captcha key
        };

        console.log("Login payload:", loginPayload);

        // Call actual login API
        // const response = await invoiceApi.loginInvoice(loginPayload);
        const response = await login(loginPayload);

        console.log("Login successful", response);
        closeModal();
        return { success: response.success, data: response };
      } catch (err) {
        const errorMessage = err.message || "Đã có lỗi xảy ra khi đăng nhập";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [closeModal]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isOpen,
    isLoading,
    error,
    openModal,
    closeModal,
    handleLogin,
    resetError,
  };
};
