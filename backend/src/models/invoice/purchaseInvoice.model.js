import mongoose from "mongoose";

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    accountingDate: { type: Date, required: true },
    documentDate: { type: Date, required: true },
    receiptVoucherNumber: { type: String, required: true },
    documentNumber: { type: String, required: true, unique: true },
    invoiceNumber: { type: String },

    supplierCode: { type: String, required: true },
    supplierName: { type: String, required: true },

    description: { type: String },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    vatAmount: { type: Number, default: 0 },
    totalPayment: { type: Number, required: true },
    purchasingCost: { type: Number, default: 0 },
    warehouseValue: { type: Number, default: 0 },

    invoiceReceived: { type: Boolean, default: false },
    isPurchasingCost: { type: Boolean, default: false },
    documentType: { type: String, required: true },

    details: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseInvoiceDetail" },
    ],
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
