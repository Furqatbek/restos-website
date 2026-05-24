import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import LogoBand from '@/components/LogoBand';
import Stats from '@/components/Stats';
import ModulesShowcase from '@/components/ModulesShowcase';
import CaseStudy from '@/components/CaseStudy';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav activePage="home"/>
      <Hero/>
      <LogoBand/>
      <Stats/>
      <ModulesShowcase/>
      <CaseStudy/>
      <Pricing/>
      <FAQ/>
      <CtaBand/>
      <Footer/>
    </>
  );
}
