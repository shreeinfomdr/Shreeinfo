'use client';
import Link from 'next/link';
import Image from 'next/image';

const allProducts = [
  { title: "Laptop", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/24631757307501936.jpg" },
  { title: "Desktop", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/63581757307522206.jpg" },
  { title: "Gaming Pc", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/48731757307594811.jpg" },
  { title: "Printer", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/14251757307641271.jpg" },
  { title: "Cctv & security surveillance", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/70201757307743990.jpg" },
  { title: "Laptop & Computer accessories", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/77221757307809866.png" },
  { title: "Laptop battery", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/68171757311828466.jpg" },
  { title: "Laptop Charger", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/34541757311860479.jpg" },
  { title: "Screen", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/83521757311909857.jpg" },
  { title: "Laptop Hinges", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/26231757311947799.jpeg" },
  { title: "Speakar", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/15521757311986225.jpg" },
  { title: "Keyboard", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/50431757312023001.jpg" }
];

export default function ProductsPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <Link href="/#products" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </Link>
          <h1 className="section-title" style={{ margin: '0 auto', paddingRight: '60px' }}>All Products</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {allProducts.map((p, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', flex: 1, textAlign: 'center' }}>{p.title}</h3>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link href="/#inquiry" className="btn btn-outline" style={{ flex: 1, padding: '10px 0' }}>Inquiry</Link>
                <a href={`https://wa.me/+919879713381?text=Hi! I am interested in ${p.title}. Kindly connect.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ flex: 1, padding: '10px 0' }}>WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
