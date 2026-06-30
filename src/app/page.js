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
import { FAQS } from '@/lib/faq';

export const metadata = {
  alternates: { canonical: 'https://restos.uz' },
  openGraph: {
    url: 'https://restos.uz',
    type: 'website',
  },
};

// FAQPage rich-result schema, built from the same Q&A the page renders.
// Google indexes the SSR (English) markup, so emit the English set.
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.en.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
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
