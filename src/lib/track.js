'use client';

// Visitor funnel tracking. One call records an event in three places:
//   1. our own database (/api/events) — survives ad blockers, and
//      /api/funnel turns it into the "where do visitors leave" report;
//   2. Google Analytics 4 (gtag), for its funnel explorations;
//   3. the Meta pixel (fbq), when META_PIXEL_ID is set, so Instagram ads can
//      optimise for leads.
// Nothing personal is sent anywhere: no names, no phone numbers, no form text.

let sessionId = null;

function store(kind) {
  try { return kind === 'local' ? window.localStorage : window.sessionStorage; } catch (_) { return null; }
}

function getSessionId() {
  if (sessionId) return sessionId;
  const s = store('session');
  sessionId = s?.getItem('restos-sid') || null;
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    s?.setItem('restos-sid', sessionId);
  }
  return sessionId;
}

// Where this visit came from, captured on the first page of the session:
// utm_* tags from an ad link, Meta's fbclid / Google's gclid, or the referring
// site. Later pages of the same visit keep the first answer.
export function attribution() {
  const s = store('session');
  const saved = s?.getItem('restos-attr');
  if (saved) { try { return JSON.parse(saved); } catch (_) { /* fall through */ } }

  const q = new URLSearchParams(window.location.search);
  let refHost = '';
  try { refHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (_) { /* bad referrer */ }
  if (refHost === window.location.hostname) refHost = '';

  const a = {
    source: q.get('utm_source') || (q.get('fbclid') ? 'meta' : q.get('gclid') ? 'google_ads' : refHost || 'direct'),
    medium: q.get('utm_medium') || (q.get('fbclid') || q.get('gclid') ? 'paid' : refHost ? 'referral' : 'none'),
    campaign: q.get('utm_campaign') || '',
    landing: window.location.pathname,
  };
  s?.setItem('restos-attr', JSON.stringify(a));
  return a;
}

// The call-to-action that opened the current form ("hero", "pricing", …), so a
// lead records which button produced it.
let lastCta = '';
export function setLastCta(place) { lastCta = place || ''; }
export function getLastCta() { return lastCta; }

// One readable line for the lead's `source` column and the Telegram alert.
export function leadSource(form) {
  const a = attribution();
  return [
    `form=${form}`,
    lastCta && `cta=${lastCta}`,
    `from=${a.source}/${a.medium}${a.campaign ? `/${a.campaign}` : ''}`,
    `landing=${a.landing}`,
  ].filter(Boolean).join('; ');
}

// Our names → Meta's standard events. Anything else goes as a custom event.
const META = { generate_lead: 'Lead', contact_click: 'Contact' };

export function track(event_type, data, lang, { beacon = false } = {}) {
  try {
    const body = JSON.stringify({ event_type, data, lang, session_id: getSessionId() });
    if (beacon && navigator.sendBeacon) {
      // text/plain: browsers refuse beacons with other content types from
      // some pages. The API parses the body as JSON either way.
      navigator.sendBeacon('/api/events', new Blob([body], { type: 'text/plain;charset=UTF-8' }));
    } else {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (_) { /* never break the page for analytics */ }

  // GA4 already counts page views itself.
  try {
    if (event_type !== 'page_view' && typeof window.gtag === 'function') {
      window.gtag('event', event_type, { ...(data || {}), language: lang });
    }
  } catch (_) { /* ignore */ }

  try {
    if (typeof window.fbq === 'function' && event_type !== 'page_view') {
      if (META[event_type]) window.fbq('track', META[event_type], data || {});
      else if (/^(cta_click|form_open|form_start)$/.test(event_type)) window.fbq('trackCustom', event_type, data || {});
    }
  } catch (_) { /* ignore */ }
}
