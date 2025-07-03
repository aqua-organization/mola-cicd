import EInvoiceService from "../services/eInvoice.service.js";
import { OkSuccessResponse } from "../cores/success.response.js";

class EInvoiceController {
  constructor() {
    this.eInvoiceService = new EInvoiceService();
  }

  async getEInvoice(req, res) {
    const { type, process_type, date_range, output_path } = req.body;
    const results = await this.eInvoiceService.getEInvoice({
      type,
      process_type,
      date_range,
      output_path,
    });

    new OkSuccessResponse(results).send(res);
  }
}

export default EInvoiceController;
