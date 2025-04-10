import React, { useEffect, useState } from 'react';
import { Edit, Mail, Phone, User, Save, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { successToaster, failureToaster } from '../../utils/swal'; // Assuming this path for your toaster utils
import skinTones from '../../constants/Skintones';



const PersonalInfo = () => {
  const { currentTheme } = useTheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    skinTone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Get user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      setUser({
        fullName: userData?.fullName,
        email: userData?.email,
        phone: userData?.phone,
        skinTone: userData?.skinTone
      });
      
      setFormData({
        fullName: userData?.fullName || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        skinTone: userData?.skinTone || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkinToneSelect = (toneId) => {
    setFormData(prev => ({
      ...prev,
      skinTone: toneId
    }));
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset form data to current user data
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      skinTone: user.skinTone || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put('http://localhost:8000/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.data.data) {
        // Update localStorage with new data
        const updatedUserInfo = { ...JSON.parse(localStorage.getItem("userInfo")), ...formData };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        
        // Update state
        setUser({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          skinTone: formData.skinTone
        });
        
        // Show success message
        successToaster('Profile updated successfully');
        
        // Exit edit mode
        setIsEditingProfile(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      failureToaster(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        {!isEditingProfile ? (
          <button 
            onClick={() => setIsEditingProfile(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentTheme === 'midnight'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors duration-200`}
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancelEdit}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentTheme === 'midnight'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors duration-200`}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentTheme === 'midnight'
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              } transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Save size={16} />
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 relative">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ 
              backgroundColor: formData.skinTone 
                ? skinTones.find(tone => tone.id === formData.skinTone)?.hex 
                : '#D3D3D3' 
            }}
          >
            <User 
              size={40} 
              className={`text-white ${currentTheme === 'midnight' ? 'opacity-80' : 'opacity-90'}`} 
            />
          </div>
          
          <div>
            {isEditingProfile ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md ${
                  currentTheme === 'midnight'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Your Full Name"
              />
            ) : (
              <h4 className="text-lg font-medium">{user.fullName}</h4>
            )}
            <p className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
              Member since 2023
            </p>
          </div>
        </div>

        {/* Skin Tone Selection */}
        {isEditingProfile && (
          <div 
            className={`p-4 rounded-lg mt-4 ${
              currentTheme === 'midnight' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <h4 className="text-md font-semibold mb-3">Select Your Skin Tone</h4>
            <div className="flex flex-wrap gap-3">
              {skinTones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => handleSkinToneSelect(tone.id)}
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${formData.skinTone === tone.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-transparent hover:border-gray-300'
                    } transition-all
                  `}
                  style={{ backgroundColor: tone.hex }}
                  aria-label={`Select ${tone.name} skin tone`}
                >
                  {formData.skinTone === tone.id && (
                    <User className="text-white" size={24} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skin Tone Display */}
          {formData.skinTone && !isEditingProfile && (
            <div className={`p-4 rounded-lg ${
              currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
                  Skin Tone
                </span>
              </div>
              <p className="font-medium">
                {skinTones.find(tone => tone.id === formData.skinTone)?.name || 'Not Selected'}
              </p>
            </div>
          )}
          
          {/* Email (ReadOnly) */}
          <div className={`p-4 rounded-lg ${
            currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <Mail 
                size={18} 
                className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-gray-500'}
              />
              <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
                Email
              </span>
            </div>
            <p className="font-medium">{user.email}</p>
          </div>
          
          {/* Phone (Editable) */}
          <div className={`p-4 rounded-lg ${
            currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <Phone 
                size={18} 
                className={currentTheme === 'midnight' ? 'text-cyan-400' : 'text-gray-500'}
              />
              <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
                Phone
              </span>
            </div>
            {isEditingProfile ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md ${
                  currentTheme === 'midnight'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Your Phone Number"
              />
            ) : (
              <p className="font-medium">{user.phone || "No phone number added"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;