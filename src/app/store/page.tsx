'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  image: string;
  specs: string;
  status: 'available' | 'sold';
  category?: string;
}

const CATEGORIES = [
  'All',
  'Refurbished Laptops',
  'New Laptops',
  'Desktop Computers',
  'Monitors',
  'Accessories',
  'Parts & Components',
  'Printers',
  'CCTV & Security',
  'Others'
];

function StoreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => (p.category || 'Refurbished Laptops') === activeCategory);

  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <Link href="/#products" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Home
          </Link>
          <h1 className="section-title" style={{ margin: '0 auto', paddingRight: '120px' }}>Store Inventory</h1>
        </div>
        
        <p className="section-subtitle" style={{ marginBottom: '40px' }}>
          Browse our complete inventory of new and refurbished technology products.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Loading inventory...
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '30px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
              {CATEGORIES.map(cat => {
                const count = cat === 'All' 
                  ? products.length 
                  : products.filter(p => (p.category || 'Refurbished Laptops') === cat).length;
                  
                if (count === 0) return null; // Hide empty categories

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '30px',
                      border: `1px solid ${activeCategory === cat ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                      background: activeCategory === cat ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)',
                      color: activeCategory === cat ? 'var(--accent-blue)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: activeCategory === cat ? 700 : 500,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {cat} <span style={{ opacity: 0.6, fontSize: '0.9em', marginLeft: '4px' }}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                  
                  {product.status === 'sold' && (
                    <div style={{ position: 'absolute', top: 32, right: 32, background: 'rgba(239,68,68,0.9)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, zIndex: 10, backdropFilter: 'blur(4px)' }}>
                      Sold Out
                    </div>
                  )}

                  <div style={{ position: 'relative', width: '100%', height: '220px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      style={{ objectFit: 'cover', opacity: product.status === 'sold' ? 0.6 : 1, transition: 'transform 0.5s ease' }} 
                      unoptimized 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      {product.category || 'Refurbished Laptops'}
                    </div>
                    
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#f1f5f9', fontWeight: 600, lineHeight: 1.4 }}>
                      {product.title}
                    </h3>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '24px', flex: 1 }}>
                      {product.specs}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                      {product.status === 'available' ? (
                        <>
                          <Link href="/#inquiry" className="btn btn-outline" style={{ flex: 1, padding: '12px 0' }}>Inquiry</Link>
                          <a 
                            href={`https://wa.me/+919879713381?text=${encodeURIComponent(`Hi! I am interested in your ${product.category || 'Refurbished Laptop'} - ${product.title}. Kindly connect.`)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-whatsapp" 
                            style={{ flex: 1, padding: '12px 0' }}
                          >
                            WhatsApp
                          </a>
                        </>
                      ) : (
                        <button disabled style={{ flex: 1, padding: '12px 0', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'not-allowed', fontWeight: 600 }}>
                          Currently Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '120px 24px', color: 'white' }}>Loading store...</div>}>
      <StoreContent />
    </Suspense>
  );
}
