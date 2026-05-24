import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RestOS — The operating system for modern hospitality';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f2d24',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: '#e8b84d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              color: '#0f2d24',
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            R
          </div>
          <span style={{ color: '#faf7f2', fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
            RestOS
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#e8b84d', fontSize: 22, fontFamily: 'sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            OS for hospitality
          </div>
          <div style={{ color: '#faf7f2', fontSize: 68, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Sell more.<br />Waste less.<br />Go home early.
          </div>
        </div>

        {/* Footer line */}
        <div style={{ color: '#7aab8a', fontSize: 22, fontFamily: 'sans-serif' }}>
          One system · Twelve modules · Zero spreadsheets · restos.uz
        </div>
      </div>
    ),
    { ...size },
  );
}
