'use client';

import { useState, useEffect } from 'react';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  isFeatured?: boolean;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/admin/videos');
      const data = await res.json();
      if (Array.isArray(data)) {
        setVideos(data);
      }
    } catch (err) {
      console.error('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const youtubeId = extractYoutubeId(youtubeLink);
    if (!youtubeId) {
      return alert('Invalid YouTube URL. Please enter a valid link.');
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, youtubeId, isFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos([data.video, ...videos]);
        setIsAdding(false);
        setTitle(''); 
        setYoutubeLink(''); 
        setIsFeatured(false);
      }
    } catch (err: unknown) {
      alert('Error saving video');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const newFeatured = !currentFeatured;
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isFeatured: newFeatured }),
      });
      if (res.ok) {
        setVideos(videos.map(v => v.id === id ? { ...v, isFeatured: newFeatured } : v));
      }
    } catch (err) {
      alert('Error updating featured status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos(videos.filter(v => v.id !== id));
      }
    } catch (err) {
      alert('Error deleting video');
    }
  };

  if (loading) return <div>Loading videos...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>YouTube Videos</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage the videos shown in the "Tech Insights & Repairs" section. Top 3 featured videos will be displayed.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
        >
          {isAdding ? 'Cancel' : '+ Add New Video'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Add New YouTube Video</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Video Title</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Laptop Motherboard Repair" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>YouTube Link</label>
            <input 
              type="url"
              required 
              value={youtubeLink}
              onChange={e => setYoutubeLink(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <input 
              type="checkbox" 
              id="isFeatured"
              checked={isFeatured}
              onChange={e => setIsFeatured(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="isFeatured" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
              Feature on Homepage (Top 3 featured videos are shown)
            </label>
          </div>

          <button type="submit" disabled={saving} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontWeight: '600', marginTop: '8px' }}>
            {saving ? 'Saving...' : 'Save Video'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {videos.length === 0 && !isAdding && (
          <p style={{ color: '#64748b', gridColumn: '1 / -1' }}>No videos listed yet.</p>
        )}
        
        {videos.map(video => (
          <div key={video.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '180px', backgroundColor: '#f1f5f9' }}>
              <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {video.isFeatured && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  ★ Featured
                </div>
              )}
            </div>
            
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>{video.title}</h3>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button 
                  onClick={() => toggleFeatured(video.id, !!video.isFeatured)}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: `1px solid ${video.isFeatured ? '#94a3b8' : '#3b82f6'}`, background: 'transparent', color: video.isFeatured ? '#64748b' : '#3b82f6', cursor: 'pointer', fontWeight: 500 }}
                >
                  {video.isFeatured ? 'Remove Featured' : 'Mark Featured'}
                </button>
                <button 
                  onClick={() => handleDelete(video.id)}
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
