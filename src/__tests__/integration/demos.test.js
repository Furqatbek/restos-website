import { POST, GET } from '@/app/api/demos/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(clearAll);

describe('POST /api/demos', () => {
  const valid = { name: 'Dilnoza R.', phone: '+998712000000', company: 'Chinor Bistro' };

  test('201 — creates demo request with required fields', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: valid }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(typeof data.id).toBe('number');
  });

  test('saves name, phone, company correctly', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: valid }));
    const { id } = await res.json();
    const row = (await (await GET()).json()).find(r => r.id === id);
    expect(row.name).toBe('Dilnoza R.');
    expect(row.phone).toBe('+998712000000');
    expect(row.company).toBe('Chinor Bistro');
  });

  test('saves lang when provided', async () => {
    await POST(req('/api/demos', { method: 'POST', body: { ...valid, lang: 'ru' } }));
    const rows = await (await GET()).json();
    expect(rows[0].lang).toBe('ru');
  });

  test('defaults lang to en', async () => {
    await POST(req('/api/demos', { method: 'POST', body: valid }));
    const rows = await (await GET()).json();
    expect(rows[0].lang).toBe('en');
  });

  test('saves optional source field', async () => {
    await POST(req('/api/demos', { method: 'POST', body: { ...valid, source: 'hero' } }));
    const rows = await (await GET()).json();
    expect(rows[0].source).toBe('hero');
  });

  test('trims whitespace from fields', async () => {
    await POST(req('/api/demos', { method: 'POST', body: { name: '  Ali  ', phone: ' +998 ', company: '  Bistro  ' } }));
    const rows = await (await GET()).json();
    expect(rows[0].name).toBe('Ali');
    expect(rows[0].company).toBe('Bistro');
  });

  test('400 — missing name', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: { phone: '+998', company: 'Co' } }));
    expect(res.status).toBe(400);
  });

  test('400 — missing phone', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: { name: 'Ali', company: 'Co' } }));
    expect(res.status).toBe(400);
  });

  test('400 — missing company', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: { name: 'Ali', phone: '+998' } }));
    expect(res.status).toBe(400);
  });

  test('400 — empty string treated as missing', async () => {
    const res = await POST(req('/api/demos', { method: 'POST', body: { name: '', phone: '+998', company: 'Co' } }));
    expect(res.status).toBe(400);
  });
});

describe('GET /api/demos', () => {
  test('returns empty array initially', async () => {
    const data = await (await GET()).json();
    expect(data).toEqual([]);
  });

  test('returns all submitted requests newest-first', async () => {
    const valid = { name: 'A', phone: '+1', company: 'X' };
    await POST(req('/api/demos', { method: 'POST', body: { ...valid, name: 'First' } }));
    await POST(req('/api/demos', { method: 'POST', body: { ...valid, name: 'Second' } }));
    const data = await (await GET()).json();
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('Second');
    expect(data[1].name).toBe('First');
  });
});
