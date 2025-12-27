"use client";

export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Brand */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

        {/* Category */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

        {/* Divider */}
        <div className="border-t dark:border-gray-700 pt-3"></div>

        {/* Price Section */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>

        {/* Store Count */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/5"></div>

        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-3"></div>
      </div>
    </div>
  );
}

// Component to show multiple skeletons
export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </>
  );
}
