import { SalesInvoice, SalesInvoiceDetail } from "../models/invoice/index.js";

class SalesInvoiceRepository {
  constructor() {
    this.salesInvoiceModel = SalesInvoice;
    this.salesInvoiceDetailModel = SalesInvoiceDetail;
  }

  // Create
  async createSalesInvoice(salesInvoice) {
    const newSalesInvoice = await this.salesInvoiceModel.create(salesInvoice);
    return newSalesInvoice;
  }

  async createManySalesInvoice(salesInvoices) {
    const newSalesInvoices = await this.salesInvoiceModel.insertMany(
      salesInvoices
    );
    return newSalesInvoices;
  }

  async createManySalesInvoiceDetail(salesInvoiceDetails) {
    const newSalesInvoiceDetails = await this.salesInvoiceDetailModel.insertMany(
      salesInvoiceDetails
    );
    return newSalesInvoiceDetails;
  }

  // Get
  async getSalesInvoiceNumbersExisting(invoiceNumbers) {
    const existingInvoiceNumbers = await this.salesInvoiceModel.distinct(
      "invoiceNumber",
      {
        invoiceNumber: { $in: invoiceNumbers },
      }
    );
    return existingInvoiceNumbers;
  }
}

export default SalesInvoiceRepository;
