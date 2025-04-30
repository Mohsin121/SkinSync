import { useState, useEffect } from 'react';
import { Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);  // State to store orders
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  const getStatusColor = (status) => {
    switch(status) {
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'delivered': return 'bg-blue-100 text-blues-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fetch orders from the backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:8000/api/orders/all', {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass token in the request headers for authentication
          },
        });
        setOrders(response.data.data);  // Set orders to state
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");  // Set error message if fetching fails
      } finally {
        setLoading(false);  // Stop loading after fetching is complete
      }
    };

    fetchOrders();
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there is an error
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <div className="flex space-x-3">
          <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Filter size={20} className="mr-2" /> Filters
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm text-gray-600">#{order._id}</td>
              <td className="p-4 text-sm text-gray-900 font-medium">{order.user.fullName}</td>
              <td className="p-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-4 text-sm text-gray-600">Rs{order.totalPrice.toFixed(2)}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-4">
                <Link to={`/admin/orders/detail/${order._id}`} className="text-gray-600 hover:text-gray-900">
                  <Eye size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
