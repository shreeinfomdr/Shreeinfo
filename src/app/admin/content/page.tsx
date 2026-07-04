'use client';

import { useState, useEffect } from 'react';

export default function AdminContent() {
  const [content, setContent] = useState({
    heroTitle: 'Premium IT Solutions Built for the Future',
    heroSubtitle: 'Expert laptop repairs, custom PC builds, and networking solutions in Mundra.',
    phoneNumber: '+91 9879713381',
    emailAddress: 'shreeinfo.mdr@gmail.com',
    workingHoursMorning: '10:30 AM - 1:30 PM',
    workingHoursEvening: '4:00 PM - 9:00 PM'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (Object.keys(data).length > 0) {
          setContent(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage('Content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving content.');
      }
    } catch (err) {
      setMessage('Error saving content.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Site Content Management</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Update the text content displayed on your website here. Note: after saving, the website may take a moment to reflect changes depending on caching.</p>

      {message && (
        <div style={{ padding: '12px', background: message.includes('success') ? '#d1fae5' : '#fee2e2', color: message.includes('success') ? '#059669' : '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>Hero Section</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Main Title</label>
              <input value={content.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Subtitle</label>
              <textarea value={content.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Phone / WhatsApp Number</label>
              <input value={content.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
              <input value={content.emailAddress} onChange={e => handleChange('emailAddress', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>Working Hours</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Morning Shift (Mon - Sat)</label>
              <input value={content.workingHoursMorning} onChange={e => handleChange('workingHoursMorning', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Evening Shift (Mon - Sat)</label>
              <input value={content.workingHoursEvening} onChange={e => handleChange('workingHoursEvening', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginTop: '16px' }}>
          {saving ? 'Saving...' : 'Save Content'}
        </button>
      </form>
    </div>
  );
}
