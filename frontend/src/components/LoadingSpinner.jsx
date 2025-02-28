import React from 'react';
import { RefreshCcw, ShoppingCart } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg flex flex-col items-center">
        <div className="flex space-x-3">
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="mt-4 text-lg font-medium text-white">Loading</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;