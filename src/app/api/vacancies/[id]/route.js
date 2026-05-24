import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req, { params }) {
  const row = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(params.id);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req, { params }) {
  const existing = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const title = body.title?.trim() ?? existing.title;
  const department = body.department?.trim() ?? existing.department;
  const location = body.location?.trim() ?? existing.location;
  const description = body.description?.trim() ?? existing.description;
  const lang = body.lang ?? existing.lang;
  const status = body.status ?? existing.status;

  if (!['open', 'closed'].includes(status)) {
    return NextResponse.json({ error: 'status must be open or closed' }, { status: 400 });
  }

  db.prepare(
    'UPDATE vacancies SET title=?, department=?, location=?, description=?, lang=?, status=? WHERE id=?'
  ).run(title, department, location, description, lang, status, params.id);

  return NextResponse.json(db.prepare('SELECT * FROM vacancies WHERE id = ?').get(params.id));
}

export async function DELETE(req, { params }) {
  const existing = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  db.prepare('DELETE FROM vacancies WHERE id = ?').run(params.id);
  return NextResponse.json({ ok: true });
}
