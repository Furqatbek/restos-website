export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { publishToTelegram } from '@/lib/telegram';

// Manually (re)post an existing post to the Telegram channel.
// Useful for posts that were published before Telegram was configured,
// since the auto-trigger only fires on the draft -> published transition.
export async function POST(req, { params }) {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id);
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (post.status !== 'published') {
    return NextResponse.json({ error: 'Post must be published first' }, { status: 400 });
  }

  await publishToTelegram(post);

  return NextResponse.json({
    ok: true,
    id: post.id,
    message: 'Telegram post triggered — check the channel (and server logs if it does not appear).',
  });
}
