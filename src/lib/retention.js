import db from '@/lib/db';
import { LEAD_RETENTION_MONTHS, STATS_RETENTION_MONTHS } from '@/lib/privacy';

// Deletes personal data once it is older than the privacy policy says we keep
// it. Leads (demo and food-cost requests) and the emails collected by the old
// blog signup: LEAD_RETENTION_MONTHS from the day they were sent. Visit
// statistics: STATS_RETENTION_MONTHS.
export function pruneOldData() {
  const lead = `-${LEAD_RETENTION_MONTHS} months`;
  const stats = `-${STATS_RETENTION_MONTHS} months`;
  const del = (table, age) => db.prepare(`DELETE FROM ${table} WHERE created_at < datetime('now', ?)`).run(age).changes;
  return {
    demo_requests: del('demo_requests', lead),
    foodcost_requests: del('foodcost_requests', lead),
    newsletter: del('newsletter', lead),
    events: del('events', stats),
  };
}

// The Docker healthcheck calls /api/health every 30 seconds; prune from there,
// at most once an hour, so deletion happens whether or not anyone visits.
let lastRun = 0;
export function pruneIfDue(now = Date.now()) {
  if (now - lastRun < 60 * 60 * 1000) return null;
  lastRun = now;
  try { return pruneOldData(); } catch (_) { return null; }
}
