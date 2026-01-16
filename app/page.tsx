"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ComparisonModal from "./components/ComparisonModal";
import LegalDisclaimer from "./components/LegalDisclaimer";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CategoryFilter from "./components/CategoryFilter";
import StoreFilter from "./components/StoreFilter";
import { ProductSkeletonGrid } from "./components/ProductSkeleton";
import productsData from "./data/products.json";
import { Product } from "./components/ProductList";
import { useProductSearch } from "./hooks/useProductSearch";

const PRODUCTS_PER_PAGE = 24; // 4 columns x 6 rows

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Products are already merged at build time!
  const products = productsData as Product[];

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((product) => {
      categories.add(product.category);
    });
    return Array.from(categories).sort();
  }, [products]);

  // Get all unique stores
  const allStores = useMemo(() => {
    const stores = new Set<string>();
    products.forEach((product) => {
      product.stores.forEach((store) => {
        stores.add(store.name);
      });
    });
    return Array.from(stores).sort();
  }, [products]);

  // Use Fuse.js for smart fuzzy search
  const searchResults = useProductSearch(products, searchQuery);

  // Filter by selected categories and stores
  const filteredProducts = useMemo(() => {
    let result = searchResults;

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by stores - Show ONLY products that have stores exclusively from selected ones
    if (selectedStores.length > 0) {
      result = result.filter((product) =>
        // Check if ALL stores in the product are in the selected stores list
        product.stores.every((store) => selectedStores.includes(store.name))
      );
    }

    return result;
  }, [searchResults, selectedCategories, selectedStores]);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      "": products.length, // Total count
    };

    allCategories.forEach((category) => {
      counts[category] = products.filter((p) => p.category === category).length;
    });

    return counts;
  }, [allCategories, products]);

  // Calculate product counts per store
  const storeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};

    allStores.forEach((store) => {
      counts[store] = products.filter((p) =>
        p.stores.some((s) => s.name === store)
      ).length;
    });

    return counts;
  }, [allStores, products]);

  // Handle product comparison
  const handleCompareProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = filteredProducts.slice(startIndex, endIndex);

      if (newProducts.length === 0) {
        setHasMore(false);
        setLoading(false);
      } else {
        setDisplayedProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);

        // Check if there are more products to load
        if (endIndex >= filteredProducts.length) {
          setHasMore(false);
        }

        setLoading(false);
      }
    }, 300);
  }, [page, loading, hasMore, filteredProducts]);

  // Reset when search, categories, or stores change
  useEffect(() => {
    setDisplayedProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  }, [searchQuery, selectedCategories, selectedStores]);

  // Load initial products after reset
  useEffect(() => {
    if (
      displayedProducts.length === 0 &&
      filteredProducts.length > 0 &&
      !loading
    ) {
      const timer = setTimeout(() => {
        loadMoreProducts();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [
    displayedProducts.length,
    filteredProducts.length,
    loading,
    loadMoreProducts,
  ]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreProducts, hasMore, loading]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Header />
      <SearchBar onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-8 grow">
        <LegalDisclaimer />

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Category Filter */}
          <div className="flex-shrink-0">
            <CategoryFilter
              categories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              productCounts={categoryCounts}
            />
          </div>

          {/* Store Filter */}
          <div className="flex-shrink-0">
            <StoreFilter
              stores={allStores}
              selectedStores={selectedStores}
              onStoreChange={setSelectedStores}
              productCounts={storeCounts}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {searchQuery
              ? `Axtarış nəticələri: "${searchQuery}"`
              : selectedCategories.length > 0 || selectedStores.length > 0
              ? `${
                  selectedCategories.length > 0
                    ? selectedCategories.length + " kateqoriya"
                    : ""
                }${
                  selectedCategories.length > 0 && selectedStores.length > 0
                    ? " və "
                    : ""
                }${
                  selectedStores.length > 0
                    ? selectedStores.length + " mağaza"
                    : ""
                } seçildi`
              : "Populyar Məhsullar"}
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} məhsul
          </span>
        </div>

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCompare={handleCompareProduct}
                />
              ))}
            </div>

            {/* Loading Skeletons */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                <ProductSkeletonGrid count={8} />
              </div>
            )}

            {/* Intersection Observer Target */}
            <div ref={observerTarget} className="h-10 mt-8"></div>

            {/* End of Results Message */}
            {!hasMore && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Bütün məhsullar göstərildi ✓
                </p>
              </div>
            )}
          </>
        ) : !loading && filteredProducts.length === 0 ? (
          // No Results Found
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              Heç bir məhsul tapılmadı 😔
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              Başqa bir axtarış sözü cəhd edin
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
                setSelectedStores([]);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Bütün məhsulları göstər
            </button>
          </div>
        ) : (
          // Initial Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductSkeletonGrid count={24} />
          </div>
        )}
      </main>

      {/* Comparison Modal */}
      <ComparisonModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Back to Top Button */}
      <BackToTop />

      <Footer />
    </div>
  );
}
