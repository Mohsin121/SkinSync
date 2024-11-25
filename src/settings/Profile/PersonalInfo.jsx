import { Edit, Mail, Phone, User } from 'lucide-react';
import React from 'react'
import { useTheme } from '../../context/ThemeContext';

const PersonalInfo = () => {

  const { currentTheme } = useTheme();

  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between pb-4">
      <h3 className="text-xl font-semibold">Personal Information</h3>
      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        currentTheme === 'midnight' 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      } transition-colors duration-200`}>
        <Edit size={16} />
        <span>Edit Profile</span>
      </button>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={40} className={currentTheme === 'midnight' ? 'text-gray-500' : 'text-gray-400'} />
        </div>
        <div>
          <h4 className="text-lg font-medium">John Doe</h4>
          <p className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
            Member since 2023
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Mail size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-gray-500'} />
            <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>Email</span>
          </div>
          <p className="font-medium">johndoe@example.com</p>
        </div>
        
        <div className={`p-4 rounded-lg ${
          currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-gray-500'} />
            <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>Phone</span>
          </div>
          <p className="font-medium">+123 456 7890</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PersonalInfo;