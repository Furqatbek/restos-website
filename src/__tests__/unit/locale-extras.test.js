import { LOCALE } from '@/lib/locale-extras';
import { LOCALES } from '@/lib/locale';

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
