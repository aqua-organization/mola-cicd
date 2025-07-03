import apiClient from "../configs/axiosConfig";
import {
  GET_CAPTCHA_URL,
  LOGIN_URL,
  GET_E_INVOICE_URL,
} from "../constants/eInvoiceConstant";

export const getCaptcha = async () => {
  const response = await apiClient.get(GET_CAPTCHA_URL);
  return response.data;
};

export const login = async (data) => {
  const response = await apiClient.post(LOGIN_URL, data);
  return response.data;
};

export const getEInvoice = async (data) => {
  const response = await apiClient.post(GET_E_INVOICE_URL, data);
  return response.data;
};
