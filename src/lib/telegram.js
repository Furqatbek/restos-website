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

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
