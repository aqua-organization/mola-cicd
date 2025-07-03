import { useState, useCallback } from "react";
import { getEInvoice } from "../../../services/eInvoiceService";

export const useGetEInvoiceModal = () => {
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

  const handleGetInvoices = useCallback(
    async (formData) => {
      setIsLoading(true);
      setError(null);

      try {
        const payload = {
          type: formData.type,
          process_type: "chitiet",
          date_range: {
            start: formData.startDate,
            end: formData.endDate,
          },
          output_path: "D:\\outputs",
        };

        console.log("Get invoices payload:", payload);

        let response;
        response = await getEInvoice(payload);

        console.log("Get invoices successful", response);
        closeModal();
        return { ...response, crawlInfo: payload };
      } catch (err) {
        const errorMessage =
          err.message || "Đã có lỗi xảy ra khi lấy dữ liệu hóa đơn";
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
    handleGetInvoices,
    resetError,
  };
};
