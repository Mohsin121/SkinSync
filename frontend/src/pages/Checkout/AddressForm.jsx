// SimpleAddressForm.js
import React from 'react';
import { MapPin } from 'lucide-react';

const SimpleAddressForm = ({ addressDetails, theme, onAddressChange }) => {
  return (
    <div className={`${theme.card} shadow-lg p-6 border-b ${theme.border}`}>
      <div className="flex items-center mb-5">
        <h2 className="text-lg md:text-xl font-semibold flex items-center">
          <MapPin className="mr-3" size={20} />
          Shipping Address
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={addressDetails.fullName}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Street Address*</label>
          <input
            type="text"
            name="street"
            value={addressDetails.street}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="123 Main St"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">City*</label>
          <input
            type="text"
            name="city"
            value={addressDetails.city}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="New York"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">State/Province*</label>
          <input
            type="text"
            name="state"
            value={addressDetails.state}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="NY"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Zip/Postal Code*</label>
          <input
            type="text"
            name="zipCode"
            value={addressDetails.zip}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="10001"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Country*</label>
          <input
            type="text"
            name="country"
            value={addressDetails.country}
            onChange={onAddressChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="United States"
            required
          />
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        * Required fields
      </div>
    </div>
  );
};

export default SimpleAddressForm;