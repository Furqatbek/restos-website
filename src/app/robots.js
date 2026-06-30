export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        // Allow the per-post OG image route so Google/social can fetch
        // card images; keep the rest of the API blocked.
        allow: ['/', '/api/posts/*/og'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://restos.uz/sitemap.xml',
  };
}
