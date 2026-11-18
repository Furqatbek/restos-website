import { GET, PATCH, POST, DELETE } from '@/app/api/leads/route';
import { POST as DEMO } from '@/app/api/demos/route';
import { POST as FOOD } from '@/app/api/foodcost/route';
import db from '@/lib/db';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

jest.mock('@/lib/telegram', () => ({ notifyLead: jest.fn().mockResolvedValue(), notifyFoodCost: jest.fn().mockResolvedValue() }));

beforeEach(() => { clearAll(); db.exec('DELETE FROM foodcost_requests'); });

async function seed() {
  await DEMO(req('/api/demos', { method: 'POST', body: { name: 'Dilnoza', phone: '+998901112233', company: 'Chinor', source: 'form=demo; cta=hero; from=instagram/paid/launch; landing=/uz' } }));
  await FOOD(req('/api/foodcost', { method: 'POST', body: { phone: '+998 90 222 33 44', source: 'form=help; cta=help_card; from=direct/none; landing=/uz' } }));
}
const list = async () => (await GET(req('/api/leads?format=json'))).json();

describe('lead board', () => {
  test('every route needs the owner token', async () => {
    expect((await GET(req('/api/leads', { admin: false }))).status).toBe(401);
    expect((await PATCH(req('/api/leads', { method: 'PATCH', body: { table: 'demo', id: 1, status: 'won' }, admin: false }))).status).toBe(401);
    expect((await POST(req('/api/leads', { method: 'POST', body: { phone: '+998901234567' }, admin: false }))).status).toBe(401);
    expect((await DELETE(req('/api/leads', { method: 'DELETE', body: { table: 'demo', id: 1 }, admin: false }))).status).toBe(401);
  });

  test('new leads from the forms arrive as "new", labelled by form', async () => {
    await seed();
    const leads = await list();
    expect(leads.map((l) => [l.kind, l.status])).toEqual(expect.arrayContaining([['demo', 'new'], ['help', 'new']]));
    expect(leads.find((l) => l.kind === 'demo')).toMatchObject({ name: 'Dilnoza', venue: 'Chinor', from: 'instagram/paid/launch', cta: 'hero' });
  });

  test('moves a lead and saves a note', async () => {
    await seed();
    const demo = (await list()).find((l) => l.kind === 'demo');
    expect((await PATCH(req('/api/leads', { method: 'PATCH', body: { table: 'demo', id: demo.id, status: 'offer', notes: 'call Tuesday' } }))).status).toBe(200);
    expect((await list()).find((l) => l.kind === 'demo')).toMatchObject({ status: 'offer', notes: 'call Tuesday' });
  });

  test('refuses an unknown status or table', async () => {
    await seed();
    const demo = (await list()).find((l) => l.kind === 'demo');
    expect((await PATCH(req('/api/leads', { method: 'PATCH', body: { table: 'demo', id: demo.id, status: 'hot' } }))).status).toBe(400);
    expect((await PATCH(req('/api/leads', { method: 'PATCH', body: { table: 'posts', id: 1, status: 'won' } }))).status).toBe(400);
  });

  test('adds a lead by hand and deletes one', async () => {
    const res = await POST(req('/api/leads', { method: 'POST', body: { name: 'Aziz', phone: '90 333 44 55', venue: 'Kofe', via: 'instagram' } }));
    expect(res.status).toBe(400); // not a +998 number
    const ok = await POST(req('/api/leads', { method: 'POST', body: { name: 'Aziz', phone: '+998 90 333 44 55', venue: 'Kofe', via: 'instagram' } }));
    expect(ok.status).toBe(201);
    const manual = (await list()).find((l) => l.kind === 'manual');
    expect(manual).toMatchObject({ name: 'Aziz', phone: '+998903334455', from: 'instagram' });
    expect((await DELETE(req('/api/leads', { method: 'DELETE', body: { table: 'foodcost', id: manual.id } }))).status).toBe(200);
    expect((await list()).find((l) => l.kind === 'manual')).toBeUndefined();
  });

  test('escapes what visitors typed', async () => {
    await DEMO(req('/api/demos', { method: 'POST', body: { name: '<script>alert(1)</script>', phone: '+998901112233', company: '<img src=x onerror=alert(1)>' } }));
    const html = await (await GET(req('/api/leads'))).text();
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  test('shows when each lead will be deleted', async () => {
    await seed();
    expect((await list())[0].deletesOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
