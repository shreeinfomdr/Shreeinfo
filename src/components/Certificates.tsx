'use client';
import styles from './Certificates.module.css';

const certificates = [
  {
    title: 'FITAG Membership',
    image: '/images/certificate/FITAGE Certificate.jpg',
  },
  {
    title: 'ASUS Premium Partner',
    image: '/images/certificate/ASUS.jpg',
  },
  {
    title: 'MITWA Charitable Trust',
    image: '/images/certificate/Mitva Cheritable Trust.jpg',
  },
];

export default function Certificates() {
  return (
    <section className={styles.certificates} id="certificates">
      <div className={styles.certificatesInner}>
        <h2 className="section-title">Certificates</h2>
        <p className="section-subtitle">Our trusted partnerships and associations</p>
        <div className={styles.grid}>
          {certificates.map((item) => (
            <div className={styles.card} key={item.title}>
              <a href={item.image} target="_blank" rel="noopener noreferrer" className={styles.imageWrap}>
                <img src={item.image} alt={item.title} loading="lazy" />
              </a>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <a href={item.image} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>View Certificate</a>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <a href="/certificates" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            View All Certificates →
          </a>
        </div>
      </div>
    </section>
  );
}
