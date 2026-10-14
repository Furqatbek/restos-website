// Web app manifest — lets the site be installed/pinned, and gives Google a
// canonical short name and theme for mobile results.
const ICON =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%230f2d24'/><text x='32' y='48' font-family='Georgia,serif' font-style='italic' font-size='48' font-weight='400' text-anchor='middle' fill='%23e8b84d'>R</text></svg>";

export default function manifest() {
  return {
    name: 'RestOS — restaurant management system',
    short_name: 'RestOS',
    description:
      'POS, kitchen display, inventory and food cost, delivery, loyalty and finance for restaurants and cafes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f2',
    theme_color: '#0f2d24',
    icons: [{ src: ICON, sizes: 'any', type: 'image/svg+xml' }],
  };
}
