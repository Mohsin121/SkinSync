import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

const dummyOrders = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 129.99,
    items: [
      { name: 'Blue Cotton T-Shirt', quantity: 2, price: 49.99 },
      { name: 'Denim Jeans', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-02-28',
    status: 'Shipped',
    total: 89.50,
    items: [
      { name: 'Casual Hoodie', quantity: 1, price: 59.50 },
      { name: 'Running Shoes', quantity: 1, price: 30.00 }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-10',
    status: 'Processing',
    total: 45.99,
    items: [
      { name: 'Summer Shorts', quantity: 1, price: 45.99 }
    ]
  }
];

const getStatusIcon = (status) => {
  switch(status) {
    case 'Delivered':
      return <CheckCircle className="text-green-500" size={20} />;
    case 'Shipped':
      return <Truck className="text-blue-500" size={20} />;
    case 'Processing':
      return <Package className="text-yellow-500" size={20} />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch(status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UserOrders = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
      
      <div className="space-y-4">
        {dummyOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <span className="text-gray-500 text-sm">Order #{order.id}</span>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-600">Ordered on: {order.date}</p>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between text-gray-600 text-sm"
                >
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total:</span>
              <span className="text-gray-900 font-bold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;