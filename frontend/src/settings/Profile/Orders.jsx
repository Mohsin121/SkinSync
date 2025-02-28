import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Orders = () => {
  const { theme } = useTheme();

  const orders = [
    { id: 1, date: '2024-11-10', total: 89.99, status: 'Delivered' },
    { id: 2, date: '2024-10-25', total: 49.99, status: 'Shipped' },
    { id: 3, date: '2024-09-15', total: 129.99, status: 'Processing' },
  ];

  return (
    <div className={` ${theme?.text} min-h-screen`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className={`${theme?.card} ${theme?.border} rounded-lg p-6 shadow-md`}>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-4">Order ID</th>
                <th className="border-b p-4">Date</th>
                <th className="border-b p-4">Total</th>
                <th className="border-b p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b p-4">{order.id}</td>
                  <td className="border-b p-4">{order.date}</td>
                  <td className="border-b p-4">${order.total.toFixed(2)}</td>
                  <td className="border-b p-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
