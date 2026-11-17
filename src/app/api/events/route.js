export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/admin';
import db from '@/lib/db';

// Funnel events (see lib/track.js and components/FunnelTracker.jsx), plus the
// older ones whose rows are still in the table.
export const ALLOWED_TYPES = new Set([
  'page_view', 'section_view', 'scroll_depth', 'page_leave',
  'cta_click', 'contact_click', 'social_click',
  'form_open', 'form_start', 'form_field', 'form_error', 'form_close', 'generate_lead',
  'module_view', 'pricing_toggle', 'lang_change', 'filter_select',
  'demo_open', 'demo_close', 'foodcost_submit',
]);

// Event data is a handful of short fields; anything bigger is not ours.
const MAX_DATA = 1000;
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit/i;

export async function POST(req) {
  let payload;
  try { payload = await req.json(); } catch (_) { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const { event_type, data, lang = 'en', session_id } = payload || {};

  if (!event_type || !ALLOWED_TYPES.has(event_type)) {
    return NextResponse.json({ error: 'Invalid event_type' }, { status: 400 });
  }
  const dataJson = data != null ? JSON.stringify(data) : null;
  if (dataJson && dataJson.length > MAX_DATA) {
    return NextResponse.json({ error: 'data too large' }, { status: 413 });
  }
  // Crawlers that run JavaScript would otherwise count as visitors who left.
  if (BOT.test(req.headers.get('user-agent') || '')) {
    return NextResponse.json({ ok: true, skipped: 'bot' });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || null;

  const result = db
    .prepare('INSERT INTO events (event_type, data, lang, session_id, ip) VALUES (?, ?, ?, ?, ?)')
    .run(event_type, dataJson, String(lang).slice(0, 8), session_id ? String(session_id).slice(0, 64) : null, ip);

  return NextResponse.json({ ok: true, id: result.lastInsertRowid });
}

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
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
