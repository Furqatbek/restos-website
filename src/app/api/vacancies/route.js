export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/admin';
import db from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang');
  // Closed and draft vacancies are the owner's; the public sees open ones.
  const status = isAdmin(req) ? searchParams.get('status') : 'open';

  let query = 'SELECT * FROM vacancies WHERE 1=1';
  const params = [];

  if (lang) { query += ' AND lang = ?'; params.push(lang); }
  if (status) { query += ' AND status = ?'; params.push(status); }
  query += ' ORDER BY id DESC';

  const rows = db.prepare(query).all(...params);
  return NextResponse.json(rows);
}

export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();
  const { title, department, location, description, lang = 'en', status = 'open' } = await req.json();

  if (!title?.trim() || !department?.trim() || !location?.trim()) {
    return NextResponse.json({ error: 'title, department and location are required' }, { status: 400 });
  }
  if (!['open', 'closed'].includes(status)) {
    return NextResponse.json({ error: 'status must be open or closed' }, { status: 400 });
  }

  const result = db
    .prepare('INSERT INTO vacancies (title, department, location, description, lang, status) VALUES (?, ?, ?, ?, ?, ?)')
    .run(title.trim(), department.trim(), location.trim(), description?.trim() || null, lang, status);

  const row = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
