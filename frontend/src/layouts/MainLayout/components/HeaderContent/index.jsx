import "./HeaderContent.css";
import ButtonGetEInvoice from "./components/ButtonGetEInvoice";
import LoginEInvoiceModal from "../../../../modals/LoginEInvoiceModal";
import GetEInvoiceModal from "../../../../modals/GetEInvoiceModal";
import useMultiStepModal from "./hooks/useMultiStepModal";

const HeaderContent = () => {
  const {
    isOpen,
    step,
    handleOpenModal,
    handleCloseModal,
    handleNextStep,
    handlePreviousStep,
  } = useMultiStepModal();

  const handleGetEInvoiceSuccess = (data, info) => {
    console.log("data", data);
    console.log("info", info);
    handleNextStep(data, info);
  };

  return (
    <div className="header-content">
      <ButtonGetEInvoice onClick={handleOpenModal} />

      {/* Step 1: Login */}
      <LoginEInvoiceModal
        isOpen={isOpen && step === 1}
        onClose={handleCloseModal}
        onSuccess={handleNextStep}
      />

      {/* Step 2: Get Invoice Data */}
      <GetEInvoiceModal
        isOpen={isOpen && step === 2}
        onClose={handleCloseModal}
        onSuccess={handleGetEInvoiceSuccess}
        onPrevious={handlePreviousStep}
      />
    </div>
  );
};

export default HeaderContent;
