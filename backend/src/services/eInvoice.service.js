import httpClient from "../configs/axios.config.js";
import { InternalServerError } from "../cores/error.response.js";
import {
  GET_CAPTCHA_URL,
  LOGIN_URL,
  PROCESSES_INVOICES_URL,
} from "../constants/eInvoice.constant.js";

// Services
import SalesInvoiceService from "./salesInvoice.service.js";

// Utils
import { mapEInvoice } from "../utils/eInvoice.util.js";

class EInvoiceService {
  constructor() {
    this.salesInvoiceService = new SalesInvoiceService();
  }

  static async getCaptcha() {
    const response = await httpClient.get(GET_CAPTCHA_URL);
    if (!response.success) {
      throw new InternalServerError("Failed to get captcha");
    }
    return response;
  }

  static async Login({ username, password, captcha, ckey }) {
    const response = await httpClient.post(LOGIN_URL, {
      username,
      password,
      captcha,
      ckey,
    });

    if (!response.success || !response.token) {
      throw new InternalServerError("Login to EInvoice failed");
    }
    return {
      token: response.token,
    };
  }

  async getEInvoice({ type, process_type, date_range, output_path }) {
    const response = await httpClient.post(PROCESSES_INVOICES_URL, {
      type,
      process_type,
      date_range,
      output_path,
    });
    if (!response || !response.json_data) {
      throw new InternalServerError("Failed to crawl e invoice data");
    }

    const invoices = response.json_data;

    const invoicesTransformed = invoices.map((invoice) => {
      return mapEInvoice[type](invoice);
    });

    const results = await this.salesInvoiceService.bulkCreateSalesInvoice(
      invoicesTransformed
    );

    return results;
  }
}

export default EInvoiceService;
