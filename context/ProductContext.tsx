import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { supabase } from '../supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

interface ProductContextType {
  products: Product[];
  adminProducts: Product[];
  totalAdminProducts: number;
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'owner_id' | 'updated_at'>) => Promise<{ error: PostgrestError | null }>;
  updateProduct: (product: Product) => Promise<{ error: PostgrestError | null }>;
  deleteProduct: (productId: string) => Promise<{ error: PostgrestError | null }>;
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
      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('is_visible', true)
          .order('name->>es', { ascending: true });

        if (fetchError) throw fetchError;
        setProducts(data || []);
      } catch (e: any) {
        setError(e instanceof Error ? e.message : String(e));
        console.error("Could not load products from Supabase:", e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const getAdminProducts = useCallback(async (page: number, searchQuery: string, sort: { column: string; order: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const from = (page - 1) * PRODUCTS_PER_PAGE;
      const to = from + PRODUCTS_PER_PAGE;

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('owner_id', user.id);

      if (searchQuery) {
        // Search within the Spanish name in the JSONB field
        query = query.ilike('name->>es', `%${searchQuery}%`);
      }

      if (sort.column) {
         if (sort.column === 'name') {
            // Sort by the Spanish name within the JSONB field
            query = query.order('name->>es', { ascending: sort.order === 'asc' });
        } else {
            query = query.order(sort.column, { ascending: sort.order === 'asc' });
        }
      }

      const { data, error: fetchError, count } = await query.range(from, to - 1);

      if (fetchError) throw fetchError;

      setAdminProducts(data || []);
      setTotalAdminProducts(count || 0);

    } catch (e: any) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(errorMessage);
        console.error("Could not load admin products from Supabase:", e);
    }
    setLoading(false);
  }, []);
  
  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'created_at' | 'owner_id' | 'updated_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: { message: 'User not authenticated', details: '', hint: '', code: '401' } as PostgrestError };
    
    const productWithOwner = { ...productData, owner_id: user.id };
    
    const { error } = await supabase.from('products').insert([productWithOwner]);
    return { error };
  }, []);

  const updateProduct = useCallback(async (updatedProduct: Product) => {
    const { id, ...productData } = updatedProduct;
    // Supabase doesn't like updating these fields directly
    delete (productData as any).created_at;
    delete (productData as any).owner_id;
    
    const productToUpdate = {
        ...productData,
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('products')
      .update(productToUpdate)
      .eq('id', id);
    return { error };
  }, []);

  const deleteProduct = useCallback(async (productId: string) => {
    // Note: Image deletion from storage should be handled before calling this,
    // which is what ProductForm does.
    const { error } = await supabase.from('products').delete().eq('id', productId);
    return { error };
  }, []);

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
