import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Videos from '@/components/Videos';
import Gallery from '@/components/Gallery';
import Certificates from '@/components/Certificates';
import Brands from '@/components/Brands';
import InquiryForm from '@/components/InquiryForm';
import Testimonials from '@/components/Testimonials';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { kv } from '@vercel/kv';

const defaultContent = {
  heroTitle: 'Premium IT Solutions Built for the Future',
  heroSubtitle: 'Expert laptop repairs, custom PC builds, and enterprise networking solutions in Mundra, Gujarat.',
  aboutTitle: 'About Shree Infotech',
  aboutSubtitle: '19+ Years of Excellence in IT Solutions',
  aboutP1: 'Welcome to Shree Infotech, founded by visionary experts who have been delivering trusted IT solutions since 2005. We are Mundra\'s premier destination for comprehensive technology services, combining decades of hands-on experience with an unwavering commitment to quality.',
  aboutP2: 'Our journey started with a simple mission: to make technology reliable and accessible. Today, we stand proud as authorized partners for industry giants like ASUS and HAVCOM, specializing in everything from chip-level motherboard repairs to custom high-performance computer builds and enterprise networking solutions.',
  aboutP3: 'At Shree Infotech, we don\'t just sell products; we deliver peace of mind. Whether you need a critical data recovery, a fast laptop screen replacement, or a complete CCTV surveillance setup for your business, our experienced team ensures your technology works seamlessly for you.',
  productsTitle: 'Our Products',
  productsSubtitle: 'Premium technology solutions for every need',
  servicesTitle: 'Our Services',
  servicesSubtitle: 'Comprehensive IT solutions for businesses and individuals',
  videosTitle: 'Tech Insights & Repairs',
  videosSubtitle: 'Watch our expert technicians in action and learn more about technology.',
  certsTitle: 'Our Authorizations & Certificates',
  certsSubtitle: 'Certified and authorized partner for major technology brands.',
  brandsTitle: 'Brands We Deal In',
  brandsSubtitle: 'We provide sales and service for all major technology brands.',
  phoneNumber: '+91 9879713381',
  emailAddress: 'shreeinfo.mdr@gmail.com',
  workingHoursMorning: '10:30 AM - 1:30 PM',
  workingHoursEvening: '4:00 PM - 9:00 PM'
};

export default async function Home() {
  let content = defaultContent;
  try {
    const data = await kv.get<any>('site_content');
    if (data) content = { ...defaultContent, ...data };
  } catch (e) {
    // ignore
  }

  return (
    <>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Products content={content} />
        <Services content={content} />
        <Videos content={content} />
        <Gallery content={content} />
        <Certificates content={content} />
        <Brands content={content} />
        <InquiryForm content={content} />
        <Testimonials content={content} />
        <SocialLinks content={content} />
      </main>
      <Footer content={content} />
      <FloatingContact content={content} />
    </>
  );
}
