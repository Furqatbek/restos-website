'use client';
import { useDemoLang } from '@/context/AppContext';

export default function FinanceDemo() {
  const D = useDemoLang().finance;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.net}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--forest)', letterSpacing: '-0.02em', lineHeight: 1 }}>12.8M</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.ebitda}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--terra)', letterSpacing: '-0.02em', lineHeight: 1 }}>24.1%</div>
          </div>
        </div>
        <div className="fin-rows">
          {D.rows.map(([k, v], i) => (
            <div className="fin-row" key={i}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
          <div className="fin-row total"><span>{D.totalK}</span><span className="v">{D.totalV}</span></div>
        </div>
      </div>
    </div>
  );
}
