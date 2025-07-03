export function invoiceNumbersSet(invoices) {
  const invoiceSet = new Set();
  invoices.forEach((invoice) => {
    if (!invoiceSet.has(invoice.invoiceNumber)) {
      invoiceSet.add(invoice.invoiceNumber);
    }
  });
  return invoiceSet;
}
