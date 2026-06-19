import { createElement as h } from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

// Matches .pthumb.bN CSS color definitions
const THEMES = {
  b1: { bg1: '#e8e0d0', bg2: '#f2ede2', glyph: '#d97757', text: '#0f2d24' },
  b2: { bg1: '#0f2d24', bg2: '#1c4a3f', glyph: '#e8b84d', text: '#faf7f2' },
  b3: { bg1: '#d97757', bg2: '#e8b84d', glyph: '#0f2d24', text: '#0f2d24' },
  b4: { bg1: '#1c4a3f', bg2: '#d97757', glyph: '#faf7f2', text: '#faf7f2' },
  b5: { bg1: '#e8b84d', bg2: '#f2ede2', glyph: '#0f2d24', text: '#0f2d24' },
  b6: { bg1: '#f2ede2', bg2: '#1c4a3f', glyph: '#e8b84d', text: '#0f2d24' },
};

let fonts = null;
function loadFonts() {
  if (fonts) return fonts;
  const dir = path.join(process.cwd(), 'node_modules/@fontsource/inter/files');
  fonts = [
    {
      name: 'Inter', weight: 400, style: 'normal',
      data: fs.readFileSync(path.join(dir, 'inter-latin-400-normal.woff')),
    },
    {
      name: 'Inter', weight: 700, style: 'normal',
      data: fs.readFileSync(path.join(dir, 'inter-latin-700-normal.woff')),
    },
    // Cyrillic subset — required for ru / uz-cyr / kaa posts
    {
      name: 'Inter', weight: 400, style: 'normal',
      data: fs.readFileSync(path.join(dir, 'inter-cyrillic-400-normal.woff')),
    },
    {
      name: 'Inter', weight: 700, style: 'normal',
      data: fs.readFileSync(path.join(dir, 'inter-cyrillic-700-normal.woff')),
    },
  ];
  return fonts;
}

export async function generatePostImage(post) {
  const theme = THEMES[post.color] || THEMES.b2;
  const title = post.title || '';
  const excerpt = post.excerpt ? post.excerpt.slice(0, 140) + (post.excerpt.length > 140 ? '…' : '') : '';
  const category = (post.category || 'Blog').toUpperCase();
  const glyph = post.glyph || 'R';
  const readTime = post.read_time || 5;

  const element = h('div', {
    style: {
      width: 1200, height: 630,
      background: `linear-gradient(135deg, ${theme.bg1} 0%, ${theme.bg2} 100%)`,
      display: 'flex', flexDirection: 'column',
      padding: '64px 80px', fontFamily: 'Inter', position: 'relative', overflow: 'hidden',
    },
  },
    // Decorative background glyph
    h('div', {
      style: {
        position: 'absolute', right: -20, bottom: -60,
        fontSize: 520, fontStyle: 'italic', color: theme.glyph,
        opacity: 0.1, lineHeight: 1, display: 'flex',
      },
    }, glyph),

    // Top bar: brand + category
    h('div', {
      style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 },
    },
      h('div', {
        style: {
          fontSize: 15, fontWeight: 700, color: theme.text, opacity: 0.5,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        },
      }, 'RestOS'),
      h('div', {
        style: { width: 4, height: 4, borderRadius: '50%', background: theme.text, opacity: 0.25, display: 'flex' },
      }),
      h('div', {
        style: {
          fontSize: 13, color: theme.text, opacity: 0.5,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        },
      }, category),
    ),

    // Title
    h('div', {
      style: {
        fontSize: title.length > 55 ? 42 : 52,
        fontWeight: 700,
        color: theme.text,
        lineHeight: 1.18,
        letterSpacing: '-0.02em',
        maxWidth: 860,
        marginBottom: 28,
        display: 'flex', flexWrap: 'wrap',
      },
    }, title),

    // Excerpt
    excerpt && h('div', {
      style: {
        fontSize: 22, color: theme.text, opacity: 0.65,
        lineHeight: 1.55, maxWidth: 800, fontWeight: 400, display: 'flex', flexWrap: 'wrap',
      },
    }, excerpt),

    // Footer
    h('div', {
      style: {
        marginTop: 'auto', display: 'flex', alignItems: 'center',
        gap: 8, fontSize: 15, color: theme.text, opacity: 0.4,
      },
    }, `${readTime} min read · restos.uz`),
  );

  const svg = await satori(element, {
    width: 1200, height: 630,
    fonts: loadFonts(),
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}
