import { LOCALES, DEFAULT_LOCALE, OG_LOCALE, isLocale } from '@/lib/locale';

const BASE = 'https://restos.uz';

// Build canonical + hreflang alternates + OG for a localized page.
// `path` is the locale-less path, e.g. '' (home), '/about', '/blog/5'.
export function pageMetadata({ lang, path = '', title, description, type = 'website', images }) {
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const languages = LOCALES.reduce(
    (acc, x) => { acc[ogToHreflang(x)] = `${BASE}/${x}${path}`; return acc; },
    { 'x-default': `${BASE}/${DEFAULT_LOCALE}${path}` },
  );
  const url = `${BASE}/${l}${path}`;
  // Without this every page shares the site-wide card. Generating one per page
  // means a shared link shows that page's own title.
  const ogImages = images || [
    {
      url: `${BASE}/api/og?${new URLSearchParams({
        title,
        excerpt: description || '',
        color: 'b1',
      })}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
  return {
    title,
    description,
    alternates: { canonical: url, languages, types: { 'application/rss+xml': `${BASE}/feed.xml` } },
    openGraph: {
      type,
      url,
      title,
      description,
      locale: OG_LOCALE[l] || 'en_US',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages,
    },
  };
}

// hreflang tags use BCP-47; mirror the HTML_LANG mapping for the segment keys.
function ogToHreflang(seg) {
  return seg === 'uz-cyr' ? 'uz-Cyrl' : seg;
}
