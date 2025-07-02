import {
  GET_SALES_INVOICE_DETAIL_URL,
  GET_PURCHASE_INVOICE_DETAIL_URL,
} from "../constants/invoiceConstant";
import apiClient from "../configs/axiosConfig";

export const getSalesInvoiceDetail = async ({ salesInvoiceId }) => {
  const response = await apiClient.get(
    `${GET_SALES_INVOICE_DETAIL_URL}/${salesInvoiceId}`
  );
  return response.data;
};

export const getPurchaseInvoiceDetail = async ({ purchaseInvoiceId }) => {
  const response = await apiClient.get(
    `${GET_PURCHASE_INVOICE_DETAIL_URL}/${purchaseInvoiceId}`
  );
  return response.data;
};
