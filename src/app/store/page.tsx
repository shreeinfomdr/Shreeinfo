'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './Store.module.css';

interface Product {
  id: string;
  title: string;
  image: string;
  specs: string;
  status: 'available' | 'sold';
  category?: string;
}

function StoreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => setLoading(false));
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
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => (p.category || 'Refurbished Laptops') === activeCategory);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Area */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/#products" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </Link>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>Store Inventory</h1>
          </div>
          
          <button 
            className={styles.mobileFilterBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            Filters
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Loading store inventory...
          </div>
        ) : (
          <div className={styles.storeLayout}>
            
            {/* Amazon-style Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3>Categories</h3>
                <button className={styles.closeSidebarBtn} onClick={() => setIsSidebarOpen(false)}>✕</button>
              </div>
              
              <ul className={styles.categoryList}>
                <li>
                  <button 
                    onClick={() => { setActiveCategory('All'); setIsSidebarOpen(false); }}
                    className={`${styles.categoryBtn} ${activeCategory === 'All' ? styles.activeCategory : ''}`}
                  >
                    <span>All Products</span>
                    <span className={styles.categoryCount}>{products.length}</span>
                  </button>
                </li>
                {categories.map(cat => {
                  const count = products.filter(p => (p.category || 'Refurbished Laptops') === cat).length;
                  if (count === 0) return null; // Hide empty categories
                  
                  return (
                    <li key={cat}>
                      <button 
                        onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }}
                        className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategory : ''}`}
                      >
                        <span>{cat}</span>
                        <span className={styles.categoryCount}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Product Grid Area */}
            <div className={styles.productArea}>
              <div style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                Showing <strong>{filteredProducts.length}</strong> results for {activeCategory === 'All' ? 'All Products' : activeCategory}
              </div>

              {filteredProducts.length === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ marginBottom: '10px' }}>No products found</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Try selecting a different category.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                      
                      {product.status === 'sold' && (
                        <div style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(239,68,68,0.9)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, zIndex: 10, backdropFilter: 'blur(4px)' }}>
                          Sold Out
                        </div>
                      )}

                      <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', background: '#f8fafc' }}>
                        <Image 
                          src={product.image} 
                          alt={product.title} 
                          fill 
                          style={{ objectFit: 'cover', opacity: product.status === 'sold' ? 0.6 : 1, transition: 'transform 0.5s ease' }} 
                          unoptimized 
                        />
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                          {product.category || 'Refurbished Laptops'}
                        </div>
                        
                        <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#f1f5f9', fontWeight: 600, lineHeight: 1.4 }}>
                          {product.title}
                        </h3>
                        
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.specs}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                          {product.status === 'available' ? (
                            <>
                              <Link href="/#inquiry" className="btn btn-outline" style={{ flex: 1, padding: '10px 0', fontSize: '0.9rem' }}>Inquiry</Link>
                              <a 
                                href={`https://wa.me/+919879713381?text=${encodeURIComponent(`Hi! I am interested in your ${product.category || 'Refurbished Laptop'} - ${product.title}. Kindly connect.`)}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-whatsapp" 
                                style={{ flex: 1, padding: '10px 0', fontSize: '0.9rem' }}
                              >
                                WhatsApp
                              </a>
                            </>
                          ) : (
                            <button disabled style={{ width: '100%', padding: '10px 0', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'not-allowed', fontWeight: 600, fontSize: '0.9rem' }}>
                              Unavailable
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
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
