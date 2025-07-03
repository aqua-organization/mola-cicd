import { Router } from "express";
import EInvoiceController from "../../controllers/eInvoice.controller.js";

const routerEInvoice = Router();
const eInvoiceController = new EInvoiceController();
routerEInvoice.get("/get-captcha", eInvoiceController.getCaptcha);
routerEInvoice.post("/login", eInvoiceController.Login);
routerEInvoice.post("/get-e-invoice", eInvoiceController.getEInvoice);

export default routerEInvoice;
