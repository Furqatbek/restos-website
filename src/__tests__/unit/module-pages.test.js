import fs from 'fs';
import path from 'path';
import { LOCALES } from '@/lib/locale';
import { LOCALE } from '@/lib/locale-extras';
import { getLandingPage } from '@/lib/landing-pages';
import {
  MODULES, MODULE_ORDER, MIN_INDEXED_WORDS, allModuleParams,
  moduleKeyForSlug, contentWords,
} from '@/lib/module-pages';

describe('module pages', () => {
  it('covers exactly the twelve homepage modules, in the same order', () => {
    expect(MODULE_ORDER).toHaveLength(12);
    expect(new Set(MODULE_ORDER)).toEqual(new Set(Object.keys(LOCALE.en.modules)));
    expect(MODULE_ORDER).toEqual(Object.keys(LOCALE.en.modules));
  });

  it('has a page for every module in every locale, with unique slugs', () => {
    expect(allModuleParams(LOCALES)).toHaveLength(12 * LOCALES.length);
    const slugs = MODULE_ORDER.map((k) => MODULES[k].slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const k of MODULE_ORDER) expect(moduleKeyForSlug(MODULES[k].slug)).toBe(k);
  });

  it('has a title, description and KPIs for every module in every locale', () => {
    for (const lang of LOCALES) {
      for (const k of MODULE_ORDER) {
        const m = LOCALE[lang].modules[k];
        expect(m?.title).toBeTruthy();
        expect(m?.desc).toBeTruthy();
        expect(m?.kpis?.length).toBeGreaterThan(0);
      }
    }
  });

  it('has a live demo and the interface strings the page needs, everywhere', () => {
    const demoDir = path.join(process.cwd(), 'src/components/demos');
    const name = (k) => ({ self: 'Self', pos: 'Pos', kitchen: 'Kitchen' }[k] || k[0].toUpperCase() + k.slice(1));
    for (const k of MODULE_ORDER) {
      expect(fs.existsSync(path.join(demoDir, `${name(k)}Demo.jsx`))).toBe(true);
    }
    for (const lang of LOCALES) {
      for (const key of ['includedIn', 'andAbove', 'related', 'allModules', 'learnMore', 'readMore', 'home']) {
        expect(LOCALE[lang].ui[key]).toBeTruthy();
      }
    }
  });

  it('places every module in a tier that exists', () => {
    for (const k of MODULE_ORDER) {
      expect(LOCALE.en.pricing.tiers[MODULES[k].tier]).toBeDefined();
    }
  });

  it('links only to real modules, and never to itself', () => {
    for (const k of MODULE_ORDER) {
      for (const r of MODULES[k].related) {
        expect(MODULE_ORDER).toContain(r);
        expect(r).not.toBe(k);
      }
    }
  });

  it('cross-links only to landing pages that exist in that locale', () => {
    for (const k of MODULE_ORDER) {
      for (const [lang, slug] of Object.entries(MODULES[k].landing || {})) {
        expect(getLandingPage(lang, slug)).toBeTruthy();
      }
    }
  });

  // The rule that protects the domain: a module page may only be switched on
  // for search once it has real written content in that language. A failure
  // lists exactly which pages are switched on too early.
  //
  // Deliberately NOT asserting "every page is noindex": that restates today's
  // state, and would fail the day a page is correctly switched on.
  it('indexes no page that has not earned it', () => {
    const tooThin = MODULE_ORDER.flatMap((k) =>
      MODULES[k].indexed
        .filter((lang) => !LOCALES.includes(lang) || contentWords(k, lang) < MIN_INDEXED_WORDS)
        .map((lang) => `${k}/${lang}: ${contentWords(k, lang)} words (need ${MIN_INDEXED_WORDS})`));
    expect(tooThin).toEqual([]);
  });
});
