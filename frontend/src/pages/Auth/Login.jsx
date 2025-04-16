import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { failureToaster, successToaster } from "../../utils/swal";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;

    const response = await axios.post("http://localhost:8000/api/auth/login", formData);
      successToaster("Login Successful");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.data));
      console.log("user",response.data.data.role)

     // Wait a moment to ensure localStorage is updated
     setTimeout(() => {
      // Redirect based on user role
      if (response.data.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 100);
    } catch (error) {
      console.log("Error", error);
      if (error.response && error.response.data) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account to continue.
        </p>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none pr-12"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-gray-600 hover:underline">
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
          >
            Login
          </button>
        </form>

        {serverError && (
  <div className="mt-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md flex items-center justify-center">
    <AlertCircle size={16} className="mr-2" />
    <span>{serverError}</span>
  </div>
)}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
