import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { Lock } from 'lucide-react';

const Setting = () => {
  const {  currentTheme } = useTheme();

  return (
    <div className="space-y-6">
    <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
    
    <div className={`space-y-4 p-6 rounded-lg ${
      currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <h4 className="font-medium flex items-center gap-2">
        <Lock size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-gray-500'} />
        Change Password
      </h4>
      
      <div className="space-y-4">
        <div>
          <label className={`block mb-2 text-sm ${
            currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Current Password
          </label>
          <input
            type="password"
            className={`w-full px-4 py-2 rounded-lg border ${
              currentTheme === 'midnight' 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-white border-gray-300'
            }`}
            placeholder="Enter current password"
          />
        </div>
        
        <div>
          <label className={`block mb-2 text-sm ${
            currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            New Password
          </label>
          <input
            type="password"
            className={`w-full px-4 py-2 rounded-lg border ${
              currentTheme === 'midnight' 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-white border-gray-300'
            }`}
            placeholder="Enter new password"
          />
        </div>
      </div>
      
      <button className={`mt-4 px-6 py-2 rounded-lg font-medium ${
        currentTheme === 'midnight'
          ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
          : 'bg-gray-500 hover:bg-gray-600 text-white'
      } transition-colors duration-200`}>
        Update Password
      </button>
    </div>
  </div>
  )
}

export default Setting