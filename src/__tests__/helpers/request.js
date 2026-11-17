// Requests carry the owner token unless `admin: false`, so tests of the
// protected routes exercise the normal path; pass admin: false to test the 401.
export const ADMIN_HEADER = { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` };

export function req(url, { method = 'GET', body, headers = {}, admin = true } = {}) {
  const opts = { method, headers: { 'Content-Type': 'application/json', ...(admin ? ADMIN_HEADER : {}), ...headers } };
  if (body !== undefined) opts.body = JSON.stringify(body);
  return new Request(`http://localhost${url}`, opts);
}

export async function json(response) {
  return response.json();
}
