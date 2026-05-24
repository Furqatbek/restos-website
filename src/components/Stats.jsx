'use client';
import { useLang } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';

export default function Stats() {
  const lang = useLang();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;
  const stats = L.stats;
  return (
    <section className="stats" id="stats">
      <div className="wrap">
        <div className="section-head">
          <h2>{t.stats.title}</h2>
          <p>{t.stats.subtitle}</p>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-value">{s.v}<span className="unit">{s.u}</span></div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-sub">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
