import { GET as LIST, POST as CREATE } from '@/app/api/vacancies/route';
import { GET, PUT, DELETE } from '@/app/api/vacancies/[id]/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(clearAll);

const VALID = { title: 'Backend Engineer · Core ledger', department: 'Engineering', location: 'Tashkent / Almaty' };

async function create(body = VALID) {
  const res = await CREATE(req('/api/vacancies', { method: 'POST', body }));
  return res.json();
}

describe('POST /api/vacancies', () => {
  test('201 — creates and returns the full row', async () => {
    const res = await CREATE(req('/api/vacancies', { method: 'POST', body: VALID }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.id).toBeDefined();
    expect(data.title).toBe(VALID.title);
    expect(data.department).toBe(VALID.department);
    expect(data.location).toBe(VALID.location);
    expect(data.status).toBe('open');
    expect(data.lang).toBe('en');
  });

  test('saves optional description', async () => {
    const data = await create({ ...VALID, description: 'Full description text.' });
    expect(data.description).toBe('Full description text.');
  });

  test('saves lang', async () => {
    const data = await create({ ...VALID, lang: 'ru' });
    expect(data.lang).toBe('ru');
  });

  test('accepts status: closed', async () => {
    const data = await create({ ...VALID, status: 'closed' });
    expect(data.status).toBe('closed');
  });

  test('400 — missing title', async () => {
    const res = await CREATE(req('/api/vacancies', { method: 'POST', body: { department: 'Eng', location: 'Remote' } }));
    expect(res.status).toBe(400);
  });

  test('400 — missing department', async () => {
    const res = await CREATE(req('/api/vacancies', { method: 'POST', body: { title: 'T', location: 'Remote' } }));
    expect(res.status).toBe(400);
  });

  test('400 — missing location', async () => {
    const res = await CREATE(req('/api/vacancies', { method: 'POST', body: { title: 'T', department: 'D' } }));
    expect(res.status).toBe(400);
  });

  test('400 — invalid status value', async () => {
    const res = await CREATE(req('/api/vacancies', { method: 'POST', body: { ...VALID, status: 'pending' } }));
    expect(res.status).toBe(400);
  });
});

describe('GET /api/vacancies', () => {
  test('returns empty array initially', async () => {
    expect(await (await LIST(req('/api/vacancies'))).json()).toEqual([]);
  });

  test('returns all vacancies', async () => {
    await create();
    await create({ ...VALID, title: 'iOS Engineer' });
    const data = await (await LIST(req('/api/vacancies'))).json();
    expect(data).toHaveLength(2);
  });

  test('?lang filters by lang', async () => {
    await create({ ...VALID, lang: 'en' });
    await create({ ...VALID, lang: 'ru' });
    const data = await (await LIST(req('/api/vacancies?lang=ru'))).json();
    expect(data).toHaveLength(1);
    expect(data[0].lang).toBe('ru');
  });

  test('?status filters by status', async () => {
    await create({ ...VALID, status: 'open' });
    await create({ ...VALID, status: 'closed' });
    const open = await (await LIST(req('/api/vacancies?status=open'))).json();
    expect(open).toHaveLength(1);
    expect(open[0].status).toBe('open');
  });
});

describe('GET /api/vacancies/:id', () => {
  test('returns the vacancy', async () => {
    const { id } = await create();
    const res = await GET(req(`/api/vacancies/${id}`), { params: { id: String(id) } });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(id);
    expect(data.title).toBe(VALID.title);
  });

  test('404 for unknown id', async () => {
    const res = await GET(req('/api/vacancies/99999'), { params: { id: '99999' } });
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/vacancies/:id', () => {
  test('updates provided fields', async () => {
    const { id } = await create();
    const res = await PUT(
      req(`/api/vacancies/${id}`, { method: 'PUT', body: { title: 'Updated Title', status: 'closed' } }),
      { params: { id: String(id) } }
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.title).toBe('Updated Title');
    expect(data.status).toBe('closed');
    expect(data.department).toBe(VALID.department); // unchanged
  });

  test('partial update preserves other fields', async () => {
    const { id } = await create({ ...VALID, description: 'original desc' });
    await PUT(
      req(`/api/vacancies/${id}`, { method: 'PUT', body: { title: 'New Title' } }),
      { params: { id: String(id) } }
    );
    const res = await GET(req(`/api/vacancies/${id}`), { params: { id: String(id) } });
    const data = await res.json();
    expect(data.description).toBe('original desc');
  });

  test('400 — invalid status in update', async () => {
    const { id } = await create();
    const res = await PUT(
      req(`/api/vacancies/${id}`, { method: 'PUT', body: { status: 'archived' } }),
      { params: { id: String(id) } }
    );
    expect(res.status).toBe(400);
  });

  test('404 for unknown id', async () => {
    const res = await PUT(
      req('/api/vacancies/99999', { method: 'PUT', body: { title: 'X' } }),
      { params: { id: '99999' } }
    );
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/vacancies/:id', () => {
  test('deletes the vacancy and returns ok', async () => {
    const { id } = await create();
    const res = await DELETE(req(`/api/vacancies/${id}`, { method: 'DELETE' }), { params: { id: String(id) } });
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);

    const check = await GET(req(`/api/vacancies/${id}`), { params: { id: String(id) } });
    expect(check.status).toBe(404);
  });

  test('404 for unknown id', async () => {
    const res = await DELETE(req('/api/vacancies/99999', { method: 'DELETE' }), { params: { id: '99999' } });
    expect(res.status).toBe(404);
  });
});
