export const dynamic = 'force-dynamic';
import db from '@/lib/db';
import { generatePostImage } from '@/lib/image-gen';

// Per-post Open Graph / social card image (1200x630 PNG).
// Reuses the same generator as the Telegram card.
export async function GET(req, { params }) {
  const post = db.prepare("SELECT * FROM posts WHERE id = ? AND status = 'published'").get(params.id);
  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const png = await generatePostImage(post);
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (err) {
    console.error('[og] failed to generate image for post', params.id, err);
    return new Response('Image generation failed', { status: 500 });
  }
}
