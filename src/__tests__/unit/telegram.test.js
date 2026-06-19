import { publishToTelegram } from '@/lib/telegram';

jest.mock('@/lib/image-gen', () => ({
  generatePostImage: jest.fn().mockResolvedValue(Buffer.from([0x89, 0x50, 0x4e, 0x47])),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const POST = {
  id: 1, title: 'How we cut food cost 3 points.',
  excerpt: 'The system, the metrics, and the exact moment it clicked.',
  category: 'Food cost', glyph: 'F', color: 'b4',
  read_time: 7, lang: 'en', status: 'published',
};

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ ok: true }) });
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHANNEL_ID;
});

describe('publishToTelegram — env guard', () => {
  test('skips when BOT_TOKEN is missing', async () => {
    await publishToTelegram(POST);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('skips when CHANNEL_ID is missing', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'token123';
    await publishToTelegram(POST);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe('publishToTelegram — API call', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'bot:TOKEN';
    process.env.TELEGRAM_CHANNEL_ID = '@testchan';
  });

  test('calls sendPhoto endpoint', async () => {
    await publishToTelegram(POST);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.telegram.org/botbot:TOKEN/sendPhoto');
  });

  test('sends FormData with chat_id, caption and parse_mode', async () => {
    await publishToTelegram(POST);
    const [, opts] = mockFetch.mock.calls[0];
    expect(opts.method).toBe('POST');
    const body = opts.body;
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('chat_id')).toBe('@testchan');
    expect(body.get('parse_mode')).toBe('HTML');
  });

  test('caption contains bold title', async () => {
    await publishToTelegram(POST);
    const body = mockFetch.mock.calls[0][1].body;
    const caption = body.get('caption');
    expect(caption).toContain('<b>How we cut food cost 3 points.</b>');
  });

  test('caption contains plain excerpt', async () => {
    await publishToTelegram(POST);
    const caption = mockFetch.mock.calls[0][1].body.get('caption');
    expect(caption).toContain('The system, the metrics, and the exact moment it clicked.');
    // excerpt is not wrapped in any tag
    expect(caption).not.toMatch(/<b>.*The system/);
    expect(caption).not.toMatch(/<i>.*The system/);
  });

  test('caption has italic sub-line with category and read time', async () => {
    await publishToTelegram(POST);
    const caption = mockFetch.mock.calls[0][1].body.get('caption');
    expect(caption).toMatch(/<i>Food cost · 7 min read<\/i>/);
  });

  test('caption links to the full blog article by id', async () => {
    await publishToTelegram(POST);
    const caption = mockFetch.mock.calls[0][1].body.get('caption');
    expect(caption).toContain('href="https://restos.uz/blog/1"');
  });

  test('caption links to the Instagram page', async () => {
    await publishToTelegram(POST);
    const caption = mockFetch.mock.calls[0][1].body.get('caption');
    expect(caption).toContain('href="https://instagram.com/restos.uz"');
    expect(caption).toContain('@restos.uz');
  });

  test('escapes HTML special chars in title', async () => {
    await publishToTelegram({ ...POST, title: 'P&L < Budget > Forecast' });
    const caption = mockFetch.mock.calls[0][1].body.get('caption');
    expect(caption).toContain('<b>P&amp;L &lt; Budget &gt; Forecast</b>');
  });

  test('handles Telegram API error gracefully without throwing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ description: 'Bad Request' }),
    });
    await expect(publishToTelegram(POST)).resolves.toBeUndefined();
  });

  test('handles network error gracefully without throwing', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network failure'));
    await expect(publishToTelegram(POST)).resolves.toBeUndefined();
  });
});
