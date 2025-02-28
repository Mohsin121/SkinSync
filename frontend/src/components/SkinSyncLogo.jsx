import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SkinSyncLogo = ({ className = "" }) => {
  const { theme } = useTheme();
  
  // Default colors that work with both light/dark themes
  const primaryColor = theme?.primary?.includes('bg-') 
    ? theme.primary.replace('bg-', 'text-')
    : 'text-blue-600';
  
  const textColor = theme?.text || 'text-gray-900';

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Logo Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className="w-10 h-10 mr-2"
      >
        {/* Outer Circle */}
        <circle 
          cx="25" 
          cy="25" 
          r="20" 
          className={`${primaryColor.replace('text-', 'fill-')} opacity-20`}
        />
        
        {/* Stylized S shapes */}
        <path
          d="M30 15 Q35 15, 35 20 Q35 25, 25 25 Q15 25, 15 30 Q15 35, 20 35"
          className={`${primaryColor.replace('text-', 'stroke-')} fill-none`}
          strokeWidth="3"
          strokeLinecap="round"
        />
       
      </svg>

      {/* Text Logo */}
      <div className="flex items-baseline font-sans">
        <span className={`text-2xl font-light tracking-tight ${textColor}`}>
          Skin
        </span>
        <span className={`text-2xl font-bold tracking-wide ${primaryColor}`}>
          Sync
        </span>
        <span className="text-xs align-top ml-0.5 -translate-y-2.5 opacity-50">®</span>
      </div>
    </div>
  );
};

export default SkinSyncLogo;