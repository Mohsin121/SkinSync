// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import ProductList from "./components/ProductList";
// import ProductDetail from "./components/ProductDetail";
// import Cart from "./components/Cart";
// import Profile from "./components/Profile";

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


function App() {
  // Dummy auth state - replace with your actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />



          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/detail" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="personalization">
  <Route index element={<SkinToneSuggestion />} />
  <Route path="recommendations" element={<RecommendedProducts />} />
</Route>



            {/* Protected Routes */}
            {/* <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> */}
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
