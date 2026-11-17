import { buildFunnel } from '@/lib/funnel';

const ev = (session_id, event_type, data = {}, lang = 'uz') => ({ session_id, event_type, data: JSON.stringify(data), lang });

// Three visits: one from Instagram that leaves a number, one that reads to the
// prices and leaves, one that opens the form and gives up on the phone field.
const ROWS = [
  ev('a', 'page_view', { path: '/uz', source: 'instagram', medium: 'paid', campaign: 'launch' }),
  ev('a', 'scroll_depth', { percent: 50 }),
  ev('a', 'section_view', { section: 'pricing' }),
  ev('a', 'cta_click', { cta: 'foodcost', place: 'pricing_service' }),
  ev('a', 'form_open', { form: 'foodcost' }),
  ev('a', 'form_start', { form: 'foodcost' }),
  ev('a', 'generate_lead', { form: 'foodcost', cta: 'pricing_service' }),

  ev('b', 'page_view', { path: '/uz', source: 'google', medium: 'referral' }),
  ev('b', 'scroll_depth', { percent: 50 }),
  ev('b', 'section_view', { section: 'pricing' }),
  ev('b', 'page_leave', { path: '/uz', percent: 75, seconds: 40, last_section: 'pricing' }),

  ev('c', 'page_view', { path: '/ru/modules/payments', source: 'direct', medium: 'none' }, 'ru'),
  ev('c', 'cta_click', { cta: 'demo', place: 'hero' }, 'ru'),
  ev('c', 'form_open', { form: 'demo' }, 'ru'),
  ev('c', 'form_start', { form: 'demo' }, 'ru'),
  ev('c', 'form_close', { form: 'demo', stage: 'started', last_field: 'phone', fields: 2 }, 'ru'),
  ev('c', 'page_leave', { path: '/ru/modules/payments', percent: 25, seconds: 12 }, 'ru'),

  // Old rows from before page_view existed: ignored.
  ev('old', 'demo_open'),
];

describe('funnel report', () => {
  const r = buildFunnel(ROWS);
  const count = (key) => r.steps.find((s) => s.key === key).count;

  it('counts visits at each step', () => {
    expect(r.visits).toBe(3);
    expect(count('scrolled')).toBe(2);
    expect(count('pricing')).toBe(2);
    expect(count('clicked')).toBe(2);
    expect(count('opened')).toBe(2);
    expect(count('started')).toBe(2);
    expect(count('lead')).toBe(1);
  });

  it('says where the visits that produced nothing stopped', () => {
    expect(r.noResult.visits).toBe(2);
    expect(r.noResult.pages).toEqual(expect.arrayContaining([['/uz', 1], ['/ru/modules/payments', 1]]));
    expect(r.noResult.sections).toEqual([['pricing', 1]]);
    expect(r.abandonField).toEqual([['demo · phone', 1]]);
    expect(r.forms.demo).toMatchObject({ opened: 1, started: 1, sent: 0, gaveUp: 1 });
    expect(r.forms.foodcost).toMatchObject({ opened: 1, sent: 1 });
  });

  it('credits the lead to its source and button', () => {
    const ig = r.sources.find((s) => s.source === 'instagram / paid / launch');
    expect(ig).toMatchObject({ visits: 1, leads: 1, conversion: 100 });
    expect(r.ctaLeads).toEqual([['foodcost · pricing_service', 1]]);
  });

  it('copes with no data', () => {
    expect(buildFunnel([]).visits).toBe(0);
  });
});
