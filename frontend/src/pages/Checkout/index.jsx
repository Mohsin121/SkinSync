// Main Checkout Component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AddressForm from './AddressForm';
import PaymentSection from './PaymentSection';
import OrderSummary from './OrderSummary';
import { Box } from 'lucide-react';
import { failureToaster, successToaster } from './../../utils/swal';
import axios from 'axios';
import { removeFromCart } from '../../redux/slices/cartSlice';

const Checkout = () => {
  const { theme } = useTheme();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Single address state
  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  // Payment methods state
  const [paymentMethod, setPaymentMethod] = useState('cash');
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
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        // If user has a default address, load it
        if (userInfo) {
          setAddressDetails({
            fullName: userInfo.fullName || '',
            street: userInfo.street || '',
            city: userInfo.city || '',
            state: userInfo.state || '',
            zip: userInfo.zip || '',
            country: userInfo.country || ''
          });
        }
      }
    
  };

  // Calculate totals
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = totalPrice > 100 ? 0 : 10;
  const orderTotal = totalPrice + shippingFee;

  // Handle address field changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment method changes
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'card') {
      setCardDetails({ cardNumber: '', expirationDate: '', cvv: '' });
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = ['fullName', 'street', 'city', 'state', 'zip', 'country'];
    const missingFields = requiredFields.filter(field => !addressDetails[field]);
  
    if (missingFields.length > 0) {
      failureToaster(`Please fill in these required shipping fields: ${missingFields.join(', ')}`);
      return;
    }
  
    if (paymentMethod === 'creditCard') {
      const { cardNumber, expirationDate, cvv } = cardDetails;
      if (!cardNumber.trim() || !expirationDate.trim() || !cvv.trim()) {
        failureToaster('Please complete all credit card fields');
        return;
      }
    }
  
    try {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const token = localStorage.getItem('token');
  
      if (!user || !token) {
        failureToaster("User not logged in");
        return;
      }
  
      const orderPayload = {
        user: user.id,
        items: cartItems.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          productId: item._id
        })),
        totalPrice: orderTotal,
        paymentMethod,
        shippingFee,
        shippingAddress: addressDetails
      };
  
      const res = await axios.post("http://localhost:8000/api/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      
        successToaster('Order placed successfully!');
        cartItems.forEach(item => {
          dispatch(removeFromCart(item?._id));
        });

        const orderId = res.data.data._id
  
        navigate(`success/${orderId}`);
      
  
    } catch (error) {
      console.error('Order API error:', error);
      failureToaster(error.response?.data?.message || 'Failed to place order');
    }
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

            {/* Simple Address Form */}
            <AddressForm 
              addressDetails={addressDetails}
              theme={theme}
              onAddressChange={handleAddressChange}
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
              shippingCost={shippingFee}
              orderTotal={orderTotal}
              theme={theme}
              canOrder={true}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;