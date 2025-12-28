"use client";

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  productCounts?: { [key: string]: number };
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  productCounts = {},
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Remove category
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      // Add category
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
    setIsOpen(false);
  };

  const totalSelected = selectedCategories.length;

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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Kateqoriyalar
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
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg max-h-96 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kateqoriya seçin
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
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                const count = productCounts[category] || 0;

                return (
                  <label
                    key={category}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(category)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 font-medium">
                      {category}
                    </span>
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

      {/* Selected Categories Display */}
      {totalSelected > 0 && !isOpen && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
            >
              {category}
              <button
                onClick={() => toggleCategory(category)}
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
