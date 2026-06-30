'use client';
import { useLang } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { FAQS as faqs } from '@/lib/faq';

export default function FAQ() {
  const lang = useLang();
  const t = I18N[lang] || I18N.en;
  const list = faqs[lang] || faqs.en;
  return (
    <section className="section">
      <div className="wrap">
        <div className="faq">
          <div>
            <div className="section-head">
              <div className="eyebrow">FAQ</div>
              <h2>{t.faq_title}</h2>
            </div>
          </div>
          <div className="faq-list">
            {list.map(([q, a], i) => (
              <details className="faq-item" key={i} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
