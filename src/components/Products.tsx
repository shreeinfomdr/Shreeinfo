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
    name: 'Refurbished & Used Laptops',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    description: 'High-quality refurbished and second-hand laptops and computers at unbeatable prices.',
  },
];

export default function Products({ content }: { content?: any }) {
  const scrollToInquiry = () => {
    const el = document.querySelector('#inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const productsTitle = content?.productsTitle || 'Our Products';
  const productsSubtitle = content?.productsSubtitle || 'Premium technology solutions for every need';

  return (
    <section className={styles.products} id="products">
      <div className={styles.productsInner}>
        <h2 className="section-title">{productsTitle}</h2>
        <p className="section-subtitle">{productsSubtitle}</p>

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
                {product.name === 'Refurbished & Used Laptops' ? (
                  <a href="/refurbished" className="btn btn-primary" style={{ width: '100%' }}>
                    View Available Laptops
                  </a>
                ) : (
                  <>
                    <button className={styles.btnInquiry} onClick={scrollToInquiry}>
                      Inquiry
                    </button>
                    <a
                      href={`https://wa.me/+919879713381?text=${encodeURIComponent(`Hi! I am interested in ${product.name}. Kindly connect.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnWhatsapp}
                    >
                      💬 WhatsApp
                    </a>
                  </>
                )}
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
