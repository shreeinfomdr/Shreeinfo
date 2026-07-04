import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Videos from '@/components/Videos';
import Downloads from '@/components/Downloads';
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
        <Videos />
        <Downloads />
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
