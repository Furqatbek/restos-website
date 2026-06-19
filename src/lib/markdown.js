// Minimal, dependency-free, XSS-safe Markdown → HTML renderer.
// All HTML in the source is escaped FIRST, then a safe subset of Markdown
// syntax is converted to tags. Links are restricted to http/https/mailto.
// Supported: # headings, **bold**, *italic*, `code`, [text](url), > quote,
// - / 1. lists, --- rule, paragraphs.

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeUrl(url) {
  const u = url.trim();
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (u.startsWith('/') || u.startsWith('#')) return u;
  return '#';
}

// Inline: bold, italic, code, links. Input is already HTML-escaped.
function inline(text) {
  let t = text;
  // inline code first so its contents aren't further formatted
  t = t.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  // links [text](url)
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) =>
    `<a href="${esc(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${label}</a>`);
  // bold then italic
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return t;
}

export function renderMarkdown(src) {
  if (!src) return '';
  const lines = esc(src).replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let i = 0;
  let listType = null; // 'ul' | 'ol' | null

  const closeList = () => {
    if (listType) { html.push(`</${listType}>`); listType = null; }
  };

  while (i < lines.length) {
    const line = lines[i];

    // blank line
    if (!line.trim()) { closeList(); i++; continue; }

    // horizontal rule
    if (/^---+\s*$/.test(line)) { closeList(); html.push('<hr/>'); i++; continue; }

    // heading
    const hm = line.match(/^(#{1,4})\s+(.*)$/);
    if (hm) {
      closeList();
      const level = hm[1].length;
      html.push(`<h${level}>${inline(hm[2].trim())}</h${level}>`);
      i++; continue;
    }

    // blockquote (note: '>' has already been escaped to '&gt;')
    if (/^&gt;\s?/.test(line)) {
      closeList();
      const quote = [];
      while (i < lines.length && /^&gt;\s?/.test(lines[i])) {
        quote.push(inline(lines[i].replace(/^&gt;\s?/, '')));
        i++;
      }
      html.push(`<blockquote>${quote.join('<br/>')}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^[-*+]\s+/.test(line)) {
      if (listType !== 'ul') { closeList(); html.push('<ul>'); listType = 'ul'; }
      html.push(`<li>${inline(line.replace(/^[-*+]\s+/, ''))}</li>`);
      i++; continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      if (listType !== 'ol') { closeList(); html.push('<ol>'); listType = 'ol'; }
      html.push(`<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`);
      i++; continue;
    }

    // paragraph (gather consecutive non-blank, non-special lines)
    closeList();
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i]) &&
      !/^&gt;\s?/.test(lines[i]) &&
      !/^[-*+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      para.push(inline(lines[i].trim()));
      i++;
    }
    html.push(`<p>${para.join('<br/>')}</p>`);
  }

  closeList();
  return html.join('\n');
}
