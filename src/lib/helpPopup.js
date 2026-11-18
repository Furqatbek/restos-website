// When the "not sure where to start?" card may appear. Pure, so it can be
// tested without a browser.
//
// It appears once the visitor has been on a page for DELAY_MS with the tab
// visible AND has scrolled at least MIN_SCROLL of it (someone browsing, not a
// tab left open), provided that in this visit they have not already opened a
// form, pressed a call-to-action, tapped the phone or Telegram, or sent a
// request. It shows at most once per visit, and after it is closed it stays
// away for SNOOZE_DAYS.
export const DELAY_MS = 10_000;
export const MIN_SCROLL = 25;      // percent of the page
export const SNOOZE_DAYS = 7;

// Pages where an offer to call would be out of place.
const QUIET = [/\/privacy$/, /\/careers$/];

export function shouldShowHelp({ path, visibleMs, scrollPercent, engaged, shownThisVisit, dismissedAt, otherModalOpen, now }) {
  if (engaged || shownThisVisit || otherModalOpen) return false;
  if (QUIET.some((re) => re.test(path || ''))) return false;
  if (dismissedAt && now - dismissedAt < SNOOZE_DAYS * 86_400_000) return false;
  return visibleMs >= DELAY_MS && scrollPercent >= MIN_SCROLL;
}
