import mongoose from 'mongoose';

const ReturnSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Or string if guest
    
    // Items being returned
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }],
    
    reason: { type: String, required: true },
    customerComments: { type: String },
    
    // Images of the product taken by customer
    evidenceImages: [{ type: String }],
    
    // Status Flow: PENDING -> APPROVED -> PICKUP_SCHEDULED -> RECEIVED -> INSPECTED -> REFUND_INITIATED | REJECTED
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'PICKUP_SCHEDULED', 'RECEIVED', 'INSPECTED', 'REFUND_INITIATED', 'REJECTED'],
      default: 'PENDING'
    },
    
    // Admin Review
    adminNotes: { type: String },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    inspectionResult: {
      type: String,
      enum: ['PASS', 'FAIL'],
    }
  },
  { timestamps: true }
);

export const Return = mongoose.models.Return || mongoose.model('Return', ReturnSchema);
