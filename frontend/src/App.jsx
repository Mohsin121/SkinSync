import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import NotFound from "./components/NotFound";
import UserLayout from "./Layout";
import Home from "./Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { ThemeProvider } from "./context/ThemeContext";
import Product from "./pages/Product";
import ProductDetail from "./pages/Product/ProductDetail";
import Profile from "./settings/Profile";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SkinToneSuggestion from "./pages/SkinToneSuggestion";
import RecommendedProducts from "./pages/SkinToneSuggestion/Recommendations";
import Checkout from "./pages/Checkout";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminLayout from "./components/AdminLayout";
import Products from "./pages/Admin/Products";
import OrdersList from "./pages/Admin/Orders";
import Users from "./pages/Admin/Users";
import AddProduct from "./pages/Admin/Products/AddProduct";
import UserDetail from "./pages/Admin/Users/UserDetail";
import AdminProductDetail from "./pages/Admin/Products/AdminProductDetails";
import EditProduct from "./pages/Admin/Products/EditProduct";
import OrderDetail from "./pages/Admin/Orders/OrderDetails";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const verifyUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/user/context", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUser(data.data);
      setIsAuthenticated(true);
      if (data.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      setLoading(false);

    } catch (error) {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    verifyUser();
  }, [token]);

  const ProtectedRoute = ({ children, role }) => {
    if (loading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <ThemeProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/detail/:id" element={<AdminProductDetail />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/detail" element={<OrderDetail />} />
          <Route path="users" element={<Users />} />
          <Route path="users/detail/:userId" element={<UserDetail />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          
          <Route path="products">
          <Route path="" element={<Product />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          </Route>
          
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/personalization">
            <Route index element={<SkinToneSuggestion />} />
            <Route path="recommendations/:toneId" element={<RecommendedProducts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
