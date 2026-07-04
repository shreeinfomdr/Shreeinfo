'use client';

import styles from './Products.module.css';

const products = [
  {
    name: 'Laptop',
    image: '/images/product-laptop.jpg',
    description: 'High-performance laptops for work, gaming, and everyday use. All major brands available.',
  },
  {
    name: 'Desktop',
    image: '/images/product-desktop.jpg',
    description: 'Custom-built desktop computers tailored to your specific needs and budget.',
  },
  {
    name: 'Gaming PC',
    image: '/images/product-gaming.jpg',
    description: 'Ultimate gaming rigs with top-tier specs, RGB lighting, and maximum performance.',
  },
];

export default function Products() {
  const scrollToInquiry = () => {
    const el = document.querySelector('#inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.products} id="products">
      <div className={styles.productsInner}>
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">Premium technology solutions for every need</p>

        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.name}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDesc}>{product.description}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.btnInquiry} onClick={scrollToInquiry}>
                  Inquiry
                </button>
                <a
                  href={`https://wa.me/+919879713381?text=Hi! I am interested in ${product.name}. Kindly connect.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWhatsapp}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <a href="/products" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            View More Products →
          </a>
        </div>
      </div>
    </section>
  );
}
