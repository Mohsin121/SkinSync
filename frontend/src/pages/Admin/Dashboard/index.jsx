import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Dummy Data for Charts
  const salesData = [
    { category: "Electronics", sales: 200 },
    { category: "Clothing", sales: 150 },
    { category: "Home & Kitchen", sales: 100 },
    { category: "Beauty", sales: 180 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6000 },
  ];

  const orderStatus = [
    { name: "Pending", value: 40 },
    { name: "Completed", value: 50 },
    { name: "Canceled", value: 10 },
  ];

  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 300 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 700 },
    { month: "May", users: 900 },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Line Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#f59e0b" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Area Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#ef4444" fill="#fca5a5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
