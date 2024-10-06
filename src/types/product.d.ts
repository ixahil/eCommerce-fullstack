// Define interfaces for substructures
interface Collection {
  _id: string;
  name: string;
  handle: string;
  description: string | null;
  products: string[];
  image: Image;
  status: "ACTIVE" | "DRAFT";
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
}

interface Brand {
  _id: string;
  name: string;
  handle: string;
  description: string | null;
  products: string[];
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
}

interface Image {
  public_id: string;
  url: string;
  _id: string;
}

// Define the main Product interface
export interface Product {
  thumbnail: {
    public_id: string;
    url: string;
  };
  handle: string;
  _id: string;
  name: string;
  sku: string;
  collections: Collection; // Change to Collection[] if a product can belong to multiple collections
  brand: Brand;
  price: number;
  salePrice: number;
  stock: number;
  isFeatured: boolean;
  isFreeShipping: boolean;
  isVisible: boolean;
  status: string;
  images: Image[];
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
  description: string;
}

// Define the structure of the success response
interface AddProductData {
  product: Product;
  collections: Collection;
  brand: Brand;
}

// Define the error response structure
interface ErrorResponse {
  data: null;
  isOperational: boolean;
  errors?: []; // You can specify a more detailed type if needed
  message: string;
  statusCode: number;
  success: string;
}

// Define the AppResponse interface to handle both success and error responses
interface AppResponse<T> {
  statusCode: number;
  data?: T; // Optional, since it can be absent in error responses
  message: string;
  status: string; // Keep this if you want to show success status
  error?: ErrorResponse; // Optional error details
}

interface AppError {
  data: null;
  isOperational: boolean;
  errors?: []; // You can specify a more detailed type if needed
  message: string;
  statusCode: number;
  success: string;
}

// Use the AppResponse type to define the overall response structure
export type AddProductProp = AppResponse<AddProductData>;
export type GetProductProp = AppResponse<AddProductData>;
