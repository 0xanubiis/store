import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem } from './CartItem';
import { CheckoutForm } from './CheckoutForm';
import type { CartItem as CartItemType } from '../types';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onRemoveItem: (productId: number, quantity: number) => void;
}

export function ShoppingCart({ isOpen, onClose, items, onRemoveItem }: ShoppingCartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    onRemoveItem(id, quantity);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black border-l border-red-500/20 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center py-8">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-[calc(100vh-240px)] overflow-y-auto">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
              <div className="border-t border-red-500/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total:</span>
                  <span className="text-lg font-bold text-red-400">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
      />
    </>
  );
}