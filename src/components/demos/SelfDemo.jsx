'use client';
import { useDemoLang } from '@/context/AppContext';

export default function SelfDemo() {
  const D = useDemoLang().self;
  const pattern = [
    '111111101011101111111','100000101101101000001','101110100100101011101',
    '101110101111101011101','101110100001001011101','100000101010101000001',
    '111111101010101111111','000000001100100000000','110111110010111001011',
    '100010101011010110100','011011011011001011110','110001001101110100010',
    '001111101010010111011','000000001011110010100','111111101001011011011',
    '100000101100110100010','101110100110110010111','101110100010011011001',
    '101110101101101110110','100000101010111000101','111111101001010110110',
  ];
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>chinor.bistro/menu</div>
      <div className="widget-body">
        <div className="ss-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="qr-box">
              <svg viewBox="0 0 21 21" shapeRendering="crispEdges">
                {pattern.map((row, y) =>
                  [...row].map((c, x) => c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#e8b84d"/> : null)
                )}
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>{D.scan}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest)' }}>{D.title}</div>
            <div className="menu-list">
              {D.menu.map((m, i) => (
                <div className="menu-card" key={i}>
                  <div>
                    <div className="nm">{m.n}</div>
                    {m.hot && <div style={{ fontSize: 10, color: 'var(--terra)', fontFamily: 'var(--mono)' }}>{D.chefPick}</div>}
                  </div>
                  <div className="pr">{m.p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
