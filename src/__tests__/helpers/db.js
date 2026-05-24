import db from '@/lib/db';

export function clearAll() {
  db.exec(`
    DELETE FROM posts;
    DELETE FROM vacancies;
    DELETE FROM events;
    DELETE FROM newsletter;
    DELETE FROM demo_requests;
  `);
}

export function tables() {
  return db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  ).all().map(r => r.name);
}

export { db };
