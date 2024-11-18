// src/components/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-16 flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
