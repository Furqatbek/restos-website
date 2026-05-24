'use client';
import { useLang } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';

export default function CaseStudy() {
  const lang = useLang();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;
  return (
    <section className="case" id="customers">
      <div className="wrap">
        <div className="case-card">
          <div className="case-content">
            <div className="eyebrow">{t.case.eyebrow}</div>
            <p className="case-quote">&ldquo;{t.case.quote}&rdquo;</p>
            <div className="case-attr"><strong>{t.case.author}</strong><br/>{t.case.role}</div>
            <div className="case-stats">
              {L.caseStats.map(([v, l], i) => (
                <div className="case-stat" key={i}>
                  <div className="v">{v}</div>
                  <div className="l">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="case-visual">
            <div className="case-chinor">Qahvoon</div>
            <div className="case-badge">
              <span>{L.caseBadge[0]}</span>
              <span>{L.caseBadge[1]}</span>
            </div>
          </div>
        </div>
        <div className="quotes">
          {L.quotes.map((q, i) => (
            <div className="quote-card" key={i}>
              <p>&ldquo;{q.p}&rdquo;</p>
              <div className="quote-meta">
                <div className="quote-avatar">{q.a[0]}</div>
                <div>
                  <div className="who">{q.a}</div>
                  <div className="role">{q.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
