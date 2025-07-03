import { Router } from "express";
import routerEInvoice from "./eInvoice.route.js";

const routerV1 = Router();

routerV1.use("/e-invoice", routerEInvoice);

export default routerV1;
