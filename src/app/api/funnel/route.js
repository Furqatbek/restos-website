export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { isAdmin, unauthorized } from '@/lib/admin';
import { buildFunnel } from '@/lib/funnel';
import { outcomesBySource } from '@/lib/leads';

// Owner-only report: where visitors leave without leaving a phone number.
// Open in a browser:  https://restos.uz/api/funnel?key=ADMIN_TOKEN&days=30
// Add &format=json for the raw numbers.
export function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const { searchParams } = new URL(req.url);
  const days = Math.min(Math.max(parseInt(searchParams.get('days') || '30', 10) || 30, 1), 365);

  const rows = db
    .prepare(`SELECT event_type, data, lang, session_id, created_at FROM events
              WHERE created_at >= datetime('now', ?) ORDER BY id`)
    .all(`-${days} days`);
  const report = buildFunnel(rows);
  // Where the leads ended up, from the lead board (/api/leads).
  report.outcomes = outcomesBySource(days);

  if (searchParams.get('format') === 'json') return NextResponse.json({ days, ...report });
  // Period links keep the rest of the query (the key, if it came that way).
  const link = (d) => { const q = new URLSearchParams(searchParams); q.set('days', String(d)); q.delete('format'); return `?${q}`; };
  return new NextResponse(renderHtml(report, days, link), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function table(head, rows) {
  if (!rows.length) return '<p class="empty">No data yet.</p>';
  return `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${
    rows.map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="n"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')
  }</tbody></table>`;
}

function renderHtml(r, days, link) {
  const bar = (p) => `<span class="bar" style="width:${Math.max(p, 0.5)}%"></span>`;
  const steps = r.steps.map((s) => `<tr><td>${esc(s.label)}</td><td class="n">${s.count}</td><td class="n">${s.ofVisits}%</td><td class="n">${s.ofPrevious}%</td><td class="w">${bar(s.ofVisits)}</td></tr>`).join('');
  const forms = Object.entries(r.forms).map(([name, f]) => [
    ({ demo: 'Demo request', foodcost: 'Food-cost check', help: '"Not sure where to start?" card' })[name] || name, f.opened, f.started, f.sent, f.gaveUpBlank, f.gaveUp, f.errored,
  ]);

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>RestOS funnel · ${days} days</title>
<style>
body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:24px 16px 64px;background:#faf7f2;color:#1d2a24}
main{max-width:920px;margin:0 auto}h1{font-size:24px;margin:0 0 4px}h2{font-size:17px;margin:32px 0 6px}
p{margin:4px 0 10px;color:#55625b}.empty{font-style:italic}
table{border-collapse:collapse;width:100%;background:#fff;border:1px solid #e4ddd0;font-size:14px}
th,td{padding:7px 10px;border-bottom:1px solid #eee7da;text-align:left;vertical-align:top}th{background:#f3eee4;font-weight:600}
td.n{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}td.w{width:30%}
.bar{display:block;height:10px;background:#0f2d24;border-radius:3px}
nav a{margin-right:12px;color:#0f2d24}.wrap{overflow-x:auto}
</style></head><body><main>
<h1>Where visitors leave · last ${days} days</h1>
<p>${r.visits} visits. A visit is one browser tab; crawlers are not counted.</p>
<nav>${[7, 30, 90].map((d) => `<a href="${esc(link(d))}">${d} days</a>`).join('')}</nav>

<h2>The funnel</h2>
<p>How many visits got this far. "Of previous" compares each step with the one it follows (form steps follow each other; the first three compare with all visits). The lowest percentage is where most people stop.</p>
<div class="wrap"><table><thead><tr><th>Step</th><th>Visits</th><th>Of all</th><th>Of previous</th><th></th></tr></thead><tbody>${steps}</tbody></table></div>
<p>Called or wrote instead of filling a form: ${Object.entries(r.contacts).map(([k, v]) => `${esc(k)} ${v}`).join(', ') || 'none yet'}.</p>

<h2>Visits that ended with nothing: where they stopped</h2>
<p>${r.noResult.visits} visits left no number and did not call or write.${r.noResult.medianSeconds != null ? ` Half of them left within ${r.noResult.medianSeconds} second${r.noResult.medianSeconds === 1 ? '' : 's'} on their last page.` : ''}</p>
<div class="wrap">${table(['Last page', 'Visits'], r.noResult.pages)}</div>
<h2>Last part of the page they saw</h2>
<p>hero = top of the homepage, modules, pricing, testimonials, migration, faq, trial = the call-to-action band, footer.</p>
<div class="wrap">${table(['Section', 'Visits'], r.noResult.sections)}</div>
<h2>How far they scrolled</h2>
<div class="wrap">${table(['Scrolled', 'Visits'], r.noResult.depth)}</div>

<h2>Forms</h2>
<p>"Closed before typing" = opened the form and closed it untouched. "Closed half-filled" = started and gave up.</p>
<div class="wrap">${table(['Form', 'Opened', 'Started', 'Sent', 'Closed before typing', 'Closed half-filled', 'Closed after an error'], forms)}</div>
<h2>Last field touched before giving up</h2>
<div class="wrap">${table(['Form · field', 'Times'], r.abandonField)}</div>
<h2>Form errors</h2>
<p>phone_invalid = the number did not look like +998 XX XXX XX XX. network = the send failed.</p>
<div class="wrap">${table(['Form · reason', 'Times'], r.errors)}</div>

<h2>Buttons</h2>
<div class="wrap">${table(['Button clicked (form · place)', 'Clicks'], r.ctas)}</div>
<div class="wrap" style="margin-top:10px">${table(['Leads by the button that opened the form', 'Leads'], r.ctaLeads)}</div>

<h2>Where visits came from</h2>
<p>From the ad link's utm tags, Instagram/Facebook click ids, or the referring site.</p>
<div class="wrap">${table(['Source / medium / campaign', 'Visits', 'Called or wrote', 'Leads', 'Leads %'], r.sources.map((s) => [s.source, s.visits, s.contacts, s.leads, `${s.conversion}%`]))}</div>

<h2>What became of the leads</h2>
<p>From the lead board: how many leads each source brought and how many became clients. Update the board and this fills in.</p>
<div class="wrap">${table(['Source', 'Leads', 'Became clients', 'Declined', 'Still open'], (r.outcomes || []).map((o) => [o.source, o.leads, o.won, o.lost, o.open]))}</div>

<h2>First page of the visit</h2>
<div class="wrap">${table(['Page', 'Visits', 'Leads', 'Leads %'], r.landings.map((s) => [s.page, s.visits, s.leads, `${s.conversion}%`]))}</div>

<h2>Language</h2>
<div class="wrap">${table(['Language', 'Visits', 'Leads', 'Leads %'], r.langs.map((s) => [s.lang, s.visits, s.leads, `${s.conversion}%`]))}</div>
</main></body></html>`;
}
