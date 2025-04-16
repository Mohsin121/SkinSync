import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Grid, 
  Users, 
  LogOut,
  ChevronDown,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Simple menu structure
  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
      id: "dashboard"
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      id: "products",
      subMenu: [
        { title: "Product List", path: "/admin/products" },
        { title: "Add Product", path: "/admin/products/add" }
      ]
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      id: "orders",
      subMenu: [
        { title: "Order List", path: "/admin/orders" },
      ]
    },
    {
      title: "Users",
      icon: <Users size={20} />,
      id: "users",
      subMenu: [
        { title: "Users List", path: "/admin/users" },
      ]
    }
  ];

  // Check if current path matches exactly
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };
  
  // Check if current path is part of a section (for parent menu highlighting)
  const isActiveSection = (id) => {
    const path = location.pathname;
    
    // Simple path-based matching
    if (id === "dashboard" && path.includes("/admin/dashboard")) return true;
    if (id === "products" && path.includes("/admin/products")) return true;
    if (id === "orders" && path.includes("/admin/orders")) return true;
    if (id === "users" && path.includes("/admin/users")) return true;
    
    return false;
  };
  
  // Toggle submenu open/closed
  const toggleMenu = (id) => {
    if (openMenus.includes(id)) {
      // If it's open, close it
      setOpenMenus(openMenus.filter(menuId => menuId !== id));
    } else {
      // If it's closed, open it
      setOpenMenus([...openMenus, id]);
    }
  };
  
  // Simple logout function
  const handleLogout = () => {
    localStorage.setItem('token', null);
    localStorage.setItem('userInfo', null);

    navigate('/login');
  };

  // Keep appropriate menus open based on current route
  useEffect(() => {
    // Check which section is active
    sidebarMenu.forEach(item => {
      if (item.subMenu && isActiveSection(item.id)) {
        // If this section is active and not already open, add it to open menus
        if (!openMenus.includes(item.id)) {
          setOpenMenus(prev => [...prev, item.id]);
        }
      }
    });
  }, [location.pathname]); // This runs when the route changes

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {/* Only show title when sidebar is open */}
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-gray-900">
              Admin Panel
            </h2>
          )}
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Grid size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 mt-2 overflow-y-auto">
          {sidebarMenu.map((item) => {
            // Check if this item or its section is active
            const isActive = item.path ? isActiveRoute(item.path) : isActiveSection(item.id);
            // Check if submenu is open
            const isOpen = openMenus.includes(item.id);
            
            return (
              <div key={item.id}>
                {/* Menu Item (with or without link) */}
                {item.path ? (
                  // Simple link for items without submenus
                  <Link 
                    to={item.path}
                    className={`
                      flex items-center p-4 
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <span>{item.title}</span>}
                  </Link>
                ) : (
                  // Button for items with submenus
                  <button 
                    className={`
                      flex items-center justify-between p-4 w-full
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => isSidebarOpen && toggleMenu(item.id)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {isSidebarOpen && <span>{item.title}</span>}
                    </div>
                    
                    {/* Show dropdown arrows only when sidebar is open */}
                    {isSidebarOpen && item.subMenu && (
                      <span>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    )}
                  </button>
                )}
                
                {/* Submenu Items */}
                {item.subMenu && isSidebarOpen && isOpen && (
                  <div className="pl-10 py-1 bg-gray-50">
                    {item.subMenu.map((subItem, index) => (
                      <Link 
                        key={index} 
                        to={subItem.path}
                        className={`
                          block py-2 px-2 rounded
                          ${isActiveRoute(subItem.path) 
                            ? 'bg-blue-100 text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Logout Button */}
        <div className="border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-4 text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            <span className="mr-3"><LogOut size={20} /></span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">  
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;