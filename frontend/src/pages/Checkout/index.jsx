// Main Checkout Component
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AddressSection from './AddressSection';
import PaymentSection from './PaymentSection';
import OrderSummary from './OrderSummary';
import { Box } from 'lucide-react';

const Checkout = () => {
  const { theme } = useTheme();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // State for addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Payment methods state
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        
        if (userInfo.addresses && userInfo.addresses.length > 0) {
          setAddresses(userInfo.addresses);
          
          const defaultAddress = userInfo.addresses.find(addr => addr.isDefault);
          setSelectedAddressId(defaultAddress ? defaultAddress.id : userInfo.addresses[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading user information:', error);
    }
  };

  // Calculate totals
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = totalPrice > 100 ? 0 : 10;
  const taxAmount = totalPrice * 0.07; // 7% tax
  const orderTotal = totalPrice + shippingCost + taxAmount;

  // Update localStorage with new addresses
  const updateLocalStorage = (updatedAddresses) => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      let userInfo = userInfoString ? JSON.parse(userInfoString) : {};
      userInfo.addresses = updatedAddresses;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  // Handle address management
  const handleAddressUpdate = (newAddresses, newSelectedId) => {
    setAddresses(newAddresses);
    setSelectedAddressId(newSelectedId);
    updateLocalStorage(newAddresses);
  };

  // Handle payment method changes
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'creditCard') {
      setCardDetails({ cardNumber: '', expirationDate: '', cvv: '' });
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    // Validate requirements
    if (!selectedAddressId) {
      alert('Please select or add a shipping address');
      return;
    }

    if (paymentMethod === 'creditCard') {
      const { cardNumber, expirationDate, cvv } = cardDetails;
      if (!cardNumber.trim() || !expirationDate.trim() || !cvv.trim()) {
        alert('Please complete all credit card fields');
        return;
      }
    }

    // Create order object
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    const order = {
      items: cartItems,
      shippingAddress: selectedAddress,
      paymentMethod,
      cardDetails: paymentMethod === 'creditCard' ? cardDetails : null,
      subtotal: totalPrice,
      shipping: shippingCost,
      tax: taxAmount,
      total: orderTotal,
      orderDate: new Date().toISOString()
    };

    // Save order to localStorage and navigate to confirmation
    localStorage.setItem('latestOrder', JSON.stringify(order));
    navigate('/order-confirmation');
  };

  return (
    <div className={`${theme.background} min-h-screen py-12 px-4 md:px-6 lg:px-16`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Mobile Order Summary */}
        <div className="md:hidden mb-6">
          <div className={`${theme.card} shadow-lg rounded-xl p-6`}>
            <h2 className="text-xl font-semibold mb-4">Order Summary ({cartItems.length} items)</h2>
            <p className="font-medium">Total: ${orderTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Main Checkout Container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Customer Information */}
          <div className="md:w-2/3">
            {/* Checkout Header */}
            <div className={`${theme.card} shadow-lg rounded-t-xl p-6 border-b ${theme.border}`}>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Box className="mr-3" size={24} />
                Checkout
              </h1>
            </div>

            {/* Address Section */}
            <AddressSection 
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              theme={theme}
              onAddressUpdate={handleAddressUpdate}
            />

            {/* Payment Method Section */}
            <PaymentSection 
              theme={theme}
              paymentMethod={paymentMethod}
              cardDetails={cardDetails}
              onPaymentMethodChange={handlePaymentMethodChange}
              onCardDetailsChange={handleCardDetailsChange}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:w-1/3">
            <OrderSummary 
              cartItems={cartItems}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              orderTotal={orderTotal}
              theme={theme}
              canOrder={!!selectedAddressId}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;