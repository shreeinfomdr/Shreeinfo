'use client';

import { useRouter } from 'next/navigation';
import styles from './AdminLayout.module.css';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Logout
    </button>
  );
}
