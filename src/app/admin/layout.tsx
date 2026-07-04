import Link from 'next/link';
import styles from './AdminLayout.module.css';
import LogoutButton from './LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/logo.png" alt="Shree Infotech" className={styles.logo} />
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          <Link href="/admin/products" className={styles.navLink}>Refurbished Laptops</Link>
          <Link href="/admin/content" className={styles.navLink}>Site Content</Link>
          <Link href="/" className={styles.navLink} target="_blank">View Live Site ↗</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <LogoutButton />
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
