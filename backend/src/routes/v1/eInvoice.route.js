import { Router } from "express";
import EInvoiceController from "../../controllers/eInvoice.controller.js";

const routerEInvoice = Router();
const eInvoiceController = new EInvoiceController();
routerEInvoice.post("/get-e-invoice", eInvoiceController.getEInvoice);

export default routerEInvoice;
