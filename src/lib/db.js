import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { slugify, uniqueSlug } from './slugify';

const DB_PATH = process.env.DATABASE_PATH || (() => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'restdb.sqlite');
})();

function initDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  // Wait for a lock instead of throwing SQLITE_BUSY — avoids "database is
  // locked" when multiple Next build/runtime workers open the DB at once.
  db.pragma('busy_timeout = 5000');
  db.exec(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT NOT NULL,
      lang TEXT DEFAULT 'en',
      source TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      lang TEXT DEFAULT 'en',
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      data TEXT,
      lang TEXT DEFAULT 'en',
      session_id TEXT,
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS vacancies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      lang TEXT DEFAULT 'en',
      status TEXT DEFAULT 'open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT,
      excerpt TEXT,
      body TEXT,
      category TEXT,
      glyph TEXT DEFAULT 'R',
      color TEXT DEFAULT 'b1',
      read_time INTEGER DEFAULT 5,
      lang TEXT DEFAULT 'en',
      featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      meta_title TEXT,
      meta_description TEXT,
      keywords TEXT,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrations: add columns to posts table when upgrading an existing DB
  const cols = db.prepare("PRAGMA table_info(posts)").all();
  const has = (name) => cols.some((c) => c.name === name);
  if (!has('body')) db.exec('ALTER TABLE posts ADD COLUMN body TEXT');
  if (!has('updated_at')) {
    // No dynamic default allowed in ALTER; seed from created_at, maintained by app.
    db.exec('ALTER TABLE posts ADD COLUMN updated_at DATETIME');
    db.exec('UPDATE posts SET updated_at = COALESCE(published_at, created_at) WHERE updated_at IS NULL');
  }
  if (!has('slug')) db.exec('ALTER TABLE posts ADD COLUMN slug TEXT');
  if (!has('meta_title')) db.exec('ALTER TABLE posts ADD COLUMN meta_title TEXT');
  if (!has('meta_description')) db.exec('ALTER TABLE posts ADD COLUMN meta_description TEXT');
  if (!has('keywords')) db.exec('ALTER TABLE posts ADD COLUMN keywords TEXT');

  // Backfill slugs for any posts missing one (transliterated from title).
  const missing = db.prepare("SELECT id, title FROM posts WHERE slug IS NULL OR slug = ''").all();
  if (missing.length) {
    const exists = db.prepare('SELECT 1 FROM posts WHERE slug = ?');
    const setSlug = db.prepare('UPDATE posts SET slug = ? WHERE id = ?');
    for (const p of missing) {
      const base = slugify(p.title);
      const slug = uniqueSlug(base, (s) => !!exists.get(s));
      setSlug.run(slug, p.id);
    }
  }

  return db;
}

// Singleton to survive HMR in development
const g = globalThis;
const db = g.__restos_db ?? (g.__restos_db = initDb());

export default db;
