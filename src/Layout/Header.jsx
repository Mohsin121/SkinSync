import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import CartCanvas from '../components/CartCanvas';
import SkinSyncLogo from '../components/SkinSyncLogo';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

const onLogout = () => {
  navigate("/login")
}

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-30
          ${theme?.background} ${theme?.text}
          border-b ${theme?.border}
          backdrop-blur-lg bg-opacity-90
        `}
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <SkinSyncLogo />
            </Link>

            {/* Navigation Links - Add your nav items here */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="hover:opacity-80">
                Products
              </Link>
              <Link to="/personalization" className="hover:opacity-80">
              Style Personalization
              </Link>
              <Link to="/about" className="hover:opacity-80">
                About
              </Link>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4 relative">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`${theme?.card} p-2 rounded-full hover:opacity-80`}
                aria-label="Toggle theme"
              >
                {theme?.name === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`${theme?.card} p-2 rounded-full hover:opacity-80 relative`}
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span
                    className={`
                      absolute -top-1 -right-1
                      bg-red-500 text-white
                      rounded-full text-xs
                      w-5 h-5 flex items-center justify-center
                      font-medium
                    `}
                  >
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className={`${theme?.card} p-2 rounded-full hover:opacity-80 flex items-center`}
                  aria-label="User account"
                >
                  <User size={20} />
                  <ChevronDown className="ml-2" size={16} />
                </button>

                {/* Profile Menu */}
                {isProfileMenuOpen && (
                  <div
                    className={`${theme?.card} ${theme?.border} absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 hover:opacity-80"
                    >
                      Profile
                    </Link>

                           
                    <button
                      onClick={() => onLogout()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:opacity-80"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Canvas */}
      <CartCanvas
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default Header;
