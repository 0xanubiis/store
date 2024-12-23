import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export function ProductDetails({ product, onAddToCart, onBack }: ProductDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button
        onClick={onBack}
        className="flex items-center text-gray-300 hover:text-red-400 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            {product.name}
          </h1>
          <p className="text-2xl text-red-400 font-bold">
            ${product.price}
          </p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Description</h2>
            <p className="text-gray-300">{product.description}</p>
            <p className="text-gray-400">Category: {product.category}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}