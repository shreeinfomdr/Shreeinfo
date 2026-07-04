'use client';
import styles from './Services.module.css';

const services = [
  {
    title: 'Laptop Chip Level Repair',
    description: "Expert motherboard and chip-level diagnostics and repair services for all laptop brands. We fix what others can't.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  },
  {
    title: 'Water Damage Repair',
    description: 'Professional water damage recovery and restoration for laptops and electronic devices. Fast turnaround with high success rate.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  },
  {
    title: 'Screen Replacement',
    description: 'Quick and reliable screen replacement service with genuine quality displays for all major laptop and monitor brands.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.servicesInner}>
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Expert repairs and solutions you can trust</p>
        <div className={styles.grid}>
          {services.map((service) => (
            <div className={styles.card} key={service.title}>
              <div className={styles.iconWrap}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <span className={styles.learnMore}>Learn More →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
