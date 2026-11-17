import { POST, GET } from '@/app/api/events/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(clearAll);

const VALID_TYPES = ['demo_open', 'demo_close', 'module_view', 'pricing_toggle', 'lang_change', 'filter_select'];

describe('POST /api/events', () => {
  test.each(VALID_TYPES)('200 — accepts event_type "%s"', async (event_type) => {
    const res = await POST(req('/api/events', { method: 'POST', body: { event_type } }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  test('saves data as JSON', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'module_view', data: { module: 'pos' } } }));
    const rows = await (await GET(req('/api/events?type=module_view'))).json();
    expect(rows[0].data).toEqual({ module: 'pos' });
  });

  test('saves lang and session_id', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'lang_change', lang: 'ru', session_id: 'sess-123' } }));
    const rows = await (await GET(req('/api/events'))).json();
    expect(rows[0].lang).toBe('ru');
    expect(rows[0].session_id).toBe('sess-123');
  });

  test('400 — missing event_type', async () => {
    const res = await POST(req('/api/events', { method: 'POST', body: { data: {} } }));
    expect(res.status).toBe(400);
  });

  test('400 — unknown event_type is rejected', async () => {
    const res = await POST(req('/api/events', { method: 'POST', body: { event_type: 'buy_now' } }));
    expect(res.status).toBe(400);
  });

  test('null data is stored as null', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'demo_open' } }));
    const rows = await (await GET(req('/api/events'))).json();
    expect(rows[0].data).toBeNull();
  });
});

describe('GET /api/events', () => {
  test('returns empty array initially', async () => {
    expect(await (await GET(req('/api/events'))).json()).toEqual([]);
  });

  test('?type filters by event_type', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'demo_open' } }));
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'module_view', data: { module: 'pos' } } }));

    const demos = await (await GET(req('/api/events?type=demo_open'))).json();
    expect(demos).toHaveLength(1);
    expect(demos[0].event_type).toBe('demo_open');

    const views = await (await GET(req('/api/events?type=module_view'))).json();
    expect(views).toHaveLength(1);
  });

  test('?limit caps results', async () => {
    for (let i = 0; i < 5; i++) {
      await POST(req('/api/events', { method: 'POST', body: { event_type: 'demo_open' } }));
    }
    const data = await (await GET(req('/api/events?limit=3'))).json();
    expect(data).toHaveLength(3);
  });

  test('returns newest events first', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'demo_open' } }));
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'module_view' } }));
    const data = await (await GET(req('/api/events'))).json();
    expect(data[0].event_type).toBe('module_view');
  });
});

describe('funnel events', () => {
  test('accepts the funnel event types', async () => {
    for (const t of ['page_view', 'section_view', 'scroll_depth', 'page_leave', 'cta_click', 'contact_click', 'form_open', 'form_start', 'form_field', 'form_error', 'form_close', 'generate_lead']) {
      const res = await POST(req('/api/events', { method: 'POST', body: { event_type: t, data: { path: '/uz' }, session_id: 's1' } }));
      expect(res.status).toBe(200);
    }
  });

  test('refuses oversized data', async () => {
    const res = await POST(req('/api/events', { method: 'POST', body: { event_type: 'page_view', data: { x: 'a'.repeat(2000) } } }));
    expect(res.status).toBe(413);
  });

  test('skips crawlers without storing them', async () => {
    const res = await POST(req('/api/events', { method: 'POST', body: { event_type: 'page_view' }, headers: { 'User-Agent': 'Googlebot/2.1' } }));
    expect((await res.json()).skipped).toBe('bot');
  });

  test('the event log needs the owner token', async () => {
    expect((await GET(req('/api/events', { admin: false }))).status).toBe(401);
  });
});
