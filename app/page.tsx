"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ComparisonModal from "./components/ComparisonModal";
import LegalDisclaimer from "./components/LegalDisclaimer";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { ProductSkeletonGrid } from "./components/ProductSkeleton";
import products from "./data/products.json";
import { Product } from "./components/ProductList";

const PRODUCTS_PER_PAGE = 24; // 4 columns x 6 rows

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Simple but effective search - normalized for Azerbaijani characters
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .trim();
  };

  // Calculate relevance score for sorting
  const calculateRelevance = (product: Product, query: string): number => {
    let score = 0;
    const normalizedQuery = normalizeText(query);
    const normalizedName = normalizeText(product.name);
    const normalizedCategory = normalizeText(product.category);
    const normalizedBrand = product.brand ? normalizeText(product.brand) : "";

    // Exact match in name (highest priority)
    if (normalizedName === normalizedQuery) {
      score += 1000;
    }
    // Name starts with query (very high priority)
    else if (normalizedName.startsWith(normalizedQuery)) {
      score += 500;
    }
    // Name contains query at word boundary
    else if (normalizedName.includes(` ${normalizedQuery}`) || normalizedName.includes(`-${normalizedQuery}`)) {
      score += 300;
    }
    // Name contains query anywhere
    else if (normalizedName.includes(normalizedQuery)) {
      score += 100;
    }

    // Brand exact match
    if (normalizedBrand === normalizedQuery) {
      score += 200;
    }
    // Brand starts with query
    else if (normalizedBrand.startsWith(normalizedQuery)) {
      score += 150;
    }
    // Brand contains query
    else if (normalizedBrand.includes(normalizedQuery)) {
      score += 50;
    }

    // Category match
    if (normalizedCategory.includes(normalizedQuery)) {
      score += 30;
    }

    // Store name match
    product.stores.forEach((store) => {
      const normalizedStoreName = normalizeText(store.name);
      if (normalizedStoreName.includes(normalizedQuery)) {
        score += 10;
      }
    });

    // Boost promotional items slightly
    if (product.isPromotional) {
      score += 5;
    }

    return score;
  };

  // Filter and sort products with normalized search
  const filteredProducts = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return products as Product[];
    }

    const normalizedQuery = normalizeText(searchQuery);

    // Filter products that match
    const matchedProducts = (products as Product[]).filter((product) => {
      const normalizedName = normalizeText(product.name);
      const normalizedCategory = normalizeText(product.category);
      const normalizedBrand = product.brand ? normalizeText(product.brand) : "";

      // Check product name, category, brand
      if (
        normalizedName.includes(normalizedQuery) ||
        normalizedCategory.includes(normalizedQuery) ||
        normalizedBrand.includes(normalizedQuery)
      ) {
        return true;
      }

      // Check store names
      return product.stores.some((store) => {
        const normalizedStoreName = normalizeText(store.name);
        return normalizedStoreName.includes(normalizedQuery);
      });
    });

    // Sort by relevance score
    return matchedProducts.sort((a, b) => {
      const scoreA = calculateRelevance(a, searchQuery);
      const scoreB = calculateRelevance(b, searchQuery);
      return scoreB - scoreA; // Higher score first
    });
  }, [searchQuery]);

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = filteredProducts.slice(startIndex, endIndex);

      console.log(`Loading products ${startIndex} to ${endIndex}`);
      console.log(`Found ${newProducts.length} products`);
      console.log('Sample products:', newProducts.slice(0, 3).map(p => p.name));

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

  // Reset when search changes
  useEffect(() => {
    setDisplayedProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  }, [searchQuery]);

  // Load initial products after reset
  useEffect(() => {
    if (displayedProducts.length === 0 && filteredProducts.length > 0 && !loading) {
      loadMoreProducts();
    }
  }, [displayedProducts.length, filteredProducts.length, loading]);

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

      <main className="container mx-auto px-4 py-8 flex-grow">
        <LegalDisclaimer />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {searchQuery
              ? `Axtarış nəticələri: "${searchQuery}"`
              : "Populyar Məhsullar"}
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {displayedProducts.length > 0 ? displayedProducts.length : filteredProducts.length} məhsul
          </span>
        </div>

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  onCompare={setSelectedProduct}
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
              onClick={() => setSearchQuery("")}
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