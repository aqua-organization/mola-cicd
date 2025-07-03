import { useState } from "react";

const useMultiStepModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [invoiceData, setInvoiceData] = useState([]);
  const [crawlInfo, setCrawlInfo] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
    setStep(1);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setStep(1);
    setInvoiceData([]);
    setCrawlInfo(null);
  };

  const handleNextStep = (data = null, info = null) => {
    if (data) {
      setInvoiceData(data);
    }
    if (info) {
      setCrawlInfo(info);
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return {
    isOpen,
    step,
    invoiceData,
    crawlInfo,
    handleOpenModal,
    handleCloseModal,
    handleNextStep,
    handlePreviousStep,
  };
};

export default useMultiStepModal;
