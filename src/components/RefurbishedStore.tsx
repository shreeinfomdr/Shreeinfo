'use client';

import { useState, useEffect } from 'react';
import styles from './RefurbishedStore.module.css';

interface Product {
  id: string;
  title: string;
  image: string;
  specs: string;
  status: 'available' | 'sold';
}

export default function RefurbishedStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch refurbished products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null; // Don't show anything while loading
  if (products.length === 0) return null; // Hide section if no products

  return (
    <section className={styles.storeSection} id="refurbished">
      <div className={styles.storeInner}>
        <h2 className="section-title">Refurbished Laptops & Computers</h2>
        <p className="section-subtitle">Premium quality certified refurbished devices at unbeatable prices</p>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={`${styles.productCard} ${product.status === 'sold' ? styles.soldOutCard : ''}`}>
              <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} className={styles.productImage} loading="lazy" />
                {product.status === 'sold' && (
                  <div className={styles.soldBadge}>SOLD OUT</div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productSpecs}>{product.specs}</p>
                
                <div className={styles.productFooter}>
                  <div className={styles.priceTag}>Contact for Price</div>
                  
                  {product.status === 'available' ? (
                    <a 
                      href={`https://wa.me/+919879713381?text=${encodeURIComponent(`Hi! I am interested in the refurbished ${product.title}. Could you provide the price and availability?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    >
                      Inquire Now
                    </a>
                  ) : (
                    <button disabled className="btn btn-outline" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
