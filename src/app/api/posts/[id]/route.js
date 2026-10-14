export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { publishToTelegram } from '@/lib/telegram';
import { slugify, uniqueSlug } from '@/lib/slugify';

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
  const meta_title = payload.meta_title?.trim() ?? existing.meta_title;
  const meta_description = payload.meta_description?.trim() ?? existing.meta_description;
  const keywords = payload.keywords?.trim() ?? existing.keywords;
  // Slug stays stable for SEO unless explicitly provided; keep existing otherwise.
  let slug = existing.slug;
  if (payload.slug?.trim()) {
    const wanted = slugify(payload.slug);
    if (wanted !== existing.slug) {
      const taken = db.prepare('SELECT 1 FROM posts WHERE slug = ? AND id != ?');
      slug = uniqueSlug(wanted, (s) => !!taken.get(s, params.id));
    }
  }

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
    `UPDATE posts SET title=?, slug=?, excerpt=?, body=?, category=?, glyph=?, color=?, read_time=?,
     lang=?, featured=?, status=?, meta_title=?, meta_description=?, keywords=?,
     published_at=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).run(title, slug, excerpt, body, category, glyph, color, read_time, lang, featured, status,
    meta_title, meta_description, keywords, published_at, params.id);

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
