import { NextResponse } from 'next/server';
import db from '@/lib/db';

const ALLOWED_TYPES = new Set([
  'demo_open',
  'demo_close',
  'module_view',
  'pricing_toggle',
  'lang_change',
  'filter_select',
]);

export async function POST(req) {
  const { event_type, data, lang = 'en', session_id } = await req.json();

  if (!event_type || !ALLOWED_TYPES.has(event_type)) {
    return NextResponse.json({ error: 'Invalid event_type' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || null;

  const result = db
    .prepare('INSERT INTO events (event_type, data, lang, session_id, ip) VALUES (?, ?, ?, ?, ?)')
    .run(event_type, data != null ? JSON.stringify(data) : null, lang, session_id || null, ip);

  return NextResponse.json({ ok: true, id: result.lastInsertRowid });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const limit = Math.min(parseInt(searchParams.get('limit') || '500'), 1000);

  const rows = type
    ? db.prepare('SELECT * FROM events WHERE event_type = ? ORDER BY id DESC LIMIT ?').all(type, limit)
    : db.prepare('SELECT * FROM events ORDER BY id DESC LIMIT ?').all(limit);

  return NextResponse.json(
    rows.map(r => ({ ...r, data: r.data ? JSON.parse(r.data) : null }))
  );
}
