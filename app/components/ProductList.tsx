export interface Store {
  name: string;
  price: number;
  discount?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  image: string;
  stores: Store[];
}
