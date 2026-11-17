import { GET } from '@/app/api/funnel/route';
import { POST } from '@/app/api/events/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(() => clearAll());

describe('GET /api/funnel', () => {
  test('401 without the owner token', async () => {
    expect((await GET(req('/api/funnel', { admin: false }))).status).toBe(401);
  });

  test('reports recorded visits as JSON', async () => {
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'page_view', data: { path: '/uz', source: 'direct', medium: 'none' }, session_id: 'v1' } }));
    await POST(req('/api/events', { method: 'POST', body: { event_type: 'generate_lead', data: { form: 'demo' }, session_id: 'v1' } }));
    const body = await (await GET(req('/api/funnel?format=json'))).json();
    expect(body.visits).toBe(1);
    expect(body.steps.find((s) => s.key === 'lead').count).toBe(1);
  });

  test('renders an HTML page that is never indexed', async () => {
    const res = await GET(req('/api/funnel?days=7'));
    expect(res.headers.get('content-type')).toMatch(/text\/html/);
    expect(res.headers.get('x-robots-tag')).toMatch(/noindex/);
    expect(await res.text()).toContain('Where visitors leave');
  });
});
