import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CtaBand from '@/components/CtaBand';
import ModuleContent from '@/components/ModuleContent';
import { pageMetadata } from '@/lib/seo';
import { LOCALE } from '@/lib/locale-extras';
import { LOCALES, HTML_LANG, DEFAULT_LOCALE, isLocale } from '@/lib/locale';
import {
  MODULE_ORDER, moduleKeyForSlug, allModuleParams, isIndexable, moduleContent,
} from '@/lib/module-pages';

const BASE = 'https://restos.uz';

// Only the twelve known modules render; any other slug is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return allModuleParams(LOCALES);
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const key = moduleKeyForSlug(params.slug);
  if (!key) return { title: 'Not found', robots: { index: false, follow: false } };

  const copy = (LOCALE[lang] || LOCALE.en).modules[key];
  const path = `/modules/${params.slug}`;
  // Written search title and description where the page has them; otherwise the
  // short module name and tagline from the homepage.
  const written = moduleContent(key, lang)?.meta;
  const meta = pageMetadata({
    lang, path,
    title: written?.title || copy.title,
    description: written?.description || copy.desc,
  });
  const indexable = isIndexable(key, lang);

  // hreflang only between translations that are themselves indexable. Pointing
  // alternates at a noindex page tells a search engine two contradictory
  // things about the same URL.
  const indexedLocales = LOCALES.filter((l) => isIndexable(key, l));
  meta.alternates = {
    canonical: meta.alternates.canonical,
    ...(indexable && indexedLocales.length > 1
      ? { languages: Object.fromEntries(indexedLocales.map((l) => [HTML_LANG[l], `${BASE}/${l}${path}`])) }
      : {}),
  };

  // Live for visitors, hidden from search until it has real written content.
  // `follow` stays on so links from here (to the indexed landing pages and to
  // other modules) still pass through. See the rule in lib/module-pages.js.
  meta.robots = indexable ? { index: true, follow: true } : { index: false, follow: true };
  return meta;
}

export default function ModulePage({ params }) {
  const key = moduleKeyForSlug(params.slug);
  if (!key || !MODULE_ORDER.includes(key)) notFound();

  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const L = LOCALE[lang] || LOCALE.en;
  const url = `${BASE}/${lang}/modules/${params.slug}`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: L.ui.home, item: `${BASE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: L.modules[key].title, item: url },
    ],
  };

  const faqs = moduleContent(key, lang)?.faqs || [];
  const faqLd = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Nav activePage="modules"/>
      <ModuleContent moduleKey={key}/>
      <CtaBand/>
      <Footer/>
    </>
  );
}
