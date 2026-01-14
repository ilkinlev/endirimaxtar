// utils/productUtils.ts
import { Product, Store } from "../components/ProductList";

/**
 * Get the cheapest store for a product
 */
export function getCheapestStore(product: Product): Store | null {
  if (product.stores.length === 0) return null;

  return product.stores.reduce((cheapest: Store, current: Store) =>
    current.price < cheapest.price ? current : cheapest
  );
}

/**
 * Calculate original price from discounted price
 */
export function calculateOriginalPrice(
  price: number,
  discount?: number
): number {
  if (!discount || discount === 0) return price;
  return price / (1 - discount / 100);
}

/**
 * Check if a promotion is still valid
 */
export function isPromotionValid(validUntil?: string): boolean {
  if (!validUntil) return true;
  const today = new Date();
  const validDate = new Date(validUntil);
  return today <= validDate;
}

/**
 * Filter products by search query
 */
export function filterProductsBySearch(
  products: Product[],
  searchQuery: string
): Product[] {
  if (!searchQuery.trim()) return products;

  const query = searchQuery.toLowerCase();

  return products.filter((product: Product) => {
    const matchName = product.name.toLowerCase().includes(query);
    const matchBrand = product.brand?.toLowerCase().includes(query) ?? false;
    const matchCategory = product.category.toLowerCase().includes(query);
    const matchStore = product.stores.some((store: Store) =>
      store.name.toLowerCase().includes(query)
    );

    return matchName || matchBrand || matchCategory || matchStore;
  });
}

/**
 * Filter products by categories
 */
export function filterProductsByCategories(
  products: Product[],
  selectedCategories: string[]
): Product[] {
  if (selectedCategories.length === 0) return products;

  return products.filter((product: Product) =>
    selectedCategories.includes(product.category)
  );
}

/**\
 * Get all unique categories sorted alphabetically
 */
export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set<string>();

  products.forEach((product: Product) => {
    categories.add(product.category);
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique store names
 */
export function getUniqueStores(products: Product[]): string[] {
  const stores = new Set<string>();

  products.forEach((product: Product) => {
    product.stores.forEach((store: Store) => {
      stores.add(store.name);
    });
  });

  return Array.from(stores).sort();
}

/**
 * Sort products by price (cheapest first)
 */
export function sortByPrice(products: Product[], ascending = true): Product[] {
  return [...products].sort((a: Product, b: Product) => {
    const priceA = getCheapestStore(a)?.price ?? Infinity;
    const priceB = getCheapestStore(b)?.price ?? Infinity;
    return ascending ? priceA - priceB : priceB - priceA;
  });
}

/**
 * Sort products by discount percentage
 */
export function sortByDiscount(
  products: Product[],
  descending = true
): Product[] {
  return [...products].sort((a: Product, b: Product) => {
    const discountA = getCheapestStore(a)?.discount ?? 0;
    const discountB = getCheapestStore(b)?.discount ?? 0;
    return descending ? discountB - discountA : discountA - discountB;
  });
}

/**
 * Get products with active promotions
 */
export function getPromotionalProducts(products: Product[]): Product[] {
  return products.filter(
    (product: Product) =>
      product.isPromotional && isPromotionValid(product.validUntil)
  );
}

/**
 * Get products available in multiple stores
 */
export function getMultiStoreProducts(products: Product[]): Product[] {
  return products.filter((product: Product) => product.stores.length > 1);
}

/**
 * Calculate average price across all products
 */
export function calculateAveragePrice(products: Product[]): number {
  if (products.length === 0) return 0;

  const totalPrice = products.reduce((sum: number, product: Product) => {
    const cheapest = getCheapestStore(product);
    return sum + (cheapest?.price ?? 0);
  }, 0);

  return totalPrice / products.length;
}

/**
 * Calculate average discount across all products
 */
export function calculateAverageDiscount(products: Product[]): number {
  const productsWithDiscount = products.filter((product: Product) => {
    const cheapest = getCheapestStore(product);
    return cheapest && cheapest.discount && cheapest.discount > 0;
  });

  if (productsWithDiscount.length === 0) return 0;

  const totalDiscount = productsWithDiscount.reduce(
    (sum: number, product: Product) => {
      const cheapest = getCheapestStore(product);
      return sum + (cheapest?.discount ?? 0);
    },
    0
  );

  return totalDiscount / productsWithDiscount.length;
}
