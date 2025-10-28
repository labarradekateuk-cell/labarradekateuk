
export interface Product {
  id: number;
  name: { [key: string]: string };
  description: { [key: string]: string };
  price: number;
  images: string[];
  isVisible: boolean;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
