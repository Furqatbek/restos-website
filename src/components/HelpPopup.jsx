'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLang, useDemoOpen, useFoodCostOpen } from '@/context/AppContext';
import { isEngaged, leadSource, setLastCta } from '@/lib/track';
import { useFormFunnel } from '@/lib/useFormFunnel';
import { shouldShowHelp } from '@/lib/helpPopup';
import FormConsent from './FormConsent';
import Icon from './Icon';

// A small card in the corner, not a full-screen popup: it never covers the
// page, so it reads as help rather than a wall, and it stays clear of
// Google's penalty for intrusive interstitials on mobile. When it appears is
// decided in lib/helpPopup.js.
const TEXT = {
  en: { title: 'Not sure where to start?', body: "Leave your number. We'll call and work out together what your venue needs.",
        phone: 'Phone', send: 'Call me back', sending: 'Sending…', tg: 'or write on Telegram',
        done: 'Thank you!', doneSub: "We'll call within one working day.", err: 'Check the number: +998 and 9 digits.', errNet: "Couldn't send. Call +998 94 114 3232.", close: 'Close' },
  ru: { title: 'Не знаете, с чего начать?', body: 'Оставьте номер — перезвоним и вместе разберёмся, что нужно вашему заведению.',
        phone: 'Телефон', send: 'Перезвоните мне', sending: 'Отправляем…', tg: 'или напишите в Telegram',
        done: 'Спасибо!', doneSub: 'Перезвоним в течение рабочего дня.', err: 'Проверьте номер: +998 и 9 цифр.', errNet: 'Не отправилось. Позвоните: +998 94 114 3232.', close: 'Закрыть' },
  uz: { title: 'Nimadan boshlashni bilmayapsizmi?', body: "Raqamingizni qoldiring — qo'ng'iroq qilib, muassasangizga nima kerakligini birga aniqlaymiz.",
        phone: 'Telefon', send: "Qo'ng'iroq qiling", sending: 'Yuborilmoqda…', tg: "yoki Telegram'da yozing",
        done: 'Rahmat!', doneSub: "Bir ish kuni ichida qo'ng'iroq qilamiz.", err: "Raqamni tekshiring: +998 va 9 ta raqam.", errNet: "Yuborilmadi. Qo'ng'iroq qiling: +998 94 114 3232.", close: 'Yopish' },
  'uz-cyr': { title: 'Нимадан бошлашни билмаяпсизми?', body: 'Рақамингизни қолдиринг — қўнғироқ қилиб, муассасангизга нима кераклигини бирга аниқлаймиз.',
        phone: 'Телефон', send: 'Қўнғироқ қилинг', sending: 'Юборилмоқда…', tg: 'ёки Telegram’да ёзинг',
        done: 'Раҳмат!', doneSub: 'Бир иш куни ичида қўнғироқ қиламиз.', err: 'Рақамни текширинг: +998 ва 9 та рақам.', errNet: 'Юборилмади. Қўнғироқ қилинг: +998 94 114 3232.', close: 'Ёпиш' },
  kaa: { title: 'Neden baslawdı bilmey atırsız ba?', body: 'Nomerińizdi qaldırıń — qońıraw etip, mekemeńizge ne kerek ekenin birge anıqlaymız.',
        phone: 'Telefon', send: 'Qońıraw etiń', sending: 'Jiberilmekte…', tg: 'yamasa Telegram’da jazıń',
        done: 'Raxmet!', doneSub: 'Bir jumıs kúni ishinde qońıraw etemiz.', err: 'Nomerdi tekseriń: +998 hám 9 san.', errNet: 'Jiberilmedi. Qońıraw etiń: +998 94 114 3232.', close: 'Japıw' },
};

const DISMISS_KEY = 'restos-help-dismissed';
const SHOWN_KEY = 'restos-help-shown';

function readStore(kind, key) {
  try { return (kind === 'local' ? localStorage : sessionStorage).getItem(key); } catch (_) { return null; }
}
function writeStore(kind, key, value) {
  try { (kind === 'local' ? localStorage : sessionStorage).setItem(key, value); } catch (_) { /* private mode */ }
}

export default function HelpPopup() {
  const lang = useLang();
  const path = usePathname();
  const t = TEXT[lang] || TEXT.uz;
  const { open: demoOpen } = useDemoOpen();
  const { open: foodOpen } = useFoodCostOpen();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('+998 ');
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const otherOpen = useRef(false);
  otherOpen.current = demoOpen || foodOpen;
  const funnel = useFormFunnel('help', open, lang);

  // Watch time on page (only while the tab is visible) and scroll depth.
  useEffect(() => {
    if (open) return undefined;
    let visibleMs = 0;
    let last = Date.now();
    let maxScroll = 0;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      maxScroll = Math.max(maxScroll, max <= 0 ? 100 : Math.round((window.scrollY / max) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = setInterval(() => {
      const now = Date.now();
      if (document.visibilityState === 'visible') visibleMs += now - last;
      last = now;
      const show = shouldShowHelp({
        path,
        visibleMs,
        scrollPercent: maxScroll,
        engaged: isEngaged(),
        shownThisVisit: readStore('session', SHOWN_KEY) === '1',
        dismissedAt: Number(readStore('local', DISMISS_KEY)) || 0,
        otherModalOpen: otherOpen.current,
        now,
      });
      if (show) {
        writeStore('session', SHOWN_KEY, '1');
        setLastCta('help_card');
        setOpen(true);
      }
    }, 1000);
    return () => { clearInterval(tick); window.removeEventListener('scroll', onScroll); };
  }, [path, open]);

  // Another form opening takes over.
  useEffect(() => { if (open && (demoOpen || foodOpen)) setOpen(false); }, [open, demoOpen, foodOpen]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function close() {
    if (state !== 'done') writeStore('local', DISMISS_KEY, String(Date.now()));
    setOpen(false);
  }

  async function submit(e) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (!/^998\d{9}$/.test(digits)) { funnel.error('phone_invalid'); setState('error'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/foodcost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, lang, source: leadSource('help') }),
      });
      if (!res.ok) throw new Error(String(res.status));
      funnel.success();
      setState('done');
    } catch (_) {
      funnel.error('network');
      setState('neterror');
    }
  }

  if (!open) return null;

  return (
    <aside className="help-card" role="dialog" aria-label={t.title}>
      <button className="help-close" onClick={close} aria-label={t.close}>
        <Icon name="close" size={14}/>
      </button>
      {state === 'done' ? (
        <div className="help-done">
          <div className="help-title">{t.done}</div>
          <p>{t.doneSub}</p>
        </div>
      ) : (
        <>
          <div className="help-title">{t.title}</div>
          <p>{t.body}</p>
          <form onSubmit={submit} onFocusCapture={funnel.onFocusCapture}>
            <label className="help-label" htmlFor="help-phone">{t.phone}</label>
            <div className="help-row">
              <input id="help-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                value={phone} onChange={(e) => { setPhone(e.target.value); if (state === 'error' || state === 'neterror') setState('idle'); }}/>
              <button type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? t.sending : t.send}
              </button>
            </div>
            {state === 'error' && <p className="help-err">{t.err}</p>}
            {state === 'neterror' && <p className="help-err">{t.errNet}</p>}
            <FormConsent/>
          </form>
          <a className="help-tg" href="https://t.me/furqaty" target="_blank" rel="noopener">{t.tg} →</a>
        </>
      )}
    </aside>
  );
}
