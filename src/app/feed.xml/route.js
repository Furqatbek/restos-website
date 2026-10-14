import db from '@/lib/db';
import { DEFAULT_LOCALE, isLocale, HTML_LANG } from '@/lib/locale';

const BASE = 'https://restos.uz';

export const revalidate = 3600;

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// One feed for every language. Each item carries its own language and a
// canonical link into the right locale, so readers and aggregators can filter.
export function GET() {
  let items = [];
  try {
    items = db
      .prepare(
        `SELECT id, title, slug, lang, excerpt, category, published_at, created_at, updated_at
         FROM posts
         WHERE status = 'published' AND slug IS NOT NULL
         ORDER BY COALESCE(published_at, created_at) DESC
         LIMIT 50`
      )
      .all();
  } catch (_) { /* db not ready — ship an empty feed rather than a 500 */ }

  const entries = items.map((p) => {
    const lang = isLocale(p.lang) ? p.lang : DEFAULT_LOCALE;
    const link = `${BASE}/${lang}/blog/${p.slug}`;
    const date = new Date(p.published_at || p.created_at).toUTCString();
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${date}</pubDate>
      <dc:language>${esc(HTML_LANG[lang] || 'en')}</dc:language>${
        p.category ? `\n      <category>${esc(p.category)}</category>` : ''
      }
      <description>${esc(p.excerpt || p.title)}</description>
      <enclosure url="${esc(`${BASE}/api/posts/${p.id}/og`)}" type="image/png"/>
    </item>`;
  });

  const latest = items[0];
  const lastBuild = new Date(
    latest ? (latest.updated_at || latest.published_at || latest.created_at) : Date.now()
  ).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>RestOS Blog</title>
    <link>${BASE}/en/blog</link>
    <description>Operations guides for restaurants and cafes: POS, inventory and food cost, delivery, loyalty and finance.</description>
    <language>ru</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${entries.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
