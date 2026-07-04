'use client';
import Link from 'next/link';
import Image from 'next/image';

const allServices = [
  { title: "Laptop Chip Level Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/36681757307908939.jpg" },
  { title: "Water Damaged Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/56101757308021525.jpg" },
  { title: "Screen Replacement", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/35381757308076768.jpg" },
  { title: "Broken Body Fabrication And Hinge Replacement", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/90661757308158525.jpg" },
  { title: "Battery & charging problem solution", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/60771757308219756.jpg" },
  { title: "Desktop Motherboard Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/70011757308293830.jpg" },
  { title: "Ssd Installation", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/94531757308363384.jpg" },
  { title: "Gaming pc Build", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/10451757308514634.jpg" },
  { title: "Printer service", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/15941757308553363.jpg" },
  { title: "Cartridges Reffiling", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/94111757308607978.jpg" },
  { title: "Cctv Installation", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/36591757308640589.jpg" },
  { title: "Anti virus", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/27131757308672976.jpg" }
];

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <Link href="/#services" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </Link>
          <h1 className="section-title" style={{ margin: '0 auto', paddingRight: '60px' }}>All Services</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {allServices.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', width: '100%', height: '240px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', flex: 1, textAlign: 'center' }}>{s.title}</h3>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link href="/#inquiry" className="btn btn-outline" style={{ flex: 1, padding: '10px 0' }}>Inquiry</Link>
                <a href={`https://wa.me/+919879713381?text=Hi! I am interested in ${s.title} service. Kindly connect.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ flex: 1, padding: '10px 0' }}>WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
