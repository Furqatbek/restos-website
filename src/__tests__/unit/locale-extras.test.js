import { LOCALE } from '@/lib/locale-extras';
import { LOCALES } from '@/lib/locale';
import { CLIENTS_PAGE, clientsPageFor, testimonialsFor } from '@/lib/testimonials';
import { I18N } from '@/lib/i18n';

describe('footer credit line', () => {
  it('is present for every locale the site ships', () => {
    for (const lang of LOCALES) {
      expect(typeof LOCALE[lang]?.footer?.madeBy).toBe('string');
      expect(LOCALE[lang].footer.madeBy.trim()).not.toBe('');
    }
  });

  it('carries both placeholders the Footer substitutes', () => {
    for (const lang of LOCALES) {
      const line = LOCALE[lang].footer.madeBy;
      expect(line).toContain('{heart}');
      expect(line).toContain('{istech}');
    }
  });

  it('is actually translated, not the English string copied across', () => {
    const nonEnglish = LOCALES.filter((l) => l !== 'en').map((l) => LOCALE[l].footer.madeBy);
    for (const line of nonEnglish) {
      expect(line).not.toBe(LOCALE.en.footer.madeBy);
    }
    // uz, uz-cyr and kaa are three distinct languages, so no two share a line.
    expect(new Set(nonEnglish).size).toBe(nonEnglish.length);
  });
});

describe('clients page', () => {
  it('has copy for every locale the site ships', () => {
    for (const lang of LOCALES) {
      const c = CLIENTS_PAGE[lang];
      expect(c).toBeDefined();
      for (const key of ['eyebrow', 'title_a', 'title_b', 'lede', 'note']) {
        expect(typeof c[key]).toBe('string');
        expect(c[key].trim()).not.toBe('');
      }
    }
  });

  it('is translated, not the Uzbek fallback repeated', () => {
    const ledes = LOCALES.map((l) => clientsPageFor(l).lede);
    expect(new Set(ledes).size).toBe(ledes.length);
  });

  it('has a nav label and a footer link for every locale', () => {
    for (const lang of LOCALES) {
      expect(I18N[lang]?.nav?.clients).toBeTruthy();
      // Footer.jsx maps companyLinks by index onto ['/about','/clients','/careers','/blog'].
      expect(LOCALE[lang].footer.companyLinks).toHaveLength(4);
    }
  });

  it('renders only venue-approved quotes', () => {
    for (const lang of LOCALES) {
      const { list } = testimonialsFor(lang);
      expect(list.length).toBeGreaterThan(0);
      for (const t of list) expect(t.approved).toBeTruthy();
    }
  });
});

// The ROI line is the only arithmetic the pricing section asserts to a buyer,
// and it was wrong once: it took two percent OF THE FOOD SPEND (2% x 33.4M =
// ~660k) when "two points of food cost" means two percent OF REVENUE (2% x 88M
// = 1.76M). Understated the saving 2.7x. Pin the derivation and the figures.
describe('pricing ROI claim', () => {
  const REVENUE = 88_000_000;
  const FROM = 0.38;
  const TO = 0.36;

  it('derives the figures the copy quotes', () => {
    expect(REVENUE * FROM).toBeCloseTo(33_440_000, 0);          // 33.4M on food
    expect(REVENUE * FROM - REVENUE * TO).toBeCloseTo(1_760_000, 0); // 1.76M/mo
    expect((REVENUE * FROM - REVENUE * TO) * 12).toBeCloseTo(21_120_000, 0); // 21M/yr
  });

  it('still beats a year of the Service tier plus setup', () => {
    const yearOneCost = 600_000 * 12 + 2_000_000;
    const yearOneSaving = (REVENUE * FROM - REVENUE * TO) * 12;
    expect(yearOneCost).toBe(9_200_000);
    expect(yearOneSaving / yearOneCost).toBeGreaterThan(2);
  });

  it('quotes those figures in every locale, and never the old 660,000', () => {
    for (const lang of LOCALES) {
      const roi = LOCALE[lang].pricing.roi;
      expect(roi).toMatch(/33[.,]4/);   // food spend at 38%
      expect(roi).toMatch(/1[.,]76/);   // monthly saving
      expect(roi).toMatch(/21/);        // annual saving
      expect(roi).not.toMatch(/660/);   // the 2%-of-food-spend error
    }
  });

  it('states the payback in every locale, naming that tier as its card does', () => {
    for (const lang of LOCALES) {
      const payback = LOCALE[lang].pricing.payback;
      expect(typeof payback).toBe('string');
      expect(payback).toMatch(/9[.,]2/);   // year-one cost
      expect(payback).toMatch(/2[.,]3/);   // the multiple
      // The tier named in the line must be the tier priced at 600,000 above it.
      expect(payback).toContain(LOCALE[lang].pricing.tiers[1].name);
    }
  });
});
