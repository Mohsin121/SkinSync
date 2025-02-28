import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { successToaster } from "../../utils/swal";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear specific field error
  };

  // Validate the form
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Validation failed, request not sent.");
      return;
    }

    console.log("Validation passed, sending request...");
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/reset-password/${token}`,
        { password: formData.password }
      );

      console.log("Response received:", response);
      successToaster("Password reset successfully! Redirecting...");
      
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Request error:", error);
      setErrors({ apiError: error.response?.data?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Reset Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below to reset it.
        </p>

        {errors.apiError && <p className="text-red-500 text-center mb-4">{errors.apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 mb-4">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
