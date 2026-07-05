'use client';

import { useState, useEffect } from 'react';

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image file first.');
    
    setUploading(true);
    try {
      const uploadRes = await fetch(`/api/admin/upload?filename=${encodeURIComponent(imageFile.name)}`, {
        method: 'POST',
        body: imageFile,
      });
      const blob = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(blob.error || 'Upload failed');
      
      const imageUrl = blob.url;

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl, caption }),
      });
      
      const data = await res.json();
      if (data.success) {
        setItems([data.item, ...items]);
        setIsAdding(false);
        setImageFile(null);
        setCaption('');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      alert('Upload error: ' + msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
      }
    } catch (err) {
      alert('Error deleting image');
    }
  };

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Photo Gallery</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Upload photos to display in the frontend Gallery section. Newest photos appear first.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
        >
          {isAdding ? 'Cancel' : '+ Upload Photo'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Upload New Photo</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Image File</label>
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={e => e.target.files && setImageFile(e.target.files[0])} 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Caption (Optional)</label>
            <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Shop interior, Recent repair..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <button type="submit" disabled={uploading} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1, fontWeight: '600', marginTop: '8px' }}>
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {items.length === 0 && !isAdding && (
          <p style={{ color: '#64748b', gridColumn: '1 / -1' }}>No photos uploaded yet.</p>
        )}
        
        {items.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9' }}>
              <img src={item.image} alt={item.caption || 'Gallery image'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {item.caption && <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>{item.caption}</p>}
              
              <button 
                onClick={() => handleDelete(item.id)}
                style={{ marginTop: 'auto', padding: '8px', borderRadius: '6px', border: '1px solid #ef4444', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontWeight: 500 }}
              >
                Delete Photo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
