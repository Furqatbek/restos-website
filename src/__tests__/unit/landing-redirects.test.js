import { landingRedirect, landingSwitchPath } from '@/lib/landing-pages';

// Search Console reported 404s for landing pages under the wrong language
// prefix; these must redirect to where the page lives.
describe('landing pages under the wrong language', () => {
  it('goes to the translation when there is one', () => {
    expect(landingRedirect('uz', 'pos-sistema-dlya-kafe-i-restoranov')).toBe('/uz/kafe-va-restoranlar-uchun-pos-tizimi');
    expect(landingRedirect('ru', 'restoran-avtomatizatsiyasi')).toBe('/ru/avtomatizatsiya-restorana');
  });
  it('goes to the page in its own language when there is no translation', () => {
    expect(landingRedirect('en', 'kafe-uchun-dastur')).toBe('/uz/kafe-uchun-dastur');
    expect(landingRedirect('uz', 'programma-skladskogo-ucheta-dlya-restorana')).toBe('/ru/programma-skladskogo-ucheta-dlya-restorana');
  });
  it('leaves correct addresses and other pages alone', () => {
    expect(landingRedirect('uz', 'kafe-uchun-dastur')).toBeNull();
    expect(landingRedirect('uz', 'about')).toBeNull();
  });
});

describe('language switcher on a landing page', () => {
  it('opens the translation, or that language\'s homepage', () => {
    expect(landingSwitchPath('ru', 'uz', 'pos-sistema-dlya-kafe-i-restoranov')).toBe('/uz/kafe-va-restoranlar-uchun-pos-tizimi');
    expect(landingSwitchPath('uz', 'en', 'kafe-uchun-dastur')).toBe('/en');
    expect(landingSwitchPath('uz', 'ru', 'about')).toBeNull();
  });
});
