import { LOCALE } from '@/lib/locale-extras';
import { LOCALES } from '@/lib/locale';
import { CLIENTS_PAGE, clientsPageFor, testimonialsFor } from '@/lib/testimonials';
import fs from 'fs';
import path from 'path';
import {
  MONTHLY_UZS, SETUP_UZS, yearOneCost, groupUZS, commaUZS,
  offerLowPrice, offerHighPrice, priceRangeLabel, setupFeeSentence, llmsPricingLine,
} from '@/lib/pricing';
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
    const yearOneSaving = (REVENUE * FROM - REVENUE * TO) * 12;
    expect(yearOneCost('service')).toBe(9_200_000);
    expect(yearOneSaving / yearOneCost('service')).toBeGreaterThan(2);
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
      // The tier named in the line must be the tier priced above it.
      expect(payback).toContain(LOCALE[lang].pricing.tiers[1].name);
    }
  });

  // The payback copy restates the price in five languages by hand, so a reprice
  // would otherwise leave the cards right and the sentence under them wrong.
  // Every figure below is DERIVED from src/lib/pricing.js — the same module the
  // cards render from — so changing a price fails this test instead of shipping
  // a stale claim.
  it('quotes figures derived from the published price, not stale literals', () => {
    const cost = yearOneCost('service');                           // 9 200 000
    const costMln = (cost / 1_000_000).toFixed(1);                 // "9.2"
    const saving = (REVENUE * FROM - REVENUE * TO) * 12;           // 21 120 000
    const ratio = (saving / cost).toFixed(1);                      // "2.3"

    // Locales group thousands differently ("600 000" vs "600,000") and some
    // use a comma decimal, so compare on the digits rather than the typography
    // — this is checking the price, not the formatting.
    const ungroup = (str) => str.replace(/(?<=\d)[\s\u00a0,](?=\d{3}\b)/g, '');
    const decimal = (x) => new RegExp(x.replace('.', '[.,]'));

    for (const lang of LOCALES) {
      const payback = LOCALE[lang].pricing.payback;
      expect(ungroup(payback)).toContain(String(MONTHLY_UZS.service));
      expect(payback).toMatch(decimal(costMln));
      expect(payback).toMatch(decimal(ratio));
    }
  });

  // Deliberately NOT asserting MONTHLY_UZS === 600_000: that restates the price
  // rather than checking anything, and would fail on a correct reprice where
  // the copy was updated too. The derived test above fails only when the cards
  // and the sentence under them actually disagree.
  it('groups a sum the way the cards render it', () => {
    expect(groupUZS(300_000)).toBe('300 000');
    expect(groupUZS(2_000_000)).toBe('2 000 000');
    expect(groupUZS(600)).toBe('600');
  });
});

// The price was stated in four more places than the pricing cards: two
// AggregateOffer nodes, a LocalBusiness priceRange and the llms.txt brief. A
// reprice updated the cards and left those telling search engines and AI
// assistants the old number. They all derive from pricing.js now; these tests
// keep it that way.
describe('published price, everywhere it is stated', () => {
  it('builds the structured-data values from the tier prices', () => {
    expect(offerLowPrice()).toBe(String(MONTHLY_UZS.counter));
    expect(offerHighPrice()).toBe(String(MONTHLY_UZS.service));
    expect(priceRangeLabel()).toContain(String(MONTHLY_UZS.counter));
    expect(priceRangeLabel()).toContain(String(MONTHLY_UZS.service));
    // schema.org wants bare integers — no grouping, no currency in the number.
    expect(offerLowPrice()).toMatch(/^\d+$/);
    expect(offerHighPrice()).toMatch(/^\d+$/);
  });

  it('builds the prose figures from the same numbers', () => {
    expect(commaUZS(300_000)).toBe('300,000');
    expect(commaUZS(2_000_000)).toBe('2,000,000');
    expect(setupFeeSentence()).toContain(commaUZS(SETUP_UZS));
    expect(llmsPricingLine()).toContain(commaUZS(MONTHLY_UZS.counter));
    expect(llmsPricingLine()).toContain(commaUZS(MONTHLY_UZS.service));
  });

  it('keeps the year-one cost consistent with both tier prices', () => {
    expect(yearOneCost('counter')).toBe(MONTHLY_UZS.counter * 12 + SETUP_UZS);
    expect(yearOneCost('service')).toBe(MONTHLY_UZS.service * 12 + SETUP_UZS);
  });

  // Guard against someone pasting a price back in rather than importing it.
  it('no page hardcodes a price that pricing.js owns', () => {
    const files = [
      'src/app/[lang]/layout.js',
      'src/app/[lang]/[slug]/page.js',
      'src/app/llms.txt/route.js',
      'src/components/Pricing.jsx',
    ];
    const owned = [MONTHLY_UZS.counter, MONTHLY_UZS.service, SETUP_UZS];
    for (const file of files) {
      const src = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
      for (const n of owned) {
        // Any grouping style: 600000, 600 000, 600,000.
        const pattern = new RegExp(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '[\\s,]?'));
        expect({ file, n, hit: pattern.test(src) }).toEqual({ file, n, hit: false });
      }
    }
  });
});
