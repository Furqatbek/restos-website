'use client';

let sessionId = null;

function getSessionId() {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('restos-sid');
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('restos-sid', sessionId);
    }
  }
  return sessionId;
}

export function track(event_type, data, lang) {
  try {
    const sid = getSessionId();
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, data, lang, session_id: sid }),
    }).catch(() => {});
  } catch (_) {}
}
