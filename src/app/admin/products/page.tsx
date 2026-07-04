'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  image: string;
  specs: string;
  status: 'available' | 'sold';
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [specs, setSpecs] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image file first.');
    
    setUploading(true);
    try {
      // 1. Upload file to Vercel Blob
      const uploadRes = await fetch(`/api/admin/upload?filename=${encodeURIComponent(imageFile.name)}`, {
        method: 'POST',
        body: imageFile,
      });
      const blob = await uploadRes.json();
      
      if (!uploadRes.ok) throw new Error(blob.error || 'Upload failed');
      
      const imageUrl = blob.url;

      // 2. Save product
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image: imageUrl, specs }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts([data.product, ...products]);
        setIsAdding(false);
        setTitle(''); setImageFile(null); setSpecs('');
      }
    } catch (err) {
      alert('Error adding product or uploading image.');
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this laptop?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Refurbished Laptops Inventory</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
        >
          {isAdding ? 'Cancel' : '+ Add New Laptop'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Add New Laptop</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Title / Model Name</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Dell Latitude 7490" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Laptop Image</label>
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={e => e.target.files && setImageFile(e.target.files[0])} 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Specifications</label>
            <textarea required value={specs} onChange={e => setSpecs(e.target.value)} rows={4} placeholder="e.g. Intel Core i5 8th Gen, 16GB RAM, 512GB SSD..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <button type="submit" disabled={uploading} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1, fontWeight: '600', marginTop: '8px' }}>
            {uploading ? 'Uploading & Saving...' : 'Save Laptop'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.length === 0 && !isAdding && (
          <p style={{ color: '#64748b' }}>No refurbished laptops listed yet.</p>
        )}
        
        {products.map(product => (
          <div key={product.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9' }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  onClick={() => handleDelete(product.id)}
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
