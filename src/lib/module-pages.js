// One page per module at /{lang}/modules/{slug}.
//
// THE INDEXING RULE — read before flipping anything on.
// Every module page ships live but `noindex` until it has real, written
// content for that language. A page with a title, a one-line description and a
// demo is fine for a visitor who clicked through from the homepage, but twelve
// of them in five languages is exactly the thin, near-template pattern search
// engines treat as doorway pages, and that can pull down the whole domain.
//
// To make a page indexable:
//   1. Write `content[lang].sections` from facts about the real product — what
//      it does, how a venue uses it, what it replaces. Nothing invented: no
//      venue counts, no percentages without a measurement behind them, no
//      feature the product does not have.
//   2. Add `lang` to that module's `indexed` list.
// A test refuses an indexed page with fewer than MIN_INDEXED_WORDS words, so a
// page cannot be switched on before it has earned it.

import { MODULE_CONTENT } from './module-content';

export const MIN_INDEXED_WORDS = 300;

// Order matches the homepage Modules section, so "Module 04 / 12" agrees.
export const MODULE_ORDER = [
  'pos', 'waiter', 'self', 'delivery', 'payment', 'kitchen',
  'inventory', 'analytics', 'courier', 'loyalty', 'finance', 'marketing',
];

export const MODULES = {
  pos: {
    slug: 'pos',
    tier: 0,
    related: ['kitchen', 'payment', 'inventory'],
    // An indexed keyword landing page already targets POS searches in these
    // locales. Link to it rather than compete with it.
    landing: { ru: 'pos-sistema-dlya-kafe-i-restoranov', uz: 'kafe-va-restoranlar-uchun-pos-tizimi' },
  },
  waiter:    { slug: 'waiter-app',      tier: 1, related: ['pos', 'kitchen', 'payment'] },
  self:      { slug: 'qr-menu',         tier: 0, related: ['payment', 'loyalty', 'pos'] },
  delivery:  { slug: 'delivery',        tier: 1, related: ['courier', 'kitchen', 'pos'] },
  payment:   { slug: 'payments',        tier: 0, related: ['pos', 'finance', 'self'] },
  kitchen:   { slug: 'kitchen-display', tier: 0, related: ['pos', 'waiter', 'inventory'] },
  inventory: {
    slug: 'inventory',
    tier: 1,
    related: ['kitchen', 'analytics', 'finance'],
    landing: { ru: 'programma-skladskogo-ucheta-dlya-restorana' },
  },
  analytics: { slug: 'analytics',       tier: 0, related: ['finance', 'inventory', 'marketing'] },
  courier:   { slug: 'courier',         tier: 1, related: ['delivery', 'kitchen', 'analytics'] },
  loyalty:   { slug: 'loyalty',         tier: 1, related: ['marketing', 'self', 'analytics'] },
  finance:   { slug: 'finance',         tier: 2, related: ['analytics', 'inventory', 'payment'] },
  marketing: { slug: 'marketing',       tier: 2, related: ['loyalty', 'analytics', 'delivery'] },
};

// Written long-form content, per module, per language. Empty on purpose: see
// the rule at the top. Shape:
//   content: { ru: { sections: [{ h2, body }], faqs: [[q, a]] } }
for (const key of MODULE_ORDER) {
  MODULES[key].content = MODULE_CONTENT[key] || MODULES[key].content || {};
  MODULES[key].indexed = MODULES[key].indexed || [];
}

const BY_SLUG = Object.fromEntries(MODULE_ORDER.map((k) => [MODULES[k].slug, k]));

export function moduleKeyForSlug(slug) {
  return BY_SLUG[slug] || null;
}

export function moduleSlug(key) {
  return MODULES[key]?.slug;
}

export function moduleNumber(key) {
  return MODULE_ORDER.indexOf(key) + 1;
}

export function moduleContent(key, lang) {
  return MODULES[key]?.content?.[lang] || null;
}

// Word count of a module page's written content in one language.
export function contentWords(key, lang) {
  const c = moduleContent(key, lang);
  if (!c) return 0;
  const text = [
    ...(c.sections || []).flatMap((s) => [s.h2, s.body]),
    ...(c.faqs || []).flat(),
  ].join(' ');
  return (text.match(/\S+/g) || []).length;
}

export function isIndexable(key, lang) {
  return !!MODULES[key]?.indexed?.includes(lang);
}

// Every (lang, slug) pair, for generateStaticParams.
export function allModuleParams(locales) {
  return locales.flatMap((lang) => MODULE_ORDER.map((k) => ({ lang, slug: MODULES[k].slug })));
}
