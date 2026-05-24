export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const { email, lang = 'en' } = await req.json();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || null;

  try {
    const result = db
      .prepare('INSERT INTO newsletter (email, lang, ip) VALUES (?, ?, ?)')
      .run(email.toLowerCase().trim(), lang, ip);
    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    throw e;
  }
}

export async function GET() {
  const rows = db
    .prepare('SELECT * FROM newsletter ORDER BY id DESC')
    .all();
  return NextResponse.json(rows);
}
