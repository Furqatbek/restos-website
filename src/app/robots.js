const BASE = 'https://restos.uz';

// Everything is crawlable except the JSON/write API. The per-post OG image
// route stays open so search, social and AI previews can fetch card images.
const ALLOW = ['/', '/api/posts/*/og', '/api/og'];
const DISALLOW = ['/api/'];

// AI answer engines and search crawlers we explicitly welcome. We WANT to be
// cited when someone asks an assistant for restaurant POS software in
// Uzbekistan, so nothing here is blocked.
//
// Why list them when `*` already allows everyone: robots.txt matching picks the
// single most specific user-agent group and ignores the wildcard, so a named
// group must repeat the same allow/disallow rather than inherit it. Listing
// them also makes intent explicit for tokens that are opt-out signals
// (Google-Extended for Gemini/AI Overviews, Applebot-Extended for Apple
// Intelligence), where silence and consent are easy to confuse.
const CRAWLERS = [
  // AI assistants / answer engines
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'cohere-ai',
  'DuckAssistBot',
  'MistralAI-User',
  'CCBot',
  // Classic search engines (YandexBot matters as much as Googlebot here)
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'YandexBot',
  'YandexImages',
  'Applebot',
  'DuckDuckBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: ALLOW, disallow: DISALLOW },
      ...CRAWLERS.map((userAgent) => ({ userAgent, allow: ALLOW, disallow: DISALLOW })),
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
