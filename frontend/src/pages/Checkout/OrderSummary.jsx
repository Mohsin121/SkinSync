// OrderSummary.js
import React from 'react';

const OrderSummary = ({ 
  cartItems, 
  totalPrice, 
  shippingCost, 
  taxAmount, 
  orderTotal, 
  theme, 
  canOrder, 
  onPlaceOrder 
}) => {
  return (
    <div className={`${theme.card} shadow-lg rounded-xl sticky top-4 overflow-hidden`}>
      <div className={`${theme.primary} p-5 text-white`}>
        <h2 className="text-xl font-bold">Order Summary</h2>
      </div>
      
      <div className="p-5">
        {/* Cart items */}
        <div className="space-y-3 mb-6">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md w-10 h-10 flex items-center justify-center text-sm font-medium mr-3">
                  {item.quantity}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        {/* Price breakdown */}
        <div className={`space-y-3 pt-4 border-t ${theme.border}`}>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
          </div>
          
          <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="font-bold">Total</span>
            <span className="font-bold">${orderTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Order button */}
        <button
          onClick={onPlaceOrder}
          disabled={!canOrder}
          className={`w-full mt-6 py-3 rounded-lg font-medium ${
            !canOrder 
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
              : `${theme.button}`
          }`}
        >
          {!canOrder ? 'Select an Address to Continue' : 'Place Order'}
        </button>
        
        {/* Info note */}
        <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;