import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ArrowLeft 
} from 'lucide-react';

// Dummy order data - in real app, this would come from an API
const dummyOrderDetail = {
  id: 'ORD-001',
  date: '2024-03-15T14:30:00Z',
  status: 'Delivered',
  total: 259.97,
  shippingAddress: {
    name: 'John Doe',
    street: '123 Fashion Lane',
    city: 'Styleville',
    state: 'CA',
    zipCode: '90210',
    country: 'United States'
  },
  paymentMethod: {
    type: 'Credit Card',
    lastFour: '4321',
    brand: 'Visa'
  },
  items: [
    {
      id: 'PROD-001',
      name: 'Classic Blue Denim Jacket',
      size: 'M',
      color: 'Blue',
      quantity: 1,
      price: 129.99,
      image: '/api/placeholder/200/250' // Placeholder image
    },
    {
      id: 'PROD-002',
      name: 'White Cotton T-Shirt',
      size: 'L',
      color: 'White',
      quantity: 2,
      price: 49.99,
      image: '/api/placeholder/200/250' // Placeholder image
    }
  ],
  orderSummary: {
    subtotal: 229.97,
    shipping: 15.00,
    tax: 15.00,
    total: 259.97
  },
  trackingInfo: {
    carrier: 'FastShip',
    trackingNumber: '1Z999AA1234567890',
    estimatedDelivery: '2024-03-20'
  }
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchOrderDetail = async () => {
      try {
        // In a real app, replace with actual API call
        // const response = await axios.get(`/api/orders/${orderId}`);
        // setOrderDetail(response.data);
        
        // For this example, using dummy data
        setOrderDetail(dummyOrderDetail);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'Shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'Processing':
        return <Package className="text-yellow-500" size={24} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="p-6 text-center">Loading order details...</div>;
  }

  if (!orderDetail) {
    return <div className="p-6 text-center text-red-500">Order not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Orders
      </button>

      {/* Order Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(orderDetail.status)}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{orderDetail.id}
            </h1>
            <p className="text-gray-600">
              Placed on {formatDate(orderDetail.date)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${orderDetail.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
              orderDetail.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
              'bg-yellow-100 text-yellow-800'}
          `}>
            {orderDetail.status}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <ShoppingBag className="mr-2 text-gray-600" /> Order Items
        </h2>
        {orderDetail.items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center border-b pb-4 last:border-b-0"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-700">
                  Quantity: {item.quantity}
                </p>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${orderDetail.orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">${orderDetail.orderSummary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${orderDetail.orderSummary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${orderDetail.orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="mr-2 text-gray-600" /> Shipping Address
          </h2>
          <p className="text-gray-700">
            {orderDetail.shippingAddress.name}<br />
            {orderDetail.shippingAddress.street}<br />
            {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.state} {orderDetail.shippingAddress.zipCode}<br />
            {orderDetail.shippingAddress.country}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CreditCard className="mr-2 text-gray-600" /> Payment Method
          </h2>
          <p className="text-gray-700">
            {orderDetail.paymentMethod.brand} Credit Card<br />
            Ending in {orderDetail.paymentMethod.lastFour}
          </p>
        </div>
      </div>

      {/* Tracking Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Truck className="mr-2 text-blue-600" /> Tracking Information
        </h2>
        <div className="text-gray-700">
          <p>Carrier: {orderDetail.trackingInfo.carrier}</p>
          <p>Tracking Number: {orderDetail.trackingInfo.trackingNumber}</p>
          <p>Estimated Delivery: {formatDate(orderDetail.trackingInfo.estimatedDelivery)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;