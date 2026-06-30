import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CtaBand from '@/components/CtaBand';
import { I18N } from '@/lib/i18n';
import { localePath, isLocale, DEFAULT_LOCALE, OG_LOCALE } from '@/lib/locale';
import { getLandingPage, allLandingParams } from '@/lib/landing-pages';

const BASE = 'https://restos.uz';

// Only the known landing pages render; anything else 404s.
export const dynamicParams = false;
export function generateStaticParams() {
  return allLandingParams();
}

export function generateMetadata({ params }) {
  const page = getLandingPage(params.lang, params.slug);
  if (!page) return { title: 'Not found', robots: { index: false, follow: false } };
  const url = `${BASE}/${params.lang}/${params.slug}`;
  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: page.title,
      description: page.description,
      locale: OG_LOCALE[params.lang] || 'en_US',
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  };
}

export default function LandingPage({ params }) {
  const page = getLandingPage(params.lang, params.slug);
  if (!page) notFound();

  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  const url = `${BASE}/${lang}/${params.slug}`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: page.h1, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav activePage="" />

      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{page.eyebrow}</div>
          <h1>{page.h1}</h1>
          <p className="lede">{page.lede}</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn-primary btn-lg" href={`${localePath(lang, '/')}#pricing`}>
              {t.hero?.cta_primary || t.nav.trial}
            </Link>
            <a className="btn btn-outline btn-lg" href="tel:+998941143232">+998 94 114 3232</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {page.sections.map((s, i) => (
            <div key={i} style={{ maxWidth: 760, marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,40px)', color: 'var(--forest)', letterSpacing: '-0.02em', margin: '0 0 14px' }}>
                {s.h2}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            <div>
              <div className="section-head">
                <div className="eyebrow">FAQ</div>
                <h2>{t.faq_title || 'FAQ'}</h2>
              </div>
            </div>
            <div className="faq-list">
              {page.faqs.map(([q, a], i) => (
                <details className="faq-item" key={i} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </>
  );
}
