import { POST, GET } from '@/app/api/newsletter/route';
import db from '@/lib/db';
import { clearAll } from '../helpers/db';
import { req } from '../helpers/request';

beforeEach(clearAll);

// The email signup promised a monthly email that was never sent, so it was
// closed. It must not take new addresses.
describe('POST /api/newsletter', () => {
  test('410 and nothing stored', async () => {
    const res = await POST(req('/api/newsletter', { method: 'POST', body: { email: 'owner@bistro.uz' } }));
    expect(res.status).toBe(410);
    expect(db.prepare('SELECT COUNT(*) n FROM newsletter').get().n).toBe(0);
  });
});

describe('GET /api/newsletter', () => {
  test('owner can still read addresses collected before', async () => {
    db.prepare("INSERT INTO newsletter (email, lang) VALUES ('old@bistro.uz', 'ru')").run();
    const rows = await (await GET(req('/api/newsletter'))).json();
    expect(rows.map((r) => r.email)).toEqual(['old@bistro.uz']);
  });

  test('401 without the owner token', async () => {
    expect((await GET(req('/api/newsletter', { admin: false }))).status).toBe(401);
  });
});
