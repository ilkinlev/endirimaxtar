"use client";

import { useState } from "react";
import { Product } from "./ProductList";

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
}

export default function ProductCard({ product, onCompare }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  // Calculate prices correctly
  // The price in data is ALREADY the discounted price (final price)
  // We need to calculate the original price from it
  const storesWithPrices = product.stores.map((store) => {
    const finalPrice = store.price; // This is already the discount price
    const originalPrice = store.discount 
      ? store.price / (1 - store.discount / 100) // Calculate original from discount
      : store.price;
    
    return {
      ...store,
      finalPrice,
      originalPrice,
    };
  });

  const cheapestStore = storesWithPrices.reduce((min, store) =>
    store.finalPrice < min.finalPrice ? store : min
  );

  const fallbackImage = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${encodeURIComponent(
    product.name
  )}`;

  // Use fallback if image is empty or invalid
  const imageUrl = product.image && product.image.trim() !== "" ? product.image : fallbackImage;

  // Check if promotional period is still valid
  const isPromotionValid = () => {
    if (!product.validUntil) return true;
    const today = new Date();
    const validUntil = new Date(product.validUntil);
    return today <= validUntil;
  };

  return (
    <div
      onClick={() => onCompare(product)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
        <img
          src={imageError ? fallbackImage : imageUrl}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {cheapestStore.discount && isPromotionValid() && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg animate-pulse">
            -{cheapestStore.discount}%
          </div>
        )}

        {/* Cheapest Badge */}
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

        {/* Promotional Badge */}
        {product.isPromotional && isPromotionValid() && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
            🔥 Aksiya
          </div>
        )}

        {/* Valid Until Badge */}
        {product.validUntil && isPromotionValid() && (
          <div className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {new Date(product.validUntil).toLocaleDateString("az-AZ", {
              day: "numeric",
              month: "short",
            })}
            -dək
          </div>
        )}
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
                    {cheapestStore.originalPrice.toFixed(2)} ₼
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

          {/* Store Count Badge */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.stores.length === 1 ? (
                <span>Yalnız {product.stores[0].name}-da</span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {product.stores.length} mağazada mövcuddur
                </span>
              )}
            </p>
          </div>
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