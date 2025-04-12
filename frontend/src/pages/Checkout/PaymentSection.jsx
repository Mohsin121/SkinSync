// PaymentSection.js
import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentSection = ({ 
  theme, 
  paymentMethod, 
  cardDetails, 
  onPaymentMethodChange, 
  onCardDetailsChange 
}) => {
  return (
    <div className={`${theme.card} shadow-lg p-6 border-b ${theme.border}`}>
      <h2 className="text-lg md:text-xl font-semibold mb-5 flex items-center">
        <CreditCard className="mr-3" size={20} />
        Payment Method
      </h2>

      <div className="space-y-4">
        {/* Cash on Delivery option */}
        <div className={`p-4 border rounded-lg ${paymentMethod === 'cashOnDelivery' ? `border-${theme.accent}` : 'border-gray-200 dark:border-gray-700'}`}>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'cash'}
              onChange={() => onPaymentMethodChange('cash')}
              className="mr-3"
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pay when your order is delivered</p>
            </div>
          </label>
        </div>

        {/* Credit Card option */}
        <div className={`border rounded-lg overflow-hidden ${paymentMethod === 'creditCard' ? `border-${theme.accent}` : 'border-gray-200 dark:border-gray-700'}`}>
          <label className="flex items-center cursor-pointer p-4">
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'card'}
              onChange={() => onPaymentMethodChange('card')}
              className="mr-3"
            />
            <div>
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Secure payment with credit card</p>
            </div>
          </label>

          {/* Credit Card Details */}
          {paymentMethod === 'card' && (
            <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-800">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={onCardDetailsChange}
                    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Expiration Date</label>
                    <input
                      type="text"
                      name="expirationDate"
                      placeholder="MM/YY"
                      value={cardDetails.expirationDate}
                      onChange={onCardDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={onCardDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;