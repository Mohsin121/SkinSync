// models/Order.js
const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User
  items: [{                          // Inline the items array inside OrderSchema
    productName: { type: String, required: true },   // Name of the product
    quantity: { type: Number, required: true },      // Quantity of the product ordered
    price: { type: Number, required: true },         // Price of the product
  }],
  totalPrice: { type: Number, required: true },  // Total price of the order
  shippingAddress: {                       // Shipping address
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] }, // Order status
}, {
  timestamps: true,  // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Create the Order model using the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
