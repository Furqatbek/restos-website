import Nav from '@/components/Nav';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';
import db from '@/lib/db';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

const BASE = 'https://restos.uz';

// Rebuild hourly so newly published posts show up in the listing schema
// without making every request hit the database.
export const revalidate = 3600;

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  return pageMetadata({
    lang,
    path: '/blog',
    title: t.nav.blog,
    description:
      'Insights on restaurant operations, hospitality technology, and the business of food service from the RestOS team.',
  });
}

// The listing itself is rendered client-side, so the crawler-facing summary of
// "what is on this page" has to come from structured data.
function listingPosts(lang) {
  try {
    return db
      .prepare(
        `SELECT title, slug, published_at, created_at FROM posts
         WHERE status = 'published' AND lang = ? AND slug IS NOT NULL
         ORDER BY COALESCE(published_at, created_at) DESC LIMIT 25`
      )
      .all(lang);
  } catch (_) {
    return [];
  }
}

export default function Blog({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const posts = listingPosts(lang);

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE}/${lang}/blog#blog`,
    name: 'RestOS Blog',
    url: `${BASE}/${lang}/blog`,
    inLanguage: lang,
    publisher: { '@id': `${BASE}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BASE}/${lang}/blog/${p.slug}`,
      datePublished: p.published_at || p.created_at || undefined,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/${lang}/blog` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav activePage="blog"/>
      <BlogContent/>
      <Footer/>
    </>
  );
}
