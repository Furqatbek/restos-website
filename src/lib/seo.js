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
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      title,
      description,
      locale: OG_LOCALE[l] || 'en_US',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

// hreflang tags use BCP-47; mirror the HTML_LANG mapping for the segment keys.
function ogToHreflang(seg) {
  return seg === 'uz-cyr' ? 'uz-Cyrl' : seg;
}
