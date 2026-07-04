'use client';
import styles from './Downloads.module.css';

const downloads = [
  {
    title: 'Mitva Charitable Trust',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    title: 'FITAGE Certificate',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  },
  {
    title: 'Charges',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
  },
];

export default function Downloads() {
  return (
    <section className={styles.downloads} id="downloads">
      <div className={styles.downloadsInner}>
        <h2 className="section-title">Downloads</h2>
        <p className="section-subtitle">Access our documents and resources</p>
        <div className={styles.grid}>
          {downloads.map((item) => (
            <div className={styles.card} key={item.title}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <button className={styles.downloadBtn}>⬇ Download</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
