export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { publishToTelegram } from '@/lib/telegram';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang');
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);

  let query = 'SELECT * FROM posts WHERE 1=1';
  const params = [];

  if (lang) { query += ' AND lang = ?'; params.push(lang); }
  if (status) { query += ' AND status = ?'; params.push(status); }
  if (featured !== null && featured !== undefined) { query += ' AND featured = ?'; params.push(featured === 'true' ? 1 : 0); }
  query += ' ORDER BY COALESCE(published_at, created_at) DESC LIMIT ?';
  params.push(limit);

  const rows = db.prepare(query).all(...params);
  return NextResponse.json(rows);
}

export async function POST(req) {
  const {
    title, excerpt, body, category, glyph = 'R', color = 'b1',
    read_time = 5, lang = 'en', featured = false,
    status = 'draft', published_at,
  } = await req.json();

  if (!title?.trim()) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  if (!['draft', 'published'].includes(status)) {
    return NextResponse.json({ error: 'status must be draft or published' }, { status: 400 });
  }

  const pubAt = status === 'published'
    ? (published_at || new Date().toISOString())
    : null;

  const result = db.prepare(
    `INSERT INTO posts (title, excerpt, body, category, glyph, color, read_time, lang, featured, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    title.trim(), excerpt?.trim() || null, body?.trim() || null, category?.trim() || null,
    glyph, color, read_time, lang, featured ? 1 : 0, status, pubAt
  );

  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);

  if (row.status === 'published') {
    publishToTelegram(row); // fire-and-forget; don't block response
  }

  return NextResponse.json(row, { status: 201 });
}
