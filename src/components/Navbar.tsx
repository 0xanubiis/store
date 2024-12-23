import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onProductsClick: () => void;
  onHomeClick: () => void;
  onCartClick: () => void;
}

export function Navbar({ 
  cartCount, 
  searchQuery, 
  onSearchChange, 
  onProductsClick,
  onHomeClick,
  onCartClick
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-red-500/20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onHomeClick}
              className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text"
            >
              CyberStore
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
            <div className="flex items-baseline space-x-4">
              <button
                onClick={onHomeClick}
                className="text-gray-600 dark:text-gray-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={onProductsClick}
                className="text-gray-600 dark:text-gray-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </button>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-red-400"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-red-400"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2">
            <div className="px-3">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
            </div>
            <button
              onClick={() => {
                onHomeClick();
                setIsMenuOpen(false);
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => {
                onProductsClick();
                setIsMenuOpen(false);
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Products
            </button>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}