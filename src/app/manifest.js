// Web app manifest — lets the site be installed/pinned, and gives Google a
// canonical short name and theme for mobile results.

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
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
