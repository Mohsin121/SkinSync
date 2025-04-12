const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { ResponseHandler } = require('../../utils');
const Order = require('../../models/Order');
const { auth } = require('../../middlewares');
const Product = require('../../models/Product');

// CREATE a new order
router.post('/', auth.required, auth.user, async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, shippingFee , paymentMethod} = req.body;
    const userId = req.user._id
    // Validate user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return ResponseHandler.badRequest(res, 'User not found');
    }

    // Create new order
    const order = new Order({
      user:userId,
      items,
      totalPrice,
      shippingFee,
      shippingAddress,
      paymentMethod
    });
    await order.save();

      // decrease stock
     for (let item of items) {
      const product = await Product.findOne({_id: item.productId});
      if (product && product.stock > 0) {
      product.stock -= item.quantity;
      await product.save();
    }
  }
  
    return ResponseHandler.ok(res, order, 'Order placed successfully');
  } catch (error) {
    console.error('Error creating order:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to create order');
  }
});

// GET all orders
router.get('/all', auth.required, auth.admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'fullName email');
    return ResponseHandler.ok(res, orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to fetch orders');
  }
});


// Get order by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user', 'fullName email');
    if (!order) {
      return ResponseHandler.badRequest(res, 'Order not found');
    }
    return ResponseHandler.ok(res, order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to fetch order');
  }
});


// GET orders by user ID
router.get('/user', auth.required, auth.user, async (req, res) => {
  console.log("User",req.user)
  try {
    const orders = await Order.find({ user: req.user._id });
    return ResponseHandler.ok(res, orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to fetch user orders');
  }
});

// UPDATE order status
router.put('/status/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return ResponseHandler.badRequest(res, 'Order not found');
    }

    order.status = req.body.status;
    await order.save();

    return ResponseHandler.ok(res, order, 'Order status updated');
  } catch (error) {
    console.error('Error updating order status:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to update order status');
  }
});

// DELETE an order
router.delete('/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return ResponseHandler.badRequest(res, 'Order not found');
    }

    return ResponseHandler.ok(res, deletedOrder, 'Order deleted successfully');
  } catch (error) {
    console.error('Error deleting order:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to delete order');
  }
});

module.exports = router;
