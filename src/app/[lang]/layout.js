import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/Providers';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import { LOCALES, DEFAULT_LOCALE, HTML_LANG, OG_LOCALE, isLocale } from '@/lib/locale';
import '../globals.css';

const GA_ID = 'G-2992TGBM5Y';
const BASE = 'https://restos.uz';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'],
  variable: '--font-serif', display: 'swap',
});
const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// hreflang map: BCP-47 tag -> localized URL, plus x-default.
const languageAlternates = LOCALES.reduce(
  (acc, l) => { acc[HTML_LANG[l]] = `${BASE}/${l}`; return acc; },
  { 'x-default': `${BASE}/${DEFAULT_LOCALE}` },
);

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;
  const title = t.siteTitle || I18N.en.siteTitle;
  const description = `${t.hero?.subtitle || ''} ${L.footer?.tagline || ''}`.trim();

  return {
    metadataBase: new URL(BASE),
    title: { default: title, template: '%s | RestOS' },
    description,
    keywords: [
      'restaurant management system', 'POS software', 'hospitality OS',
      'restaurant ERP', 'kitchen display system', 'food delivery management',
      'inventory management restaurant', 'loyalty program restaurant',
      'автоматизация ресторана', 'POS система для кафе', 'программа для ресторана',
      'система учета для ресторана', 'программа для кафе', 'учет в общепите',
      'программа лояльности для ресторана', 'автоматизация общепита',
      'restoran avtomatizatsiyasi', 'kafe uchun dastur', 'restoran uchun POS',
      'restoran boshqaruv tizimi', 'oshxona uchun dastur',
      'автоматизация ресторана Узбекистан', 'POS система Ташкент',
    ],
    authors: [{ name: 'RestOS', url: BASE }],
    creator: 'RestOS',
    publisher: 'RestOS',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        // Let Google show full text/video snippets and large image previews —
        // the defaults are conservative and shrink your search appearance.
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: languageAlternates,
      types: { 'application/rss+xml': `${BASE}/feed.xml` },
    },
    openGraph: {
      type: 'website',
      url: `${BASE}/${lang}`,
      siteName: 'RestOS',
      title,
      description,
      locale: OG_LOCALE[lang] || 'en_US',
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@restosapp',
    },
    icons: {
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%230f2d24'/><text x='32' y='48' font-family='Georgia,serif' font-style='italic' font-size='48' font-weight='400' text-anchor='middle' fill='%23e8b84d'>R</text></svg>",
    },
  };
}

// Next 14 wants theme-color / viewport in their own export.
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0f2d24' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'RestOS',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/opengraph-image` },
      sameAs: ['https://instagram.com/restos.uz', 'https://t.me/restos'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+998941143232',
        contactType: 'sales',
        areaServed: 'UZ',
        availableLanguage: ['ru', 'uz', 'en'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'RestOS',
      publisher: { '@id': `${BASE}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE}/#software`,
      name: 'RestOS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description:
        'Restaurant management platform with POS, kitchen display, inventory, delivery, loyalty, and finance modules.',
      url: BASE,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'UZS',
        lowPrice: '280000',
        highPrice: '600000',
        offerCount: '3',
        description: 'Per venue, per month. Free trial available; custom pricing for groups.',
      },
      publisher: { '@id': `${BASE}/#organization` },
    },
    {
      // Local-SEO node — helps eligibility for the map pack on local searches.
      // TODO: fill in streetAddress and geo coordinates with the real office
      // location, then mirror the SAME name/phone/address on the Google &
      // Yandex Business profiles (NAP consistency is what local ranking checks).
      '@type': 'LocalBusiness',
      '@id': `${BASE}/#localbusiness`,
      name: 'RestOS',
      url: BASE,
      telephone: '+998941143232',
      priceRange: 'UZS 280000–600000 / mo',
      image: `${BASE}/opengraph-image`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tashkent',
        addressCountry: 'UZ',
        // streetAddress: '…',  // <- add the real street address
      },
      areaServed: [
        { '@type': 'Country', name: 'Uzbekistan' },
        { '@type': 'City', name: 'Tashkent' },
      ],
      sameAs: ['https://instagram.com/restos.uz', 'https://t.me/restos'],
      parentOrganization: { '@id': `${BASE}/#organization` },
    },
  ],
};

export default function RootLayout({ children, params }) {
  if (!isLocale(params.lang)) notFound();
  const htmlLang = HTML_LANG[params.lang] || 'en';

  return (
    <html lang={htmlLang} className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
        <Providers initialLang={params.lang}>
          {children}
        </Providers>
        {/* Google Analytics — loaded after the page is interactive so it
            doesn't block render / hurt Core Web Vitals */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
