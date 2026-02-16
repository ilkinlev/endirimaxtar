import { useMemo } from "react";
import Fuse from "fuse.js";
import { Product } from "../components/ProductList";

export interface SearchFilters {
  inStockOnly?: boolean;
  promotionalOnly?: boolean;
  storeName?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Custom hook for searching products using Fuse.js
 */
export function useProductSearch(
  products: Product[],
  searchQuery: string,
  filters?: SearchFilters
) {
  // Configure Fuse.js options: search name, category, and brand for better discovery
  const fuseOptions = useMemo(
    () => ({
      keys: [
        { name: "name", weight: 1.0 },       // Product name (highest priority)
        { name: "category", weight: 0.7 },   // e.g. "araq" matches "Spirtli içkilər > Araqlar"
        { name: "brand", weight: 0.5 },      // Brand name when present
      ],
      threshold: 0.4,   // Forgiving: typos like "Rolton" still match "Rollton"
      distance: 100,    // Allow matches across longer text (name + category)
      ignoreLocation: true,  // Match anywhere in text, not just start
      includeScore: true,
      minMatchCharLength: 2,   // Short queries like "araq" (4 chars) work; 2 for "çay" etc.
      useExtendedSearch: false,
      shouldSort: true,
      findAllMatches: false,
      ignoreFieldNorm: true,
      isCaseSensitive: false,
    }),
    []
  );

  // Create Fuse instance (memoized)
  const fuse = useMemo(() => new Fuse(products, fuseOptions), [products, fuseOptions]);

  // Apply additional filters
  const applyFilters = (product: Product): boolean => {
    if (!filters) return true;

    // In-stock filter
    if (filters.inStockOnly) {
      const hasInStock = product.stores.some((store) => store.inStock);
      if (!hasInStock) return false;
    }

    // Promotional filter
    if (filters.promotionalOnly && !product.isPromotional) {
      return false;
    }

    // Store name filter
    if (filters.storeName) {
      const hasMatchingStore = product.stores.some((store) =>
        store.name.toLowerCase().includes(filters.storeName!.toLowerCase())
      );
      if (!hasMatchingStore) return false;
    }

    // Category filter
    if (filters.category) {
      if (!product.category.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }
    }

    // Price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const prices = product.stores
        .filter((store) => store.inStock)
        .map((store) => store.discountedPrice ?? store.originalPrice);

      if (prices.length === 0) return false;

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (filters.minPrice !== undefined && maxPrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && minPrice > filters.maxPrice) {
        return false;
      }
    }

    return true;
  };

  // Perform search and filtering
  const searchResults = useMemo(() => {
    let results: Product[];

    // If no search query, return all products
    if (!searchQuery || searchQuery.trim() === "") {
      results = products;
    } else {
      // Use Fuse.js for fuzzy search (name + category + brand)
      const fuseResults = fuse.search(searchQuery);
      results = fuseResults.map((result) => result.item);
    }

    // Apply additional filters
    if (filters) {
      results = results.filter(applyFilters);
    }

    return results;
  }, [searchQuery, products, filters, fuse]);

  return searchResults;
}

/**
 * Get all unique categories from products
 */
export function getCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique store names from products
 */
export function getStoreNames(products: Product[]): string[] {
  const storeNames = new Set<string>();
  products.forEach((product) => {
    product.stores.forEach((store) => {
      storeNames.add(store.name);
    });
  });
  return Array.from(storeNames).sort();
}