import React from 'react';
import { Zap } from 'lucide-react';
import { scrollToProducts } from './ScrollToProducts';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6">
          Future Tech Today
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover cutting-edge technology with our premium selection of cyber-enhanced products
        </p>
        <button 
          onClick={scrollToProducts}
          className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          <span className="flex items-center">
            Shop Now
            <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
          </span>
        </button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}