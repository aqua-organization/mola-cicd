import mongoose from "mongoose";

const salesInvoiceDetailSchema = new mongoose.Schema(
  {
    salesInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesInvoice",
      required: true,
    },

    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    specificationCode: { type: String },
    unit: { type: String, required: true },
    unitConversion: { type: Number, default: 1 },
    quantityConversion: { type: Number, default: 1 },
    conversionRate: { type: Number, default: 1 },

    accountCostOrLiability: { type: String },
    accountRevenue: { type: String },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    amount: { type: Number, required: true },
    discountRate: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    discountAccount: { type: String },
    vatAmount: { type: Number, default: 0 },

    project: { type: String },
    costObjectCode: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

salesInvoiceDetailSchema.index({ salesInvoice: 1 });
salesInvoiceDetailSchema.index({ itemCode: 1 });
salesInvoiceDetailSchema.index({ itemName: 1, unit: 1 });

export const SalesInvoiceDetail = mongoose.model(
  "SalesInvoiceDetail",
  salesInvoiceDetailSchema
);
