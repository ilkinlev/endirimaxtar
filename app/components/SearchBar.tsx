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
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Məhsul axtar..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
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

          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
