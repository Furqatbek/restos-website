import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, HTML_LANG } from '@/lib/locale';
import { privacyContent, PRIVACY_LANGS, PRIVACY_UPDATED } from '@/lib/privacy';

const BASE = 'https://restos.uz';

// The text exists in uz, ru and en. Other locales show the Uzbek text and
// point search engines at /uz/privacy rather than publishing a duplicate.
function textLang(lang) {
  return PRIVACY_LANGS.includes(lang) ? lang : 'uz';
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const tl = textLang(lang);
  const c = privacyContent(tl);
  const meta = pageMetadata({ lang: tl, path: '/privacy', title: c.title, description: c.description });
  meta.alternates = {
    canonical: `${BASE}/${tl}/privacy`,
    languages: Object.fromEntries(PRIVACY_LANGS.map((l) => [HTML_LANG[l], `${BASE}/${l}/privacy`])),
  };
  if (tl !== lang) meta.robots = { index: false, follow: true };
  return meta;
}

export default function Privacy({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const tl = textLang(lang);
  const c = privacyContent(tl);

  return (
    <>
      <Nav activePage="" />
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{c.updatedLabel}: <time dateTime={PRIVACY_UPDATED}>{c.updated}</time></div>
          <h1 lang={HTML_LANG[tl]}>{c.title}</h1>
          <p className="lede" lang={HTML_LANG[tl]}>{c.intro}</p>
        </div>
      </section>
      <section className="section legal" lang={HTML_LANG[tl]}>
        <div className="wrap">
          {c.sections.map((s) => (
            <div key={s.h2} className="legal-section">
              <h2>{s.h2}</h2>
              {(s.paras || []).map((p, i) => <p key={i}>{p}</p>)}
              {s.list && <ul>{s.list.map((li, i) => <li key={i}>{li}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
