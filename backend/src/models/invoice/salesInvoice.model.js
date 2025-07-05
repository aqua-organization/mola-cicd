import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    userId: { type: String },
    invoiceKey: { type: String },

    accountingDate: { type: Date },
    documentDate: { type: Date },
    documentNumber: { type: String, unique: true },
    deliveryNoteNumber: { type: String },
    invoiceNumber: { type: String },
    invoiceSymbol: { type: String },

    customerCode: { type: String },
    customerName: { type: String },

    description: { type: String },
    totalAmount: { type: Number },
    discountAmount: { type: Number, default: 0 },
    totalVatAmount: { type: Number, default: 0 },
    totalPayment: { type: Number },

    isInvoiced: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    documentType: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

salesInvoiceSchema.index({ customerCode: 1 });
salesInvoiceSchema.index({ documentDate: 1 });

export const SalesInvoice = mongoose.model("SalesInvoice", salesInvoiceSchema);
