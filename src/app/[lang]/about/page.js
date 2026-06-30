import Nav from '@/components/Nav';
import AboutContent from '@/components/AboutContent';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  return pageMetadata({
    lang,
    path: '/about',
    title: t.nav.about,
    description:
      'Learn about RestOS — the team building the operating system for modern hospitality. Our mission, values, and story.',
  });
}

export default function About() {
  return (
    <>
      <Nav activePage="about"/>
      <AboutContent/>
      <Footer/>
    </>
  );
}
