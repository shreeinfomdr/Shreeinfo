'use client';
import styles from './Brands.module.css';

const brands = [
  { name: 'Laptop Brands', image: 'https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/82491757320688912.jpg' },
  { name: 'Printer Brands', image: 'https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/37561757320923755.jpg' },
  { name: 'Anti Virus', image: 'https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/49251757322295718.jpg' },
];

export default function Brands({ content }: { content?: any }) {
  const brandsTitle = content?.brandsTitle || 'Brands We Deal In';
  const brandsSubtitle = content?.brandsSubtitle || 'We provide sales and service for all major technology brands.';

  return (
    <section className={styles.brands} id="brands">
      <div className={styles.brandsInner}>
        <h2 className="section-title">{brandsTitle}</h2>
        <p className="section-subtitle">{brandsSubtitle}</p>
        <div className={styles.grid}>
          {brands.map((brand) => (
            <div className={styles.card} key={brand.name}>
              <div className={styles.imageWrap}>
                <img src={brand.image} alt={brand.name} loading="lazy" />
              </div>
              <div className={styles.cardTitle}>{brand.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
