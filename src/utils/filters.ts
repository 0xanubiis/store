export function filterProducts<T extends { name: string; category: string }>(
  products: T[],
  searchQuery: string,
  selectedCategory: string
): T[] {
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}