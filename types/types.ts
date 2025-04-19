export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  favorite?: boolean;
  category?: string;
  discountPercentage?: number
  brand?: string
  warrantyInformation?: string
  shippingInformation?: string
  reviews?: any[]
  returnPolicy?: string
  times?: number
}

export interface ProductsData {
  products: Product[];
  limit: number;
  total: number;
}
export interface Categories {
  slug: string;
  name: string;
  url: string;
}
