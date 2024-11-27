import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Box, Check, Plus, Trash2 } from 'lucide-react';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Mock addresses for design stage
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States',
      isDefault: true
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const navigate = useNavigate();

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle new address submission
  const handleAddAddress = () => {
    if (Object.values(newAddress).some(field => field === '')) {
      alert('Please fill in all address fields');
      return;
    }

    const newAddressEntry = { ...newAddress, id: addresses.length + 1 };
    setAddresses(prev => [...prev, newAddressEntry]);
    setSelectedAddressId(newAddressEntry.id);
    setIsAddingNewAddress(false);
    setNewAddress({
      fullName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false
    });
  };

  // Handle address selection
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    setNewAddress(addresses.find(address => address.id === id));
  };

  // Delete an address
  const handleDeleteAddress = (idToDelete) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== idToDelete);
    setAddresses(updatedAddresses);

    if (selectedAddressId === idToDelete) {
      setSelectedAddressId(updatedAddresses.length > 0 ? updatedAddresses[0].id : null);
      setNewAddress({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false
      });
    }
  };

  // Proceed to place the order
  const handlePlaceOrder = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

    if (!selectedAddress) {
      alert('Please select or add a shipping address');
      return;
    }

    navigate('/order-confirmation');
  };

  // Handle changes in the new address form
  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Checkout Container */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          
          {/* Checkout Header */}
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center">
              <Box className="mr-4" size={32} />
              Checkout
            </h1>
          </div>

          {/* Shipping Address Section */}
          <div className="p-8 border-b">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <MapPin className="mr-3 text-blue-600" />
                Shipping Address
              </h2>
            </div>

            {/* Address Selection */}
            <div className="mb-6">
              <button
                onClick={() => setIsAddingNewAddress(true)}
                className={`text-xl font-medium text-blue-600 hover:text-blue-800 ${!isAddingNewAddress && 'underline'}`}
              >
                Add New Address
              </button>
              <span className="mx-4">|</span>
              <button
                onClick={() => setIsAddingNewAddress(false)}
                className={`text-xl font-medium text-blue-600 hover:text-blue-800 ${isAddingNewAddress && 'underline'}`}
              >
                Select Existing Address
              </button>
            </div>

            {/* New Address Form (when adding new address) */}
            {isAddingNewAddress ? (
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {['fullName', 'street', 'city', 'state', 'zipCode', 'country'].map((field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={newAddress[field]}
                      onChange={handleNewAddressChange}
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsAddingNewAddress(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            ) : (
              // Existing Address Selection
              <div className="grid md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`
                      border-2 p-6 rounded-lg cursor-pointer relative
                      transition-all duration-300
                      ${selectedAddressId === address.id 
                        ? 'border-blue-600 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'}
                    `}
                    onClick={() => handleSelectAddress(address.id)}
                  >
                    {selectedAddressId === address.id && (
                      <Check className="absolute top-2 right-2 text-blue-600" />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                      className="absolute top-2 left-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                    <p className="font-medium">{address.fullName}</p>
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                    <p>{address.country}</p>
                    {address.isDefault && (
                      <span className="text-xs text-blue-600 mt-2 block">Default Address</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="p-8 border-b">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CreditCard className="mr-3 text-green-600" />
              Payment Method
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {['creditCard', 'paypal', 'applePay'].map((method) => (
                <label
                  key={method}
                  className={`
                    flex items-center justify-center p-6 border-2 rounded-lg cursor-pointer 
                    transition-all text-center
                    ${paymentMethod === method 
                      ? 'border-green-600 bg-green-50 shadow-md' 
                      : 'border-gray-200 hover:border-green-300'}
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="hidden"
                  />
                  <span className="capitalize">
                    {method === 'creditCard' ? 'Credit Card' : 
                     method === 'paypal' ? 'PayPal' : 'Apple Pay'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Box className="mr-3 text-blue-600" />
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-lg font-semibold mt-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
