import { generatePostImage } from '@/lib/image-gen';

const BASE_POST = {
  id: 1, title: 'Test Post Title',
  excerpt: 'A short excerpt for testing image generation.',
  category: 'Operations', glyph: 'O', color: 'b1',
  read_time: 5,
};

describe('generatePostImage', () => {
  test('returns a Buffer', async () => {
    const buf = await generatePostImage(BASE_POST);
    expect(buf).toBeInstanceOf(Buffer);
  });

  test('output is a valid PNG (correct magic bytes)', async () => {
    const buf = await generatePostImage(BASE_POST);
    // PNG magic: 89 50 4E 47 0D 0A 1A 0A
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50); // P
    expect(buf[2]).toBe(0x4e); // N
    expect(buf[3]).toBe(0x47); // G
  });

  test('output is non-trivially sized (> 5 KB)', async () => {
    const buf = await generatePostImage(BASE_POST);
    expect(buf.length).toBeGreaterThan(5000);
  });

  test.each(['b1', 'b2', 'b3', 'b4', 'b5', 'b6'])(
    'generates without error for theme %s',
    async (color) => {
      const buf = await generatePostImage({ ...BASE_POST, color });
      expect(buf).toBeInstanceOf(Buffer);
      expect(buf.length).toBeGreaterThan(0);
    }
  );

  test('handles missing excerpt gracefully', async () => {
    const buf = await generatePostImage({ ...BASE_POST, excerpt: null });
    expect(buf).toBeInstanceOf(Buffer);
  });

  test('handles long title without throwing', async () => {
    const longTitle = 'How we reduced food cost by 3 percentage points across all venues in Q3 without touching portion sizes or renegotiating supplier contracts.';
    const buf = await generatePostImage({ ...BASE_POST, title: longTitle });
    expect(buf).toBeInstanceOf(Buffer);
  });

  test('falls back to b2 theme for unknown color', async () => {
    const buf = await generatePostImage({ ...BASE_POST, color: 'unknown' });
    expect(buf).toBeInstanceOf(Buffer);
  });
}, 30000);
