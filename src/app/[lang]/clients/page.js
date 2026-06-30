import Nav from '@/components/Nav';
import ClientsContent from '@/components/ClientsContent';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  return pageMetadata({
    lang,
    path: '/clients',
    title: t.nav.clients,
    description:
      'Over 2,400 restaurants and hospitality venues trust RestOS. See how our clients cut costs, reduce waste, and grow revenue.',
  });
}

export default function Clients() {
  return (
    <>
      <Nav activePage="clients"/>
      <ClientsContent/>
      <Footer/>
    </>
  );
}
