import SalesInvoiceRepository from "../repositories/salesInvoice.repository.js";
import {
  extractSalesInvoice,
  extractSalesInvoiceDetail,
} from "../utils/salesInvoice.util.js";
import { invoiceNumbersSet } from "../utils/invoice.util.js";

class SalesInvoiceService {
  constructor(batchSize = 100) {
    this.batchSize = batchSize;
    this.salesInvoiceRepository = new SalesInvoiceRepository();
  }

  async filterSalesInvoicesExisting(salesInvoices) {
    const invoiceNumbers = invoiceNumbersSet(salesInvoices);
    const invoiceNumbersArray = Array.from(invoiceNumbers);

    const invoiceNumbersExisting = await this.salesInvoiceRepository.getSalesInvoiceNumbersExisting(
      invoiceNumbersArray
    );

    const invoiceNumbersExistingSet = invoiceNumbersSet(invoiceNumbersExisting);

    const filteredSalesInvoices = salesInvoices.filter((salesInvoice) => {
      return !invoiceNumbersExistingSet.has(salesInvoice.invoiceNumber);
    });

    return filteredSalesInvoices;
  }

  async groupSalesInvoicesByInvoiceNumber(salesInvoices) {
    const salesInvoiceGrouped = await this.filterSalesInvoicesExisting(
      salesInvoices
    );

    const salesInvoicesMap = new Map();
    const salesInvoiceDetails = [];
    salesInvoiceGrouped.forEach((row) => {
      const invoiceNumber = row.invoiceNumber;
      if (!salesInvoicesMap.has(invoiceNumber)) {
        const salesInvoice = extractSalesInvoice(row);
        salesInvoicesMap.set(invoiceNumber, salesInvoice);
      }

      const salesInvoice = salesInvoicesMap.get(invoiceNumber);
      salesInvoice.totalAmount += row.amount;
      salesInvoice.totalVatAmount += row.vatAmount;
      salesInvoice.totalPayment += row.amount + row.vatAmount;

      const salesInvoiceDetail = extractSalesInvoiceDetail(row);
      salesInvoiceDetails.push(salesInvoiceDetail);
    });
    return { salesInvoicesMap, salesInvoiceDetails };
  }

  async bulkCreateSalesInvoice(salesInvoices) {
    const results = {
      success: 0,
      failed: 0,
      total: salesInvoices.length,
    };

    const {
      salesInvoicesMap,
      salesInvoiceDetails,
    } = await this.groupSalesInvoicesByInvoiceNumber(salesInvoices);

    const salesInvoicesArray = Array.from(salesInvoicesMap.values());

    for (let i = 0; i < salesInvoicesArray.length; i += this.batchSize) {
      const batch = salesInvoicesArray.slice(i, i + this.batchSize);
      try {
        await this.salesInvoiceRepository.createManySalesInvoice(batch);
        results.success += batch.length;
      } catch (error) {
        results.failed += batch.length;
      }
    }

    for (let i = 0; i < salesInvoiceDetails.length; i += this.batchSize) {
      const batch = salesInvoiceDetails.slice(i, i + this.batchSize);
      await this.salesInvoiceRepository.createManySalesInvoiceDetail(batch);
    }

    return results;
  }
}

export default SalesInvoiceService;
