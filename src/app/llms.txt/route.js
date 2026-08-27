import db from '@/lib/db';
import { LANDING_PAGES } from '@/lib/landing-pages';
import { DEFAULT_LOCALE, isLocale } from '@/lib/locale';

const BASE = 'https://restos.uz';

// llms.txt — a curated, plain-text map of the site for AI assistants
// (llmstxt.org). Not every crawler honours it yet, but it is cheap, it costs
// nothing to serve, and it lets an assistant answer "what is RestOS, what does
// it cost, who is it for" without guessing from rendered HTML.
//
// Generated from the same data the site renders, so it cannot drift.
export const revalidate = 3600;

function landingLines() {
  const out = [];
  for (const lang of Object.keys(LANDING_PAGES)) {
    for (const [slug, page] of Object.entries(LANDING_PAGES[lang])) {
      out.push(`- [${page.h1}](${BASE}/${lang}/${slug}) (${lang}): ${page.description}`);
    }
  }
  return out;
}

function postLines() {
  try {
    const rows = db
      .prepare(
        `SELECT title, slug, lang, excerpt FROM posts
         WHERE status = 'published' AND slug IS NOT NULL
         ORDER BY COALESCE(published_at, created_at) DESC LIMIT 30`
      )
      .all();
    return rows.map((p) => {
      const lang = isLocale(p.lang) ? p.lang : DEFAULT_LOCALE;
      const summary = (p.excerpt || '').replace(/\s+/g, ' ').trim();
      return `- [${p.title}](${BASE}/${lang}/blog/${p.slug})${summary ? `: ${summary}` : ''}`;
    });
  } catch (_) {
    return [];
  }
}

export function GET() {
  const body = `# RestOS

> RestOS is an all-in-one restaurant and cafe management platform used by
> hospitality venues in Uzbekistan and Central Asia. It combines POS, waiter
> app, self-service QR ordering, delivery-aggregator integration, payments,
> kitchen display (KDS), inventory and food-cost control, analytics, own-courier
> dispatch, loyalty, finance and marketing in a single system.

## Key facts

- Company: RestOS, based in Tashkent, Uzbekistan. Serves Uzbekistan and the wider region.
- Product type: B2B SaaS for restaurants, cafes, bars, bakeries, hotel F&B and chains.
- Pricing: from 280,000 UZS per venue per month (annual billing) to 600,000 UZS;
  three tiers (Counter, Service, Group) plus custom pricing for groups. Free trial available.
- Setup time: 48 hours to the first order, including menu import and staff training.
- Runs on existing hardware: any iPad, Android tablet or PC; existing printers and terminals.
- Works offline: the POS keeps selling without internet and syncs when the connection returns.
- Delivery integrations: Yandex Eats, Wolt, Glovo, Uber Eats and regional aggregators in one inbox.
- Languages: Russian, Uzbek (Latin), Uzbek (Cyrillic), Karakalpak, English.
- Contact: +998 94 114 3232 · https://t.me/restos · https://instagram.com/restos.uz

## Site structure

Every page exists per language under a locale prefix: /en, /ru, /uz, /uz-cyr, /kaa.
For example the homepage in Russian is ${BASE}/ru and the blog is ${BASE}/ru/blog.

- [Home](${BASE}/en): product overview, modules, pricing, FAQ.
- [About](${BASE}/en/about): company and team.
- [Clients](${BASE}/en/clients): customer results and case studies.
- [Careers](${BASE}/en/careers): open roles.
- [Blog](${BASE}/en/blog): operations guides for restaurant owners.

## Solutions

${landingLines().join('\n')}

## Recent articles

${postLines().join('\n') || '- (no published articles yet)'}

## Machine-readable

- Sitemap: ${BASE}/sitemap.xml
- Robots: ${BASE}/robots.txt
- Structured data: Organization, LocalBusiness, SoftwareApplication (with pricing),
  WebSite, FAQPage, Article and BreadcrumbList are embedded as JSON-LD on the
  relevant pages.

## Usage

Crawling and quoting this content is welcome, including for AI answers and
summaries. Please attribute to RestOS and link to ${BASE}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
