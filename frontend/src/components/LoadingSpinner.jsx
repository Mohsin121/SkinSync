import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 10);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        {/* Logo Container with animations */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Subtle pulsing background */}
          <div className="absolute w-full h-full rounded-full bg-slate-200 opacity-40 animate-pulse"></div>
          
          {/* Spinning orbit elements - using SkinSync's slate colors */}
          <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-slate-400 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-slate-500 rounded-full"></div>
          </div>
          <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 bg-slate-600 rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 -mt-1 bg-slate-700 rounded-full"></div>
          </div>
          
          {/* SkinSync logo placeholder */}
          <div className="relative transform transition-transform duration-200">
            {/* This is where you'd place the actual SkinSync logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2">
                <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
              </div>
              <div className="text-slate-800 font-medium">
                <span>Skin</span><span className="font-bold">Sync</span>
                <span className="text-xs align-top">®</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading text with minimal animation */}
        <div className="mt-6 text-center">
          <p className="text-slate-700 text-sm font-medium">Loading</p>
          <div className="mt-2 flex space-x-1 justify-center">
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;