import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/Providers';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import { LOCALES, DEFAULT_LOCALE, HTML_LANG, OG_LOCALE, isLocale } from '@/lib/locale';
import { offerLowPrice, offerHighPrice, priceRangeLabel, setupFeeSentence } from '@/lib/pricing';
import '../globals.css';
import { META_PIXEL_ID } from '@/lib/analytics-config';

const GA_ID = 'G-2992TGBM5Y';
// Meta pixel ID lives in lib/analytics-config.js (the privacy policy reads it too).
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
    authors: [{ name: 'RestOS', url: BASE }],
    creator: 'RestOS',
    publisher: 'RestOS',
    // Site-ownership verification. Set the env vars and redeploy — no code
    // change needed. Yandex matters as much as Google in this market.
    //   GOOGLE_SITE_VERIFICATION=...   (Search Console > HTML tag)
    //   YANDEX_VERIFICATION=...        (Yandex Webmaster > Meta tag)
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.YANDEX_VERIFICATION
        ? { yandex: process.env.YANDEX_VERIFICATION }
        : {}),
    },
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
    // The favicon comes from app/icon.svg, served at a real URL. Google cannot
    // show a data: URI in search results, so the old inline icon showed a globe.
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
      legalName: 'ISTIQLOL TECH MCHJ',
      // "restos" is also an ordinary word (French slang for restaurants, the
      // Restos du Cœur charity). Spelling out the variants people type helps
      // Google tie a search for the name to this company.
      alternateName: ['Restos', 'RestOS Uzbekistan', 'restos.uz'],
      url: BASE,
      description:
        'Restaurant and cafe management system from Tashkent, Uzbekistan: POS, kitchen display, inventory and food cost, delivery, payments, loyalty and finance.',
      foundingDate: '2026',
      foundingLocation: { '@type': 'Place', name: 'Tashkent, Uzbekistan' },
      founder: [
        { '@type': 'Person', name: 'Boris Vasylev', jobTitle: 'CEO' },
        { '@type': 'Person', name: 'Furqat Saydamadov', jobTitle: 'CTO' },
      ],
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 512, height: 512 },
      sameAs: ['https://instagram.com/restos.uz', 'https://t.me/restos_blog'],
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
      // Google takes the site name in results from here.
      name: 'RestOS',
      alternateName: ['Restos', 'restos.uz'],
      publisher: { '@id': `${BASE}/#organization` },
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
        lowPrice: offerLowPrice(),
        highPrice: offerHighPrice(),
        offerCount: '3',
        description: setupFeeSentence(),
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
      priceRange: priceRangeLabel(),
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
      sameAs: ['https://instagram.com/restos.uz', 'https://t.me/restos_blog'],
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
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
