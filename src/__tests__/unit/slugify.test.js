import { slugify, uniqueSlug } from '@/lib/slugify';

describe('slugify', () => {
  it('transliterates Russian Cyrillic to a latin slug', () => {
    expect(slugify('Как снизить фудкост в ресторане')).toBe('kak-snizit-fudkost-v-restorane');
  });

  it('handles Uzbek Cyrillic', () => {
    expect(slugify('Ресторан бошқарув тизими')).toBe('restoran-boshqaruv-tizimi');
  });

  it('lowercases and hyphenates latin titles', () => {
    expect(slugify('How We Cut Food Cost 3 Points')).toBe('how-we-cut-food-cost-3-points');
  });

  it('strips punctuation and collapses separators', () => {
    expect(slugify('POS — система: для кафе!!!')).toBe('pos-sistema-dlya-kafe');
  });

  it('falls back to "post" for empty/symbol-only input', () => {
    expect(slugify('')).toBe('post');
    expect(slugify('!!!')).toBe('post');
  });

  it('uniqueSlug appends a counter on collision', () => {
    const taken = new Set(['food-cost', 'food-cost-2']);
    expect(uniqueSlug('food-cost', (s) => taken.has(s))).toBe('food-cost-3');
    expect(uniqueSlug('fresh', (s) => taken.has(s))).toBe('fresh');
  });
});
