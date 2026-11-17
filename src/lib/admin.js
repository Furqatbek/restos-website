import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

// Owner-only API access. Reading leads (names, phone numbers, IP addresses)
// and writing posts or vacancies require the ADMIN_TOKEN from .env.local.
//
// These endpoints used to answer anyone: /api/demos returned every lead to any
// browser. Fail closed — with no ADMIN_TOKEN configured nothing is admin.
//
// The token is accepted as `Authorization: Bearer <token>` (curl, scripts) or
// `?key=<token>` (so the owner can open a report in a browser).
export function isAdmin(req) {
  const expected = process.env.ADMIN_TOKEN || '';
  if (expected.length < 16 || !req) return false;

  let given = '';
  const auth = req.headers?.get?.('authorization') || '';
  if (auth.startsWith('Bearer ')) given = auth.slice(7).trim();
  if (!given) {
    try { given = new URL(req.url).searchParams.get('key') || ''; } catch (_) { /* no url */ }
  }

  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
