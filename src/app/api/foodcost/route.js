export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { notifyFoodCost } from '@/lib/telegram';

// Free food-cost analysis request — the site's primary conversion action.
// Phone is the only required field on purpose: every extra required field
// costs leads, and a phone number is enough to start the conversation.
const SYSTEMS = ['none', 'excel', 'iiko', 'r_keeper', 'soft24', 'pospoint', 'other'];

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { phone, venue, contact, venues_count, current_system, revenue_band, lang = 'uz', source } = body;

  const cleanPhone = String(phone || '').trim();
  // Uzbek numbers: +998 plus 9 digits. Accept spaces/dashes, store normalised.
  const digits = cleanPhone.replace(/\D/g, '');
  if (!/^998\d{9}$/.test(digits)) {
    return NextResponse.json(
      { error: 'a valid +998 phone number is required' },
      { status: 400 },
    );
  }
  const normalised = `+${digits}`;

  const system = SYSTEMS.includes(current_system) ? current_system : null;

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || null;
  const ua = req.headers.get('user-agent') || null;

  const lead = {
    phone: normalised,
    venue: venue?.trim() || null,
    contact: contact?.trim() || null,
    venues_count: venues_count?.trim() || null,
    current_system: system,
    revenue_band: revenue_band?.trim() || null,
    lang,
  };

  const result = db.prepare(
    `INSERT INTO foodcost_requests
       (phone, venue, contact, venues_count, current_system, revenue_band, lang, source, ip, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    lead.phone, lead.venue, lead.contact, lead.venues_count,
    lead.current_system, lead.revenue_band, lang, source || null, ip, ua,
  );

  // Fire-and-forget so a Telegram outage never costs us the lead.
  notifyFoodCost({ ...lead, source: source || null }).catch(() => {});

  return NextResponse.json({ ok: true, id: result.lastInsertRowid }, { status: 201 });
}

export async function GET() {
  const rows = db.prepare('SELECT * FROM foodcost_requests ORDER BY id DESC').all();
  return NextResponse.json(rows);
}
