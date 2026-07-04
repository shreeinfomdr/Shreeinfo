'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { target: 19, suffix: '+', label: 'Years Experience', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )},
  { target: 1000, suffix: '+', label: 'Happy Clients', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { target: 5000, suffix: '+', label: 'Devices Repaired', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  )},
  { target: 24, suffix: '/7', label: 'Support Available', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  )},
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className={styles.statNumber}>{count}{suffix}</div>;
}

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutInner}>
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">Delivering trusted IT solutions since 2006</p>

        <div className={styles.grid}>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div className={styles.statCard} key={i}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <CountUp target={stat.target} suffix={stat.suffix} />
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.descriptionCard}>
            <p>
              Welcome to <strong>Shree Infotech</strong>, the leading technology solutions provider in Mundra, Gujarat. With 19 years of experience, we deliver innovative and reliable IT solutions that enhance productivity. From laptop and computer sales to service and maintenance, our experts drive business growth.
            </p>
            <p>
              <strong>Shree Infotech</strong> is a one-stop destination for all your IT needs, offering a wide range of services including computer and laptop sales, repairs, accessories, networking solutions, and software support. With a strong commitment to quality and reliability, we ensure that every product and service meets expectations.
            </p>
            <p>
              We believe in building lasting relationships through trust, transparency, and excellent service. Whether you need a quick laptop repair, professional IT consultancy, or complete digital solutions, we provide dependable support. Our mission is to make technology simple, accessible, and effective.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
