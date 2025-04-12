import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle, Package, ArrowLeft, Download, Home } from 'lucide-react';
import axios from 'axios';

const OrderSuccess = () => {
  const { theme } = useTheme();
  const { orderId } = useParams(); // Get orderId from URL params
  const [order, setOrder] = useState(null); // Store the order data
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  const navigate = useNavigate();

  // Fetch order details from API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/orders/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          console.error("Error fetching order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  console.log("oder id", orderId)

  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (!order) {
    return <div>Order not found!</div>; // If no order data is found
  }

  return (
    <div className={`${theme.background} min-h-screen py-8 px-4`}>
      <div className="max-w-2xl mx-auto">
        {/* Success Banner */}
        <div className={`${theme.card} shadow-md rounded-lg p-6 text-center mb-6}`}>
          <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
          <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="inline-block bg-gray-50 dark:bg-gray-800 px-6 py-2 rounded-lg mb-4">
            <span className="text-sm block">Order #</span>
            <span className="font-bold">{order._id}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className={`${theme.card} shadow-md rounded-lg overflow-hidden mb-6}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Order Date</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p>{order.paymentMethod && order.paymentMethod == "cash" ? "Cash on delivery":"Credit Card"}</p>
              </div>
              <div>
                <p className="text-gray-500">Shipping To</p>
                <p>{order.shippingAddress.fullName}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-medium mb-4">Items Ordered</h3>
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span>${order.shippingFee.toFixed(2)}</span>
              </div>
            
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-bold">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className={`${theme.card} shadow-md rounded-lg p-6 mb-6}`}>
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="text-sm">
            <p className="font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link to="/" className={`${theme.button} flex-1 py-3 rounded-lg flex items-center justify-center`}>
            <Home className="mr-2" size={18} />
            Return Home
          </Link>
          <button className={`${theme.buttonSecondary} flex-1 py-3 rounded-lg flex items-center justify-center`}>
            <Download className="mr-2" size={18} />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
