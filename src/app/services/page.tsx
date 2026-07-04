'use client';
import Link from 'next/link';
import Image from 'next/image';

const allServices = [
  { title: "Laptop Chip Level Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/36681757307908939.jpg", description: "Expert motherboard and chip-level diagnostics and repair services for all laptop brands. We fix what others can't." },
  { title: "Water Damaged Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/56101757308021525.jpg", description: "Professional water damage recovery and restoration for laptops and electronic devices. Fast turnaround with high success rate." },
  { title: "Screen Replacement", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/35381757308076768.jpg", description: "Quick and reliable screen replacement service with genuine quality displays for all major laptop and monitor brands." },
  { title: "Broken Body Fabrication And Hinge Replacement", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/90661757308158525.jpg", description: "Expert physical repair and fabrication for broken laptop bodies and hinges to restore structural integrity." },
  { title: "Battery & charging problem solution", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/60771757308219756.jpg", description: "Diagnostics and replacement for laptop batteries and charging port issues, ensuring reliable power." },
  { title: "Desktop Motherboard Repair", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/70011757308293830.jpg", description: "Comprehensive repair services for desktop motherboards, including IC replacement and short-circuit fixes." },
  { title: "Ssd Installation", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/94531757308363384.jpg", description: "Speed up your system significantly with professional SSD upgrades, including data migration and OS installation." },
  { title: "Gaming pc Build", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/10451757308514634.jpg", description: "Custom-built, high-performance gaming PCs tailored to your budget and specifications with expert cable management." },
  { title: "Printer service", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/15941757308553363.jpg", description: "Maintenance and repair services for all major printer brands, solving paper jams, connectivity, and print quality issues." },
  { title: "Cartridges Reffiling", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/94111757308607978.jpg", description: "High-quality, cost-effective ink and toner cartridge refilling services to keep your printers running smoothly." },
  { title: "Cctv Installation", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/36591757308640589.jpg", description: "Professional CCTV and security surveillance camera setup for homes and businesses to ensure safety and monitoring." },
  { title: "Anti virus", img: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/27131757308672976.jpg", description: "Installation and configuration of premium antivirus software to protect your devices from malware and cyber threats." }
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
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', textAlign: 'center' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5, textAlign: 'center', marginBottom: '20px', flex: 1 }}>{s.description}</p>
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
