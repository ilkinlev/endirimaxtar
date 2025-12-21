"use client";

import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ComparisonModal from "./components/ComparisonModal";
import products from "./data/products.json";
import { Product } from "./components/ProductList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.stores.some((store) => store.name.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <SearchBar onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {searchQuery
              ? `Axtarış nəticələri: "${searchQuery}"`
              : "Populyar Məhsullar"}
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} məhsul
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCompare={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Heç bir məhsul tapılmadı 😔
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Bütün məhsulları göstər
            </button>
          </div>
        )}
      </main>

      <ComparisonModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
