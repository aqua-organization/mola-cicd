import "./PurchasePage.css";
import { useState } from "react";

// Components
import BaseTable from "../../components/BaseTable";

// Configs
import {
  tablePurchaseInvoiceFields,
  mockDataPurchaseInvoice,
} from "./purchaseTableConfig";

// Services
import { getPurchaseInvoiceDetail } from "../../services/invoiceService";

// Modals
import ShowInvoiceDetailModal from "../../modals/ShowInvoiceDetailModal";

// Configs
import { INVOICE_TYPE } from "../../configs/invoiceConfig";

const PurchasePage = () => {
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowInvoiceDetailModal(true);
  };

  return (
    <div className="purchase-page">
      <BaseTable
        columns={tablePurchaseInvoiceFields}
        data={mockDataPurchaseInvoice}
        enableSelection={true}
        onRowClick={handleRowClick}
      />

      {showInvoiceDetailModal && selectedRow && (
        <ShowInvoiceDetailModal
          isOpen={showInvoiceDetailModal}
          onClose={() => {
            setShowInvoiceDetailModal(false);
            setSelectedRow(null);
          }}
          crawlInfo={{
            fetchData: () =>
              getPurchaseInvoiceDetail({ purchaseInvoiceId: selectedRow._id }),
            type: INVOICE_TYPE.PURCHASE,
          }}
        />
      )}
    </div>
  );
};

export default PurchasePage;
