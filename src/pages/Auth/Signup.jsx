// src/components/Register.js
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
// import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Registration attempt:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md mx-auto p-6 mt-8">
        <div
          className={`rounded-lg shadow-lg p-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
