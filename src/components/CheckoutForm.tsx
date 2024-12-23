import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function CheckoutForm({ isOpen, onClose, total }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-black border border-red-500/20 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-red-500/20 rounded-md text-white focus:outline-none focus:border-red-500/40"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-red-500/20 rounded-md text-white focus:outline-none focus:border-red-500/40"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-red-500/20 rounded-md text-white focus:outline-none focus:border-red-500/40"
            />
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
              Total: <span className="text-red-400">${total.toFixed(2)}</span>
            </p>
            
            <PayPalScriptProvider options={{ 
              "client-id": "test", // Replace with your PayPal client ID
              currency: "USD"
            }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total.toString()
                        }
                      }
                    ]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then((details) => {
                    // Handle successful payment
                    console.log('Payment completed', details);
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </form>
      </div>
    </div>
  );
}