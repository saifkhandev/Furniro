import mongoose, { Schema, model } from 'mongoose';
import Product from './Product.js';

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
    customization: {
      material: String,
      finish: String,
      size: String,
    },
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['order-placed', 'confirmed', 'packing', 'out-for-delivery', 'delivered'],
    default: 'order-placed',
  },
  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  stockState: {
    type: String,
    enum: ['sufficient', 'low', 'out-of-stock'],
    default: 'sufficient',
  },
}, { timestamps: true });

// Index for user lookup
orderSchema.index({ user: 1 });
// Index for status lookups
orderSchema.index({ orderStatus: 1 });

export default model('Order', orderSchema);