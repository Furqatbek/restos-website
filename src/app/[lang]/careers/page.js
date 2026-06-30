import Nav from '@/components/Nav';
import CareersContent from '@/components/CareersContent';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  return pageMetadata({
    lang,
    path: '/careers',
    title: t.nav.vacancy,
    description:
      'Join the team building the future of restaurant technology. Open roles at RestOS in engineering, product, and sales.',
  });
}

export default function Careers() {
  return (
    <>
      <Nav activePage="vacancy"/>
      <CareersContent/>
      <Footer/>
    </>
  );
}
