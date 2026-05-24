/**
 * E2E — requires a running Next.js server.
 * Started automatically via globalSetup in jest.config.js (see e2e.global-setup.js).
 * Uses a separate temp SQLite DB so production data is never touched.
 */

const BASE = process.env.E2E_BASE_URL || 'http://localhost:3001';

async function api(path, { method = 'GET', body } = {}) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  return { status: res.status, body: await res.json() };
}

describe('E2E — /api/demos', () => {
  test('POST creates a demo request', async () => {
    const { status, body } = await api('/api/demos', {
      method: 'POST',
      body: { name: 'E2E User', phone: '+998900000000', company: 'E2E Cafe', lang: 'en' },
    });
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.id).toBeGreaterThan(0);
  });

  test('GET returns demo requests list', async () => {
    const { status, body } = await api('/api/demos');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST rejects missing fields', async () => {
    const { status } = await api('/api/demos', { method: 'POST', body: { name: 'Only Name' } });
    expect(status).toBe(400);
  });
});

describe('E2E — /api/newsletter', () => {
  const email = `e2e-${Date.now()}@test.com`;

  test('POST subscribes email', async () => {
    const { status, body } = await api('/api/newsletter', { method: 'POST', body: { email } });
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.duplicate).toBeUndefined();
  });

  test('POST returns duplicate:true on second subscribe', async () => {
    const { body } = await api('/api/newsletter', { method: 'POST', body: { email } });
    expect(body.duplicate).toBe(true);
  });

  test('POST rejects invalid email', async () => {
    const { status } = await api('/api/newsletter', { method: 'POST', body: { email: 'bad' } });
    expect(status).toBe(400);
  });
});

describe('E2E — /api/events', () => {
  test('POST stores event', async () => {
    const { status, body } = await api('/api/events', {
      method: 'POST',
      body: { event_type: 'demo_open', lang: 'en', data: { source: 'e2e' } },
    });
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
  });

  test('GET returns event list', async () => {
    const { status, body } = await api('/api/events');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET ?type filters results', async () => {
    const { body } = await api('/api/events?type=demo_open');
    expect(body.every(e => e.event_type === 'demo_open')).toBe(true);
  });

  test('POST rejects unknown event_type', async () => {
    const { status } = await api('/api/events', { method: 'POST', body: { event_type: 'unknown' } });
    expect(status).toBe(400);
  });
});

describe('E2E — /api/vacancies CRUD', () => {
  let id;

  test('POST creates vacancy', async () => {
    const { status, body } = await api('/api/vacancies', {
      method: 'POST',
      body: { title: 'E2E Engineer', department: 'Engineering', location: 'Remote' },
    });
    expect(status).toBe(201);
    expect(body.status).toBe('open');
    id = body.id;
  });

  test('GET lists vacancies', async () => {
    const { body } = await api('/api/vacancies');
    expect(body.some(v => v.id === id)).toBe(true);
  });

  test('GET /:id fetches single vacancy', async () => {
    const { status, body } = await api(`/api/vacancies/${id}`);
    expect(status).toBe(200);
    expect(body.title).toBe('E2E Engineer');
  });

  test('PUT /:id updates fields', async () => {
    const { status, body } = await api(`/api/vacancies/${id}`, {
      method: 'PUT',
      body: { title: 'E2E Senior Engineer', status: 'closed' },
    });
    expect(status).toBe(200);
    expect(body.title).toBe('E2E Senior Engineer');
    expect(body.status).toBe('closed');
  });

  test('DELETE /:id removes it', async () => {
    const { status } = await api(`/api/vacancies/${id}`, { method: 'DELETE' });
    expect(status).toBe(200);
    const { status: check } = await api(`/api/vacancies/${id}`);
    expect(check).toBe(404);
  });
});

describe('E2E — /api/posts CRUD', () => {
  let draftId, publishedId;

  test('POST creates draft (no Telegram since no token set)', async () => {
    const { status, body } = await api('/api/posts', {
      method: 'POST',
      body: { title: 'E2E Draft Post', excerpt: 'Draft excerpt', category: 'Ops', glyph: 'O', color: 'b1', read_time: 3 },
    });
    expect(status).toBe(201);
    expect(body.status).toBe('draft');
    expect(body.published_at).toBeNull();
    draftId = body.id;
  });

  test('POST creates published post', async () => {
    const { status, body } = await api('/api/posts', {
      method: 'POST',
      body: { title: 'E2E Published Post', status: 'published', category: 'Kitchen', glyph: 'K', color: 'b2', read_time: 5 },
    });
    expect(status).toBe(201);
    expect(body.status).toBe('published');
    expect(body.published_at).not.toBeNull();
    publishedId = body.id;
  });

  test('GET ?status=published returns only published', async () => {
    const { body } = await api('/api/posts?status=published');
    expect(body.some(p => p.id === publishedId)).toBe(true);
    expect(body.every(p => p.status === 'published')).toBe(true);
  });

  test('PUT /:id transitions draft to published', async () => {
    const { status, body } = await api(`/api/posts/${draftId}`, {
      method: 'PUT',
      body: { status: 'published' },
    });
    expect(status).toBe(200);
    expect(body.status).toBe('published');
    expect(body.published_at).not.toBeNull();
  });

  test('GET /:id returns correct post', async () => {
    const { status, body } = await api(`/api/posts/${publishedId}`);
    expect(status).toBe(200);
    expect(body.title).toBe('E2E Published Post');
  });

  test('DELETE /:id removes post', async () => {
    await api(`/api/posts/${publishedId}`, { method: 'DELETE' });
    const { status } = await api(`/api/posts/${publishedId}`);
    expect(status).toBe(404);
  });

  test('404 on non-existent post', async () => {
    const { status } = await api('/api/posts/99999');
    expect(status).toBe(404);
  });
});
