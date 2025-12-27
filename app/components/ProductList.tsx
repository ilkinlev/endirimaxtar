export interface Store {
  name: string;
  price: number;
  discount?: number;
  inStock: boolean;
  storeId?: string; // Track original store product ID
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  image: string;
  validFrom?: string; // Promotion start date
  validUntil?: string; // Promotion end date
  isPromotional?: boolean; // Is this a promotional item?
  lastUpdated?: string; // Last time data was updated
  stores: Store[];
}
