import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ArrowLeft,
  Clock,
  XCircle,
  AlertCircle,
  Edit
} from 'lucide-react';
import axios from 'axios';
import OrderTimeLine from './OrderTimeLine';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({
    carrier: '',
    trackingNumber: '',
    estimatedDelivery: ''
  });
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/orders/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetail(response.data.data);
        
        // If tracking info exists, populate the form
        if (response.data.data.trackingInfo) {
          setTrackingInfo(response.data.data.trackingInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  // Update order status
  const handleStatusUpdate = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8000/api/orders/status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        setOrderDetail({
          ...orderDetail,
          status: newStatus
        });
        
        setSuccessMessage(`Order status updated to ${newStatus}`);
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Show tracking form when status is changed to shipped
        if (newStatus === 'shipped' && (!orderDetail.trackingInfo || !orderDetail.trackingInfo.trackingNumber)) {
          setShowTrackingForm(true);
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Update tracking information
  const handleTrackingUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8000/api/orders/tracking/${orderId}`,
        trackingInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        setOrderDetail({
          ...orderDetail,
          trackingInfo
        });
        setShowTrackingForm(false);
        setSuccessMessage('Tracking information updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating tracking information:', error);
      setError('Failed to update tracking information.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle tracking info input changes
  const handleTrackingInputChange = (e) => {
    setTrackingInfo({
      ...trackingInfo,
      [e.target.name]: e.target.value
    });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <AlertCircle className="text-gray-500" size={24} />;
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-50';
      case 'shipped':
        return 'bg-blue-50';
      case 'pending':
        return 'bg-yellow-50';
      case 'cancelled':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get next status in the workflow
  const getNextStatus = (currentStatus) => {
    switch(currentStatus) {
      case 'pending':
        return 'shipped';
      case 'shipped':
        return 'delivered';
      default:
        return null;
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
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  const nextStatus = getNextStatus(orderDetail.status);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 space-y-6 shadow-lg rounded-lg">
      {/* Admin Order Management Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/admin/orders')} 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2" /> Back to All Orders
        </button>
        
        <h1 className="text-xl font-bold">Order Management</h1>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Order Status and Action Panel */}
      <div className={`${getStatusBgColor(orderDetail.status)} p-4 rounded-lg shadow-sm`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-3">
            {getStatusIcon(orderDetail.status)}
            <div>
              <h2 className="text-lg font-semibold">
                Order Status: <span className="font-bold">{orderDetail.status.charAt(0).toUpperCase() + orderDetail.status.slice(1)}</span>
              </h2>
              <p className="text-sm text-gray-600">
                Order ID: {orderId.substring(orderId.length - 8).toUpperCase()} | 
                Placed on {formatDate(orderDetail.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {/* Status Update Buttons */}
            {nextStatus && (
              <button
                onClick={() => handleStatusUpdate(nextStatus)}
                disabled={updatingStatus}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
              >
                {updatingStatus ? (
                  <span className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  <>
                    Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
                    {nextStatus === 'shipped' && <Truck className="ml-1" size={16} />}
                    {nextStatus === 'delivered' && <CheckCircle className="ml-1" size={16} />}
                  </>
                )}
              </button>
            )}
            
            {/* Cancel Order Button - Only shown for pending orders */}
            {orderDetail.status === 'pending' && (
              <button
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={updatingStatus}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
              >
                <XCircle className="mr-1" size={16} /> Cancel Order
              </button>
            )}
            
            {/* Tracking Button - Only shown for shipped orders */}
            {orderDetail.status === 'shipped' && (
              <button
                onClick={() => setShowTrackingForm(!showTrackingForm)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
              >
                <Edit className="mr-1" size={16} /> {orderDetail.trackingInfo?.trackingNumber ? 'Update Tracking' : 'Add Tracking'}
              </button>
            )}
          </div>
        </div>
        
        {/* Tracking Information Form */}
        {showTrackingForm && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Tracking Information</h3>
            <form onSubmit={handleTrackingUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                  <input
                    type="text"
                    name="carrier"
                    value={trackingInfo.carrier}
                    onChange={handleTrackingInputChange}
                    placeholder="FedEx, UPS, USPS, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <input
                    type="text"
                    name="trackingNumber"
                    value={trackingInfo.trackingNumber}
                    onChange={handleTrackingInputChange}
                    placeholder="Enter tracking number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date</label>
                <input
                  type="date"
                  name="estimatedDelivery"
                  value={trackingInfo.estimatedDelivery ? new Date(trackingInfo.estimatedDelivery).toISOString().split('T')[0] : ''}
                  onChange={handleTrackingInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowTrackingForm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save Tracking Information
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Customer & Order Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Name:</span> {orderDetail.shippingAddress.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {orderDetail.user?.email || "Not available"}
          </p>
          {orderDetail.trackingInfo?.trackingNumber && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">Tracking Information</h3>
              <p className="text-xs text-blue-700">
                <span className="font-medium">Carrier:</span> {orderDetail.trackingInfo.carrier}
              </p>
              <p className="text-xs text-blue-700">
                <span className="font-medium">Tracking Number:</span> {orderDetail.trackingInfo.trackingNumber}
              </p>
              <p className="text-xs text-blue-700">
                <span className="font-medium">Est. Delivery:</span> {formatDate(orderDetail.trackingInfo.estimatedDelivery)}
              </p>
            </div>
          )}
        </div>

        {/* Shipping Information */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-gray-600" size={20} /> Shipping Address
          </h2>
          <p className="text-gray-700">
            {orderDetail.shippingAddress.fullName}<br />
            {orderDetail.shippingAddress.street}<br />
            {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.state} {orderDetail.shippingAddress.zip}<br />
            {orderDetail.shippingAddress.country}
          </p>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">Payment Method</h3>
            <p className="text-gray-700 flex items-center">
              <CreditCard className="mr-2 text-gray-500" size={16} />
              {orderDetail.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="mr-2 text-gray-600" size={20} /> Order Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderDetail.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                        ) : (
                          <Package className="h-full w-full p-2 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                        <div className="text-xs text-gray-500">ID: {item.productId.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium">
                  Subtotal:
                </td>
                <td className="px-6 py-3 text-right text-sm font-medium">
                  ${(orderDetail.totalPrice - orderDetail.shippingFee).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium">
                  Shipping:
                </td>
                <td className="px-6 py-3 text-right text-sm font-medium">
                  ${orderDetail.shippingFee.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-bold">
                  Total:
                </td>
                <td className="px-6 py-3 text-right text-sm font-bold">
                  ${orderDetail.totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Order Timeline/History (Optional Enhancement) */}
      <OrderTimeLine
      orderDetail={orderDetail}
      />
    </div>
  );
};

export default OrderDetail;