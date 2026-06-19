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

export function generateMetadata({ params }) {
  const post = getPost(params.id);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `https://restos.uz/blog/${post.id}` },
    openGraph: {
      type: 'article',
      url: `https://restos.uz/blog/${post.id}`,
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.published_at || undefined,
    },
    twitter: { title: post.title, description: post.excerpt || undefined },
  };
}

export default function BlogPost({ params }) {
  const post = getPost(params.id);
  if (!post) notFound();

  const bodyHtml = renderMarkdown(post.body);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
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
