import { Edit, MapPin, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Address = () => {
  const { currentTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [address, setAddress] = useState({
    line1: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    country: 'United States',
  });

  // Handle input changes
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            currentTheme === 'midnight'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors duration-200`}
        >
          {isEditing ? <X size={16} /> : <Edit size={16} />}
          <span>{isEditing ? 'Cancel' : 'Edit Address'}</span>
        </button>
      </div>

      <div
        className={`p-6 rounded-lg ${
          currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        {isEditing ? (
          // Editable fields
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="line1"
                value={address.line1}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg ${
                  currentTheme === 'midnight'
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100 text-gray-700'
                }`}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    currentTheme === 'midnight'
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    currentTheme === 'midnight'
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={address.zip}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    currentTheme === 'midnight'
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    currentTheme === 'midnight'
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`mt-4 px-6 py-2 rounded-lg ${
                currentTheme === 'midnight'
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                  : 'bg-gray-500 hover:bg-gray-400 text-white'
              }`}
            >
              Save Address
            </button>
          </form>
        ) : (
          // Display address
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                className={
                  currentTheme === 'midnight' ? 'text-cyan-400 mt-1' : 'text-gray-500 mt-1'
                }
              />
              <div>
                <h4 className="font-medium">Home Address</h4>
                <p
                  className={`${
                    currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {address.line1}, <br />
                  {address.city}, {address.state} {address.zip}, <br />
                  {address.country}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
