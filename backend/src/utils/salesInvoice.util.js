export function extractSalesInvoice(salesInvoice) {
  return {
    accountingDate: salesInvoice.accountingDate,
    documentDate: salesInvoice.documentDate,
    documentNumber: salesInvoice.documentNumber,
    deliveryNoteNumber: salesInvoice.deliveryNoteNumber,
    invoiceNumber: salesInvoice.invoiceNumber,
    customerCode: salesInvoice.customerCode,
    customerName: salesInvoice.customerName,
    description: salesInvoice.description,
    totalAmount: 0,
    discountAmount: 0,
    totalVatAmount: 0,
    totalPayment: 0,
    isInvoiced: salesInvoice.isInvoiced,
    isDelivered: salesInvoice.isDelivered,
    documentType: salesInvoice.documentType,
  };
}

export function extractSalesInvoiceDetail(salesInvoice) {
  return {
    itemName: salesInvoice.itemName,
    itemCode: salesInvoice.itemCode,
    unit: salesInvoice.unit,
    quantity: salesInvoice.quantity,
    unitPrice: salesInvoice.unitPrice,
    amount: salesInvoice.amount,
    discountRate: salesInvoice.discountRate,
  };
}
