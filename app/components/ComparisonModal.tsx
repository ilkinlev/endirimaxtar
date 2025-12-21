"use client";

import { Product } from "./ProductList";

interface ComparisonModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ComparisonModal({
  product,
  onClose,
}: ComparisonModalProps) {
  if (!product) return null;

  // Calculate final prices after discount and sort
  const storesWithFinalPrice = product.stores.map((store) => ({
    ...store,
    finalPrice: store.discount
      ? store.price * (1 - store.discount / 100)
      : store.price,
  }));

  const sortedStores = [...storesWithFinalPrice].sort(
    (a, b) => a.finalPrice - b.finalPrice
  );
  const cheapestFinalPrice = sortedStores[0].finalPrice;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      style={{ backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {product.name}
            </h2>
            {product.brand && (
              <p className="text-gray-600 dark:text-gray-400">
                {product.brand}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Price Comparison */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Qiymət Müqayisəsi
          </h3>

          <div className="space-y-3">
            {sortedStores.map((store, index) => {
              const isCheapest = store.finalPrice === cheapestFinalPrice;
              const priceDiff = store.finalPrice - cheapestFinalPrice;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCheapest
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg dark:text-white">
                          {store.name}
                        </span>
                        {isCheapest && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Ən ucuz
                          </span>
                        )}
                        {store.discount && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{store.discount}%
                          </span>
                        )}
                      </div>

                      {store.discount && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through mt-1">
                          {store.price.toFixed(2)} ₼
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {store.finalPrice.toFixed(2)} ₼
                      </div>
                      {priceDiff > 0 && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          +{priceDiff.toFixed(2)} ₼
                        </p>
                      )}
                    </div>
                  </div>

                  {!store.inStock && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Stokda yoxdur
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Savings Info */}
          {sortedStores.length > 1 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                💡 <strong>{sortedStores[0].name}</strong> mağazasından alsanız,{" "}
                <strong>{sortedStores[sortedStores.length - 1].name}</strong>{" "}
                ilə müqayisədə{" "}
                <strong className="text-green-600 dark:text-green-400">
                  {(
                    sortedStores[sortedStores.length - 1].finalPrice -
                    cheapestFinalPrice
                  ).toFixed(2)}{" "}
                  ₼
                </strong>{" "}
                qənaət edəcəksiniz!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
