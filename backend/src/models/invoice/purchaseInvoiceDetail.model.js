import mongoose from "mongoose";

const purchaseInvoiceDetailSchema = new mongoose.Schema(
  {
    userId: { type: String },
    invoiceKey: { type: String },

    itemCode: { type: String },
    itemName: { type: String },
    warehouse: { type: String },
    unit: { type: String },

    debitAccount: { type: String },
    creditAccount: { type: String },
    quantity: { type: Number },
    unitPrice: { type: Number },
    amount: { type: Number },
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
