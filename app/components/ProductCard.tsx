import { Product, Store } from "./ProductList";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
}

export default function ProductCard({ product, onCompare }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  // Find cheapest store with final price after discount
  const cheapestStore = product.stores.reduce((min: Store, store: Store) => {
    const minFinalPrice = min.discount
      ? min.price * (1 - min.discount / 100)
      : min.price;

    const storeFinalPrice = store.discount
      ? store.price * (1 - store.discount / 100)
      : store.price;

    return storeFinalPrice < minFinalPrice ? store : min;
  });

  // Calculate final price after discount
  const finalPrice = cheapestStore.discount
    ? cheapestStore.price * (1 - cheapestStore.discount / 100)
    : cheapestStore.price;

  const fallbackImage = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${encodeURIComponent(
    product.name
  )}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow flex flex-col">
      {/* Image Section - Fixed Height */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
        {cheapestStore.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold shadow-lg">
            -{cheapestStore.discount}%
          </div>
        )}
      </div>

      {/* Product Name - Fixed 2 Lines */}
      <h3 className="font-bold text-lg mb-2 dark:text-white h-14 line-clamp-2 overflow-hidden">
        {product.name}
      </h3>

      {/* Brand - Fixed Height */}
      <div className="h-5 mb-1">
        {product.brand && (
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {product.brand}
          </p>
        )}
      </div>

      {/* Category - Fixed Height */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 truncate">
        {product.category}
      </p>

      {/* Spacer - Takes remaining space */}
      <div className="grow"></div>

      {/* Price Section - Fixed Height */}
      <div className="border-t dark:border-gray-700 pt-3 mb-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Ən ucuz:
        </p>
        <div className="flex justify-between items-end h-8">
          <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
            {cheapestStore.name}
          </span>
          <div className="text-right">
            {cheapestStore.discount && (
              <p className="text-xs text-gray-400 dark:text-gray-500 line-through leading-none">
                {cheapestStore.price.toFixed(2)} ₼
              </p>
            )}
            <span className="text-xl font-bold text-gray-800 dark:text-white leading-none">
              {finalPrice.toFixed(2)} ₼
            </span>
          </div>
        </div>
      </div>

      {/* Button - Always at Bottom */}
      <button
        onClick={() => onCompare(product)}
        className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors cursor-pointer font-medium"
      >
        Qiymətləri müqayisə et
      </button>
    </div>
  );
}
