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

  const body = await req.json();
  const title = body.title?.trim() ?? existing.title;
  const excerpt = body.excerpt?.trim() ?? existing.excerpt;
  const category = body.category?.trim() ?? existing.category;
  const glyph = body.glyph ?? existing.glyph;
  const color = body.color ?? existing.color;
  const read_time = body.read_time ?? existing.read_time;
  const lang = body.lang ?? existing.lang;
  const featured = body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured;
  const status = body.status ?? existing.status;

  if (!['draft', 'published'].includes(status)) {
    return NextResponse.json({ error: 'status must be draft or published' }, { status: 400 });
  }

  let published_at = existing.published_at;
  if (status === 'published' && !existing.published_at) {
    published_at = body.published_at || new Date().toISOString();
  } else if (status === 'draft') {
    published_at = null;
  }

  db.prepare(
    `UPDATE posts SET title=?, excerpt=?, category=?, glyph=?, color=?, read_time=?,
     lang=?, featured=?, status=?, published_at=? WHERE id=?`
  ).run(title, excerpt, category, glyph, color, read_time, lang, featured, status, published_at, params.id);

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
