export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/admin';
import { listLeads, updateLead, deleteLead, addManualLead } from '@/lib/leads';
import { renderBoard } from '@/lib/leadsBoard';

// Owner's lead board. Open in a browser:
//   https://restos.uz/api/leads?key=ADMIN_TOKEN        (&lang=ru|en, &format=json)
// The page itself calls PATCH / POST / DELETE here with the same key.

export function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const { searchParams } = new URL(req.url);
  const leads = listLeads();
  if (searchParams.get('format') === 'json') return NextResponse.json(leads);

  const lang = ['uz', 'ru', 'en'].includes(searchParams.get('lang')) ? searchParams.get('lang') : 'uz';
  const langLink = (l) => { const q = new URLSearchParams(searchParams); q.set('lang', l); return `?${q}`; };
  return new NextResponse(renderBoard(leads, lang, langLink), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      // The page's own script and styles only; nothing from elsewhere.
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}

async function body(req) {
  try { return await req.json(); } catch (_) { return {}; }
}

function fail(err) {
  return NextResponse.json({ error: err.message || 'error' }, { status: err.status || 500 });
}

// Move a lead to another column and/or save its note.
export async function PATCH(req) {
  if (!isAdmin(req)) return unauthorized();
  const { table, id, status, notes } = await body(req);
  try {
    const ok = updateLead(table, Number(id), { status, notes });
    return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (err) { return fail(err); }
}

// Add a lead that did not come through the site.
export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const id = addManualLead(await body(req));
    return NextResponse.json({ ok: true, table: 'foodcost', id }, { status: 201 });
  } catch (err) { return fail(err); }
}

// Delete a lead for good (a deletion request, or junk).
export async function DELETE(req) {
  if (!isAdmin(req)) return unauthorized();
  const { table, id } = await body(req);
  try {
    return deleteLead(table, Number(id)) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (err) { return fail(err); }
}
