// AddressForm.js
import React, { useState } from 'react';

const AddressForm = ({ address, theme, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: address.id || null,
    fullName: address.fullName || '',
    street: address.street || '',
    city: address.city || '',
    state: address.state || '',
    zipCode: address.zipCode || '',
    country: address.country || '',
    isDefault: address.isDefault || false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'street', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in these required fields: ${missingFields.join(', ')}`);
      return;
    }

    onSave(formData);
  };

  return (
    <div className={`${theme.card} border ${theme.border} rounded-lg p-5`}>
      <h3 className="text-lg font-medium mb-4">
        {formData.id ? 'Edit Address' : 'Add New Address'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="123 Main St"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="New York"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">State/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="NY"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Zip/Postal Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="10001"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
            placeholder="United States"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={() => setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }))}
            className="mr-2"
          />
          <span className="text-sm">Set as default address</span>
        </label>
      </div>
      
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`${theme.button} px-4 py-2 rounded-lg`}
        >
          {formData.id ? 'Update Address' : 'Save Address'}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;