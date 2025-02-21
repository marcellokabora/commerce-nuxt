export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: string;
  rating: string;
  stock: string;
  description: string;
  images: string[];
  favorite: boolean;
}

export interface Data {
  products: Product[];
  limit: number;
  total: number;
}
export interface Categories {
  slug: string;
  name: string;
  url: string;
}
