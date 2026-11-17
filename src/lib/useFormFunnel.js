'use client';
import { useEffect, useRef } from 'react';
import { track, getLastCta, attribution } from '@/lib/track';

// Tracks one lead form from opening to sending:
//   form_open  → form_start (first field touched) → form_field (each new field)
//   → generate_lead (sent) — or form_close with how far the visitor got.
// Field names only; never what was typed.
export function useFormFunnel(form, open, lang) {
  const st = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    st.current = { started: false, fields: new Set(), last: '', error: '', done: false, closed: false };
    track('form_open', { form, cta: getLastCta() || undefined }, lang);

    const close = (beacon) => {
      const s = st.current;
      if (!s || s.done || s.closed) return;
      s.closed = true;
      track('form_close', {
        form,
        stage: s.error ? 'error' : s.started ? 'started' : 'not_started',
        last_field: s.last || undefined,
        fields: s.fields.size,
        error: s.error || undefined,
      }, lang, { beacon });
    };
    // Closing the tab with the form open never reaches the cleanup below.
    const onHide = () => close(true);
    window.addEventListener('pagehide', onHide);
    return () => {
      window.removeEventListener('pagehide', onHide);
      close(false);
    };
  }, [open, form, lang]);

  return {
    // Put on the <form> as onFocusCapture; inputs need a `name`.
    onFocusCapture: (e) => {
      const s = st.current;
      const field = e.target?.name;
      if (!s || !field) return;
      if (!s.started) { s.started = true; track('form_start', { form }, lang); }
      if (!s.fields.has(field)) { s.fields.add(field); track('form_field', { form, field }, lang); }
      s.last = field;
    },
    error: (reason) => {
      if (st.current) st.current.error = reason;
      track('form_error', { form, reason }, lang);
    },
    success: () => {
      if (st.current) st.current.done = true;
      const a = attribution();
      track('generate_lead', {
        form, cta: getLastCta() || undefined,
        source: a.source, medium: a.medium, campaign: a.campaign || undefined,
      }, lang);
    },
  };
}
