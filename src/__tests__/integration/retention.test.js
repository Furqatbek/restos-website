import db from '@/lib/db';
import { pruneOldData, pruneIfDue } from '@/lib/retention';
import { clearAll } from '../helpers/db';

beforeEach(() => { clearAll(); db.exec('DELETE FROM foodcost_requests'); });

const at = (age) => `datetime('now', '${age}')`;

// The privacy policy promises leads are deleted 12 months after they were
// sent and statistics after 13. This is what keeps that promise.
describe('data retention', () => {
  test('deletes leads, old signup emails and statistics past their age', () => {
    db.exec(`
      INSERT INTO demo_requests (name, phone, company, created_at) VALUES ('Old', '1', 'A', ${at('-13 months')}), ('New', '2', 'B', ${at('-11 months')});
      INSERT INTO foodcost_requests (phone, created_at) VALUES ('3', ${at('-13 months')}), ('4', ${at('-1 months')});
      INSERT INTO newsletter (email, created_at) VALUES ('old@x.uz', ${at('-13 months')}), ('new@x.uz', ${at('-2 months')});
      INSERT INTO events (event_type, session_id, created_at) VALUES ('page_view', 'old', ${at('-14 months')}), ('page_view', 'mid', ${at('-12 months')});
    `);
    expect(pruneOldData()).toEqual({ demo_requests: 1, foodcost_requests: 1, newsletter: 1, events: 1 });
    expect(db.prepare('SELECT name FROM demo_requests').all()).toEqual([{ name: 'New' }]);
    expect(db.prepare('SELECT phone FROM foodcost_requests').all()).toEqual([{ phone: '4' }]);
    expect(db.prepare('SELECT email FROM newsletter').all()).toEqual([{ email: 'new@x.uz' }]);
    // Statistics keep 13 months: a 12-month-old row stays.
    expect(db.prepare('SELECT session_id FROM events').all()).toEqual([{ session_id: 'mid' }]);
  });

  test('runs at most once an hour from the healthcheck', () => {
    const t = 10_000_000_000;
    expect(pruneIfDue(t)).not.toBeNull();
    expect(pruneIfDue(t + 60_000)).toBeNull();
    expect(pruneIfDue(t + 61 * 60_000)).not.toBeNull();
  });
});
