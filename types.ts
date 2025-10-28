export interface Product {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  price: number;
  currency?: string;
  images: string[];
  is_visible: boolean;
  tags?: string[];
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem extends Product {
  id: string;
  quantity: number;
}
