import { normalizeObjectKeys } from "./object.util.js";
import { EINVOICE_TYPE } from "../constants/eInvoice.constant.js";

const extractBaseInvoice = (invoice) => {
  const normalizedInvoice = normalizeObjectKeys(invoice);
  return {
    itemName: normalizedInvoice["tên_hàng_hóa,_dịch_vụ"],
    itemCode: normalizedInvoice["mã_hàng_hóa,_dịch_vụ"],
    unit: normalizedInvoice["đơn_vị_tính"],
    quantity: normalizedInvoice["số_lượng"],
    unitPrice: normalizedInvoice["đơn_giá"],
    amount: normalizedInvoice["thành_tiền_chưa_thuế"],
    discountRate: normalizedInvoice["chiết_khấu"],
    accountingDate: normalizedInvoice["ngày_lập_hóa_đơn"],
    documentDate: normalizedInvoice["ngày_lập_hóa_đơn"],
    invoiceNumber: normalizedInvoice["số_hóa_đơn"],
    invoiceSymbol: normalizedInvoice["ký_hiệu_hóa_đơn"],
  };
};

function mapESalesInvoice(invoice, userId) {
  const baseInvoice = extractBaseInvoice(invoice);
  const normalizedInvoice = normalizeObjectKeys(invoice);
  const invoiceKey = `${baseInvoice.invoiceNumber}-${baseInvoice.invoiceSymbol}-${userId}`;

  return {
    ...baseInvoice,
    invoiceKey,
    customerCode: normalizedInvoice["mst_người_mua"],
    customerName: normalizedInvoice["tên_người_mua"],
  };
}

function mapEPurchaseInvoice(invoice, userId) {
  const baseInvoice = extractBaseInvoice(invoice);
  const normalizedInvoice = normalizeObjectKeys(invoice);
  const invoiceKey = `${baseInvoice.invoiceNumber}-${baseInvoice.invoiceSymbol}-${userId}`;

  return {
    ...baseInvoice,
    invoiceKey,
    supplierCode: normalizedInvoice["mst_người_bán"],
    supplierName: normalizedInvoice["tên_người_bán"],
  };
}

export const mapEInvoice = {
  [EINVOICE_TYPE.SALES]: mapESalesInvoice,
  [EINVOICE_TYPE.PURCHASE]: mapEPurchaseInvoice,
};
