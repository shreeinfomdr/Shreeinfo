'use client';

import { useState, useEffect } from 'react';

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' };
const labelStyle: React.CSSProperties = { fontWeight: 600, fontSize: '0.9rem' };
const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px' };
const sectionHeaderStyle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' };

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={inputStyle} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}

export default function AdminContent() {
  const [content, setContent] = useState({
    // Hero
    heroTitle: 'Premium IT Solutions Built for the Future',
    heroSubtitle: 'Expert laptop repairs, custom PC builds, and enterprise networking solutions in Mundra, Gujarat.',
    heroBadge: '🚀 Since 2005',
    heroCTA1: 'Get Expert Consultation',
    heroCTA2: 'WhatsApp Us',
    // About
    aboutTitle: 'About Us',
    aboutSubtitle: 'Delivering trusted IT solutions since 2005',
    aboutP1: 'Welcome to Shree Infotech, founded by visionary experts who have been delivering trusted IT solutions since 2005.',
    aboutP2: 'Our journey started with a simple mission: to make technology reliable and accessible.',
    aboutP3: 'At Shree Infotech, we don\'t just sell products; we deliver peace of mind.',
    // Stats
    statYearsLabel: 'Years Experience',
    statClientsLabel: 'Happy Clients',
    statClientsCount: '1000',
    statRepairsLabel: 'Devices Repaired',
    statRepairsCount: '5000',
    statReviewsLabel: 'Google Reviews',
    statReviewsCount: '70',
    statVisitsLabel: 'Website Visits',
    // Products
    productsTitle: 'Our Products',
    productsSubtitle: 'Premium technology solutions for every need',
    product1Name: 'Laptop',
    product1Desc: 'High-performance laptops for work, gaming, and everyday use. All major brands available.',
    product2Name: 'Desktop',
    product2Desc: 'Custom-built desktop computers tailored to your specific needs and budget.',
    product3Name: 'Refurbished & Used Laptops',
    product3Desc: 'High-quality refurbished and second-hand laptops and computers at unbeatable prices.',
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive IT solutions for businesses and individuals',
    service1Title: 'Laptop Chip Level Repair',
    service1Desc: 'Expert motherboard and chip-level diagnostics and repair services for all laptop brands.',
    service2Title: 'Laptop Screen Replacement',
    service2Desc: 'Quick and affordable screen replacement for all laptop models with genuine parts.',
    service3Title: 'Computer Networking',
    service3Desc: 'Professional networking solutions including LAN setup, Wi-Fi configuration, and server management.',
    service4Title: 'Custom PC Building',
    service4Desc: 'Tailor-made desktop builds for gaming, professional work, and business needs.',
    // Videos
    videosTitle: 'Tech Insights & Repairs',
    videosSubtitle: 'Watch our expert technicians in action and learn more about technology.',
    // Certificates
    certsTitle: 'Our Authorizations & Certificates',
    certsSubtitle: 'Certified and authorized partner for major technology brands.',
    // Brands
    brandsTitle: 'Brands We Deal In',
    brandsSubtitle: 'We provide sales and service for all major technology brands.',
    // Inquiry
    inquiryTitle: 'Get In Touch',
    inquirySubtitle: 'Have a question? We would love to hear from you',
    // Social / Connect
    socialTitle: 'Connect With Us',
    socialSubtitle: 'Follow us on social media and stay connected',
    whatsappUrl: 'https://wa.me/+919879713381?text=Hi! I am interested Kindly connect',
    facebookUrl: 'https://www.facebook.com/share/1DVHAQfqTJ/',
    youtubeUrl: 'https://youtube.com/@shreeinfotech1033?si=zKhxzTEZpZf6L3b7',
    instagramUrl: 'https://www.instagram.com/shree_infotech__?igsh=MWxrbm52a20xbmFs',
    googleMapsUrl: 'https://maps.app.goo.gl/rdV8AZy2abpvduNk9',
    // Footer / Contact
    footerTagline: 'Your trusted IT partner since 2005. Delivering innovative technology solutions in Mundra, Gujarat.',
    address: 'Mundra, Gujarat',
    phoneNumber: '+91 9879713381',
    emailAddress: 'shreeinfo.mdr@gmail.com',
    workingHoursMorning: '10:30 AM - 1:30 PM',
    workingHoursEvening: '4:00 PM - 9:00 PM',
    // Testimonials
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Real reviews from our valued customers',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

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

  const set = (key: string, value: string) => setContent(prev => ({ ...prev, [key]: value }));

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  const tabs = [
    { id: 'hero', label: '🏠 Hero' },
    { id: 'about', label: '📖 About' },
    { id: 'products', label: '💻 Products' },
    { id: 'services', label: '🔧 Services' },
    { id: 'sections', label: '📋 Sections' },
    { id: 'social', label: '🌐 Social Links' },
    { id: 'contact', label: '📞 Contact & Footer' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Site Content Management</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Edit every single text, link, and detail on your website. Changes go live instantly after saving.</p>

      {message && (
        <div style={{ padding: '12px', background: message.includes('success') ? '#d1fae5' : '#fee2e2', color: message.includes('success') ? '#059669' : '#ef4444', borderRadius: '8px', marginBottom: '24px', fontWeight: 600 }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: activeTab === tab.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              background: activeTab === tab.id ? '#eff6ff' : 'white',
              color: activeTab === tab.id ? '#1d4ed8' : '#64748b',
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* HERO */}
        {activeTab === 'hero' && (
          <section>
            <h3 style={sectionHeaderStyle}>Hero Section</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Main Title" value={content.heroTitle} onChange={v => set('heroTitle', v)} />
              <Field label="Subtitle" value={content.heroSubtitle} onChange={v => set('heroSubtitle', v)} multiline />
              <Field label="Badge Text (e.g. 🚀 Since 2005)" value={content.heroBadge} onChange={v => set('heroBadge', v)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Button 1 Text" value={content.heroCTA1} onChange={v => set('heroCTA1', v)} />
                <Field label="Button 2 Text" value={content.heroCTA2} onChange={v => set('heroCTA2', v)} />
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <section>
            <h3 style={sectionHeaderStyle}>About Us Section</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Section Title" value={content.aboutTitle} onChange={v => set('aboutTitle', v)} />
              <Field label="Section Subtitle" value={content.aboutSubtitle} onChange={v => set('aboutSubtitle', v)} />
              <Field label="Paragraph 1" value={content.aboutP1} onChange={v => set('aboutP1', v)} multiline />
              <Field label="Paragraph 2" value={content.aboutP2} onChange={v => set('aboutP2', v)} multiline />
              <Field label="Paragraph 3" value={content.aboutP3} onChange={v => set('aboutP3', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>Stats / Counters</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Years Label" value={content.statYearsLabel} onChange={v => set('statYearsLabel', v)} />
                <Field label="Clients Label" value={content.statClientsLabel} onChange={v => set('statClientsLabel', v)} />
                <Field label="Clients Count" value={content.statClientsCount} onChange={v => set('statClientsCount', v)} />
                <Field label="Repairs Label" value={content.statRepairsLabel} onChange={v => set('statRepairsLabel', v)} />
                <Field label="Repairs Count" value={content.statRepairsCount} onChange={v => set('statRepairsCount', v)} />
                <Field label="Reviews Label" value={content.statReviewsLabel} onChange={v => set('statReviewsLabel', v)} />
                <Field label="Reviews Count" value={content.statReviewsCount} onChange={v => set('statReviewsCount', v)} />
                <Field label="Visits Label" value={content.statVisitsLabel} onChange={v => set('statVisitsLabel', v)} />
              </div>
            </div>
          </section>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <section>
            <h3 style={sectionHeaderStyle}>Products Section</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Section Title" value={content.productsTitle} onChange={v => set('productsTitle', v)} />
              <Field label="Section Subtitle" value={content.productsSubtitle} onChange={v => set('productsSubtitle', v)} />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Product Card 1</h4>
              <Field label="Name" value={content.product1Name} onChange={v => set('product1Name', v)} />
              <Field label="Description" value={content.product1Desc} onChange={v => set('product1Desc', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Product Card 2</h4>
              <Field label="Name" value={content.product2Name} onChange={v => set('product2Name', v)} />
              <Field label="Description" value={content.product2Desc} onChange={v => set('product2Desc', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Product Card 3</h4>
              <Field label="Name" value={content.product3Name} onChange={v => set('product3Name', v)} />
              <Field label="Description" value={content.product3Desc} onChange={v => set('product3Desc', v)} multiline />
            </div>
          </section>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <section>
            <h3 style={sectionHeaderStyle}>Services Section</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Section Title" value={content.servicesTitle} onChange={v => set('servicesTitle', v)} />
              <Field label="Section Subtitle" value={content.servicesSubtitle} onChange={v => set('servicesSubtitle', v)} />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Service 1</h4>
              <Field label="Title" value={content.service1Title} onChange={v => set('service1Title', v)} />
              <Field label="Description" value={content.service1Desc} onChange={v => set('service1Desc', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Service 2</h4>
              <Field label="Title" value={content.service2Title} onChange={v => set('service2Title', v)} />
              <Field label="Description" value={content.service2Desc} onChange={v => set('service2Desc', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Service 3</h4>
              <Field label="Title" value={content.service3Title} onChange={v => set('service3Title', v)} />
              <Field label="Description" value={content.service3Desc} onChange={v => set('service3Desc', v)} multiline />
              <h4 style={{ fontWeight: 700, marginTop: '8px' }}>Service 4</h4>
              <Field label="Title" value={content.service4Title} onChange={v => set('service4Title', v)} />
              <Field label="Description" value={content.service4Desc} onChange={v => set('service4Desc', v)} multiline />
            </div>
          </section>
        )}

        {/* SECTIONS */}
        {activeTab === 'sections' && (
          <section>
            <h3 style={sectionHeaderStyle}>Other Section Titles</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Videos Title" value={content.videosTitle} onChange={v => set('videosTitle', v)} />
              <Field label="Videos Subtitle" value={content.videosSubtitle} onChange={v => set('videosSubtitle', v)} />
              <Field label="Certificates Title" value={content.certsTitle} onChange={v => set('certsTitle', v)} />
              <Field label="Certificates Subtitle" value={content.certsSubtitle} onChange={v => set('certsSubtitle', v)} />
              <Field label="Brands Title" value={content.brandsTitle} onChange={v => set('brandsTitle', v)} />
              <Field label="Brands Subtitle" value={content.brandsSubtitle} onChange={v => set('brandsSubtitle', v)} />
              <Field label="Inquiry Title" value={content.inquiryTitle} onChange={v => set('inquiryTitle', v)} />
              <Field label="Inquiry Subtitle" value={content.inquirySubtitle} onChange={v => set('inquirySubtitle', v)} />
              <Field label="Testimonials Title" value={content.testimonialsTitle} onChange={v => set('testimonialsTitle', v)} />
              <Field label="Testimonials Subtitle" value={content.testimonialsSubtitle} onChange={v => set('testimonialsSubtitle', v)} />
            </div>
          </section>
        )}

        {/* SOCIAL */}
        {activeTab === 'social' && (
          <section>
            <h3 style={sectionHeaderStyle}>Social Links & Connect Section</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Section Title" value={content.socialTitle} onChange={v => set('socialTitle', v)} />
              <Field label="Section Subtitle" value={content.socialSubtitle} onChange={v => set('socialSubtitle', v)} />
              <Field label="WhatsApp URL" value={content.whatsappUrl} onChange={v => set('whatsappUrl', v)} />
              <Field label="Facebook URL" value={content.facebookUrl} onChange={v => set('facebookUrl', v)} />
              <Field label="YouTube URL" value={content.youtubeUrl} onChange={v => set('youtubeUrl', v)} />
              <Field label="Instagram URL" value={content.instagramUrl} onChange={v => set('instagramUrl', v)} />
              <Field label="Google Maps URL" value={content.googleMapsUrl} onChange={v => set('googleMapsUrl', v)} />
            </div>
          </section>
        )}

        {/* CONTACT & FOOTER */}
        {activeTab === 'contact' && (
          <section>
            <h3 style={sectionHeaderStyle}>Contact Information & Footer</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <Field label="Phone / WhatsApp Number" value={content.phoneNumber} onChange={v => set('phoneNumber', v)} />
              <Field label="Email Address" value={content.emailAddress} onChange={v => set('emailAddress', v)} />
              <Field label="Address" value={content.address} onChange={v => set('address', v)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Morning Shift Hours" value={content.workingHoursMorning} onChange={v => set('workingHoursMorning', v)} />
                <Field label="Evening Shift Hours" value={content.workingHoursEvening} onChange={v => set('workingHoursEvening', v)} />
              </div>
              <Field label="Footer Tagline" value={content.footerTagline} onChange={v => set('footerTagline', v)} multiline />
            </div>
          </section>
        )}

        <button type="submit" disabled={saving} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginTop: '8px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
          {saving ? 'Saving...' : '💾 Save All Content'}
        </button>
      </form>
    </div>
  );
}
