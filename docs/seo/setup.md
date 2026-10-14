# SEO — deployment & setup checklist

Things that live outside the code, or that need a value set at deploy time.
Do these once; everything else in the site is automatic.

---

## 1. Verify the site (Google + Yandex)

Both verification tags are env-driven. **They must be set at BUILD time**, not
just at runtime — the pages are statically generated, so `generateMetadata`
runs during `next build`.

```bash
# .env (read by docker compose / next build)
GOOGLE_SITE_VERIFICATION=<token from Search Console > HTML tag>
YANDEX_VERIFICATION=<token from Yandex Webmaster > Meta tag>
```

Then rebuild:

```bash
cd /opt/restos && git pull && docker compose up -d --build
```

Confirm:

```bash
curl -s https://restos.uz/ru | grep -o '<meta name="[a-z-]*verification"[^>]*>'
```

> **Do not skip Yandex.** In Uzbekistan it carries a large share of search,
> and Yandex Webmaster is the equivalent of Search Console for that traffic.

## 2. Submit sitemaps

- Google Search Console → Sitemaps → submit `https://restos.uz/sitemap.xml`
- Yandex Webmaster → Indexing → Sitemap files → same URL

The sitemap covers every locale URL, all landing pages, and all published
posts, with hreflang alternates. It regenerates hourly.

## 3. Local presence (required for map-pack results)

Organic pages alone cannot rank in the local/map pack. Create both profiles:

- **Google Business Profile** — business.google.com
- **Yandex Business** — yandex.com/business

Use the **exact same** name, address and phone as the `LocalBusiness` JSON-LD
in `src/app/[lang]/layout.js` (NAP consistency is what local ranking checks).
While you are there, fill in the real street address and geo coordinates in
that file — they are currently marked `TODO`.

## 4. Check the edge is not blocking AI crawlers

`robots.txt` explicitly welcomes AI crawlers, but a CDN can override that
before a request ever reaches the app. Cloudflare's "Block AI Scrapers and
Crawlers" toggle is the usual culprit.

```bash
curl -sI -A "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)" \
  https://restos.uz/en | head -1
```

`200` = fine. `403` = fix it in Cloudflare → Security → Bots.

## 5. Post-deploy smoke test

```bash
# AI + search crawler policy (expect ~25 user-agent groups)
curl -s https://restos.uz/robots.txt | grep -c '^User-Agent:'

# AI-facing site brief
curl -s https://restos.uz/llms.txt | head -20

# Feed
curl -s https://restos.uz/feed.xml | grep -c '<item>'

# Blog links present WITHOUT JavaScript (this is what AI crawlers see)
curl -s https://restos.uz/ru/blog | grep -o 'href="/ru/blog/[a-z0-9-]*"' | sort -u

# hreflang between the RU and UZ versions of a landing page
curl -s https://restos.uz/ru/pos-sistema-dlya-kafe-i-restoranov | grep -o 'hrefLang="[a-z-]*"'
```

## 6. Validate structured data

- Rich Results Test — https://search.google.com/test/rich-results
- Schema validator — https://validator.schema.org

Expected: `Organization`, `LocalBusiness`, `SoftwareApplication`, `WebSite` on
every page; `FAQPage` on the home and landing pages; `Service` +
`BreadcrumbList` on landing pages; `Article` + `BreadcrumbList` on posts;
`Blog` + `BlogPosting` on the blog listing.

---

## Notes for future work

- **Sitemap image entries** are not emitted: the `images` field on sitemap
  entries requires Next 15; on 14.2 it is silently dropped. Revisit after a
  Next upgrade, or write a custom image-sitemap route — low priority while the
  images are generated title cards rather than real photography.
- **The blog listing is server-rendered.** Keep it that way. If it ever goes
  back to a client-side `fetch`, every post link disappears from the HTML and
  AI crawlers (which do not run JavaScript) stop seeing the blog entirely.
- **The locale redirect is a 307 on purpose.** Its target depends on
  cookie/`Accept-Language`; a permanent redirect would cache a language the
  visitor cannot escape.
