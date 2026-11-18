import { shouldShowHelp, DELAY_MS, MIN_SCROLL, SNOOZE_DAYS } from '@/lib/helpPopup';

const base = { path: '/uz', visibleMs: DELAY_MS, scrollPercent: MIN_SCROLL, engaged: false, shownThisVisit: false, dismissedAt: 0, otherModalOpen: false, now: 1e12 };

describe('"not sure where to start?" card', () => {
  it('shows after the delay to someone who has scrolled', () => {
    expect(shouldShowHelp(base)).toBe(true);
  });
  it('waits for both the time and the scroll', () => {
    expect(shouldShowHelp({ ...base, visibleMs: DELAY_MS - 1 })).toBe(false);
    expect(shouldShowHelp({ ...base, scrollPercent: MIN_SCROLL - 1 })).toBe(false);
  });
  it('stays away from someone who already reached out', () => {
    expect(shouldShowHelp({ ...base, engaged: true })).toBe(false);
  });
  it('shows once per visit and never over another form', () => {
    expect(shouldShowHelp({ ...base, shownThisVisit: true })).toBe(false);
    expect(shouldShowHelp({ ...base, otherModalOpen: true })).toBe(false);
  });
  it('stays closed for a week after being closed', () => {
    const day = 86_400_000;
    expect(shouldShowHelp({ ...base, dismissedAt: base.now - (SNOOZE_DAYS - 1) * day })).toBe(false);
    expect(shouldShowHelp({ ...base, dismissedAt: base.now - (SNOOZE_DAYS + 1) * day })).toBe(true);
  });
  it('is not shown on the privacy policy', () => {
    expect(shouldShowHelp({ ...base, path: '/ru/privacy' })).toBe(false);
  });
});
