import { POST, GET } from '@/app/api/newsletter/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(clearAll);

describe('POST /api/newsletter', () => {
  test('200 — subscribes valid email', async () => {
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'owner@bistro.uz' } }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(typeof data.id).toBe('number');
    expect(data.duplicate).toBeUndefined();
  });

  test('stores email lowercased', async () => {
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'Owner@Bistro.UZ' } }));
    const rows = await (await GET()).json();
    expect(rows[0].email).toBe('owner@bistro.uz');
  });

  test('stores lang', async () => {
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'a@b.com', lang: 'ru' } }));
    const rows = await (await GET()).json();
    expect(rows[0].lang).toBe('ru');
  });

  test('200 with duplicate:true on second identical email', async () => {
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'dup@test.com' } }));
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'dup@test.com' } }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.duplicate).toBe(true);
  });

  test('duplicate check is case-insensitive', async () => {
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'case@test.com' } }));
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'CASE@TEST.COM' } }));
    const data = await res.json();
    expect(data.duplicate).toBe(true);
  });

  test('400 — missing email', async () => {
    const res = await POST(req('/api/newsletter', { method: 'POST', body: {} }));
    expect(res.status).toBe(400);
  });

  test('400 — invalid email format (no @)', async () => {
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'notanemail' } }));
    expect(res.status).toBe(400);
  });

  test('400 — invalid email format (no domain)', async () => {
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'a@' } }));
    expect(res.status).toBe(400);
  });
});

describe('GET /api/newsletter', () => {
  test('returns empty array initially', async () => {
    expect(await (await GET()).json()).toEqual([]);
  });

  test('returns all subscribers', async () => {
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'a@x.com' } }));
    await POST(req('/api/newsletter', { method: 'POST', body: { email: 'b@x.com' } }));
    const data = await (await GET()).json();
    expect(data).toHaveLength(2);
  });
});
