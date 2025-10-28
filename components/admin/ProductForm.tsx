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

  const initialProductState: Omit<Product, 'id' | 'created_at' | 'owner_id' | 'updated_at'> = {
    name: Object.fromEntries(languages.map(l => [l.code, ''])),
    description: Object.fromEntries(languages.map(l => [l.code, ''])),
    price: 0,
    currency: 'GBP',
    images: [],
    is_visible: true,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    let productData: any = { ...product };
    delete productData.id;
    delete productData.created_at;
    delete productData.updated_at;

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

        const { data, error: urlError } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
        
        if (urlError || !data.publicUrl) {
            console.error('Error getting public URL:', urlError);
            alert('Failed to get image URL after upload.');
            setIsUploading(false);
            return;
        }
        
        productData.images = [...productData.images, data.publicUrl];
    }
    
    if (productToEdit) {
      await updateProduct({ ...productData, id: productToEdit.id });
    } else {
      await addProduct(productData);
    }
    setIsUploading(false);
    onClose();
  };
  
  const inputStyles = "neu-inset w-full p-3 border-none focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400 sm:text-sm text-gray-700 placeholder-gray-500";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="neu-outset w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold neu-text-color">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={onClose} className="neu-button w-8 h-8 flex items-center justify-center text-lg">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
            <div className="p-6 space-y-4">
                <div className="neu-inset p-1 rounded-lg">
                    <nav className="flex space-x-1" aria-label="Tabs">
                        {languages.map(lang => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => setActiveTab(lang.code)}
                            className={`flex-1 neu-button py-2 px-1 text-sm font-medium
                            ${activeTab === lang.code ? 'active' : ''}`}
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
                                <label htmlFor={`name-${lang.code}`} className="block text-sm font-medium neu-text-color mb-1">Name ({lang.name})</label>
                                <input
                                    type="text"
                                    id={`name-${lang.code}`}
                                    name={`name-${lang.code}`}
                                    value={product.name[lang.code] || ''}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    required={lang.code === 'en'}
                                />
                            </div>
                            <div>
                                <label htmlFor={`description-${lang.code}`} className="block text-sm font-medium neu-text-color mb-1">Description ({lang.name})</label>
                                <textarea
                                    id={`description-${lang.code}`}
                                    name={`description-${lang.code}`}
                                    rows={3}
                                    value={product.description[lang.code] || ''}
                                    onChange={handleChange}
                                    className={inputStyles}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                ))}
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium neu-text-color mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.01"
                            value={product.price}
                            onChange={handleChange}
                            required
                            className={inputStyles}
                        />
                    </div>
                     <div>
                        <label htmlFor="currency" className="block text-sm font-medium neu-text-color mb-1">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            id="currency"
                            value={product.currency}
                            onChange={handleChange}
                            placeholder="e.g., GBP"
                            className={inputStyles}
                        />
                    </div>
                     <div>
                        <label htmlFor="is_visible" className="block text-sm font-medium neu-text-color mb-1">Visible</label>
                        <select
                            name="is_visible"
                            id="is_visible"
                            value={String(product.is_visible)}
                            onChange={(e) => setProduct(p => ({...p, is_visible: e.target.value === 'true'}))}
                            className={inputStyles}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                 <div>
                    <label htmlFor="image-upload" className="block text-sm font-medium neu-text-color mb-1">Upload New Image</label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image-upload"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="neu-inset w-full text-sm neu-text-color file:neu-button file:border-none file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold"
                    />
                 </div>
                 <div>
                    <label htmlFor="images" className="block text-sm font-medium neu-text-color mb-1">Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        name="images"
                        id="images"
                        value={product.images.join(', ')}
                        onChange={handleImageUrlsChange}
                        className={inputStyles}
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium neu-text-color mb-1">Tags (comma-separated, e.g., starter, beef)</label>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={product.tags?.join(', ')}
                        onChange={handleTagsChange}
                        className={inputStyles}
                    />
                </div>
            </div>

            <div className="p-4 flex flex-row-reverse">
                <button
                type="submit"
                disabled={isUploading}
                className="neu-button ml-3 px-6 py-2"
                >
                {isUploading ? 'Saving...' : (productToEdit ? 'Save Changes' : 'Create Product')}
                </button>
                <button
                type="button"
                onClick={onClose}
                className="neu-button px-6 py-2"
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