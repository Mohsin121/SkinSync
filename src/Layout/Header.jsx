import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import CartCanvas from '../components/CartCanvas';
import SkinSyncLogo from '../components/SkinSyncLogo';
import { useSelector } from 'react-redux';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux

  


  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-30
        ${theme?.background} ${theme?.text}
        border-b ${theme?.border}
        backdrop-blur-lg bg-opacity-90
      `}>
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <SkinSyncLogo />
            </Link>

            {/* Navigation Links - Add your nav items here */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="hover:opacity-80">Products</Link>
              <Link to="/categories" className="hover:opacity-80">Categories</Link>
              <Link to="/about" className="hover:opacity-80">About</Link>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
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
                  <span className={`
                    absolute -top-1 -right-1
                    bg-red-500 text-white
                    rounded-full text-xs
                    w-5 h-5 flex items-center justify-center
                    font-medium
                  `}>
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              <button
                className={`${theme?.card} p-2 rounded-full hover:opacity-80`}
                aria-label="User account"
              >
                <User size={20} />
              </button>
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