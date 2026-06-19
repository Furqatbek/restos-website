export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { publishToTelegram } from '@/lib/telegram';

export async function GET(req, { params }) {
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req, { params }) {
  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const payload = await req.json();
  const title = payload.title?.trim() ?? existing.title;
  const excerpt = payload.excerpt?.trim() ?? existing.excerpt;
  const body = payload.body?.trim() ?? existing.body;
  const category = payload.category?.trim() ?? existing.category;
  const glyph = payload.glyph ?? existing.glyph;
  const color = payload.color ?? existing.color;
  const read_time = payload.read_time ?? existing.read_time;
  const lang = payload.lang ?? existing.lang;
  const featured = payload.featured !== undefined ? (payload.featured ? 1 : 0) : existing.featured;
  const status = payload.status ?? existing.status;

  if (!['draft', 'published'].includes(status)) {
    return NextResponse.json({ error: 'status must be draft or published' }, { status: 400 });
  }

  let published_at = existing.published_at;
  if (status === 'published' && !existing.published_at) {
    published_at = payload.published_at || new Date().toISOString();
  } else if (status === 'draft') {
    published_at = null;
  }

  db.prepare(
    `UPDATE posts SET title=?, excerpt=?, body=?, category=?, glyph=?, color=?, read_time=?,
     lang=?, featured=?, status=?, published_at=? WHERE id=?`
  ).run(title, excerpt, body, category, glyph, color, read_time, lang, featured, status, published_at, params.id);

  const updated = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id);

  // Trigger Telegram only when transitioning draft → published for the first time
  if (updated.status === 'published' && existing.status !== 'published') {
    publishToTelegram(updated); // fire-and-forget
  }

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  db.prepare('DELETE FROM posts WHERE id = ?').run(params.id);
  return NextResponse.json({ ok: true });
}
