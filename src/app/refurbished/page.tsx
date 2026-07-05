import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RefurbishedStore from '@/components/RefurbishedStore';

export default function RefurbishedPage() {
  return (
    <main>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        <RefurbishedStore />
      </div>
      <Footer />
    </main>
  );
}
