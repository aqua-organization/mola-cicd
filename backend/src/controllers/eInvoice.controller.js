import EInvoiceService from "../services/eInvoice.service.js";
import { OkSuccessResponse } from "../cores/success.response.js";

class EInvoiceController {
  constructor() {
    this.eInvoiceService = new EInvoiceService();

    this.getCaptcha = this.getCaptcha.bind(this);
    this.Login = this.Login.bind(this);
    this.getEInvoice = this.getEInvoice.bind(this);
  }

  async getCaptcha(req, res) {
    const results = await this.eInvoiceService.getCaptcha();
    new OkSuccessResponse(results).send(res);
  }

  async Login(req, res) {
    const { username, password, captcha, ckey } = req.body;
    const results = await this.eInvoiceService.Login({
      username,
      password,
      captcha,
      ckey,
    });
    new OkSuccessResponse(results).send(res);
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
