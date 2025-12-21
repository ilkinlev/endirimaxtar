import { Product, Store } from "./ProductList";

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
}

export default function ProductCard({ product, onCompare }: ProductCardProps) {
  const cheapestStore = product.stores.reduce((min: Store, store: Store) =>
    store.price < min.price ? store : min
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
        {cheapestStore.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            -{cheapestStore.discount}%
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1 dark:text-white">
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

        <div className="border-t dark:border-gray-700 pt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Ən ucuz:
          </p>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-green-600 dark:text-green-400">
              {cheapestStore.name}
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {cheapestStore.price.toFixed(2)} ₼
            </span>
          </div>
        </div>

        <button
          onClick={() => onCompare(product)}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Qiymətləri müqayisə et
        </button>
      </div>
    </div>
  );
}
