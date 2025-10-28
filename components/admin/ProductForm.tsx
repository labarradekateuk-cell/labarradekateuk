import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../data/translations';
import { supabase } from '../../supabase/client';

interface ProductFormProps {
  productToEdit: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const { languages } = useLanguage();
  const [activeTab, setActiveTab] = useState<Language>(languages[0].code);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialProductState: Omit<Product, 'id' | 'created_at'> = {
    name: Object.fromEntries(languages.map(l => [l.code, ''])),
    description: Object.fromEntries(languages.map(l => [l.code, ''])),
    price: 0,
    images: [],
    isVisible: true,
    tags: []
  };

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    if (productToEdit) {
      const completeName = { ...initialProductState.name, ...productToEdit.name };
      const completeDescription = { ...initialProductState.description, ...productToEdit.description };
      
      setProduct({
        ...productToEdit,
        name: completeName,
        description: completeDescription,
        images: [...productToEdit.images],
        tags: productToEdit.tags ? [...productToEdit.tags] : []
      });
    } else {
      setProduct(initialProductState);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('name-') || name.startsWith('description-')) {
        const [field, lang] = name.split('-');
        setProduct(prev => ({
            ...prev,
            [field]: { ...prev[field as 'name' | 'description'], [lang]: value }
        }));
    } else {
        setProduct(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    }
  };
  
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setImageFile(e.target.files[0]);
      }
  }

  const handleImageUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setProduct(prev => ({ ...prev, images: value.split(',').map(img => img.trim()).filter(Boolean) }));
  }
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setProduct(prev => ({...prev, tags: value.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean) }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let productData = { ...product };

    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, imageFile);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            alert('Failed to upload image.');
            setIsUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
        
        productData.images = [...productData.images, publicUrl];
    }
    
    if (productToEdit) {
      await updateProduct({ ...productData, id: productToEdit.id });
    } else {
      await addProduct(productData);
    }
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
            <div className="p-6 space-y-4">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        {languages.map(lang => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => setActiveTab(lang.code)}
                            className={`${
                            activeTab === lang.code
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                        >
                            {lang.name}
                        </button>
                        ))}
                    </nav>
                </div>

                {languages.map(lang => (
                    <div key={lang.code} className={activeTab === lang.code ? 'block' : 'hidden'}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor={`name-${lang.code}`} className="block text-sm font-medium text-gray-700">Name ({lang.name})</label>
                                <input
                                    type="text"
                                    id={`name-${lang.code}`}
                                    name={`name-${lang.code}`}
                                    value={product.name[lang.code] || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required={lang.code === 'en'}
                                />
                            </div>
                            <div>
                                <label htmlFor={`description-${lang.code}`} className="block text-sm font-medium text-gray-700">Description ({lang.name})</label>
                                <textarea
                                    id={`description-${lang.code}`}
                                    name={`description-${lang.code}`}
                                    rows={3}
                                    value={product.description[lang.code] || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                ))}
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (£)</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.01"
                            value={product.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="isVisible" className="block text-sm font-medium text-gray-700">Visible</label>
                        <select
                            name="isVisible"
                            id="isVisible"
                            value={String(product.isVisible)}
                            onChange={(e) => setProduct(p => ({...p, isVisible: e.target.value === 'true'}))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                 <div>
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">Upload New Image</label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image-upload"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                 </div>
                 <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        name="images"
                        id="images"
                        value={product.images.join(', ')}
                        onChange={handleImageUrlsChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (e.g., recommended, special)</label>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={product.tags?.join(', ')}
                        onChange={handleTagsChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                type="submit"
                disabled={isUploading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:bg-indigo-400"
                >
                {isUploading ? 'Saving...' : (productToEdit ? 'Save Changes' : 'Create Product')}
                </button>
                <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                Cancel
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
