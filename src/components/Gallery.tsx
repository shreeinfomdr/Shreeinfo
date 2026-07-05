'use client';

import { useState, useEffect } from 'react';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

export default function Gallery({ content }: { content?: any }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryTitle = content?.galleryTitle || 'Our Gallery';
  const gallerySubtitle = content?.gallerySubtitle || 'Latest photos from Shree Infotech';

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/admin/gallery');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return null;
  if (items.length === 0) return null;

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.galleryInner}>
        <h2 className="section-title">{galleryTitle}</h2>
        <p className="section-subtitle">{gallerySubtitle}</p>

        <div className={styles.grid}>
          {visibleItems.map(item => (
            <div key={item.id} className={styles.card} onClick={() => setActiveImage(item)}>
              <div className={styles.imageWrap}>
                <img src={item.image} alt={item.caption || 'Gallery photo'} loading="lazy" />
              </div>
              {item.caption && (
                <div className={styles.caption}>
                  <div className={styles.captionText}>{item.caption}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button 
              className="btn btn-outline" 
              onClick={() => setVisibleCount(prev => prev + 6)}
              style={{ padding: '12px 32px' }}
            >
              Load More Photos
            </button>
          </div>
        )}
      </div>

      {activeImage && (
        <div className={styles.modal} onClick={() => setActiveImage(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveImage(null)}>✕</button>
            <img src={activeImage.image} alt={activeImage.caption || 'Gallery Image'} className={styles.modalImage} />
            {activeImage.caption && (
              <div className={styles.modalCaption}>{activeImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
