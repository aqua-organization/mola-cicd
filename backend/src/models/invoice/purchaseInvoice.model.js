import mongoose from "mongoose";

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    userId: { type: String },
    invoiceKey: { type: String },

    accountingDate: { type: Date },
    documentDate: { type: Date },
    receiptVoucherNumber: { type: String },
    documentNumber: { type: String, unique: true },
    invoiceNumber: { type: String },
    invoiceSymbol: { type: String },

    supplierCode: { type: String },
    supplierName: { type: String },

    description: { type: String },
    totalAmount: { type: Number },
    discountAmount: { type: Number, default: 0 },
    vatAmount: { type: Number, default: 0 },
    totalPayment: { type: Number },
    purchasingCost: { type: Number, default: 0 },
    warehouseValue: { type: Number, default: 0 },

    invoiceReceived: { type: Boolean, default: false },
    isPurchasingCost: { type: Boolean, default: false },
    documentType: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

purchaseInvoiceSchema.methods.getDetails = async function() {
  const { PurchaseInvoiceDetail } = await import(
    "./purchaseInvoiceDetail.model.js"
  );
  return await PurchaseInvoiceDetail.find({ purchaseInvoice: this._id });
};

purchaseInvoiceSchema.index({ supplierCode: 1 });
purchaseInvoiceSchema.index({ documentDate: 1 });

export const PurchaseInvoice = mongoose.model(
  "PurchaseInvoice",
  purchaseInvoiceSchema
);
