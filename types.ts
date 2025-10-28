export interface Product {
  id?: number;
  name: { [key: string]: string };
  description: { [key: string]: string };
  price: number;
  images: string[];
  isVisible: boolean;
  tags?: string[];
  created_at?: string;
}

export interface CartItem extends Product {
  id: number;
  quantity: number;
}