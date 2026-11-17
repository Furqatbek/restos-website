import { ImageResponse } from 'next/og';

// Square raster logo for the Organization JSON-LD and the web manifest.
// Google's logo and favicon rules need a real URL it can fetch; the site icon
// used to be an inline data: URI, which search results cannot show.
export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#0f2d24', borderRadius: 112,
          color: '#e8b84d', fontSize: 380, fontStyle: 'italic',
          fontFamily: 'Georgia, serif', paddingBottom: 30,
        }}
      >
        R
      </div>
    ),
    { width: 512, height: 512 },
  );
}
