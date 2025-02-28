import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Box, Check, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Checkout = () => {
  const { theme } = useTheme(); // Access the current theme from context
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
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  
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
    setIsEditingAddress(false);
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

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'creditCard') {
      setCardDetails({ cardNumber: '', expirationDate: '', cvv: '' }); // Reset card details when switching to COD
    }
  };

  // Handle credit card input changes
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle placing the order
  const handlePlaceOrder = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

    if (!selectedAddress) {
      alert('Please select or add a shipping address');
      return;
    }

    if (paymentMethod === 'creditCard' && Object.values(cardDetails).some(field => field === '')) {
      alert('Please complete your credit card details');
      return;
    }

    // Proceed to order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className={`${theme.background} min-h-screen py-12 px-6 lg:px-16`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Checkout Container */}
        <div className={`${theme.card} shadow-xl rounded-xl overflow-hidden`}>
          
          {/* Checkout Header */}
          <div className={`${theme.primary} p-8 text-white`}>
            <h1 className="text-3xl font-bold flex items-center">
              <Box className="mr-4" size={32} />
              Checkout
            </h1>
          </div>

          {/* Shipping Address Section */}
          <div className={`${theme.card} p-8 border-b`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <MapPin className={`mr-3 ${theme.accent}`} />
                Shipping Address
              </h2>
              <button
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className={`${theme.button} text-lg px-4 py-2 rounded-lg`}
              >
                {isEditingAddress ? 'Cancel Edit' : 'Edit Address'}
              </button>
            </div>

            {/* Address Selection */}
            {!isEditingAddress ? (
              <div className="mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 p-6 rounded-lg cursor-pointer relative transition-all duration-300
                        ${selectedAddressId === address.id
                          ? `border-${theme.primary} ${theme.card} shadow-lg`
                          : `border-${theme.border} hover:border-${theme.primary}`}
                      `}
                      onClick={() => handleSelectAddress(address.id)}
                    >
                      {selectedAddressId === address.id && (
                        <Check className="absolute top-2 right-2 text-green-600" />
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
                        <span className="text-xs text-gray-600 mt-2 block">Default Address</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // New Address Form (when editing or adding address)
              <div className={`${theme.background} p-6 rounded-lg mb-6`}>
                <div className="grid md:grid-cols-2 gap-6">
                  {['fullName', 'street', 'city', 'state', 'zipCode', 'country'].map((field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={newAddress[field]}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setNewAddress(prev => ({ ...prev, [name]: value }));
                      }}
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-gray-500"
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    className={`${theme.text} hover:${theme.hover}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className={`${theme.button} px-6 py-3 rounded-lg`}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method Section */}
          <div className={`${theme.card} p-8 border-b`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CreditCard className={`mr-3 ${theme.accent}`} />
              Payment Method
            </h2>

            <div className="space-y-4">
              {/* Payment options */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === 'cashOnDelivery'}
                  onChange={() => handlePaymentMethodChange('cashOnDelivery')}
                  className="mr-4"
                />
                <label htmlFor="cashOnDelivery" className="text-lg">
                  Cash on Delivery
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => handlePaymentMethodChange('creditCard')}
                  className="mr-4"
                />
                <label htmlFor="creditCard" className="text-lg">
                  Credit Card
                </label>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === 'creditCard' && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-gray-500"
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="expirationDate"
                      placeholder="MM/YY"
                      value={cardDetails.expirationDate}
                      onChange={handleCardDetailsChange}
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className={`${theme.card} p-8`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Box className="mr-3" />
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-xl">Total</span>
              <span className="text-xl">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-8 text-end p-3">
            <button
              onClick={handlePlaceOrder}
              className={`${theme.button} text-lg py-3 px-6 rounded-lg`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
