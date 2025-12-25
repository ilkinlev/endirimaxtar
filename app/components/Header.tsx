"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode");
    const isDarkMode = saved === "true";

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const newValue = !isDark;
    setIsDark(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  if (!mounted) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer">
            <span className="text-red-500">Endirim</span>
            <span className="text-gray-800 dark:text-white">Axtar</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Haqqımızda
          </Link>

          <button
            onClick={toggle}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
