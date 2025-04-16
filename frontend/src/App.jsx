import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import OrderSuccess from "./pages/Checkout/OrderSuccess";
import Review from "./pages/Review/index";
function App() {
  const [user, setUser] = useState(null); // Start as null
  const [loading, setLoading] = useState(true); // Set loading true initially
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Check user authentication and role after login

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }
    // Check for user info in localStorage
    const storedUserInfo = localStorage.getItem("userInfo");

    const parsedUserInfo = JSON.parse(storedUserInfo);
    setUser(parsedUserInfo); // Set the user state with stored data
    setLoading(false);
  }, [token]);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner until user data is loaded
  }

  return (
    <ThemeProvider>
      <Routes>
      <Route  element={<UserLayout />}>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Routes */}
        {user?.role === "admin" && (
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products">
              <Route path="" element={<Products />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="detail/:id" element={<AdminProductDetail />} />
              <Route path="edit/:id" element={<EditProduct />} />
            </Route>
            <Route path="orders">
              <Route path="" element={<OrdersList />} />
              <Route path="detail/:orderId" element={<OrderDetail />} />
            </Route>
            <Route path="users" element={<Users />} />
            <Route path="users/detail/:userId" element={<UserDetail />} />
          </Route>
        )}

        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />} />

          <Route path="products">
            <Route path="" element={<Product />} />
            <Route path="detail/:id" element={<ProductDetail />} />
          </Route>

          <Route path="checkout">
            <Route path="" element={<Checkout />} />
            <Route path="success/:orderId" element={<OrderSuccess />} />
          </Route>
          {user && user?.role === "user" && (
            <Route path="profile" element={<Profile />} />
          )}
          <Route path="personalization">
            <Route index element={<SkinToneSuggestion />} />
            <Route
              path="recommendations/:toneId"
              element={<RecommendedProducts />}
            />
          </Route>

          {user && user?.role === "user" && ( <Route path="review/:productId" element={<Review />} />
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
