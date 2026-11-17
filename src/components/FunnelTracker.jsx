'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/context/AppContext';
import { track, attribution } from '@/lib/track';

// Records how far each visitor gets on each page, so /api/funnel can say where
// people leave without leaving a phone number:
//   page_view     — every page, with where the visit came from
//   section_view  — each homepage section that scrolled into view
//   scroll_depth  — 25 / 50 / 75 / 100 % of the page
//   contact_click — the phone number or the Telegram contact
//   social_click  — Instagram or the Telegram channel
//   page_leave    — on leaving the page: deepest scroll, seconds spent,
//                   last section seen
export default function FunnelTracker() {
  const pathname = usePathname();
  const lang = useLang();

  useEffect(() => {
    const started = Date.now();
    let depth = 0;
    let lastSection = '';
    let left = false;

    const a = attribution();
    track('page_view', { path: pathname, source: a.source, medium: a.medium, campaign: a.campaign || undefined }, lang);

    // Sections: every <section id> on the page, plus the footer.
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const name = e.target.id || (e.target.tagName === 'FOOTER' ? 'footer' : '');
        if (!name || seen.has(name)) continue;
        seen.add(name);
        lastSection = name;
        track('section_view', { section: name, path: pathname }, lang);
      }
    }, { threshold: 0.35 });
    // Let the page render before looking for sections.
    const t = setTimeout(() => {
      document.querySelectorAll('section[id], footer').forEach((el) => io.observe(el));
    }, 300);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && depth < mark) {
          depth = mark;
          track('scroll_depth', { percent: mark, path: pathname }, lang);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onClick = (e) => {
      const link = e.target.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const place = link.closest('section[id]')?.id
        || (link.closest('footer') ? 'footer' : link.closest('nav, header') ? 'nav' : 'page');
      if (href.startsWith('tel:')) track('contact_click', { method: 'phone', place, path: pathname }, lang);
      else if (/t\.me\/furqaty/i.test(href)) track('contact_click', { method: 'telegram', place, path: pathname }, lang);
      else if (/instagram\.com/i.test(href)) track('social_click', { network: 'instagram', place, path: pathname }, lang);
      else if (/t\.me\//i.test(href)) track('social_click', { network: 'telegram_channel', place, path: pathname }, lang);
    };
    document.addEventListener('click', onClick);

    const leave = () => {
      if (left) return;
      left = true;
      track('page_leave', {
        path: pathname,
        percent: depth,
        seconds: Math.round((Date.now() - started) / 1000),
        last_section: lastSection || undefined,
      }, lang, { beacon: true });
    };
    const onHide = () => { if (document.visibilityState === 'hidden') leave(); };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', leave);

    return () => {
      // Navigating to another page of the site also ends this page's visit.
      leave();
      clearTimeout(t);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', leave);
    };
  }, [pathname, lang]);

  return null;
}
