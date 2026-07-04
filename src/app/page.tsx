import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Videos from '@/components/Videos';
import Certificates from '@/components/Certificates';
import RefurbishedStore from '@/components/RefurbishedStore';
import Brands from '@/components/Brands';
import InquiryForm from '@/components/InquiryForm';
import Testimonials from '@/components/Testimonials';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <RefurbishedStore />
        <Videos />
        <Certificates />
        <Brands />
        <InquiryForm />
        <Testimonials />
        <SocialLinks />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
