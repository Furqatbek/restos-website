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
