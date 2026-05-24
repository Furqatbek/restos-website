'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function CourierDemo() {
  const D = useDemoLang().courier;
  const [pos, setPos] = useState(30);

  useEffect(() => {
    const t = setInterval(() => setPos(p => (p + 2) % 100), 160);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div className="map">
          <svg className="map-route" viewBox="0 0 300 200" preserveAspectRatio="none">
            <path d="M 50 160 Q 90 80, 160 100 T 260 40" fill="none" stroke="#0f2d24" strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
            <path d="M 50 160 Q 90 80, 160 100" fill="none" stroke="#e8b84d" strokeWidth="2.5"/>
          </svg>
          <div className="map-pin" style={{ left: '17%', top: '80%' }}>
            <div className="marker"/>
            <div className="tag">{D.kitchen}</div>
          </div>
          <div className="map-pin gold" style={{ left: pos * 0.4 + 17 + '%', top: 80 - pos * 0.4 + '%' }}>
            <div className="marker"/>
            <div className="tag">{D.pinTag}</div>
          </div>
          <div className="map-pin terra" style={{ left: '87%', top: '20%' }}>
            <div className="marker"/>
            <div className="tag">{D.drop}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 12 }}>
          {D.couriers.map((c, i) => (
            <div key={i} style={{ padding: '8px 10px', background: 'var(--cream-2)', borderRadius: 8, borderLeft: '3px solid ' + c.s }}>
              <div style={{ fontWeight: 600, color: 'var(--forest)' }}>{c.nm}</div>
              <div style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10 }}>{c.st}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
