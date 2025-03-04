// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token)
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("http://localhost:8000/api/user/context", {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <LoadingSpinner />; // Show a loader while checking auth status
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

      

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="users" element={<Users />} />
            <Route path="users/detail/:userId" element={<UserDetail />} />

      </Route>

          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/detail" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile  />
                </ProtectedRoute>
              }
            />

            <Route path="/personalization">
              <Route index element={<SkinToneSuggestion />} />
              <Route path="recommendations" element={<RecommendedProducts />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
