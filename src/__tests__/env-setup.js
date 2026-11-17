// Runs before any module is loaded — must use CommonJS
// Each Jest worker gets its own :memory: DB via the singleton in db.js
process.env.DATABASE_PATH = ':memory:';
process.env.TELEGRAM_BOT_TOKEN = '';
process.env.TELEGRAM_CHANNEL_ID = '';
// Owner token for the protected API routes; helpers/request.js sends it by default.
process.env.ADMIN_TOKEN = 'test-admin-token-0123456789';
