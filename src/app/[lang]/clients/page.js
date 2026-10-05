import Nav from '@/components/Nav';
import ClientsContent from '@/components/ClientsContent';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { clientsPageFor } from '@/lib/testimonials';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

const BASE = 'https://restos.uz';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  const C = clientsPageFor(lang);
  return pageMetadata({
    lang,
    path: '/clients',
    title: t.nav.clients,
    description: C.lede,
  });
}

export default function Clients({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;

  // Deliberately no Review / AggregateRating markup. These are testimonials we
  // publish about ourselves, and Google treats self-serving review markup on an
  // organization's own page as ineligible for rich results — emitting it risks
  // a manual action rather than a star rating. WebPage + BreadcrumbList is what
  // this page can honestly claim.
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${BASE}/${lang}/clients`,
        url: `${BASE}/${lang}/clients`,
        name: t.nav.clients,
        description: clientsPageFor(lang).lede,
        inLanguage: lang,
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/${lang}` },
          { '@type': 'ListItem', position: 2, name: t.nav.clients, item: `${BASE}/${lang}/clients` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Nav activePage="clients"/>
      <ClientsContent/>
      <CtaBand/>
      <Footer/>
    </>
  );
}
