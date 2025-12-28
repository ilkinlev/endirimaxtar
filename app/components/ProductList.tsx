export interface Store {
  name: string;
  inStock: boolean;
  originalPrice: number;
  discountedPrice?: number;
  discountRate?: number;
  storeId?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  stores: Store[];
  brand?: string;
  isPromotional?: boolean;
  lastUpdated: string;
}

// The full output is an array of products
export type ProductList = Product[];
