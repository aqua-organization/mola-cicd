import mongoose from "mongoose";

const purchaseInvoiceDetailSchema = new mongoose.Schema(
  {
    purchaseInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseInvoice",
      required: true,
    },

    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    warehouse: { type: String, required: true },
    unit: { type: String, required: true },

    debitAccount: { type: String, required: true },
    creditAccount: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    amount: { type: Number, required: true },
    discountRate: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    purchasingCost: { type: Number, default: 0 },
    warehouseValue: { type: Number, default: 0 },

    lotNumber: { type: String },
    expirationDate: { type: Date },
    costItem: { type: String },
    project: { type: String },
    costObjectCode: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

purchaseInvoiceDetailSchema.index({ purchaseInvoice: 1 });
purchaseInvoiceDetailSchema.index({ itemCode: 1 });
purchaseInvoiceDetailSchema.index({ itemName: 1, unit: 1 });

export const PurchaseInvoiceDetail = mongoose.model(
  "PurchaseInvoiceDetail",
  purchaseInvoiceDetailSchema
);
