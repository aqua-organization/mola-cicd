import { test, expect, describe, beforeEach } from "bun:test";
import SalesInvoiceService from "../services/salesInvoice.service";

// Mock thủ công cho extract functions
const extractSalesInvoice = (row) => ({
  invoiceNumber: row.invoiceNumber,
});

const extractSalesInvoiceDetail = (row) => ({
  invoiceNumber: row.invoiceNumber,
  item: row.item,
  amount: row.amount,
});

// Patch function tạm (nếu không dùng import thật từ util)
SalesInvoiceService.prototype.__proto__.extractSalesInvoice = extractSalesInvoice;
SalesInvoiceService.prototype.__proto__.extractSalesInvoiceDetail = extractSalesInvoiceDetail;

const mockSalesInvoices = [
  { invoiceNumber: "INV001", item: "A", quantity: 2, amount: 100 },
  { invoiceNumber: "INV001", item: "B", quantity: 1, amount: 50 },
  { invoiceNumber: "INV002", item: "C", quantity: 3, amount: 300 },
];

describe("SalesInvoiceService.groupSalesInvoicesByInvoiceNumber()", () => {
  let service;

  beforeEach(() => {
    service = new SalesInvoiceService();
  });

  test("should group by invoiceNumber and return details list", () => {
    const {
      salesInvoicesMap,
      salesInvoiceDetails,
    } = service.groupSalesInvoicesByInvoiceNumber(mockSalesInvoices);

    expect(salesInvoicesMap.size).toBe(2);
    expect(salesInvoicesMap.has("INV001")).toBe(true);
    expect(salesInvoicesMap.has("INV002")).toBe(true);

    expect(salesInvoiceDetails.length).toBe(3);
    expect(salesInvoiceDetails[0]).toEqual({
      invoiceNumber: "INV001",
      item: "A",
      amount: 100,
    });
  });
});
