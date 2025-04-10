// AddressSection.js
import React, { useState } from 'react';
import { MapPin, Check, Trash2, User } from 'lucide-react';
import AddressForm from './AddressForm';

const AddressSection = ({ addresses, selectedAddressId, theme, onAddressUpdate }) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  const handleEditAddress = (address = null) => {
    setEditingAddress(address || {
      fullName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: addresses.length === 0
    });
    setIsEditingAddress(true);
  };

  const handleSelectAddress = (id) => {
    onAddressUpdate(addresses, id);
  };

  const handleSaveAddress = (address) => {
    let updatedAddresses;
    let newSelectedId = selectedAddressId;

    if (address.id) {
      // Update existing address
      updatedAddresses = addresses.map(addr => 
        addr.id === address.id ? address : addr
      );
    } else {
      // Add new address
      const newId = addresses.length > 0 
        ? Math.max(...addresses.map(addr => addr.id)) + 1 
        : 1;
      const newAddress = { ...address, id: newId };
      updatedAddresses = [...addresses, newAddress];
      newSelectedId = newAddress.id;
    }

    // Handle default address
    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === (address.id || newSelectedId)
      }));
    }

    onAddressUpdate(updatedAddresses, newSelectedId);
    setIsEditingAddress(false);
    setEditingAddress({
      fullName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false
    });
  };

  const handleDeleteAddress = (idToDelete) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== idToDelete);
    let newSelectedId = selectedAddressId;
    
    if (selectedAddressId === idToDelete) {
      newSelectedId = updatedAddresses.length > 0 ? updatedAddresses[0].id : null;
    }

    onAddressUpdate(updatedAddresses, newSelectedId);
  };

  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    onAddressUpdate(updatedAddresses, selectedAddressId);
  };

  return (
    <div className={`${theme.card} shadow-lg p-6 border-b ${theme.border}`}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg md:text-xl font-semibold flex items-center">
          <MapPin className="mr-3" size={20} />
          Shipping Address
        </h2>
        {!isEditingAddress && (
          <button
            onClick={() => handleEditAddress()}
            className={`${theme.buttonSecondary} px-4 py-2 rounded-lg text-sm`}
          >
            {addresses.length > 0 ? 'Add New Address' : 'Add Address'}
          </button>
        )}
      </div>

      {isEditingAddress ? (
        <AddressForm 
          address={editingAddress}
          theme={theme}
          onSave={handleSaveAddress}
          onCancel={() => setIsEditingAddress(false)}
        />
      ) : addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isSelected={selectedAddressId === address.id}
              theme={theme}
              onSelect={() => handleSelectAddress(address.id)}
              onEdit={() => handleEditAddress(address)}
              onDelete={() => handleDeleteAddress(address.id)}
              onSetDefault={() => handleSetDefaultAddress(address.id)}
            />
          ))}
        </div>
      ) : (
        <div className={`p-8 text-center ${theme.background} rounded-lg border ${theme.border}`}>
          <User size={40} className="mx-auto mb-3 text-gray-400" />
          <p className="mb-4">No shipping addresses found</p>
          <button
            onClick={() => handleEditAddress()}
            className={`${theme.button} px-4 py-2 rounded-lg`}
          >
            Add New Address
          </button>
        </div>
      )}
    </div>
  );
};

// Address Card Component
const AddressCard = ({ address, isSelected, theme, onSelect, onEdit, onDelete, onSetDefault }) => {
  return (
    <div
      className={`relative border-2 p-4 rounded-lg cursor-pointer transition-all
        ${isSelected
          ? `border-${theme.accent} shadow-md`
          : `border-gray-200 dark:border-gray-700 hover:border-${theme.accent}`
        }
      `}
      onClick={onSelect}
    >
      {isSelected && (
        <div className={`absolute -top-3 -right-3 bg-${theme.accent} text-white p-1 rounded-full`}>
          <Check size={16} />
        </div>
      )}
      
      <div className="flex justify-between mb-2">
        <p className="font-medium">{address.fullName}</p>
        {address.isDefault && (
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            Default
          </span>
        )}
      </div>
      <p className="text-sm">{address.street}</p>
      <p className="text-sm">{`${address.city}, ${address.state} ${address.zipCode}`}</p>
      <p className="text-sm">{address.country}</p>
      
      <div className="flex justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </button>
        
        <div className="flex gap-3">
          {!address.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault();
              }}
              className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Set as Default
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center"
          >
            <Trash2 size={12} className="mr-1" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;