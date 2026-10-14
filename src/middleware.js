import { NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/locale';

// Detect the best locale from cookie, then Accept-Language, then default.
function detectLocale(request) {
  const cookie = request.cookies.get('restos-lang')?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;

  const accept = request.headers.get('accept-language') || '';
  // e.g. "ru-RU,ru;q=0.9,en;q=0.8" → ['ru-ru','ru','en']
  const wanted = accept.split(',').map((p) => p.split(';')[0].trim().toLowerCase());
  for (const w of wanted) {
    if (LOCALES.includes(w)) return w;
    const base = w.split('-')[0];
    // map plain 'uz' → 'uz', and Cyrillic hints to uz-cyr
    if (base === 'uz' && (w.includes('cyrl') || w.includes('cyr'))) return 'uz-cyr';
    if (LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed? Let it through.
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Redirect locale-less page paths to the detected locale.
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except API routes, Next internals, metadata files,
  // and anything with a file extension (assets).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|.*\\..*).*)'],
};
