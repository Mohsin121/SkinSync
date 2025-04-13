import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Package, Truck, CheckCircle, ClipboardList } from 'lucide-react';

const UserOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/user/${userId}`);
        setOrders(response.data.data);  // Set fetched orders
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'pending':
        return <Package className="text-yellow-500" size={20} />;
        case 'cancelled':
          return <Package className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';

    }
  };

  if (loading) {
    return <div>Loading user orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Order History  
          </h3>
         
        </div>
  
        {orders.length === 0 ? (
          <div className="bg-white border rounded-lg p-6 shadow-sm text-center">
            <ClipboardList className="mx-auto text-gray-400 mb-4" size={40} />
            <h4 className="text-lg font-medium text-gray-700 mb-2">No Order History</h4>
           
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">Order #{order._id}</span>
                    <a 
                      href={`/admin/orders/detail/${order._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </a>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                  {order.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between text-gray-600 text-sm"
                    >
                      <span>{item.productName} (x{item.quantity})</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total:</span>
                  <span className="text-gray-900 font-bold">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default UserOrders