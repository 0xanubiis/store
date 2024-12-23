import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-4 py-2 rounded-md whitespace-nowrap transition-all ${
          selectedCategory === '' 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
            : 'bg-black/50 text-gray-300 hover:text-red-400 border border-red-500/20'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-md whitespace-nowrap transition-all ${
            selectedCategory === category 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
              : 'bg-black/50 text-gray-300 hover:text-red-400 border border-red-500/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}