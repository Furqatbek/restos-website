import { GET as LIST, POST as CREATE } from '@/app/api/posts/route';
import { GET, PUT, DELETE } from '@/app/api/posts/[id]/route';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

jest.mock('@/lib/telegram', () => ({
  publishToTelegram: jest.fn().mockResolvedValue(undefined),
}));
import { publishToTelegram } from '@/lib/telegram';

beforeEach(() => {
  clearAll();
  publishToTelegram.mockClear();
});

const VALID = { title: 'How we cut food cost 3 points.', excerpt: 'The system, the metrics.', category: 'Food cost', glyph: 'F', color: 'b4', read_time: 7 };

async function create(body = VALID) {
  const res = await CREATE(req('/api/posts', { method: 'POST', body }));
  return res.json();
}

describe('POST /api/posts', () => {
  test('201 — creates draft, returns full row', async () => {
    const res = await CREATE(req('/api/posts', { method: 'POST', body: VALID }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.id).toBeDefined();
    expect(data.status).toBe('draft');
    expect(data.published_at).toBeNull();
  });

  test('draft creation does NOT trigger Telegram', async () => {
    await create();
    expect(publishToTelegram).not.toHaveBeenCalled();
  });

  test('published creation sets published_at', async () => {
    const data = await create({ ...VALID, status: 'published' });
    expect(data.status).toBe('published');
    expect(data.published_at).not.toBeNull();
  });

  test('published creation DOES trigger Telegram', async () => {
    await create({ ...VALID, status: 'published' });
    expect(publishToTelegram).toHaveBeenCalledTimes(1);
    expect(publishToTelegram).toHaveBeenCalledWith(expect.objectContaining({ title: VALID.title, status: 'published' }));
  });

  test('featured flag is stored correctly', async () => {
    const data = await create({ ...VALID, featured: true, status: 'published' });
    expect(data.featured).toBe(1);
  });

  test('400 — missing title', async () => {
    const res = await CREATE(req('/api/posts', { method: 'POST', body: { excerpt: 'oops' } }));
    expect(res.status).toBe(400);
  });

  test('400 — invalid status', async () => {
    const res = await CREATE(req('/api/posts', { method: 'POST', body: { ...VALID, status: 'live' } }));
    expect(res.status).toBe(400);
  });

  test('saves lang', async () => {
    const data = await create({ ...VALID, lang: 'uz' });
    expect(data.lang).toBe('uz');
  });
});

describe('GET /api/posts', () => {
  test('returns empty array initially', async () => {
    expect(await (await LIST(req('/api/posts'))).json()).toEqual([]);
  });

  test('?status=published returns only published', async () => {
    await create();
    await create({ ...VALID, status: 'published', title: 'Published' });
    const data = await (await LIST(req('/api/posts?status=published'))).json();
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe('Published');
  });

  test('?lang filters by language', async () => {
    await create({ ...VALID, lang: 'en' });
    await create({ ...VALID, lang: 'ru' });
    const data = await (await LIST(req('/api/posts?lang=ru'))).json();
    expect(data).toHaveLength(1);
  });

  test('?featured=true filters featured posts', async () => {
    await create({ ...VALID, featured: true, status: 'published' });
    await create({ ...VALID, featured: false, status: 'published', title: 'Regular' });
    const data = await (await LIST(req('/api/posts?featured=true'))).json();
    expect(data).toHaveLength(1);
    expect(data[0].featured).toBe(1);
  });

  test('?limit caps results', async () => {
    for (let i = 0; i < 4; i++) await create({ ...VALID, title: `Post ${i}`, status: 'published' });
    const data = await (await LIST(req('/api/posts?limit=2'))).json();
    expect(data).toHaveLength(2);
  });
});

describe('GET /api/posts/:id', () => {
  test('returns the post', async () => {
    const { id } = await create();
    const res = await GET(req(`/api/posts/${id}`), { params: { id: String(id) } });
    expect(res.status).toBe(200);
    expect((await res.json()).id).toBe(id);
  });

  test('404 for unknown id', async () => {
    const res = await GET(req('/api/posts/99999'), { params: { id: '99999' } });
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/posts/:id — Telegram trigger logic', () => {
  test('draft → published triggers Telegram once', async () => {
    const { id } = await create(); // draft, no Telegram
    expect(publishToTelegram).not.toHaveBeenCalled();

    await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { status: 'published' } }),
      { params: { id: String(id) } }
    );
    expect(publishToTelegram).toHaveBeenCalledTimes(1);
  });

  test('published → published update does NOT retrigger Telegram', async () => {
    const { id } = await create({ ...VALID, status: 'published' });
    publishToTelegram.mockClear();

    await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { excerpt: 'Updated excerpt' } }),
      { params: { id: String(id) } }
    );
    expect(publishToTelegram).not.toHaveBeenCalled();
  });

  test('sets published_at when transitioning to published', async () => {
    const { id } = await create();
    const res = await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { status: 'published' } }),
      { params: { id: String(id) } }
    );
    const data = await res.json();
    expect(data.published_at).not.toBeNull();
  });

  test('clears published_at when reverting to draft', async () => {
    const { id } = await create({ ...VALID, status: 'published' });
    const res = await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { status: 'draft' } }),
      { params: { id: String(id) } }
    );
    expect((await res.json()).published_at).toBeNull();
  });

  test('partial update preserves unchanged fields', async () => {
    const { id } = await create({ ...VALID, color: 'b3' });
    await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { title: 'New Title' } }),
      { params: { id: String(id) } }
    );
    const { color } = await (await GET(req(`/api/posts/${id}`), { params: { id: String(id) } })).json();
    expect(color).toBe('b3');
  });

  test('400 — invalid status', async () => {
    const { id } = await create();
    const res = await PUT(
      req(`/api/posts/${id}`, { method: 'PUT', body: { status: 'archived' } }),
      { params: { id: String(id) } }
    );
    expect(res.status).toBe(400);
  });

  test('404 for unknown id', async () => {
    const res = await PUT(
      req('/api/posts/99999', { method: 'PUT', body: { title: 'X' } }),
      { params: { id: '99999' } }
    );
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/posts/:id', () => {
  test('removes the post', async () => {
    const { id } = await create();
    const res = await DELETE(req(`/api/posts/${id}`, { method: 'DELETE' }), { params: { id: String(id) } });
    expect(res.status).toBe(200);
    const check = await GET(req(`/api/posts/${id}`), { params: { id: String(id) } });
    expect(check.status).toBe(404);
  });

  test('404 for unknown id', async () => {
    const res = await DELETE(req('/api/posts/99999', { method: 'DELETE' }), { params: { id: '99999' } });
    expect(res.status).toBe(404);
  });
});
