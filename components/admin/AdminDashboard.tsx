

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types';
import ProductForm from './ProductForm';
import { useDebounce } from '../../hooks/useDebounce';
import { Theme } from '../../pages/AdminPage';

const placeholderImage = 'https://via.placeholder.com/150';

interface AdminDashboardProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ theme, onToggleTheme }) => {
  const { logout } = useAuth();
  const { adminProducts, totalAdminProducts, getAdminProducts, loading, deleteProduct, updateProduct } = useProducts();
  const { language } = useLanguage();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState({ column: 'created_at', order: 'desc' });
  const [togglingVisibility, setTogglingVisibility] = useState<string | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchProducts = useCallback(() => {
    getAdminProducts(currentPage, debouncedSearchQuery, sort);
  }, [currentPage, debouncedSearchQuery, sort, getAdminProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
      fetchProducts();
    }
  };
  
  const toggleVisibility = async (product: Product) => {
      setTogglingVisibility(product.id);
      await updateProduct({ ...product, is_visible: !product.is_visible });
      setTogglingVisibility(null);
      fetchProducts();
  }

  const handleSort = (column: string) => {
    setSort(prevSort => ({
      column,
      order: prevSort.column === column && prevSort.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const totalPages = Math.ceil(totalAdminProducts / 10);

  const SortableHeader: React.FC<{column: string, title: string}> = ({ column, title }) => (
    <th scope="col" className="px-6 py-4 text-left text-xs font-medium neu-text-color uppercase tracking-wider cursor-pointer" onClick={() => handleSort(column)}>
      {title}
      {sort.column === column && (
        <span className="ml-1">{sort.order === 'asc' ? '▲' : '▼'}</span>
      )}
    </th>
  )

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczNAo9UaVfrx17NH3XRuch8bUAfwtq6TjVDWQJsGcNlSlQbdRj5QqqhjOCUOBeCCThcSFyuHRmWgrvi3XEEkf3Yy1-5UnJAtxA4OZJREU00Pzq95BbV1f6IDl6fBEG-LiG80J-fTH35XM1d09zgFSJU=w559-h419-s-no-gm?authuser=0" alt="Logo" className="h-12" />
            <h1 className="text-3xl font-bold neu-text-color">Product Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/#"
              className="neu-button px-5 py-2 text-sm font-medium"
            >
              Volver al Sitio
            </a>
            <button
              onClick={onToggleTheme}
              className="neu-button w-12 h-12 flex items-center justify-center text-lg"
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            <button
              onClick={logout}
              className="neu-button px-5 py-2 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8 p-6 neu-outset flex justify-between items-center">
            <input 
                type="text"
                placeholder="Search by name (es)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="neu-inset px-4 py-2 w-full max-w-xs border-none focus:outline-none"
            />
          <button
            onClick={handleAddNew}
            className="neu-button px-4 py-2 text-sm font-medium"
          >
            <i className="fas fa-plus mr-2"></i>Add New Product
          </button>
        </div>

        <div className="neu-outset p-2 relative">
          {loading && <div className="absolute inset-0 bg-[#e0e0e0]/50 dark:bg-[#333742]/50 z-10 flex items-center justify-center rounded-2xl"><i className="fas fa-spinner fa-spin text-3xl neu-text-color"></i></div>}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <SortableHeader column="name" title="Product" />
                  <SortableHeader column="price" title="Price" />
                  <SortableHeader column="is_visible" title="Visible" />
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium neu-text-color uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="neu-text-color">
                {adminProducts.map((product) => {
                  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : placeholderImage;
                  return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img className="h-12 w-12 rounded-lg object-cover neu-outset p-1" src={imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{product.name[language] || product.name['en']}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.price.toFixed(2)} {product.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       {togglingVisibility === product.id ? (
                           <i className="fas fa-spinner fa-spin"></i>
                       ) : (
                          <button onClick={() => toggleVisibility(product)} className={`relative neu-inset w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${product.is_visible ? 'bg-green-400/50' : 'bg-transparent'}`}>
                            <div className={`neu-button w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${product.is_visible ? 'translate-x-6' : ''}`}></div>
                          </button>
                       )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(product)} className="neu-button p-2 w-16 text-xs mr-2">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="neu-button p-2 w-16 text-xs">Delete</button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
           <div className="p-4 flex justify-between items-center">
                <span className="text-sm neu-text-color">Page {currentPage} of {totalPages} ({totalAdminProducts} products)</span>
                <div>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="neu-button px-3 py-1 text-sm">Previous</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="neu-button px-3 py-1 text-sm ml-2">Next</button>
                </div>
            </div>
        </div>
      </div>

      {isFormOpen && (
        <ProductForm
          productToEdit={editingProduct}
          onClose={() => {
              setIsFormOpen(false);
              fetchProducts();
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;