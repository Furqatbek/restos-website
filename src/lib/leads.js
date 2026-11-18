import db from '@/lib/db';
import { LEAD_RETENTION_MONTHS } from '@/lib/privacy';

// The lead board (/api/leads): every request from the site's forms, plus leads
// the owner adds by hand (Instagram lead forms, phone calls), on one board.
//
// Leads live where the forms already put them: demo_requests (demo form) and
// foodcost_requests (food-cost form, the help card, and manual leads). Each
// row carries status, notes and status_at (lib/db.js). They are deleted
// LEAD_RETENTION_MONTHS after they arrived (lib/retention.js) — won clients
// included; the owner copies those to their client list.

export const STATUSES = ['new', 'no_answer', 'offer', 'won', 'lost'];
const TABLE = { demo: 'demo_requests', foodcost: 'foodcost_requests' };

// "form=help; cta=help_card; from=instagram/paid/launch; landing=/uz"
export function parseSource(source) {
  const out = {};
  for (const part of String(source || '').split(';')) {
    const [k, ...v] = part.split('=');
    if (k && v.length) out[k.trim()] = v.join('=').trim();
  }
  return out;
}

// Which form a food-cost row really came from.
function kindOf(table, src) {
  if (table === 'demo_requests') return 'demo';
  if (src.form === 'help') return 'help';
  if (src.form === 'manual') return 'manual';
  return 'foodcost';
}

export function listLeads() {
  const demo = db.prepare(`SELECT id, name, phone, company, lang, source, status, notes, status_at, created_at
                           FROM demo_requests ORDER BY id DESC`).all();
  const food = db.prepare(`SELECT id, phone, venue, contact, venues_count, current_system, revenue_band, lang, source, status, notes, status_at, created_at
                           FROM foodcost_requests ORDER BY id DESC`).all();
  const rows = [
    ...demo.map((r) => ({ table: 'demo', ...r, name: r.name, venue: r.company })),
    ...food.map((r) => ({ table: 'foodcost', ...r, name: r.contact })),
  ].map((r) => {
    const src = parseSource(r.source);
    return {
      key: `${r.table}:${r.id}`,
      table: r.table,
      id: r.id,
      kind: kindOf(TABLE[r.table], src),
      name: r.name || '',
      phone: r.phone,
      venue: r.venue || '',
      venuesCount: r.venues_count && r.venues_count !== '1' ? r.venues_count : '',
      currentSystem: r.current_system || '',
      revenueBand: r.revenue_band || '',
      lang: r.lang,
      cta: src.cta || '',
      from: src.from || (src.form === 'manual' ? src.via || 'manual' : ''),
      landing: src.landing || '',
      status: STATUSES.includes(r.status) ? r.status : 'new',
      notes: r.notes || '',
      createdAt: r.created_at,
      statusAt: r.status_at,
      deletesOn: addMonths(r.created_at, LEAD_RETENTION_MONTHS),
    };
  });
  return rows.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function addMonths(sqliteDate, months) {
  const d = new Date(String(sqliteDate).replace(' ', 'T') + 'Z');
  if (Number.isNaN(d.getTime())) return null;
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}

function tableFor(table) {
  const t = TABLE[table];
  if (!t) throw Object.assign(new Error('unknown lead table'), { status: 400 });
  return t;
}

export function updateLead(table, id, { status, notes }) {
  const t = tableFor(table);
  const row = db.prepare(`SELECT id FROM ${t} WHERE id = ?`).get(id);
  if (!row) return null;
  if (status !== undefined) {
    if (!STATUSES.includes(status)) throw Object.assign(new Error('unknown status'), { status: 400 });
    db.prepare(`UPDATE ${t} SET status = ?, status_at = CURRENT_TIMESTAMP WHERE id = ?`).run(status, id);
  }
  if (notes !== undefined) {
    db.prepare(`UPDATE ${t} SET notes = ? WHERE id = ?`).run(String(notes).slice(0, 4000), id);
  }
  return true;
}

// For deletion requests under the privacy policy, and for junk.
export function deleteLead(table, id) {
  return db.prepare(`DELETE FROM ${tableFor(table)} WHERE id = ?`).run(id).changes > 0;
}

// A lead that did not come through the site: an Instagram lead form, a call.
// Stored with the food-cost rows (phone required, the rest optional) and
// marked form=manual so it shows as such and sends no Telegram alert.
export function addManualLead({ name, phone, venue, via, notes }) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!/^998\d{9}$/.test(digits)) throw Object.assign(new Error('a valid +998 phone number is required'), { status: 400 });
  const source = `form=manual; via=${String(via || 'other').replace(/[;=]/g, ' ').trim().slice(0, 40) || 'other'}`;
  const r = db.prepare(`INSERT INTO foodcost_requests (phone, venue, contact, lang, source, notes)
                        VALUES (?, ?, ?, 'uz', ?, ?)`)
    .run(`+${digits}`, String(venue || '').trim().slice(0, 200) || null, String(name || '').trim().slice(0, 200) || null, source, String(notes || '').slice(0, 4000) || null);
  return r.lastInsertRowid;
}

// Won / lost / open leads per ad source, for the funnel report.
export function outcomesBySource(sinceDays) {
  const since = `-${sinceDays} days`;
  const rows = [
    ...db.prepare("SELECT source, status FROM demo_requests WHERE created_at >= datetime('now', ?)").all(since),
    ...db.prepare("SELECT source, status FROM foodcost_requests WHERE created_at >= datetime('now', ?)").all(since),
  ];
  const by = {};
  for (const r of rows) {
    const src = parseSource(r.source);
    const key = src.form === 'manual' ? `manual / ${src.via || 'other'}` : (src.from || 'unknown');
    by[key] ||= { leads: 0, won: 0, lost: 0, open: 0 };
    by[key].leads += 1;
    if (r.status === 'won') by[key].won += 1;
    else if (r.status === 'lost') by[key].lost += 1;
    else by[key].open += 1;
  }
  return Object.entries(by).sort((a, b) => b[1].leads - a[1].leads).map(([source, v]) => ({ source, ...v }));
}
