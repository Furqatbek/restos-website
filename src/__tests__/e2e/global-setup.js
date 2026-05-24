const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const DB_PATH = path.join(require('os').tmpdir(), `restos-e2e-${Date.now()}.sqlite`);

async function waitForServer(url, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

module.exports = async function globalSetup() {
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: path.resolve(__dirname, '../../..'),
    env: {
      ...process.env,
      DATABASE_PATH: DB_PATH,
      TELEGRAM_BOT_TOKEN: '',
      TELEGRAM_CHANNEL_ID: '',
      NODE_ENV: 'production',
    },
    stdio: 'pipe',
  });

  // Store reference for teardown
  global.__E2E_SERVER__ = server;
  global.__E2E_DB_PATH__ = DB_PATH;

  server.stderr.on('data', d => {
    const line = d.toString();
    if (line.includes('error') || line.includes('Error')) process.stderr.write('[e2e-server] ' + line);
  });

  await waitForServer(`http://localhost:${PORT}/api/demos`);
};
