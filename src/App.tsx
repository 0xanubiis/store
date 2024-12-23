import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductsPage } from './components/ProductsPage';
import { ShoppingCart } from './components/ShoppingCart';
import { ThemeProvider } from './context/ThemeContext';
import { products } from './data/products';
import { filterProducts } from './utils/filters';
import type { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCart = (productId: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const goToHome = () => {
    setShowProducts(false);
    setSelectedProduct(null);
  };

  const filteredProducts = filterProducts(products, searchQuery, selectedCategory);

  const mainContent = () => {
    if (selectedProduct) {
      return (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setSelectedProduct(null)}
        />
      );
    }

    if (showProducts) {
      return (
        <ProductsPage
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onProductClick={setSelectedProduct}
        />
      );
    }

    return (
      <>
        <Hero />
        <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4">
              Featured Products
            </h2>
            <CategoryFilter
              categories={Array.from(new Set(products.map(p => p.category)))}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </main>
      </>
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
        <Navbar 
          cartCount={cartItemsCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProductsClick={() => setShowProducts(true)}
          onHomeClick={goToHome}
          onCartClick={() => setIsCartOpen(true)}
        />
        {mainContent()}
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleUpdateCart}
        />
      </div>
    </ThemeProvider>
  );
}