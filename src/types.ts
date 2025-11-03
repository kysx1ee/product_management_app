export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  specification: string;
  rating: number;
  price: number;
  quantity: number; // quantity selected for cart
  stock: number;    // total stock available
  image: string;
}
