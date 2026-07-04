'use client';
import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  image: string;
  rating: number;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goTo = (i: number) => setActive(i);
  const prev = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((active + 1) % testimonials.length);

  if (loading) {
    return <section className={styles.testimonials} id="testimonials"><div className={styles.testimonialsInner}><h2 className="section-title">What Our Clients Say</h2><p style={{textAlign:'center', color:'rgba(255,255,255,0.5)'}}>Loading testimonials...</p></div></section>;
  }

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.testimonialsInner}>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Trusted by businesses and individuals across Gujarat</p>

        <div className={styles.carouselWrap}>
          {testimonials.length > 1 && <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">❮</button>}
          <div className={styles.slidesContainer} style={{ transform: `translateX(-${active * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div className={styles.slide} key={i}>
                <div className={styles.quoteIcon}>❝</div>
                <p className={styles.quoteText}>&ldquo;{t.text}&rdquo;</p>
                <img src={t.image} alt={t.name} className={styles.authorPhoto} loading="lazy" />
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} style={{ color: idx < (t.rating || 5) ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {testimonials.length > 1 && <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={next} aria-label="Next">❯</button>}
        </div>

        {testimonials.length > 1 && (
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => goTo(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/testimonials" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #3b82f6' }}>Write a Review</a>
        </div>
      </div>
    </section>
  );
}
