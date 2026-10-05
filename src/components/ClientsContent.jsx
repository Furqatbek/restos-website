'use client';
import { useLang } from '@/context/AppContext';
import { testimonialsFor, clientsPageFor } from '@/lib/testimonials';

// The /clients page body. It reuses the same approved-quote data as the
// homepage section rather than keeping a second copy: an unapproved quote
// disappears from both places at once.
export default function ClientsContent() {
  const lang = useLang();
  const C = clientsPageFor(lang);
  const { list } = testimonialsFor(lang);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{C.eyebrow}</div>
          <h1>{C.title_a} <em>{C.title_b}</em></h1>
          <p className="lede">{C.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
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
          <p className="clients-note">{C.note}</p>
        </div>
      </section>
    </>
  );
}
