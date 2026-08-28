import { tables, db } from '../helpers/db';

describe('database — schema', () => {
  const EXPECTED = ['demo_requests', 'newsletter', 'events', 'vacancies', 'posts', 'foodcost_requests'];

  test('all expected tables exist', () => {
    expect(tables().sort()).toEqual(EXPECTED.sort());
  });

  test('foodcost_requests has required columns', () => {
    const cols = db.prepare('PRAGMA table_info(foodcost_requests)').all().map(c => c.name);
    expect(cols).toEqual(expect.arrayContaining([
      'id', 'phone', 'venue', 'contact', 'venues_count',
      'current_system', 'revenue_band', 'lang', 'created_at',
    ]));
  });

  test('demo_requests has required columns', () => {
    const cols = db.prepare('PRAGMA table_info(demo_requests)').all().map(c => c.name);
    expect(cols).toEqual(expect.arrayContaining(['id', 'name', 'phone', 'company', 'lang', 'source', 'ip', 'user_agent', 'created_at']));
  });

  test('newsletter enforces UNIQUE on email', () => {
    db.prepare("INSERT INTO newsletter (email) VALUES ('dup@test.com')").run();
    expect(() =>
      db.prepare("INSERT INTO newsletter (email) VALUES ('dup@test.com')").run()
    ).toThrow(/UNIQUE constraint/);
    db.prepare("DELETE FROM newsletter WHERE email='dup@test.com'").run();
  });

  test('vacancies status defaults to open', () => {
    const { lastInsertRowid } = db
      .prepare("INSERT INTO vacancies (title, department, location) VALUES ('T', 'D', 'L')")
      .run();
    const row = db.prepare('SELECT * FROM vacancies WHERE id=?').get(lastInsertRowid);
    expect(row.status).toBe('open');
    db.prepare('DELETE FROM vacancies WHERE id=?').run(lastInsertRowid);
  });

  test('posts status defaults to draft and featured to 0', () => {
    const { lastInsertRowid } = db
      .prepare("INSERT INTO posts (title) VALUES ('Test')")
      .run();
    const row = db.prepare('SELECT * FROM posts WHERE id=?').get(lastInsertRowid);
    expect(row.status).toBe('draft');
    expect(row.featured).toBe(0);
    db.prepare('DELETE FROM posts WHERE id=?').run(lastInsertRowid);
  });

  test('events data column accepts JSON strings', () => {
    const payload = JSON.stringify({ module: 'pos' });
    const { lastInsertRowid } = db
      .prepare("INSERT INTO events (event_type, data) VALUES ('module_view', ?)")
      .run(payload);
    const row = db.prepare('SELECT * FROM events WHERE id=?').get(lastInsertRowid);
    expect(JSON.parse(row.data)).toEqual({ module: 'pos' });
    db.prepare('DELETE FROM events WHERE id=?').run(lastInsertRowid);
  });

  test('inserting demo_request without name fails NOT NULL', () => {
    expect(() =>
      db.prepare("INSERT INTO demo_requests (phone, company) VALUES ('+1', 'Co')").run()
    ).toThrow(/NOT NULL constraint/);
  });
});
