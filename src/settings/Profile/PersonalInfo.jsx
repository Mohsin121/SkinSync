import React, { useState } from 'react';
import { Edit, Mail, Phone, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Comprehensive Skin Tone Options
const SKIN_TONES = [
  { id: 'fair', name: 'Fair', color: '#F5DEB3' },
  { id: 'light-medium', name: 'Light Medium', color: '#D2B48C' },
  { id: 'medium', name: 'Medium', color: '#8B4513' },
  { id: 'olive', name: 'Olive', color: '#6B4423' },
  { id: 'brown', name: 'Brown', color: '#5D4037' },
  { id: 'dark', name: 'Dark', color: '#3D2B1F' }
];

const PersonalInfo = () => {
  const { currentTheme } = useTheme();
  const [selectedSkinTone, setSelectedSkinTone] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSkinToneSelect = (toneId) => {
    setSelectedSkinTone(toneId);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <button 
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            currentTheme === 'midnight'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors duration-200`}
        >
          <Edit size={16} />
          <span>Edit Profile</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 relative">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ 
              backgroundColor: selectedSkinTone 
                ? SKIN_TONES.find(tone => tone.id === selectedSkinTone)?.color 
                : '#D3D3D3' 
            }}
          >
            <User 
              size={40} 
              className={`text-white ${currentTheme === 'midnight' ? 'opacity-80' : 'opacity-90'}`} 
            />
          </div>
          
          <div>
            <h4 className="text-lg font-medium">John Doe</h4>
            <p className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
              Member since 2023
            </p>
          </div>
        </div>

        {/* Skin Tone Selection Overlay */}
      
          <div 
            className={`p-4 rounded-lg mt-4 ${
              currentTheme === 'midnight' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <h4 className="text-md font-semibold mb-3">Select Your Skin Tone</h4>
            <div className="flex flex-wrap gap-3">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => handleSkinToneSelect(tone.id)}
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${selectedSkinTone === tone.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-transparent hover:border-gray-300'
                    } transition-all
                  `}
                  style={{ backgroundColor: tone.color }}
                  aria-label={`Select ${tone.name} skin tone`}
                >
                  {selectedSkinTone === tone.id && (
                    <User className="text-white" size={24} />
                  )}
                </button>
              ))}
            </div>
          </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skin Tone Display */}
          {selectedSkinTone && (
            <div className={`p-4 rounded-lg ${
              currentTheme === 'midnight' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={currentTheme === 'midnight' ? 'text-gray-400' : 'text-gray-600'}>
                  Skin Tone
                </span>
              </div>
              <p className="font-medium">
                {SKIN_TONES.find(tone => tone.id === selectedSkinTone)?.name || 'Not Selected'}
              </p>
            </div>
          )}
          
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
            <p className="font-medium">johndoe@example.com</p>
          </div>
          
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
            <p className="font-medium">+123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;