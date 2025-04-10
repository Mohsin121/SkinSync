import { Edit, MapPin, Save, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { failureToaster, successToaster } from '../../utils/swal';
import axios from 'axios';

const Address = () => {
  const { currentTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState({
    street: '123 Main St',
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


    // Get user data from localStorage
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      if (userData) {
        
        setAddress({
          state: userData?.state || '',
          city: userData?.city || '',
          street: userData?.street || '',
          zip: userData?.zip || '',
          country: userData?.country || ''

        });
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put('http://localhost:8000/api/user/update-address', address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.data.data) {
        // Update localStorage with new data
        const updatedUserInfo = { ...JSON.parse(localStorage.getItem("userInfo")), ...address };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        
        // Update state
        setAddress({
          fullName: address.fullName,
          email: address.email,
          phone: address.phone,
          skinTone: address.skinTone
        });
        
        // Show success message
        successToaster('Address updated successfully');
        
        // Exit edit mode
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      failureToaster(error.response?.data?.message || 'Failed to update address');
    } finally {
      setIsLoading(false);
    }
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
                Street
              </label>
              <input
                type="text"
                name="street"
                value={address.street}
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
              onClick={(e) => handleSubmit(e)}
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
                  {address.street} <br />
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
