import { renderMarkdown } from '@/lib/markdown';

describe('renderMarkdown', () => {
  it('returns empty string for empty input', () => {
    expect(renderMarkdown('')).toBe('');
    expect(renderMarkdown(null)).toBe('');
    expect(renderMarkdown(undefined)).toBe('');
  });

  it('renders headings', () => {
    expect(renderMarkdown('## Title')).toBe('<h2>Title</h2>');
    expect(renderMarkdown('#### Small')).toBe('<h4>Small</h4>');
  });

  it('renders paragraphs with inline formatting', () => {
    const out = renderMarkdown('Hello **bold** and *italic* and `code`.');
    expect(out).toContain('<strong>bold</strong>');
    expect(out).toContain('<em>italic</em>');
    expect(out).toContain('<code>code</code>');
    expect(out.startsWith('<p>')).toBe(true);
  });

  it('renders safe links and opens them in a new tab', () => {
    const out = renderMarkdown('[RestOS](https://restos.uz)');
    expect(out).toContain('href="https://restos.uz"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it('neutralizes javascript: links', () => {
    const out = renderMarkdown('[x](javascript:alert(1))');
    expect(out).toContain('href="#"');
    expect(out).not.toContain('javascript:');
  });

  it('escapes raw HTML to prevent XSS', () => {
    const out = renderMarkdown('<script>alert(1)</script>');
    expect(out).toContain('&lt;script&gt;');
    expect(out).not.toContain('<script>');
  });

  it('renders unordered and ordered lists', () => {
    expect(renderMarkdown('- a\n- b')).toBe('<ul>\n<li>a</li>\n<li>b</li>\n</ul>');
    expect(renderMarkdown('1. a\n2. b')).toBe('<ol>\n<li>a</li>\n<li>b</li>\n</ol>');
  });

  it('renders blockquotes and horizontal rules', () => {
    expect(renderMarkdown('> quote')).toBe('<blockquote>quote</blockquote>');
    expect(renderMarkdown('---')).toBe('<hr/>');
  });

  it('renders images with alt text, lazy-loaded', () => {
    const out = renderMarkdown('![a chef plating food](https://restos.uz/img/chef.jpg)');
    expect(out).toContain('<img src="https://restos.uz/img/chef.jpg"');
    expect(out).toContain('alt="a chef plating food"');
    expect(out).toContain('loading="lazy"');
  });

  it('neutralizes javascript: image sources', () => {
    const out = renderMarkdown('![x](javascript:alert(1))');
    expect(out).toContain('src="#"');
    expect(out).not.toContain('javascript:');
  });
});
