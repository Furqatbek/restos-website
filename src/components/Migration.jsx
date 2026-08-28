'use client';
import { useLang, useOpenDemo } from '@/context/AppContext';
import { LOCALE } from '@/lib/locale-extras';
import Icon from './Icon';

// Switching off iiko or r_keeper is the main reason owners stay put, so the
// objection gets answered directly rather than buried in the FAQ.
export default function Migration() {
  const lang = useLang();
  const openDemo = useOpenDemo();
  const L = LOCALE[lang] || LOCALE.en;
  const m = L.migration;
  if (!m) return null;

  return (
    <section className="section migration" id="migration">
      <div className="wrap">
        <div className="migration-card">
          <div className="eyebrow">{m.eyebrow}</div>
          <h2>{m.title}</h2>
          <p>{m.body}</p>
          <button className="btn btn-outline btn-lg" onClick={openDemo}>
            {m.cta} <Icon name="arrow" size={14}/>
          </button>
        </div>
      </div>
    </section>
  );
}
