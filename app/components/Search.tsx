"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value.toLowerCase());
  };

  return (
    <div className=" from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Məhsul, marka və ya mağaza axtar..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-5 py-4 pr-24 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          />

          {/* Search Icon */}
          <button className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Clear Button */}
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              title="Təmizlə"
            >
              <svg
                className="w-5 h-5"
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
          )}
        </div>

        {/* Search Tips */}
        {search && (
          <p className="text-center text-sm text-gray-300 dark:text-gray-400 mt-3">
            "{search}" üçün axtarış edilir...
          </p>
        )}
      </div>
    </div>
  );
}
