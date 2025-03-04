import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Grid, 
  List, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  Search 
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const SidebarMenu = [
    {
      title: "Dashboard",
      icon: <Grid size={20} />,
      path: "/admin/dashboard"
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      subMenu: [
        { title: "Product List", path: "/admin/products" },
        { title: "Add Product", path: "/admin/products/add" }
      ]
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      subMenu: [
        { title: "Order List", path: "/admin/orders" },
      ]
    },
    {
      title: "Users",
      icon: <ShoppingCart size={20} />,
      subMenu: [
        { title: "Users", path: "/admin/users" },

      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            text-xl font-bold text-gray-900
          `}>
            Admin Panel
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Grid size={24} />
          </button>
        </div>

        <nav className="mt-4">
          {SidebarMenu.map((item, index) => (
            <div key={index}>
              <Link 
                to={item.path}
                className="flex items-center p-4 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                {item.icon}
                <span className={`
                  ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                  text-sm font-medium
                `}>
                  {item.title}
                </span>
              </Link>
              {item.subMenu && isSidebarOpen && (
                <div className="pl-8 space-y-2 pb-2">
                  {item.subMenu.map((sub, subIndex) => (
                    <Link 
                      key={subIndex} 
                      to={sub.path}
                      className="block text-sm text-gray-600 hover:text-gray-900"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">  

        {/* Content Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;