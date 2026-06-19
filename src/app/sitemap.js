import db from '@/lib/db';

const BASE = 'https://restos.uz';

export const dynamic = 'force-dynamic';

export default function sitemap() {
  const staticRoutes = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/clients`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/careers`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  ];

  let postRoutes = [];
  try {
    const posts = db.prepare("SELECT id, published_at, created_at FROM posts WHERE status = 'published'").all();
    postRoutes = posts.map(p => ({
      url: `${BASE}/blog/${p.id}`,
      lastModified: new Date(p.published_at || p.created_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (_) { /* db not ready — ship static routes only */ }

  return [...staticRoutes, ...postRoutes];
}
