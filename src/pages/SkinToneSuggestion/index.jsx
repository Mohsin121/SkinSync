import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive Fitzpatrick Skin Type Scale with Hex Colors and Descriptions
const SKIN_TONES = [
  {
    id: 'type0',
    name: 'Type 0 - Albinism',
    description: 'Extremely pale skin with little to no pigmentation.',
    color: '#FFFFFF',
    undertone: 'Neutral/Pink',
   
  },
  {
    id: 'type1',
    name: 'Type I - Very Fair',
    description: 'Always burns, never tans. Pale white skin, often with freckles.',
    color: '#F8E6D4',
    undertone: 'Cool/Pink',
   
  },
  {
    id: 'type2',
    name: 'Type II - Fair',
    description: 'Burns easily, tans minimally. White skin, usually with fair hair.',
    color: '#E6D2BA',
    undertone: 'Cool/Neutral',
   
  },
  {
    id: 'type3-light',
    name: 'Type III-A - Light Medium',
    description: 'Burns moderately, begins to tan. Light olive or beige skin.',
    color: '#D2B48C',
    undertone: 'Neutral',
   
  },
  {
    id: 'type3-medium',
    name: 'Type III-B - Medium',
    description: 'Burns moderately, tans gradually. Light brown skin.',
    color: '#B87333',
    undertone: 'Warm/Neutral',
    
  },
  {
    id: 'type4',
    name: 'Type IV - Olive',
    description: 'Burns minimally, tans easily. Moderate brown skin.',
    color: '#8B4513',
    undertone: 'Warm',
   
  },
  {
    id: 'type5-light',
    name: 'Type V-A - Dark Brown Light',
    description: 'Rarely burns, tans darkly. Light dark brown skin.',
    color: '#6B4423',
    undertone: 'Warm/Deep',
    
  },
  {
    id: 'type5-medium',
    name: 'Type V-B - Dark Brown Medium',
    description: 'Almost never burns, deeply tans. Medium dark brown skin.',
    color: '#5D4037',
    undertone: 'Deep Warm',
   
  },
  {
    id: 'type6-light',
    name: 'Type VI-A - Very Dark Light',
    description: 'Never burns, deeply pigmented. Light deep brown/black skin.',
    color: '#3D2B1F',
    undertone: 'Deep Warm',
    
  },
  {
    id: 'type6-dark',
    name: 'Type VI-B - Very Dark',
    description: 'Never burns, deeply pigmented. Darkest brown/black skin.',
    color: '#1A120B',
    undertone: 'Deep Dark Warm',
    
  }
];
const SkinToneSelector = () => {
  const [selectedSkinTone, setSelectedSkinTone] = useState(null);

  const handleSkinToneSelect = (toneId) => {
    setSelectedSkinTone(toneId);
  };

  const getSelectedToneDetails = () => {
    return SKIN_TONES.find(tone => tone.id === selectedSkinTone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Skin Tone Selection */}
        <div className="w-full md:w-2/3 p-6 md:p-10 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Personalized Styling
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Select your skin tone to receive tailored clothing recommendations that enhance your natural complexion.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SKIN_TONES.map((tone) => (
              <div 
                key={tone.id}
                onClick={() => handleSkinToneSelect(tone.id)}
                className={`
                  cursor-pointer 
                  border-2 
                  rounded-lg 
                  p-3 
                  transition-all 
                  duration-300 
                  ${selectedSkinTone === tone.id 
                    ? 'border-gray-500 ring-2 ring-gray-200 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: tone.color }}
                  >
                    {selectedSkinTone === tone.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check className="text-blue-500" size={20} />
                      </div>
                    )}
                  </div>
                  <span className={`
                    text-xs font-semibold 
                    ${selectedSkinTone === tone.id ? 'text-blue-600' : 'text-gray-700'}
                  `}>
                    {tone.name.split(' - ')[1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Tone Details */}
        <div className="w-full md:w-1/3 bg-blue-50 p-6 md:p-8 flex flex-col justify-between">
          {selectedSkinTone ? (
            <>
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  {getSelectedToneDetails().name}
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  {getSelectedToneDetails().description}
                </p>
                <div className="bg-white rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600">
                    <strong>Undertone:</strong> {getSelectedToneDetails().undertone}
                  </p>
                </div>
              </div>
              <Link
                to='recommendations' 
                className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Recommendations <ArrowRight className="ml-2" size={20} />
              </Link>
            </>
          ) : (
            <div className="text-center">
              <p className="text-blue-600">Select a skin tone to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinToneSelector;