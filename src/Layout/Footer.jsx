// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SkinSync</h3>
            <p className="text-sm">
              Your trusted destination for skincare products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm hover:text-blue-500">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=cleansers"
                  className="text-sm hover:text-blue-500"
                >
                  Cleansers
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=moisturizers"
                  className="text-sm hover:text-blue-500"
                >
                  Moisturizers
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=serums"
                  className="text-sm hover:text-blue-500"
                >
                  Serums
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p>Email: support@skinsync.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} SkinSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;