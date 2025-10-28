import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../supabase/client';

interface ProductContextType {
  products: Product[];
  adminProducts: Product[];
  totalAdminProducts: number;
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'owner_id' | 'updated_at'>) => Promise<any>;
  updateProduct: (product: Product) => Promise<any>;
  deleteProduct: (productId: string) => Promise<any>;
  getAdminProducts: (page: number, searchQuery: string, sort: { column: string; order: string }) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_PER_PAGE = 10;

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [totalAdminProducts, setTotalAdminProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_visible', true)
        .order('id', { ascending: true });
        
      if (error) {
        console.error("Could not load products from Supabase:", error);
        setError(error.message);
      } else if (data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const getAdminProducts = async (page: number, searchQuery: string, sort: { column: string; order: string }) => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (searchQuery) {
      query = query.ilike('name->>es', `%${searchQuery}%`);
    }

    const from = (page - 1) * PRODUCTS_PER_PAGE;
    const to = from + PRODUCTS_PER_PAGE - 1;
    query = query.range(from, to);

    if (sort.column) {
      query = query.order(sort.column, { ascending: sort.order === 'asc' });
    }

    const { data, error, count } = await query;
    
    if (error) {
      console.error("Could not load admin products from Supabase:", error);
      setError(error.message);
    } else if (data) {
      setAdminProducts(data as Product[]);
      setTotalAdminProducts(count || 0);
    }
    setLoading(false);
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'owner_id' | 'updated_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('products')
      .insert([{ ...productData, owner_id: user.id }])
      .select();

    if (error) {
      console.error('Error adding product:', error);
      return { error };
    }
    return { data };
  };

  const updateProduct = async (updatedProduct: Product) => {
    const { id, ...productData } = updatedProduct;
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select();
    
    if (error) {
        console.error('Error updating product:', error);
    }
    return { data, error };
  };

  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) {
        console.error('Error deleting product', error);
    }
    return { error };
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      adminProducts,
      totalAdminProducts,
      loading,
      error,
      getAdminProducts,
      addProduct, 
      updateProduct, 
      deleteProduct,
    }}>
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
