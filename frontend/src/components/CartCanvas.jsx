import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const CartCanvas = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const CartItem = ({ item }) => (
    <div className={`${theme?.card} ${theme?.border} rounded-lg p-4 mb-4 flex gap-4 items-center`}>
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item?.images[0] || "/api/placeholder/80/80"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm mb-1 truncate">{item?.name}</h4>
        <p className={`${theme?.subtext} text-xs mb-2`}>{item?.brand}</p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className={`${theme?.card} ${theme?.border} p-1 rounded hover:opacity-80`}
              aria-label="Decrease quantity"
              onClick={() =>
                dispatch(updateQuantity({ productId: item?._id, newQuantity: Math.max(item?.quantity - 1, 1) }))
              }
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm">{item?.quantity}</span>
            <button
              className={`${theme?.card} ${theme?.border} p-1 rounded hover:opacity-80`}
              aria-label="Increase quantity"
              onClick={() =>
                dispatch(updateQuantity({ productId: item?._id, newQuantity: item?.quantity + 1 }))
              }
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">
              Rs{(item?.price * item?.quantity).toFixed(2)}
            </span>
            <button
              className="text-red-500 hover:text-red-600 transition-colors"
              aria-label="Remove item"
              onClick={() => dispatch(removeFromCart(item?._id))}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme?.background} ${theme?.text}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 ${theme?.border} border-b`}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <span className={`${theme?.subtext} text-sm`}>
              ({cartItems.length} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className={`${theme?.card} p-2 rounded-full hover:opacity-80`}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="opacity-20 mb-4" />
              <p className="font-medium mb-2">Your cart is empty</p>
              <p className={`${theme?.subtext} text-sm`}>
                Add items to your cart to see them here
              </p>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item?._id} item={item} />)
          )}
        </div>

        {/* Footer with Total and Checkout */}
        <div className={`absolute bottom-0 left-0 right-0 ${theme?.border} border-t p-4 space-y-4 ${theme?.card}`}>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold">Rs{total.toFixed(2)}</span>
          </div>
          <button
          onClick={()=> navigate("/checkout")}
            className={`Rs{theme?.primary} text-white w-full py-3 rounded-lg font-medium transform transition-all duration-200 hover:opacity-90 active:scale-[0.98]`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCanvas;
