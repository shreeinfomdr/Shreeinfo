'use client';
import Link from 'next/link';
import Image from 'next/image';

const allProducts = [
  { title: "Laptop", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", brands: "HP, Dell, Lenovo, ASUS, Acer, Apple" },
  { title: "Desktop", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80", brands: "HP, Dell, Lenovo, ASUS, Custom Builds" },
  { title: "Gaming Pc", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80", brands: "ASUS ROG, MSI, Gigabyte, Corsair" },
  { title: "Printer", img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80", brands: "HP, Canon, Epson, Brother" },
  { title: "Cctv & security surveillance", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/70201757307743990.jpg", brands: "CP Plus, Hikvision, Dahua, Godrej" },
  { title: "Laptop & Computer accessories", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/77221757307809866.png", brands: "Logitech, Dell, HP, Zebronics, Portronics" },
  { title: "Laptop battery", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/68171757311828466.jpg", brands: "HP, Dell, Lenovo, Acer, ASUS (OEM & Compatible)" },
  { title: "Laptop Charger", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80", brands: "Original & Compatible Adapters for All Brands" },
  { title: "Screen", img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", brands: "LG, Samsung, Dell, Acer, AOC, BenQ" },
  { title: "Laptop Hinges", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/26231757311947799.jpeg", brands: "OEM Replacements for HP, Dell, Lenovo, ASUS" },
  { title: "Speakar", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80", brands: "JBL, Sony, Zebronics, F&D, Boat" },
  { title: "Keyboard", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80", brands: "Logitech, TVS, Dell, HP, Redragon" },
  { title: "Refurbished Laptops", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", brands: "Dell, HP, Lenovo (High Quality Refurbished)" },
  { title: "Old Laptops & Computers", img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80", brands: "Affordable Second-Hand Systems" }
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
              <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', textAlign: 'center', color: '#f1f5f9' }}>{p.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '20px', flex: 1, alignContent: 'flex-start' }}>
                {p.brands.split(', ').map((brand, idx) => (
                  <span key={idx} style={{ padding: '4px 12px', background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {brand}
                  </span>
                ))}
              </div>
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
