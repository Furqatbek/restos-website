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
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;
  return pageMetadata({
    lang,
    path: '',
    title: t.siteTitle || I18N.en.siteTitle,
    description: `${t.hero?.subtitle || ''} ${L.footer?.tagline || ''}`.trim(),
  });
}

// FAQPage rich-result schema, built from the same Q&A the page renders,
// in the locale of the current route (each /[lang] URL is indexed separately).
function faqJsonLd(lang) {
  const list = FAQS[lang] || FAQS.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export default function Home({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)) }}
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
