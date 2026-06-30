import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || (() => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'restdb.sqlite');
})();

function initDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
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
      excerpt TEXT,
      body TEXT,
      category TEXT,
      glyph TEXT DEFAULT 'R',
      color TEXT DEFAULT 'b1',
      read_time INTEGER DEFAULT 5,
      lang TEXT DEFAULT 'en',
      featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrations: add columns to posts table when upgrading an existing DB
  const cols = db.prepare("PRAGMA table_info(posts)").all();
  if (!cols.some(c => c.name === 'body')) {
    db.exec('ALTER TABLE posts ADD COLUMN body TEXT');
  }
  if (!cols.some(c => c.name === 'updated_at')) {
    // No dynamic default allowed in ALTER; seed from created_at, maintained by app.
    db.exec('ALTER TABLE posts ADD COLUMN updated_at DATETIME');
    db.exec('UPDATE posts SET updated_at = COALESCE(published_at, created_at) WHERE updated_at IS NULL');
  }

  return db;
}

// Singleton to survive HMR in development
const g = globalThis;
const db = g.__restos_db ?? (g.__restos_db = initDb());

export default db;
