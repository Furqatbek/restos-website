'use client';
import Link from 'next/link';
import { useLang } from '@/context/AppContext';
import { LOCALE } from '@/lib/locale-extras';
import { localePath } from '@/lib/locale';
import { landingList } from '@/lib/landing-pages';
import { MODULES, moduleSlug, moduleNumber, moduleContent } from '@/lib/module-pages';
import { DEMOS, MODULE_ICONS } from './demos';
import Icon from './Icon';

// Body of /{lang}/modules/{slug}. Everything shown here is either already
// published elsewhere on the site (the module's title, description and KPIs,
// its live demo, which tier includes it) or written per-module content from
// module-pages.js. Nothing is generated or inferred.
export default function ModuleContent({ moduleKey }) {
  const lang = useLang();
  const L = LOCALE[lang] || LOCALE.en;
  const mod = MODULES[moduleKey];
  const copy = L.modules[moduleKey];
  const Demo = DEMOS[moduleKey];
  const content = moduleContent(moduleKey, lang);
  const num = String(moduleNumber(moduleKey)).padStart(2, '0');
  const home = localePath(lang, '/');

  const tierName = L.pricing.tiers[mod.tier]?.name;
  const isTopTier = mod.tier === L.pricing.tiers.length - 1;

  const landingSlug = mod.landing?.[lang];
  const landing = landingSlug && landingList(lang).find((s) => s.slug === landingSlug);

  return (
    <>
      <section className="page-hero module-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href={home}>{L.ui.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${home}#modules`}>{L.ui.allModules}</Link>
          </nav>
          <div className="eyebrow">{L.ui.module} {num} {L.ui.of} 12</div>
          <h1>{copy.title}</h1>
          <p className="lede">{copy.desc}</p>
          <div className="module-tier">
            <span className="module-tier-label">{L.ui.includedIn}</span>
            <Link className="module-tier-chip" href={`${home}#pricing`}>
              {tierName}{!isTopTier && <em> {L.ui.andAbove}</em>}
            </Link>
          </div>
        </div>
      </section>

      <section className="section module-demo-section">
        <div className="wrap">
          <div className="module-demo">
            <div className="demo-header">
              <div className="module-demo-ico"><Icon name={MODULE_ICONS[moduleKey]} size={18}/></div>
              <span className="demo-badge"><span className="live-dot" aria-hidden="true"/>{L.ui.liveDemo}</span>
            </div>
            <div className="demo-body">{Demo && <Demo/>}</div>
            <div className="demo-footer">
              {copy.kpis.map((k, i) => (
                <div key={i} className="demo-kpi">
                  <span className="v">{k.v}</span>
                  <span>{k.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content?.sections?.length > 0 && (
        <section className="section module-body">
          <div className="wrap">
            {content.sections.map((s, i) => (
              <div key={i} className="module-section">
                <h2>{s.h2}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content?.faqs?.length > 0 && (
        <section className="section module-faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="faq-list module-faq-list">
              {content.faqs.map(([q, a], i) => (
                <details className="faq-item" key={i} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {landing && (
        <section className="section module-guide" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Link className="module-guide-link" href={localePath(lang, `/${landing.slug}`)}>
              <span className="module-guide-label">{L.ui.readMore}</span>
              <span className="module-guide-title">{landing.label}</span>
              <Icon name="arrow" size={16}/>
            </Link>
          </div>
        </section>
      )}

      <section className="section module-related" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{L.ui.related}</div>
          </div>
          <div className="module-related-grid">
            {mod.related.map((key) => (
              <Link key={key} className="module-related-card" href={localePath(lang, `/modules/${moduleSlug(key)}`)}>
                <span className="module-related-ico"><Icon name={MODULE_ICONS[key]} size={16}/></span>
                <span className="module-related-title">{L.modules[key].title}</span>
                <span className="module-related-desc">{L.modules[key].desc}</span>
              </Link>
            ))}
          </div>
          <Link className="module-all" href={`${home}#modules`}>
            {L.ui.allModules} <Icon name="arrow" size={14}/>
          </Link>
        </div>
      </section>
    </>
  );
}
