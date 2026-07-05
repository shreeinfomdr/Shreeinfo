'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';


function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If target updates dynamically after we've already started counting, jump to it
    if (counted.current) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          
          timerRef.current = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              if (timerRef.current) clearInterval(timerRef.current);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [target]);

  return <div ref={ref} className={styles.statNumber}>{count}{suffix}</div>;
}

export default function About({ content }: { content?: any }) {
  const [visits, setVisits] = useState(1000);

  const aboutTitle = content?.aboutTitle || 'About Us';
  const aboutSubtitle = content?.aboutSubtitle || 'Delivering trusted IT solutions since 2005';
  const aboutP1 = content?.aboutP1 || 'Welcome to Shree Infotech, founded by visionary experts who have been delivering trusted IT solutions since 2005. We are Mundra\'s premier destination for comprehensive technology services, combining decades of hands-on experience with an unwavering commitment to quality.';
  const aboutP2 = content?.aboutP2 || 'Our journey started with a simple mission: to make technology reliable and accessible. Today, we stand proud as authorized partners for industry giants like ASUS and HAVCOM, specializing in everything from chip-level motherboard repairs to custom high-performance computer builds and enterprise networking solutions.';
  const aboutP3 = content?.aboutP3 || 'At Shree Infotech, we don\'t just sell products; we deliver peace of mind. Whether you need a critical data recovery, a fast laptop screen replacement, or a complete CCTV surveillance setup for your business, our experienced team ensures your technology works seamlessly for you.';

  const dynamicStats = [
    { target: new Date().getFullYear() - 2005, suffix: '+', label: content?.statYearsLabel || 'Years Experience', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )},
    { target: parseInt(content?.statClientsCount || '1000'), suffix: '+', label: content?.statClientsLabel || 'Happy Clients', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )},
    { target: parseInt(content?.statRepairsCount || '5000'), suffix: '+', label: content?.statRepairsLabel || 'Devices Repaired', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    )},
    { target: parseInt(content?.statReviewsCount || '70'), suffix: '+', label: content?.statReviewsLabel || 'Google Reviews', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )},
    { target: 1000, suffix: '+', label: content?.statVisitsLabel || 'Website Visits', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    )},
  ];

  useEffect(() => {
    // Increment and fetch live visitor count (starts from 1000 + API count)
    fetch('https://api.counterapi.dev/v1/shreeinfomdr/visits/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setVisits(1000 + data.count);
        }
      })
      .catch(err => console.error('Failed to fetch visit count:', err));
  }, []);

  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutInner}>
        <h2 className="section-title">{aboutTitle}</h2>
        <p className="section-subtitle">{aboutSubtitle}</p>

        <div className={styles.grid}>
          <div className={styles.statsGrid}>
            {dynamicStats.map((stat, i) => {
              const isLastOdd = i === dynamicStats.length - 1 && dynamicStats.length % 2 !== 0;
              const dynamicTarget = stat.label === (content?.statVisitsLabel || 'Website Visits') ? visits : stat.target;
              const CardContent = (
                <>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <CountUp target={dynamicTarget} suffix={stat.suffix} />
                  <div className={styles.statLabel}>{stat.label}</div>
                </>
              );

              if (stat.label === (content?.statReviewsLabel || 'Google Reviews')) {
                return (
                  <a 
                    href="https://search.google.com/local/writereview?placeid=ChIJiUKAZBXVUDkRyiU5ZMduLh4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.statCard} 
                    key={i}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', ...(isLastOdd ? { gridColumn: '1 / -1', maxWidth: '320px', margin: '0 auto', width: '100%' } : {}) }}
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <div 
                  className={styles.statCard} 
                  key={i}
                  style={isLastOdd ? { gridColumn: '1 / -1', maxWidth: '320px', margin: '0 auto', width: '100%' } : {}}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

          <div className={styles.descriptionCard}>
            <p>{aboutP1}</p>
            <p>{aboutP2}</p>
            {content?.aboutP3 && <p>{content.aboutP3}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
