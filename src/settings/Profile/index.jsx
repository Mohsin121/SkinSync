import React, { useState } from 'react';
import { User, Settings, MapPin, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PersonalInfo from './PersonalInfo';
import Setting from './Setting';
import Address from './Address';
import Orders from './Orders';

const Profile = () => {
  const { currentTheme , theme} = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div
      className={`min-h-screen py-8 ${
        currentTheme === 'midnight' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={`w-full md:w-64 p-4 rounded-xl ${
              currentTheme === 'midnight' ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
            }`}
          >
            {tabItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                    activeTab === item.id
                      ? theme.button
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      activeTab === item.id ? 'text-white' : 'text-gray-500'
                    }`}
                  />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow p-6 rounded-xl ${
              currentTheme === 'midnight' ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
            }`}
          >
            {activeTab === 'profile' && <PersonalInfo />}
            {activeTab === 'settings' && <Setting />}
            {activeTab === 'address' && <Address />}
            {activeTab === 'orders' && <Orders />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
