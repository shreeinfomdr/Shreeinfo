'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const slides = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.slideContainer}>
        {slides.map((src, i) => (
          <div key={i} className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}>
            <img src={src} alt={`Shree Infotech Banner ${i + 1}`} className={styles.slideImage} />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.floatingOrb + ' ' + styles.orb1} />
      <div className={styles.floatingOrb + ' ' + styles.orb2} />
      <div className={styles.floatingOrb + ' ' + styles.orb3} />

      <div className={styles.content}>
        <div className={styles.badge}>🚀 19+ Years of Excellence</div>
        <h1 className={styles.heading}>
          Your Trusted{' '}
          <span className={styles.headingGradient}>IT Partner</span>{' '}
          in Mundra
        </h1>
        <p className={styles.subheading}>
          From laptop sales to chip-level repairs, we deliver innovative technology
          solutions that drive your business forward. Trusted by 1000+ clients across Gujarat.
        </p>
        <div className={styles.cta}>
          <button className={styles.ctaPrimary} onClick={() => scrollTo('#inquiry')}>
            Get in Touch →
          </button>
          <button className={styles.ctaSecondary} onClick={() => scrollTo('#products')}>
            Our Products
          </button>
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
