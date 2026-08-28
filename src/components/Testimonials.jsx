'use client';
import { useLang } from '@/context/AppContext';
import { testimonialsFor } from '@/lib/testimonials';

// One card per venue, one venue per card (the old site attributed two people
// to the same venue). data-approval-date is carried into the markup so the
// approval state of a live quote is auditable from the page itself.
export default function Testimonials() {
  const lang = useLang();
  const { list, heading } = testimonialsFor(lang);
  if (!list.length) return null;

  return (
    <section className="section testimonials" id="testimonials">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{heading.eyebrow}</div>
          <h2>{heading.title}</h2>
        </div>
        <div className="tm-grid">
          {list.map((t) => (
            <figure className="tm-card" key={t.venue} data-approval-date={t.approved}>
              <span className="tm-mark" aria-hidden="true">&ldquo;</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="tm-badge" aria-hidden="true">{t.venue.charAt(0)}</span>
                <span className="tm-who">
                  {t.person && <strong>{t.person}</strong>}
                  <span className="tm-venue">{t.role ? `${t.role} · ${t.venue}` : t.venue}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
