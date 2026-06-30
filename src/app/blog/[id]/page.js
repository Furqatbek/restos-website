export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import db from '@/lib/db';
import { renderMarkdown } from '@/lib/markdown';

function getPost(id) {
  if (!/^\d+$/.test(String(id))) return null;
  return db.prepare("SELECT * FROM posts WHERE id = ? AND status = 'published'").get(id);
}

// Derive a ~155-char meta description so posts without an excerpt are never
// shipped description-less. Prefer the excerpt, fall back to plain-text body,
// then a generic category/title line.
function metaDescription(post) {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  if (post.body?.trim()) {
    const plain = post.body
      .replace(/[#>*`_~\-]/g, ' ')      // strip markdown markers
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> label
      .replace(/\s+/g, ' ')
      .trim();
    if (plain) return plain.length > 155 ? plain.slice(0, 152).trimEnd() + '…' : plain;
  }
  return [post.category, post.title].filter(Boolean).join(' — ') || post.title;
}

export function generateMetadata({ params }) {
  const post = getPost(params.id);
  if (!post) {
    return {
      title: 'Post not found',
      description: 'This article could not be found.',
      robots: { index: false, follow: false },
    };
  }
  const description = metaDescription(post);
  const ogImage = {
    url: `https://restos.uz/api/posts/${post.id}/og`,
    width: 1200,
    height: 630,
    alt: post.title,
  };
  return {
    title: post.title,
    description,
    alternates: { canonical: `https://restos.uz/blog/${post.id}` },
    openGraph: {
      type: 'article',
      url: `https://restos.uz/blog/${post.id}`,
      title: post.title,
      description,
      publishedTime: post.published_at || undefined,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getPost(params.id);
  if (!post) notFound();

  const bodyHtml = renderMarkdown(post.body);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: metaDescription(post),
    image: `https://restos.uz/api/posts/${post.id}/og`,
    inLanguage: post.lang || 'en',
    articleSection: post.category || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.published_at || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://restos.uz/blog/${post.id}` },
    author: { '@type': 'Organization', name: 'RestOS', url: 'https://restos.uz' },
    publisher: {
      '@type': 'Organization',
      name: 'RestOS',
      logo: { '@type': 'ImageObject', url: 'https://restos.uz/opengraph-image' },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.uz' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://restos.uz/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://restos.uz/blog/${post.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav activePage="blog"/>
      <article className="post-page">
        <div className="wrap post-wrap">
          <Link href="/blog" className="post-back">← All posts</Link>

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
        </div>
      </article>
      <Footer/>
    </>
  );
}
