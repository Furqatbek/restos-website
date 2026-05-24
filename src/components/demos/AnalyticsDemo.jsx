'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function AnalyticsDemo() {
  const D = useDemoLang().analytics;
  const [week, setWeek] = useState([42, 58, 51, 67, 72, 95, 88]);

  useEffect(() => {
    const t = setInterval(() => {
      setWeek(w => w.map(v => Math.max(30, Math.min(100, v + (Math.random() - 0.5) * 8))));
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.week}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--forest)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              48.2M <span style={{ fontSize: 16, color: 'var(--muted)' }}>UZS</span>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#2f7a52' }}>{D.vs}</div>
        </div>
        <div className="chart" style={{ marginTop: 24 }}>
          {week.map((h, i) => (
            <div key={i} className={'chart-bar' + (i === 5 ? ' accent' : '')} style={{ height: h + '%' }} data-day={D.days[i]}/>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 28, fontSize: 12 }}>
          <div><div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.avgCheque}</div><div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest)' }}>186k</div></div>
          <div><div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.covers}</div><div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest)' }}>1 842</div></div>
          <div><div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.turn}</div><div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest)' }}>2.4×</div></div>
        </div>
      </div>
    </div>
  );
}
