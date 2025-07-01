import "./PurchasePage.css";

// Components
import BaseTable from "../../components/BaseTable";

// Configs
import { tablePurchaseInvoiceFields } from "./purchaseTableConfig";

// Services
// import { getSalesInvoicesByPage } from "../../services/invoiceService";

const PurchasePage = () => {
  return (
    <div className="purchase-page">
      <BaseTable
        columns={tablePurchaseInvoiceFields}
        typeTable={1}
        // fetchData={getSalesInvoicesByPage}
        enableSelection={true}
        enableAction={true}
      />
    </div>
  );
};

export default PurchasePage;
