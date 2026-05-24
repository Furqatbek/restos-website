import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const BASE = 'https://restos.uz';

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'RestOS — The operating system for modern hospitality',
    template: '%s | RestOS',
  },
  description:
    'One system. Twelve modules. Zero spreadsheets. RestOS handles POS, kitchen display, inventory, delivery, loyalty, finance, and more — all in one platform.',
  keywords: [
    'restaurant management system', 'POS software', 'hospitality OS',
    'restaurant ERP', 'kitchen display system', 'food delivery management',
    'inventory management restaurant', 'loyalty program restaurant',
  ],
  authors: [{ name: 'RestOS', url: BASE }],
  creator: 'RestOS',
  publisher: 'RestOS',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE },
  openGraph: {
    type: 'website',
    url: BASE,
    siteName: 'RestOS',
    title: 'RestOS — The operating system for modern hospitality',
    description:
      'One system. Twelve modules. Zero spreadsheets. Run your entire restaurant from one platform.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The operating system for modern hospitality',
    description:
      'One system. Twelve modules. Zero spreadsheets. Run your entire restaurant from one platform.',
    creator: '@restosapp',
  },
  icons: {
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%230f2d24'/><text x='32' y='48' font-family='Georgia,serif' font-style='italic' font-size='48' font-weight='400' text-anchor='middle' fill='%23e8b84d'>R</text></svg>",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'RestOS',
      url: BASE,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/opengraph-image`,
      },
      sameAs: [],
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
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free trial available',
      },
      publisher: { '@id': `${BASE}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* To add Google Analytics: replace XX-XXXXXXXXX with your G- measurement ID
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
        */}
      </head>
      <body style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
