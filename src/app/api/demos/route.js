import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { notifyLead } from '@/lib/telegram';

export async function POST(req) {
  const body = await req.json();
  const { name, phone, company, lang = 'en', source } = body;

  if (!name?.trim() || !phone?.trim() || !company?.trim()) {
    return NextResponse.json({ error: 'name, phone and company are required' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || null;
  const ua = req.headers.get('user-agent') || null;

  const result = db
    .prepare('INSERT INTO demo_requests (name, phone, company, lang, source, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(name.trim(), phone.trim(), company.trim(), lang, source || null, ip, ua);

  notifyLead({ name: name.trim(), phone: phone.trim(), company: company.trim(), lang, source: source || null }).catch(() => {});

  return NextResponse.json({ ok: true, id: result.lastInsertRowid });
}

export async function GET() {
  const rows = db
    .prepare('SELECT * FROM demo_requests ORDER BY id DESC')
    .all();
  return NextResponse.json(rows);
}
