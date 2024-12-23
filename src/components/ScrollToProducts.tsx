import React from 'react';

export function scrollToProducts() {
  const productsSection = document.getElementById('products-section');
  productsSection?.scrollIntoView({ behavior: 'smooth' });
}