import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../supabase/client';
import { GoogleGenAI } from '@google/genai';

interface ProductFormProps {
  productToEdit: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const { languages } = useLanguage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Saving...');

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
        images: productToEdit.images ? [...productToEdit.images] : [],
        tags: productToEdit.tags ? [...productToEdit.tags] : []
      });
    } else {
      setProduct(initialProductState);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'name-es') {
        setProduct(prev => ({ ...prev, name: { ...prev.name, es: value } }));
    } else if (name === 'description-es') {
        setProduct(prev => ({ ...prev, description: { ...prev.description, es: value } }));
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
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setProduct(prev => ({...prev, tags: value.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean) }));
  }

  const handleRemoveImage = async (index: number) => {
      if (!window.confirm("Are you sure you want to remove this image? This will also attempt to delete it from storage.")) return;
      
      const imageUrl = product.images[index];
      const fileName = imageUrl.split('/').pop()?.split('?')[0];
      
      if (fileName) {
          setIsProcessing(true);
          setProcessingMessage('Deleting Image...');
          const { error } = await supabase.storage.from('product-images').remove([fileName]);
          if (error) {
              console.error("Could not delete image from storage:", error.message);
              alert(`Failed to delete image from storage. You may need to do it manually. Error: ${error.message}`);
          }
          setIsProcessing(false);
      }
  
      setProduct(prev => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.name.es) {
      alert("Product name in Spanish is required.");
      return;
    }
    setIsProcessing(true);

    let productData: any = JSON.parse(JSON.stringify(product));

    try {
      setProcessingMessage('Translating with AI...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const targetLanguages = languages.filter(l => l.code !== 'es');
      const prompt = `Translate the following product information from Spanish into the specified languages.
        Spanish Name: "${product.name.es}"
        Spanish Description: "${product.description.es || '(no description)'}"
        Target Languages: ${targetLanguages.map(l => l.name).join(', ')}
        Provide the translations as an array of JSON objects.`;

      const schema = {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            lang: { type: 'STRING', description: 'The language code (e.g., "en", "fr").' },
            name: { type: 'STRING', description: 'The translated product name.' },
            description: { type: 'STRING', description: 'The translated product description.' }
          },
          required: ['lang', 'name', 'description']
        }
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });
      
      const translations = JSON.parse(response.text.trim());

      for (const translation of translations) {
        if (productData.name[translation.lang] !== undefined) {
          productData.name[translation.lang] = translation.name;
          productData.description[translation.lang] = translation.description;
        }
      }

      setProcessingMessage('Uploading Image...');
      if (imageFile) {
          const fileName = `${Date.now()}_${imageFile.name}`;
          const { error: uploadError } = await supabase.storage
              .from('product-images')
              .upload(fileName, imageFile);

          if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);
          
          const { data } = supabase.storage
              .from('product-images')
              .getPublicUrl(fileName);
          
          if (!data.publicUrl) throw new Error('Failed to get image URL after upload.');
          
          productData.images.push(data.publicUrl);
          setImageFile(null);
      }
      
      setProcessingMessage('Saving product...');
      if (productToEdit) {
        delete productData.id;
        delete productData.created_at;
        delete productData.updated_at;
        delete productData.owner_id;
        await updateProduct({ ...productData, id: productToEdit.id });
      } else {
        await addProduct(productData);
      }
      onClose();

    } catch (error: any) {
        console.error("An error occurred during submission:", error);
        alert(`An error occurred: ${error.message}`);
    } finally {
        setIsProcessing(false);
    }
  };
  
  const inputStyles = "neu-inset w-full p-3 border-none focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400 sm:text-sm";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="neu-outset w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold neu-text-color">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={onClose} className="neu-button w-8 h-8 flex items-center justify-center text-lg">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
            <div className="p-6 space-y-6">
                 <div>
                    <label htmlFor="name-es" className="block text-sm font-medium neu-text-color mb-1">Name (Spanish)</label>
                    <input
                        type="text"
                        id="name-es"
                        name="name-es"
                        value={product.name.es || ''}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />
                     <p className="text-xs neu-text-color mt-1 opacity-70">Enter in Spanish. Other languages will be auto-translated by AI.</p>
                </div>
                <div>
                    <label htmlFor="description-es" className="block text-sm font-medium neu-text-color mb-1">Description (Spanish)</label>
                    <textarea
                        id="description-es"
                        name="description-es"
                        rows={3}
                        value={product.description.es || ''}
                        onChange={handleChange}
                        className={inputStyles}
                    ></textarea>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium neu-text-color mb-1">Price</label>
                        <input type="number" name="price" id="price" step="0.01" value={product.price} onChange={handleChange} required className={inputStyles} />
                    </div>
                     <div>
                        <label htmlFor="currency" className="block text-sm font-medium neu-text-color mb-1">Currency</label>
                        <input type="text" name="currency" id="currency" value={product.currency} onChange={handleChange} placeholder="e.g., GBP" className={inputStyles} />
                    </div>
                     <div>
                        <label htmlFor="is_visible" className="block text-sm font-medium neu-text-color mb-1">Visible</label>
                        <select name="is_visible" id="is_visible" value={String(product.is_visible)} onChange={(e) => setProduct(p => ({...p, is_visible: e.target.value === 'true'}))} className={inputStyles}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium neu-text-color mb-2">Current Images</label>
                    <div className="neu-inset p-4 rounded-lg flex flex-wrap gap-4 min-h-[7rem]">
                        {product.images.length > 0 ? (
                            product.images.map((imgUrl, index) => (
                                <div key={index} className="relative group">
                                    <img src={imgUrl} alt={`Product image ${index + 1}`} className="w-24 h-24 object-cover rounded-md neu-outset p-1" />
                                    <button type="button" onClick={() => handleRemoveImage(index)} disabled={isProcessing} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50" aria-label="Remove image">
                                        &times;
                                    </button>
                                </div>
                            ))
                        ) : ( <p className="text-sm neu-text-color self-center">No images yet.</p> )}
                    </div>
                </div>

                 <div>
                    <label htmlFor="image-upload" className="block text-sm font-medium neu-text-color mb-1">Upload New Image</label>
                    <div className="flex items-center gap-4">
                        <input type="file" id="image-upload" name="image-upload" accept="image/*" onChange={handleImageFileChange} className="neu-inset w-full text-sm file:neu-button file:border-none file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold" />
                        {imageFile && (
                            <div className="relative group">
                                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-24 h-24 object-cover rounded-md neu-outset p-1" />
                                <button type="button" onClick={() => setImageFile(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Cancel upload">
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                 </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium neu-text-color mb-1">Tags (comma-separated, e.g., starter, beef)</label>
                    <input type="text" name="tags" id="tags" value={product.tags?.join(', ')} onChange={handleTagsChange} className={inputStyles} />
                </div>
            </div>

            <div className="p-4 flex flex-row-reverse items-center">
                <button type="submit" disabled={isProcessing} className="neu-button ml-3 px-6 py-2">
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        {processingMessage}
                      </>
                    ) : (productToEdit ? 'Save Changes' : 'Create Product')}
                </button>
                <button type="button" onClick={onClose} className="neu-button px-6 py-2">
                    Cancel
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;