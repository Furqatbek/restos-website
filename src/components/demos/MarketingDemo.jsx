'use client';
import { useDemoLang } from '@/context/AppContext';

export default function MarketingDemo() {
  const D = useDemoLang().marketing;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.redeemed}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--forest)' }}>186</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.attach}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--terra)' }}>62%</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.uplift}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--forest)' }}>+28%</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {D.bundles.map((b, i) => (
            <div key={i} className="mk-bundle">
              <div className="mk-bundle-vis">{b.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="nm">{b.n}</div>
                <div className="desc">{b.d}</div>
              </div>
              <div className="stat">
                <div className="v">{b.redeemed}</div>
                <div className="l">{b.c} {D.conv}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
