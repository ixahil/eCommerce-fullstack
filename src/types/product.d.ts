// Define types for substructures
type Collection = {
  _id: string;
  name: string;
  handle: string;
  description: string | null;
  products: string[];
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
};

type Brand = {
  _id: string;
  name: string;
  handle: string;
  description: string | null;
  products: string[];
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
};

// Define the main Product type
export type Product = {
  thumbnail: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  sku: string;
  collections: Collection[];
  brand: Brand;
  price: number;
  salePrice: number;
  stock: number;
  isFeatured: boolean;
  isFreeShipping: boolean;
  isVisible: boolean;
  status: string;
  images: string[]; // Assuming images is an array of strings (URLs)
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
  description: string;
};
