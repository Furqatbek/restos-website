import { privacyContent, PRIVACY_LANGS, STATS_RETENTION_MONTHS, LEAD_RETENTION_YEARS } from '@/lib/privacy';

describe('privacy policy', () => {
  const all = PRIVACY_LANGS.map((l) => [l, privacyContent(l)]);

  it('says the same thing in every language', () => {
    const shape = (c) => c.sections.map((s) => [(s.paras || []).length, (s.list || []).length]);
    const [, first] = all[0];
    for (const [, c] of all) expect(shape(c)).toEqual(shape(first));
  });

  // These are facts about the code; if one stops being true, so does the policy.
  it('states the retention periods the code enforces', () => {
    for (const [, c] of all) {
      const text = JSON.stringify(c);
      expect(text).toContain(String(STATS_RETENTION_MONTHS));
      expect(text).toContain(String(LEAD_RETENTION_YEARS));
    }
  });

  it('discloses that leads pass through Telegram', () => {
    for (const [, c] of all) expect(JSON.stringify(c)).toMatch(/Telegram/);
  });

  it('falls back to Uzbek for languages without their own text', () => {
    expect(privacyContent('kaa').title).toBe(privacyContent('uz').title);
  });
});
