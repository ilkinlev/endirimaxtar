"use client";

import { useState } from "react";

interface StoreFilterProps {
  stores: string[];
  selectedStores: string[];
  onStoreChange: (stores: string[]) => void;
  productCounts?: { [key: string]: number };
}

export default function StoreFilter({
  stores,
  selectedStores,
  onStoreChange,
  productCounts = {},
}: StoreFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStore = (store: string) => {
    if (selectedStores.includes(store)) {
      // Remove store
      onStoreChange(selectedStores.filter((s) => s !== store));
    } else {
      // Add store
      onStoreChange([...selectedStores, store]);
    }
  };

  const clearAll = () => {
    onStoreChange([]);
    setIsOpen(false);
  };

  const totalSelected = selectedStores.length;

  return (
    <div className="mb-6">
      {/* Filter Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Mağazalar
          </span>
          {totalSelected > 0 && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-bold">
              {totalSelected}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {totalSelected > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer font-medium"
          >
            Təmizlə ({totalSelected})
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Mağaza seçin
              </span>
              {totalSelected > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Hamısını sil
                </button>
              )}
            </div>

            <div className="space-y-2">
              {stores.map((store) => {
                const isSelected = selectedStores.includes(store);
                const count = productCounts[store] || 0;

                return (
                  <label
                    key={store}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleStore(store)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      {/* Store Logo/Icon */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {store.charAt(0).toUpperCase()}
                      </div>
                      <span className="flex-1 text-gray-700 dark:text-gray-300 font-medium">
                        {store}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Stores Display */}
      {totalSelected > 0 && !isOpen && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedStores.map((store) => (
            <span
              key={store}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                {store.charAt(0).toUpperCase()}
              </div>
              {store}
              <button
                onClick={() => toggleStore(store)}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
