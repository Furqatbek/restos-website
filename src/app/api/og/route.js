export const dynamic = 'force-dynamic';
import { generatePostImage } from '@/lib/image-gen';

// Parameterised 1200x630 social card for pages that are not blog posts
// (landing pages, About, Clients, ...). Reuses the blog-card renderer, which
// bundles a Cyrillic-capable font — the edge ImageResponse default does not,
// so Russian/Uzbek titles would render as empty boxes there.
//
// /api/og?title=...&excerpt=...&category=...&glyph=R&color=b1
const COLORS = new Set(['b1', 'b2', 'b3', 'b4', 'b5', 'b6']);
const clamp = (s, n) => (s ? String(s).slice(0, n) : '');

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = clamp(searchParams.get('title'), 120) || 'RestOS';
  const color = searchParams.get('color');

  const card = {
    title,
    excerpt: clamp(searchParams.get('excerpt'), 200) || null,
    category: clamp(searchParams.get('category'), 40) || null,
    glyph: clamp(searchParams.get('glyph'), 2) || 'R',
    color: COLORS.has(color) ? color : 'b1',
    read_time: null,
  };

  try {
    const png = await generatePostImage(card);
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        // Deterministic for a given query, so cache it hard.
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
      },
    });
  } catch (err) {
    console.error('[og] render failed', err);
    return new Response('Image generation failed', { status: 500 });
  }
}
