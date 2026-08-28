'use client';
import { useState, useEffect } from 'react';
import { useLang, useFoodCostOpen } from '@/context/AppContext';
import { track } from '@/lib/track';
import Icon from './Icon';

// Primary conversion action: a free food-cost analysis. Owners here buy from a
// person after seeing evidence about their own money, so this replaces the
// self-serve free-trial signup. Phone is the only required field.
const M = {
  uz: {
    title: 'Bepul food-cost tahlili.',
    sub: "O'tgan oyning xarid raqamlarini yuboring. 10 daqiqada pul qayerga ketganini ko'rsatamiz. Hech qanday majburiyatsiz.",
    venue: 'Muassasa nomi', contact: 'Ismingiz', phone: 'Telefon',
    venuesCount: 'Nechta muassasa', system: 'Hozirgi tizim', revenue: 'Oylik aylanma',
    submit: 'Tahlilni yuborish', sending: 'Yuborilmoqda…',
    done: 'Qabul qilindi.', doneSub: 'Bir ish kuni ichida qo‘ng‘iroq qilamiz.', close: 'Yopish',
    err: 'Telefon raqamini +998 formatida kiriting.',
    optional: 'ixtiyoriy',
  },
  ru: {
    title: 'Бесплатный разбор фудкоста.',
    sub: 'Пришлите цифры закупок за прошлый месяц. За 10 минут покажем, куда ушли деньги. Без обязательств.',
    venue: 'Название заведения', contact: 'Ваше имя', phone: 'Телефон',
    venuesCount: 'Сколько заведений', system: 'Текущая система', revenue: 'Оборот в месяц',
    submit: 'Отправить на разбор', sending: 'Отправляем…',
    done: 'Принято.', doneSub: 'Перезвоним в течение рабочего дня.', close: 'Закрыть',
    err: 'Введите телефон в формате +998.',
    optional: 'необязательно',
  },
  en: {
    title: 'Free food-cost check.',
    sub: "Send last month's purchase numbers. In 10 minutes we show you where the money went. No obligation.",
    venue: 'Venue name', contact: 'Your name', phone: 'Phone',
    venuesCount: 'Number of venues', system: 'Current system', revenue: 'Monthly revenue',
    submit: 'Send for analysis', sending: 'Sending…',
    done: 'Got it.', doneSub: "We'll call you within one business day.", close: 'Close',
    err: 'Enter a phone number in +998 format.',
    optional: 'optional',
  },
  'uz-cyr': {
    title: 'Бепул food-cost таҳлили.',
    sub: 'Ўтган ойнинг харид рақамларини юборинг. 10 дақиқада пул қаерга кетганини кўрсатамиз. Ҳеч қандай мажбуриятсиз.',
    venue: 'Муассаса номи', contact: 'Исмингиз', phone: 'Телефон',
    venuesCount: 'Нechта муассаса', system: 'Ҳозирги тизим', revenue: 'Ойлик айланма',
    submit: 'Таҳлилни юбориш', sending: 'Юборилмоқда…',
    done: 'Қабул қилинди.', doneSub: 'Бир иш куни ичида қўнғироқ қиламиз.', close: 'Ёпиш',
    err: 'Телефон рақамини +998 форматида киритинг.',
    optional: 'ихтиёрий',
  },
  kaa: {
    title: 'Tegin food-cost analizi.',
    sub: "Ótken aydıń satıp alıw sanlarıń jiberiń. 10 minutta aqsha qayerge ketkenin kórsetemiz. Hesh qanday májbúriyatsız.",
    venue: 'Orın ataması', contact: 'Atıńız', phone: 'Telefon',
    venuesCount: 'Neshe orın', system: 'Házirgi sistema', revenue: 'Aylıq aylanba',
    submit: 'Analizge jiberiw', sending: 'Jiberilmekte…',
    done: 'Qabıllandı.', doneSub: 'Bir jumıs kúni ishinde qońıraw etemiz.', close: 'Jabıw',
    err: 'Telefon nomerin +998 formatında kiritiń.',
    optional: 'májbúriy emes',
  },
};

const SYSTEMS = [
  { v: 'none', l: 'None / paper' },
  { v: 'excel', l: 'Excel' },
  { v: 'iiko', l: 'iiko' },
  { v: 'r_keeper', l: 'r_keeper' },
  { v: 'soft24', l: 'Soft24' },
  { v: 'pospoint', l: 'POSPoint' },
  { v: 'other', l: 'Other' },
];

const REVENUE = ['< 50M UZS', '50–100M UZS', '100–150M UZS', '> 150M UZS'];

export default function FoodCostModal() {
  const lang = useLang();
  const { open, setOpen } = useFoodCostOpen();
  const c = M[lang] || M.uz;

  const [form, setForm] = useState({
    venue: '', contact: '', phone: '+998 ', venues_count: '1',
    current_system: '', revenue_band: '',
  });
  const [state, setState] = useState('idle'); // idle | sending | done | error

  useEffect(() => {
    if (!open) { setState('idle'); }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');
    if (!/^998\d{9}$/.test(digits)) { setState('error'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/foodcost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, source: 'foodcost_modal' }),
      });
      if (!res.ok) throw new Error('failed');
      track('foodcost_submit', { system: form.current_system || null }, lang);
      setState('done');
    } catch (_) {
      setState('error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={() => setOpen(false)} aria-label={c.close}>
          <Icon name="close" size={16}/>
        </button>

        {state === 'done' ? (
          <div className="modal-done">
            <h3>{c.done}</h3>
            <p>{c.doneSub}</p>
            <button className="btn btn-primary btn-lg" onClick={() => setOpen(false)}>{c.close}</button>
          </div>
        ) : (
          <>
            <h3>{c.title}</h3>
            <p className="modal-sub">{c.sub}</p>
            <form onSubmit={submit} className="modal-form">
              <label>
                <span>{c.phone}</span>
                <input
                  type="tel" required value={form.phone} onChange={set('phone')}
                  placeholder="+998 90 123 45 67" inputMode="tel"
                />
              </label>
              <label>
                <span>{c.venue} <em>({c.optional})</em></span>
                <input type="text" value={form.venue} onChange={set('venue')} />
              </label>
              <label>
                <span>{c.contact} <em>({c.optional})</em></span>
                <input type="text" value={form.contact} onChange={set('contact')} />
              </label>
              <label>
                <span>{c.venuesCount} <em>({c.optional})</em></span>
                <input type="number" min="1" value={form.venues_count} onChange={set('venues_count')} />
              </label>
              <label>
                <span>{c.system} <em>({c.optional})</em></span>
                <select value={form.current_system} onChange={set('current_system')}>
                  <option value="">—</option>
                  {SYSTEMS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </label>
              <label>
                <span>{c.revenue} <em>({c.optional})</em></span>
                <select value={form.revenue_band} onChange={set('revenue_band')}>
                  <option value="">—</option>
                  {REVENUE.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </label>

              {state === 'error' && <p className="modal-error">{c.err}</p>}

              <button className="btn btn-primary btn-lg" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? c.sending : c.submit} <Icon name="arrow" size={14}/>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
