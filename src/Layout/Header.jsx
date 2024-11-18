// src/components/Navbar.js
import { Sun, Moon, ShoppingCart, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`fixed top-0 w-full z-50 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">SkinSync</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart size={20} />
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
