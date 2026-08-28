import { generatePostImage } from './image-gen';

export async function notifyLead(lead) {
  const TOKEN = process.env.TELEGRAM_LEADS_BOT_TOKEN;
  const CHAT  = process.env.TELEGRAM_LEADS_CHAT_ID;
  if (!TOKEN || !CHAT) {
    console.warn('[telegram] TELEGRAM_LEADS_BOT_TOKEN or TELEGRAM_LEADS_CHAT_ID not set — skipping lead notification');
    return;
  }

  const lines = [
    '📲 <b>New demo request</b>',
    '',
    `👤 <b>${esc(lead.name)}</b>`,
    `📞 <code>${esc(lead.phone)}</code>`,
    `🏢 ${esc(lead.company)}`,
  ];
  if (lead.lang && lead.lang !== 'en') lines.push(`🌐 ${esc(lead.lang)}`);
  if (lead.source) lines.push(`🔗 ${esc(lead.source)}`);

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text: lines.join('\n'), parse_mode: 'HTML' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => res.text());
      console.error('[telegram] sendMessage (lead) failed:', JSON.stringify(err));
    }
  } catch (err) {
    console.error('[telegram] error notifying lead', lead, err);
  }
}


// Food-cost diagnosis request — the site's primary conversion action.
export async function notifyFoodCost(lead) {
  const TOKEN = process.env.TELEGRAM_LEADS_BOT_TOKEN;
  const CHAT  = process.env.TELEGRAM_LEADS_CHAT_ID;
  if (!TOKEN || !CHAT) {
    console.warn('[telegram] leads bot not configured — skipping food-cost notification');
    return;
  }

  const lines = [
    '\u{1F9EE} <b>Food-cost analysis request</b>',
    '',
    `\u{1F4DE} <code>${esc(lead.phone)}</code>`,
  ];
  if (lead.venue)          lines.push(`\u{1F3E2} ${esc(lead.venue)}`);
  if (lead.contact)        lines.push(`\u{1F464} ${esc(lead.contact)}`);
  if (lead.venues_count)   lines.push(`\u{1F4CD} venues: ${esc(lead.venues_count)}`);
  if (lead.current_system) lines.push(`\u{2699} now on: ${esc(lead.current_system)}`);
  if (lead.revenue_band)   lines.push(`\u{1F4B0} ${esc(lead.revenue_band)}`);
  if (lead.lang)           lines.push(`\u{1F310} ${esc(lead.lang)}`);

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text: lines.join('\n'), parse_mode: 'HTML' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => res.text());
      console.error('[telegram] sendMessage (food-cost) failed:', JSON.stringify(err));
    }
  } catch (err) {
    console.error('[telegram] error notifying food-cost lead', err);
  }
}

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const SITE_URL = 'https://restos.uz';
const INSTAGRAM_URL = 'https://instagram.com/restos.uz';
const LOCALES = ['en', 'ru', 'uz', 'uz-cyr', 'kaa'];

// Locale + slug aware canonical URL for a post.
function postUrl(post) {
  const lang = LOCALES.includes(post.lang) ? post.lang : 'en';
  return `${SITE_URL}/${lang}/blog/${post.slug || post.id}`;
}

function buildCaption(post) {
  const parts = [];

  // Title — bold
  parts.push(`<b>${esc(post.title)}</b>`);
  parts.push('');

  // Main text — default
  if (post.excerpt) {
    parts.push(esc(post.excerpt));
    parts.push('');
  }

  // Sub line — italic: category, read time
  const sub = [post.category, `${post.read_time || 5} min read`]
    .filter(Boolean)
    .join(' · ');
  if (sub) parts.push(`<i>${esc(sub)}</i>`);

  // Links — read full article + Instagram
  parts.push('');
  parts.push(`📖 <a href="${postUrl(post)}">Читать полностью</a>`);
  parts.push(`📷 <a href="${INSTAGRAM_URL}">@restos.uz</a>`);

  return parts.join('\n');
}

export async function publishToTelegram(post) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHANNEL = process.env.TELEGRAM_CHANNEL_ID;
  if (!TOKEN || !CHANNEL) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not set — skipping');
    return;
  }

  try {
    const [imageBuffer, caption] = await Promise.all([
      generatePostImage(post),
      Promise.resolve(buildCaption(post)),
    ]);

    const form = new FormData();
    form.append('chat_id', CHANNEL);
    form.append('caption', caption);
    form.append('parse_mode', 'HTML');
    form.append(
      'photo',
      new Blob([imageBuffer], { type: 'image/png' }),
      `post-${post.id}.png`,
    );

    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => res.text());
      console.error('[telegram] sendPhoto failed:', JSON.stringify(err));
    }
  } catch (err) {
    console.error('[telegram] error publishing post', post.id, err);
  }
}
