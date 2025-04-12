// models/Order.js
const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User
  items: [{                          // Inline the items array inside OrderSchema
    productName: { type: String, required: true },   
    quantity: { type: Number, required: true },      
    price: { type: Number, required: true }, 
    productId:{ type: String, required: true }      
  }],
  totalPrice: { type: Number, required: true },  // Total price of the order
  shippingFee: { type: Number, required: true },  // Total price of the order

  shippingAddress: {  
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String,  enum: ['card', 'cash'] }, // Order status

  status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] }, // Order status
}, {
  timestamps: true,  // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Create the Order model using the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
