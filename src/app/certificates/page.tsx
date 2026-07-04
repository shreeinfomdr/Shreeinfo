'use client';
import Link from 'next/link';
import Image from 'next/image';

const allCertificates = [
  {
    title: "ASUS Premium Partner",
    img: "/images/certificate/ASUS.jpg",
    description: "Proudly certified by ASUS India as an official Premium Partner for the year 2023. This certification recognizes Shree Infotech's excellence in providing ASUS systems and solutions."
  },
  {
    title: "FITAG Membership",
    img: "/images/certificate/FITAGE Certificate.jpg",
    description: "Official Certificate of Membership from the Federation of IT Associations of Gujarat (FITAG). Validating our commitment to flourishing knowledge, networking, and IT power."
  },
  {
    title: "MITWA Charitable Trust",
    img: "/images/certificate/Mitva Cheritable Trust.jpg",
    description: "Registered Member of the Mundra IT Welfare Association (MITWA) Charitable Trust. We strongly believe that unity is strength and actively contribute to the welfare of the IT community."
  },
  {
    title: "HAVCOM Authorized Dealer",
    img: "/images/certificate/HAVCOM Authorized Dealer.jpg",
    description: "Proudly appointed and certified as a HAVCOM Authorized Dealer for premium quality IT components and networking products (2022-2024)."
  },
  {
    title: "MITWA Minimum Service Charges",
    img: "/images/certificate/Charges.jpg",
    description: "Official minimum service charges chart standardized by the Mundra IT Welfare Association, ensuring transparent and fair pricing for all our clients."
  },
  {
    title: "Data Cables Solution Provider",
    img: "/images/certificate/Data Cables.jpg",
    description: "Certified Best Solution Provider for Data Cables, offering comprehensive connectivity solutions for all display, serial, USB, and specialized port types."
  }
];

export default function CertificatesPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <Link href="/#certificates" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </Link>
          <h1 className="section-title" style={{ margin: '0 auto', paddingRight: '60px' }}>All Certificates</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {allCertificates.map((cert, i) => (
            <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <a href={cert.img} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', width: '100%', height: '280px', marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', cursor: 'zoom-in' }}>
                <Image src={cert.img} alt={cert.title} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', transition: 'background-color 0.3s' }} className="cert-overlay"></div>
              </a>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#f1f5f9' }}>{cert.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, flex: 1 }}>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
