export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/admin';
import db from '@/lib/db';

// The blog's email signup promised a monthly email that was never sent; it
// was replaced by a link to the Telegram channel. No new emails are taken.
// Rows already stored are deleted LEAD_RETENTION_MONTHS after signup
// (lib/retention.js), and the owner can still read them below.
export async function POST() {
  return NextResponse.json({ error: 'The newsletter is closed. Follow https://t.me/restos_blog' }, { status: 410 });
}

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const rows = db
    .prepare('SELECT * FROM newsletter ORDER BY id DESC')
    .all();
  return NextResponse.json(rows);
}
