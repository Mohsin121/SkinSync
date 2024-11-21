import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { User, Settings, MapPin, ChevronRight, Edit, Lock, Phone, Mail } from 'lucide-react';

const Profile = () => {
  const { theme, currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'address', label: 'Address', icon: MapPin }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
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
                    <Mail size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-blue-500'} />
                    <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>Email</span>
                  </div>
                  <p className="font-medium">johndoe@example.com</p>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-blue-500'} />
                    <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>Phone</span>
                  </div>
                  <p className="font-medium">+123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
            
            <div className={`space-y-4 p-6 rounded-lg ${
              currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className="font-medium flex items-center gap-2">
                <Lock size={18} className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-blue-500'} />
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
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors duration-200`}>
                Update Password
              </button>
            </div>
          </div>
        );
      case 'address':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4">
              <h3 className="text-xl font-semibold">Shipping Address</h3>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentTheme === 'midnight' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors duration-200`}>
                <Edit size={16} />
                <span>Edit Address</span>
              </button>
            </div>
            
            <div className={`p-6 rounded-lg ${
              currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className={currentTheme === 'midnight' ? 'text-cyan-400 mt-1' : 'text-blue-500 mt-1'} />
                  <div>
                    <h4 className="font-medium">Home Address</h4>
                    <p className={`${currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}`}>
                      123 Main St, <br />
                      Springfield, IL 62701, <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen py-8 ${
      currentTheme === 'midnight' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`md:col-span-1 ${
            currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-sm p-4`}>
            {tabItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors duration-200 ${
                  activeTab === item.id
                    ? currentTheme === 'midnight'
                      ? 'bg-gray-700 text-cyan-400'
                      : 'bg-blue-50 text-blue-600'
                    : currentTheme === 'midnight'
                      ? 'text-gray-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={`md:col-span-3 ${
            currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-sm p-6`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;