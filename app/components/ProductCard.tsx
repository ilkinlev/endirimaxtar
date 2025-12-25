"use client";

import { useState } from "react";
import { Product, Store } from "./ProductList";

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
}

export default function ProductCard({ product, onCompare }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const storesWithFinalPrice = product.stores.map((store) => ({
    ...store,
    finalPrice: store.discount
      ? store.price * (1 - store.discount / 100)
      : store.price,
  }));

  const cheapestStore = storesWithFinalPrice.reduce((min, store) =>
    store.finalPrice < min.finalPrice ? store : min
  );

  const fallbackImage = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${encodeURIComponent(
    product.name
  )}`;

  return (
    <div
      onClick={() => onCompare(product)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {cheapestStore.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg animate-pulse">
            -{cheapestStore.discount}%
          </div>
        )}

        <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>ƏN UCUZ</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[3.5rem]">
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {product.brand}
          </p>
        )}

        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          {product.category}
        </p>

        <div className="border-t dark:border-gray-700 pt-3 space-y-2 mt-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ən ucuz mağaza:
          </p>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {cheapestStore.name}
            </span>

            <div className="text-right">
              {cheapestStore.discount ? (
                <div>
                  <p className="text-xs text-gray-400 line-through">
                    {cheapestStore.price.toFixed(2)} ₼
                  </p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {cheapestStore.finalPrice.toFixed(2)} ₼
                  </p>
                </div>
              ) : (
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {cheapestStore.finalPrice.toFixed(2)} ₼
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
            {product.stores.length} mağazada mövcuddur
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompare(product);
          }}
          className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium shadow-md hover:shadow-lg"
        >
          Qiymətləri müqayisə et →
        </button>
      </div>
    </div>
  );
}
