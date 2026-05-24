const fs = require('fs');

module.exports = async function globalTeardown() {
  if (global.__E2E_SERVER__) {
    global.__E2E_SERVER__.kill('SIGTERM');
  }
  if (global.__E2E_DB_PATH__) {
    try { fs.unlinkSync(global.__E2E_DB_PATH__); } catch (_) {}
    try { fs.unlinkSync(global.__E2E_DB_PATH__ + '-wal'); } catch (_) {}
    try { fs.unlinkSync(global.__E2E_DB_PATH__ + '-shm'); } catch (_) {}
  }
};
