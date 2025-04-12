import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, ChevronUp, Truck, Package, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

const Orders = () => {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Status styles and icons
  const statusStyles = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock size={16} className="text-yellow-600" /> },
    shipped: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Truck size={16} className="text-blue-600" /> },
    delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: <Package size={16} className="text-green-600" /> },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle size={16} className="text-red-600" /> }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/orders/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className={`${theme?.card} ${theme?.border} rounded-lg p-6 shadow-md`}>
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          <p className="mt-2">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${theme?.text} min-h-screen`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className={`${theme?.card} ${theme?.border} rounded-lg p-8 shadow-md text-center`}>
            <h2 className="text-xl mb-2">No orders found</h2>
            <p className="text-gray-600 dark:text-gray-400">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className={`${theme?.card} ${theme?.border} rounded-lg shadow-md overflow-hidden`}
              >
                {/* Order Header */}
                <div 
                  className={`p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer`}
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-lg truncate mr-2">Order #{order._id.substring(order._id.length - 8)}</h3>
                      <span className={`${statusStyles[order.status].bg} ${statusStyles[order.status].text} text-xs px-2 py-1 rounded-full flex items-center`}>
                        {statusStyles[order.status].icon}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">{expandedOrder === order._id ? "Hide Details" : "View Details"}</span>
                      {expandedOrder === order._id ? 
                        <ChevronUp size={20} className={`${theme?.accent}`} /> : 
                        <ChevronDown size={20} className={`${theme?.accent}`} />
                      }
                    </div>
                  </div>
                </div>
                
                {/* Expanded Order Details */}
                {expandedOrder === order._id && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* Order Items */}
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Items</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qty</th>
                              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-2">
                                      <div className="text-sm font-medium">{item.productName}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">ID: {item.productId.substring(0, 8)}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap text-right text-sm">${item.price.toFixed(2)}</td>
                                <td className="py-3 px-3 whitespace-nowrap text-right text-sm">{item.quantity}</td>
                                <td className="py-3 px-3 whitespace-nowrap text-right text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <td colSpan="3" className="py-2 px-3 text-right text-sm font-medium">Subtotal:</td>
                              <td className="py-2 px-3 text-right text-sm font-medium">
                                ${(order.totalPrice - order.shippingFee).toFixed(2)}
                              </td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <td colSpan="3" className="py-2 px-3 text-right text-sm font-medium">Shipping Fee:</td>
                              <td className="py-2 px-3 text-right text-sm font-medium">${order.shippingFee.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <td colSpan="3" className="py-2 px-3 text-right text-sm font-bold">Total:</td>
                              <td className="py-2 px-3 text-right text-sm font-bold">${order.totalPrice.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    
                    {/* Shipping and Payment Info */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="bg-white dark:bg-gray-700 p-3 rounded-md text-sm">
                          <p className="font-medium">{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Payment Information</h4>
                        <div className="bg-white dark:bg-gray-700 p-3 rounded-md text-sm">
                          <p><span className="text-gray-600 dark:text-gray-400">Method:</span> {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                          <p className="mt-1"><span className="text-gray-600 dark:text-gray-400">Order Date:</span> {formatDate(order.createdAt)}</p>
                          {order.status === 'shipped' && (
                            <div className="mt-3 text-blue-600">
                              <Truck size={16} className="inline mr-1" />
                              <span className="text-xs">Your order is on the way!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;