'use client';

import { useState, useEffect } from 'react';

export default function AdminContent() {
  const [content, setContent] = useState({
    heroTitle: 'Premium IT Solutions Built for the Future',
    heroSubtitle: 'Expert laptop repairs, custom PC builds, and enterprise networking solutions in Mundra, Gujarat.',
    aboutTitle: 'About Shree Infotech',
    aboutSubtitle: '19+ Years of Excellence in IT Solutions',
    aboutP1: 'Established in 2005, Shree Infotech has grown to become Mundra\'s most trusted IT partner. With nearly two decades of hands-on experience, we have successfully navigated the rapidly evolving technology landscape.',
    aboutP2: 'Our journey started with a simple mission: to make technology reliable and accessible. Today, we stand proud as authorized partners for industry giants like ASUS and HAVCOM, specializing in everything from chip-level motherboard repairs to custom high-performance computer builds and enterprise networking solutions.',
    aboutP3: 'At Shree Infotech, we don\'t just sell products; we deliver peace of mind. Whether you need a critical data recovery, a fast laptop screen replacement, or a complete CCTV surveillance setup for your business, our experienced team ensures your technology works seamlessly for you.',
    productsTitle: 'Our Products',
    productsSubtitle: 'Premium technology solutions for every need',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive IT solutions for businesses and individuals',
    videosTitle: 'Tech Insights & Repairs',
    videosSubtitle: 'Watch our expert technicians in action and learn more about technology.',
    certsTitle: 'Our Authorizations & Certificates',
    certsSubtitle: 'Certified and authorized partner for major technology brands.',
    brandsTitle: 'Brands We Deal In',
    brandsSubtitle: 'We provide sales and service for all major technology brands.',
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
        if (data && Object.keys(data).length > 0) {
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
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Site Content Management (CMS)</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Update 100% of the core text content displayed on your website here. Changes are instantly live.</p>

      {message && (
        <div style={{ padding: '12px', background: message.includes('success') ? '#d1fae5' : '#fee2e2', color: message.includes('success') ? '#059669' : '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>1. Hero Section</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Main Title</label>
              <input value={content.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subtitle</label>
              <textarea value={content.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>2. About Us Section</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Section Title</label>
              <input value={content.aboutTitle} onChange={e => handleChange('aboutTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Section Subtitle</label>
              <input value={content.aboutSubtitle} onChange={e => handleChange('aboutSubtitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Paragraph 1</label>
              <textarea value={content.aboutP1} onChange={e => handleChange('aboutP1', e.target.value)} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Paragraph 2</label>
              <textarea value={content.aboutP2} onChange={e => handleChange('aboutP2', e.target.value)} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Paragraph 3</label>
              <textarea value={content.aboutP3} onChange={e => handleChange('aboutP3', e.target.value)} rows={3} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>3. Section Titles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Products Title</label>
              <input value={content.productsTitle} onChange={e => handleChange('productsTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input value={content.productsSubtitle} onChange={e => handleChange('productsSubtitle', e.target.value)} placeholder="Subtitle" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Services Title</label>
              <input value={content.servicesTitle} onChange={e => handleChange('servicesTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input value={content.servicesSubtitle} onChange={e => handleChange('servicesSubtitle', e.target.value)} placeholder="Subtitle" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Videos Title</label>
              <input value={content.videosTitle} onChange={e => handleChange('videosTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input value={content.videosSubtitle} onChange={e => handleChange('videosSubtitle', e.target.value)} placeholder="Subtitle" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Certificates Title</label>
              <input value={content.certsTitle} onChange={e => handleChange('certsTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input value={content.certsSubtitle} onChange={e => handleChange('certsSubtitle', e.target.value)} placeholder="Subtitle" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Brands Title</label>
              <input value={content.brandsTitle} onChange={e => handleChange('brandsTitle', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input value={content.brandsSubtitle} onChange={e => handleChange('brandsSubtitle', e.target.value)} placeholder="Subtitle" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>4. Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phone / WhatsApp Number</label>
              <input value={content.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
              <input value={content.emailAddress} onChange={e => handleChange('emailAddress', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Morning Shift</label>
              <input value={content.workingHoursMorning} onChange={e => handleChange('workingHoursMorning', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Evening Shift</label>
              <input value={content.workingHoursEvening} onChange={e => handleChange('workingHoursEvening', e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </section>

        <button type="submit" disabled={saving} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginTop: '8px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
          {saving ? 'Saving...' : 'Save All Content'}
        </button>
      </form>
    </div>
  );
}
