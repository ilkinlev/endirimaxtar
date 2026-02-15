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

  // Map Store (originalPrice, discountedPrice?, discountRate?) to display values
  const storesWithPrices = product.stores.map((store) => {
    const finalPrice = store.discountedPrice ?? store.originalPrice;
    return {
      ...store,
      finalPrice,
    };
  });

  const sortedStores = [...storesWithPrices].sort(
    (a, b) => a.finalPrice - b.finalPrice
  );
  const cheapestFinalPrice = sortedStores[0]?.finalPrice ?? 0;

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

        {/* Legal Disclaimer */}
        <div className="px-6 pt-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 text-sm">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Diqqət:</strong> Göstərilən qiymətlər məlumat xarakteri
              daşıyır. Dəqiq qiymət üçün mağazaya müraciət edin.
            </p>
          </div>
        </div>

        {/* Price Comparison */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Qiymət Müqayisəsi
          </h3>

          <div className="space-y-3">
            {sortedStores.map((store, index) => {
              const finalPrice = Number(store.finalPrice);
              const isCheapest = finalPrice === cheapestFinalPrice;
              const priceDiff = finalPrice - cheapestFinalPrice;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCheapest
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-lg dark:text-white">
                          {store.name}
                        </span>
                        {isCheapest && (
                          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            ƏN UCUZ
                          </span>
                        )}
                        {store.discountRate != null && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{store.discountRate}%
                          </span>
                        )}
                      </div>

                      {store.discountedPrice != null && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through mt-1">
                          Əvvəl: {store.originalPrice.toFixed(2)} ₼
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          isCheapest
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {finalPrice.toFixed(2)} ₼
                      </div>
                      {priceDiff > 0 && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          +{priceDiff.toFixed(2)} ₼ baha
                        </p>
                      )}
                    </div>
                  </div>

                  {!store.inStock && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                      ⚠️ Stokda yoxdur
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Savings Info */}
          {sortedStores.length > 1 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                💰 <strong>Qənaət imkanı:</strong>{" "}
                <strong>{sortedStores[0].name}</strong> mağazasından alsanız,{" "}
                <strong>{sortedStores[sortedStores.length - 1].name}</strong>{" "}
                ilə müqayisədə{" "}
                <strong className="text-green-600 dark:text-green-400 text-lg">
                  {(
                    (sortedStores[sortedStores.length - 1]?.finalPrice ?? 0) -
                    cheapestFinalPrice
                  ).toFixed(2)}{" "}
                  ₼
                </strong>{" "}
                qənaət edə bilərsiniz!
              </p>
            </div>
          )}

          {/* Legal Notice */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>
              * Qiymətlər dəyişə bilər. Alış-veriş zamanı mağazadan yoxlayın.
            </p>
            <p className="mt-1">
              ** Market adları yalnız məlumat məqsədilə istifadə olunur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}