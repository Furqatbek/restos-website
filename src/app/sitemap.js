import db from '@/lib/db';
import { LOCALES, DEFAULT_LOCALE, HTML_LANG, isLocale } from '@/lib/locale';
import { allLandingParams } from '@/lib/landing-pages';

const BASE = 'https://restos.uz';

// Cache the sitemap for an hour instead of rebuilding it on every crawl hit.
export const revalidate = 3600;

// hreflang alternates for a locale-less path.
function languagesFor(path) {
  const map = LOCALES.reduce((acc, l) => {
    acc[HTML_LANG[l]] = `${BASE}/${l}${path}`;
    return acc;
  }, {});
  map['x-default'] = `${BASE}/${DEFAULT_LOCALE}${path}`;
  return map;
}

export default function sitemap() {
  const staticPaths = [
    { path: '',         changeFrequency: 'weekly',  priority: 1.0 },
    { path: '/about',   changeFrequency: 'monthly', priority: 0.8 },
    { path: '/careers', changeFrequency: 'weekly',  priority: 0.7 },
    { path: '/blog',    changeFrequency: 'weekly',  priority: 0.9 },
  ];

  let latest = null;
  let postRoutes = [];
  try {
    const rows = db
      .prepare("SELECT id, slug, lang, published_at, created_at, updated_at FROM posts WHERE status = 'published'")
      .all();
    postRoutes = rows.map((p) => {
      const mod = new Date(p.updated_at || p.published_at || p.created_at);
      if (!latest || mod > latest) latest = mod;
      const l = isLocale(p.lang) ? p.lang : DEFAULT_LOCALE;
      return {
        url: `${BASE}/${l}/blog/${p.slug || p.id}`,
        lastModified: mod,
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });
  } catch (_) { /* db not ready — ship static routes only */ }

  const blogModified = latest || new Date();

  // One entry per (path × locale), each carrying the full hreflang set.
  const staticRoutes = staticPaths.flatMap((s) =>
    LOCALES.map((l) => ({
      url: `${BASE}/${l}${s.path}`,
      lastModified: s.path === '' || s.path === '/blog' ? blogModified : new Date(),
      changeFrequency: s.changeFrequency,
      priority: s.priority,
      alternates: { languages: languagesFor(s.path) },
    })),
  );

  // Keyword landing pages — single-language, self-canonical.
  const landingRoutes = allLandingParams().map(({ lang, slug }) => ({
    url: `${BASE}/${lang}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...landingRoutes, ...postRoutes];
}
