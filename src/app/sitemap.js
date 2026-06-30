import db from '@/lib/db';

const BASE = 'https://restos.uz';

// Cache the sitemap for an hour instead of rebuilding it on every crawl hit.
export const revalidate = 3600;

export default function sitemap() {
  // Newest published post drives the homepage/blog lastModified.
  let latest = null;
  let postRoutes = [];
  try {
    const posts = db
      .prepare("SELECT id, published_at, created_at, updated_at FROM posts WHERE status = 'published'")
      .all();
    postRoutes = posts.map(p => {
      const mod = new Date(p.updated_at || p.published_at || p.created_at);
      if (!latest || mod > latest) latest = mod;
      return {
        url: `${BASE}/blog/${p.id}`,
        lastModified: mod,
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });
  } catch (_) { /* db not ready — ship static routes only */ }

  const blogModified = latest || new Date();
  const staticRoutes = [
    { url: BASE,              lastModified: blogModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,   lastModified: new Date(),   changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/clients`, lastModified: new Date(),   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/careers`, lastModified: new Date(),   changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog`,    lastModified: blogModified, changeFrequency: 'weekly',  priority: 0.9 },
  ];

  return [...staticRoutes, ...postRoutes];
}
