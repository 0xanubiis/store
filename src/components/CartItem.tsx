import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function CartItem({ item, onUpdateQuantity }: CartItemProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const quantity = newValue === '' ? 0 : Math.max(0, parseInt(newValue));
    onUpdateQuantity(item.id, quantity);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-red-500/20">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="text-red-400">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="p-1 hover:bg-red-500/10 rounded-full"
          >
            <Minus className="h-4 w-4 text-red-400" />
          </button>
          <input
            type="number"
            min="0"
            value={item.quantity.toString()}
            onChange={handleQuantityChange}
            className="w-16 bg-black/40 border border-red-500/20 rounded-md text-center text-white"
          />
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-red-500/10 rounded-full"
          >
            <Plus className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-red-400 font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}