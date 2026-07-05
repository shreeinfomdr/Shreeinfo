'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  image: string;
  specs: string;
  status: 'available' | 'sold';
  category?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // Product Form state
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [specs, setSpecs] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  // Category Manager state
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => setLoading(false));
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
        if (data.length > 0) setCategory(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newCategoryName.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        setNewCategoryName('');
      }
    } catch (err) {
      alert('Error adding category');
    }
  };

  const handleDeleteCategory = async (catToDelete: string) => {
    if (!confirm(`Are you sure you want to delete the category "${catToDelete}"? Existing products in this category will still retain their category label.`)) return;
    try {
      const res = await fetch(`/api/admin/categories?category=${encodeURIComponent(catToDelete)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image file first.');
    if (!category) return alert('Please select or create a category first.');
    
    setUploading(true);
    try {
      const uploadRes = await fetch(`/api/admin/upload?filename=${encodeURIComponent(imageFile.name)}`, {
        method: 'POST',
        body: imageFile,
      });
      const blob = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(blob.error || 'Upload failed');
      
      const imageUrl = blob.url;

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image: imageUrl, specs, category }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts([data.product, ...products]);
        setIsAdding(false);
        setTitle(''); setImageFile(null); setSpecs('');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      alert('Upload error: ' + msg);
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'sold' : 'available';
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const filteredProducts = filterCategory === 'All' 
    ? products 
    : products.filter(p => (p.category || 'Refurbished Laptops') === filterCategory);

  if (loading) return <div>Loading store data...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Store Inventory</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage all products and categories.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => { setIsManagingCategories(!isManagingCategories); setIsAdding(false); }}
            style={{ background: isManagingCategories ? '#1e293b' : 'white', color: isManagingCategories ? 'white' : '#0f172a', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            Manage Categories
          </button>
          <button 
            onClick={() => { setIsAdding(!isAdding); setIsManagingCategories(false); }}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            {isAdding ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>
      </div>

      {isManagingCategories && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Manage Categories</h3>
          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input 
              required 
              value={newCategoryName} 
              onChange={e => setNewCategoryName(e.target.value)} 
              placeholder="New Category Name (e.g. Graphic Cards)" 
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
            <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              Add Category
            </button>
          </form>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map(cat => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '8px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 500 }}>{cat}</span>
                <button onClick={() => handleDeleteCategory(cat)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }} title="Delete Category">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddProduct} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Add New Product</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Title / Model Name</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Dell Latitude 7490" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Category</label>
              <select required value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}>
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={e => e.target.files && setImageFile(e.target.files[0])} 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Specifications & Details</label>
            <textarea required value={specs} onChange={e => setSpecs(e.target.value)} rows={4} placeholder="e.g. Intel Core i5 8th Gen, 16GB RAM, 512GB SSD..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <button type="submit" disabled={uploading} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1, fontWeight: '600', marginTop: '8px' }}>
            {uploading ? 'Uploading & Saving...' : 'Save Product'}
          </button>
        </form>
      )}

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '20px' }}>
        <button 
          onClick={() => setFilterCategory('All')}
          style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: filterCategory === 'All' ? '#1e293b' : 'white', color: filterCategory === 'All' ? 'white' : '#334155', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          All Categories ({products.length})
        </button>
        {categories.map(cat => {
          const count = products.filter(p => (p.category || 'Refurbished Laptops') === cat).length;
          
          return (
            <button 
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: filterCategory === cat ? '#1e293b' : 'white', color: filterCategory === cat ? 'white' : '#334155', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredProducts.length === 0 && (
          <p style={{ color: '#64748b' }}>No products found in this category.</p>
        )}
        
        {filteredProducts.map(product => (
          <div key={product.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9' }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                {product.category || 'Refurbished Laptops'}
              </div>

              <div style={{ position: 'absolute', top: 12, right: 12, background: product.status === 'available' ? '#10b981' : '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                {product.status === 'available' ? 'Available' : 'Sold Out'}
              </div>
            </div>
            
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>{product.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', whiteSpace: 'pre-wrap', flex: 1, marginBottom: '20px' }}>{product.specs}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button 
                  onClick={() => toggleStatus(product.id, product.status)}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: `1px solid ${product.status === 'available' ? '#f59e0b' : '#10b981'}`, background: 'transparent', color: product.status === 'available' ? '#f59e0b' : '#10b981', cursor: 'pointer', fontWeight: 500 }}
                >
                  Mark as {product.status === 'available' ? 'Sold' : 'Available'}
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ef4444', background: '#fee2e2', color: '#ef4444', cursor: 'pointer' }}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
