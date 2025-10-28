import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../supabase/client';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  setProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) {
        console.error("Could not load products from Supabase:", error.message);
      } else if (data) {
        setProducts(data as Product[]);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error('Error adding product:', error.message);
      return;
    }
    if (data) {
      setProducts(prev => [...prev, ...data as Product[]]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const { id, ...productData } = updatedProduct;
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select();
    
    if (error) {
        console.error('Error updating product:', error.message);
        return;
    }
    if (data) {
        setProducts(prev => prev.map(p => p.id === id ? data[0] as Product : p));
    }
  };

  const deleteProduct = async (productId: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) {
        console.error('Error deleting product', error.message);
        return;
    }
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
