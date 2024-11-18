// src/components/Home.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to SkinSync</h1>
          <p className="text-xl mb-8">Discover your perfect skincare routine</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {["Cleansers", "Moisturizers", "Serums"].map((category) => (
            <div
              key={category}
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="mb-4">
                Explore our selection of {category.toLowerCase()}
              </p>
              <Link
                to={`/products?category=${category.toLowerCase()}`}
                className="text-blue-500 hover:text-blue-600"
              >
                View Products →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
