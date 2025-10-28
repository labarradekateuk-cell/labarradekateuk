
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { menuData } from '../data/menuData';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  setProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCT_STORAGE_KEY = 'laBarraDeKateProducts';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCT_STORAGE_KEY);
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        // Sanitize data to prevent crashes from malformed or incomplete stored data
        const sanitizedProducts = (Array.isArray(parsedProducts) ? parsedProducts : []).map((p: any): Product => ({
            id: p.id || Date.now() + Math.random(),
            name: p.name || {},
            description: p.description || {},
            price: p.price || 0,
            images: Array.isArray(p.images) ? p.images : [],
            isVisible: p.isVisible !== undefined ? p.isVisible : true,
            tags: Array.isArray(p.tags) ? p.tags : [],
        }));
        setProducts(sanitizedProducts);
      } else {
        // Seed with initial data if nothing is in local storage
        setProducts(menuData);
        localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(menuData));
      }
    } catch (error) {
      console.error("Could not load products from local storage", error);
      setProducts(menuData);
    }
  }, []);
  
  const saveProducts = (updatedProducts: Product[]) => {
      setProducts(updatedProducts);
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedProducts));
  }

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(), // Simple unique ID generation
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, setProducts: saveProducts }}>
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
