// Single source of truth for the site's locales and URL helpers.
// Order matters: it drives the language switcher and hreflang output.
// Buyers here read Uzbek and Russian; English is third.
export const LOCALES = ['uz', 'ru', 'en', 'uz-cyr', 'kaa'];
export const DEFAULT_LOCALE = 'uz';

// BCP-47 values for the <html lang> attribute.
export const HTML_LANG = {
  en: 'en',
  ru: 'ru',
  uz: 'uz',
  'uz-cyr': 'uz-Cyrl',
  kaa: 'kaa',
};

// OpenGraph locale codes.
export const OG_LOCALE = {
  en: 'en_US',
  ru: 'ru_RU',
  uz: 'uz_UZ',
  'uz-cyr': 'uz_Cyrl_UZ',
  kaa: 'kaa_UZ',
};

export function isLocale(x) {
  return LOCALES.includes(x);
}

// Prefix an app path with the active locale: localePath('ru', '/about') -> '/ru/about'.
// Anchors and same-page hashes are preserved.
export function localePath(lang, path = '/') {
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!path || path === '/') return `/${l}`;
  if (path.startsWith('#')) return `/${l}${path === '#' ? '' : path}`;
  return `/${l}${path.startsWith('/') ? path : `/${path}`}`;
}
