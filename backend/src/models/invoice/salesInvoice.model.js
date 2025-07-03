import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    accountingDate: { type: Date, required: true },
    documentDate: { type: Date, required: true },
    documentNumber: { type: String, required: true, unique: true },
    deliveryNoteNumber: { type: String },
    invoiceNumber: { type: String },

    customerCode: { type: String },
    customerName: { type: String },

    description: { type: String },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    totalVatAmount: { type: Number, default: 0 },
    totalPayment: { type: Number },

    isInvoiced: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    documentType: { type: String },

    details: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SalesInvoiceDetail" },
    ],
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
