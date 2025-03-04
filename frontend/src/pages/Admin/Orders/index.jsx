import React, { useState } from 'react';
import { Eye, Filter } from 'lucide-react';

const OrdersList = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      date: "2023-07-15",
      total: 249.97,
      status: "Shipped"
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2023-07-16",
      total: 129.99,
      status: "Pending"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Shipped': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm text-gray-600">#{order.id}</td>
              <td className="p-4 text-sm text-gray-900 font-medium">{order.customer}</td>
              <td className="p-4 text-sm text-gray-600">{order.date}</td>
              <td className="p-4 text-sm text-gray-600">${order.total.toFixed(2)}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${getStatusColor(order.status)}
                `}>
                  {order.status}
                </span>
              </td>
              <td className="p-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;