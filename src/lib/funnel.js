// Turns raw /api/events rows into the funnel report: how many visits reach
// each step, and for the visits that never left a phone number or called,
// where they stopped. Pure function so it can be tested without a database.
//
// A "visit" is one browser tab session (lib/track.js). Only visits with a
// page_view count; rows from before funnel tracking existed have none.

// `after` is the step this one follows for the "of previous" column. Scrolling
// and seeing the prices are signs of interest, not stages: someone can click
// the hero button without either, so they compare against all visits.
export const STEPS = [
  { key: 'visited',  label: 'Opened the site' },
  { key: 'scrolled', label: 'Scrolled past half a page', after: 'visited' },
  { key: 'pricing',  label: 'Saw the prices', after: 'visited' },
  { key: 'clicked',  label: 'Clicked a button, the phone or Telegram', after: 'visited' },
  { key: 'opened',   label: 'Opened a form', after: 'clicked' },
  { key: 'started',  label: 'Started filling it in', after: 'opened' },
  { key: 'lead',     label: 'Left a phone number', after: 'started' },
];

function parse(d) {
  if (d == null) return {};
  if (typeof d === 'object') return d;
  try { return JSON.parse(d) || {}; } catch (_) { return {}; }
}

const inc = (m, k, by = 1) => { m[k] = (m[k] || 0) + by; };
const top = (m, n = 15) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);

export function buildFunnel(rows) {
  const sessions = new Map();
  for (const r of rows) {
    if (!r.session_id) continue;
    if (!sessions.has(r.session_id)) sessions.set(r.session_id, []);
    sessions.get(r.session_id).push({ ...r, data: parse(r.data) });
  }

  const reached = Object.fromEntries(STEPS.map((s) => [s.key, 0]));
  const contacts = {};
  const exitPages = {};
  const exitSections = {};
  const exitDepth = {};
  const exitSeconds = [];
  const ctas = {};
  const ctaLeads = {};
  const forms = {};
  const abandonField = {};
  const errors = {};
  const sources = {};
  const landings = {};
  const langs = {};
  let noResult = 0;

  for (const events of sessions.values()) {
    const views = events.filter((e) => e.event_type === 'page_view');
    if (!views.length) continue;
    const first = views[0].data;
    const has = (type, pred = () => true) => events.some((e) => e.event_type === type && pred(e.data));

    const lead = has('generate_lead');
    const contacted = has('contact_click');
    const step = {
      visited: true,
      scrolled: has('scroll_depth', (d) => d.percent >= 50),
      pricing: has('section_view', (d) => d.section === 'pricing'),
      clicked: has('cta_click') || contacted || has('form_open'),
      opened: has('form_open'),
      started: has('form_start'),
      lead,
    };
    for (const s of STEPS) if (step[s.key]) reached[s.key] += 1;

    for (const e of events) {
      const d = e.data;
      if (e.event_type === 'contact_click') inc(contacts, d.method || 'other');
      if (e.event_type === 'cta_click') inc(ctas, `${d.cta || '?'} · ${d.place || '?'}`);
      if (e.event_type === 'generate_lead') inc(ctaLeads, `${d.form === 'demo' ? 'demo' : 'foodcost'} · ${d.cta || '?'}`);
      if (e.event_type === 'form_open') { forms[d.form] ||= { opened: 0, started: 0, sent: 0, gaveUp: 0, gaveUpBlank: 0, errored: 0 }; forms[d.form].opened += 1; }
      if (e.event_type === 'form_start' && forms[d.form]) forms[d.form].started += 1;
      if (e.event_type === 'generate_lead' && forms[d.form]) forms[d.form].sent += 1;
      if (e.event_type === 'form_error') inc(errors, `${d.form} · ${d.reason}`);
      if (e.event_type === 'form_close' && forms[d.form]) {
        if (d.stage === 'not_started') forms[d.form].gaveUpBlank += 1;
        else if (d.stage === 'error') forms[d.form].errored += 1;
        else forms[d.form].gaveUp += 1;
        if (d.last_field) inc(abandonField, `${d.form} · ${d.last_field}`);
      }
    }

    const src = `${first.source || 'direct'} / ${first.medium || 'none'}${first.campaign ? ` / ${first.campaign}` : ''}`;
    sources[src] ||= { visits: 0, contacts: 0, leads: 0 };
    sources[src].visits += 1;
    if (contacted) sources[src].contacts += 1;
    if (lead) sources[src].leads += 1;

    const landing = first.path || '?';
    landings[landing] ||= { visits: 0, leads: 0 };
    landings[landing].visits += 1;
    if (lead) landings[landing].leads += 1;

    const lang = views[0].lang || '?';
    langs[lang] ||= { visits: 0, leads: 0 };
    langs[lang].visits += 1;
    if (lead) langs[lang].leads += 1;

    // Where the visits that produced nothing ended.
    if (!lead && !contacted) {
      noResult += 1;
      const leaves = events.filter((e) => e.event_type === 'page_leave');
      const last = leaves.length ? leaves[leaves.length - 1].data : { path: views[views.length - 1].data.path };
      inc(exitPages, last.path || '?');
      if (last.last_section) inc(exitSections, last.last_section);
      inc(exitDepth, `${last.percent ?? 0}%`);
      if (typeof last.seconds === 'number') exitSeconds.push(last.seconds);
    }
  }

  const visits = reached.visited;
  exitSeconds.sort((a, b) => a - b);
  const median = exitSeconds.length ? exitSeconds[Math.floor(exitSeconds.length / 2)] : null;

  return {
    visits,
    steps: STEPS.map((s) => ({
      ...s,
      count: reached[s.key],
      ofVisits: pct(reached[s.key], visits),
      ofPrevious: s.after ? pct(reached[s.key], reached[s.after]) : 100,
    })),
    contacts,
    noResult: {
      visits: noResult,
      medianSeconds: median,
      pages: top(exitPages),
      sections: top(exitSections),
      depth: top(exitDepth),
    },
    forms,
    abandonField: top(abandonField),
    errors: top(errors),
    ctas: top(ctas, 30),
    ctaLeads: top(ctaLeads, 30),
    sources: Object.entries(sources).sort((a, b) => b[1].visits - a[1].visits)
      .map(([k, v]) => ({ source: k, ...v, conversion: pct(v.leads, v.visits) })),
    landings: Object.entries(landings).sort((a, b) => b[1].visits - a[1].visits).slice(0, 20)
      .map(([k, v]) => ({ page: k, ...v, conversion: pct(v.leads, v.visits) })),
    langs: Object.entries(langs).sort((a, b) => b[1].visits - a[1].visits)
      .map(([k, v]) => ({ lang: k, ...v, conversion: pct(v.leads, v.visits) })),
  };
}
