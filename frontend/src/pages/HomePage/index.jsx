import ShowInvoiceDetailModal from "../../modals/ShowInvoiceDetailModal";

const HomePage = () => {
  return (
    <div>
      <ShowInvoiceDetailModal
        isOpen={true}
        onClose={() => {}}
        crawlInfo={null}
      />
    </div>
  );
};

export default HomePage;
