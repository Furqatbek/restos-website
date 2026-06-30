export const dynamic = 'force-dynamic';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import db from '@/lib/db';
import { renderMarkdown } from '@/lib/markdown';
import { localePath, isLocale, DEFAULT_LOCALE } from '@/lib/locale';
import { relatedLanding } from '@/lib/landing-pages';

const BASE = 'https://restos.uz';

// Look up by slug; also accept a numeric id for backward-compatible legacy
// links (/blog/5), which then redirect to the slug URL.
function getPost(param) {
  if (/^\d+$/.test(String(param))) {
    return db.prepare("SELECT * FROM posts WHERE id = ? AND status = 'published'").get(param);
  }
  return db.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'").get(param);
}

// A post exists in exactly one language; canonicalize every locale route to
// the post's own language URL to avoid duplicate content.
function canonicalLang(post) {
  return isLocale(post.lang) ? post.lang : DEFAULT_LOCALE;
}

function metaDescription(post) {
  if (post.meta_description?.trim()) return post.meta_description.trim();
  if (post.excerpt?.trim()) return post.excerpt.trim();
  if (post.body?.trim()) {
    const plain = post.body
      .replace(/[#>*`_~\-]/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    if (plain) return plain.length > 155 ? plain.slice(0, 152).trimEnd() + '…' : plain;
  }
  return [post.category, post.title].filter(Boolean).join(' — ') || post.title;
}

const RELATED_LABEL = {
  en: 'Related solution', ru: 'Решение по теме', uz: 'Mavzu bo‘yicha yechim',
  'uz-cyr': 'Мавзу бўйича ечим', kaa: 'Tegisli sheshim',
};

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) {
    return {
      title: 'Post not found',
      description: 'This article could not be found.',
      robots: { index: false, follow: false },
    };
  }
  const seoTitle = post.meta_title?.trim() || post.title;
  const description = metaDescription(post);
  const canonical = `${BASE}/${canonicalLang(post)}/blog/${post.slug}`;
  const ogImage = { url: `${BASE}/api/posts/${post.id}/og`, width: 1200, height: 630, alt: post.title };
  return {
    title: seoTitle,
    description,
    keywords: post.keywords ? post.keywords.split(',').map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: seoTitle,
      description,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: seoTitle, description, images: [ogImage] },
  };
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const routeLang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;

  // Legacy numeric link → redirect to the keyword slug URL (same browse locale).
  if (/^\d+$/.test(String(params.slug)) && post.slug) {
    redirect(localePath(routeLang, `/blog/${post.slug}`));
  }

  const cLang = canonicalLang(post);
  const canonical = `${BASE}/${cLang}/blog/${post.slug}`;
  const related = relatedLanding(cLang, post);

  const bodyHtml = renderMarkdown(post.body);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: metaDescription(post),
    image: `${BASE}/api/posts/${post.id}/og`,
    inLanguage: post.lang || 'en',
    articleSection: post.category || undefined,
    keywords: post.keywords || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: { '@type': 'Organization', name: 'RestOS', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'RestOS',
      logo: { '@type': 'ImageObject', url: `${BASE}/opengraph-image` },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/${cLang}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/${cLang}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav activePage="blog"/>
      <article className="post-page">
        <div className="wrap post-wrap">
          <Link href={localePath(routeLang, '/blog')} className="post-back">← All posts</Link>

          <header className="post-header">
            {post.category && <div className="post-cat">{post.category}</div>}
            <h1>{post.title}</h1>
            {post.excerpt && <p className="post-lede">{post.excerpt}</p>}
            <div className="post-meta">
              {date && <span>{date}</span>}
              {date && <span className="post-dot">·</span>}
              <span>{post.read_time} min read</span>
            </div>
          </header>

          <div className={`post-cover ${post.color}`}>
            <div className="glyph">{post.glyph}</div>
          </div>

          {bodyHtml ? (
            <div className="post-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          ) : (
            <div className="post-body"><p>{post.excerpt}</p></div>
          )}

          {related && (
            <Link className="post-related" href={localePath(cLang, `/${related.slug}`)}>
              <span className="post-related-label">{RELATED_LABEL[cLang] || RELATED_LABEL.en}</span>
              <span className="post-related-title">{related.h1} →</span>
            </Link>
          )}
        </div>
      </article>
      <Footer/>
    </>
  );
}
