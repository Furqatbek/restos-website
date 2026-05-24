'use client';
import { useDemoLang } from '@/context/AppContext';

export default function LoyaltyDemo() {
  const D = useDemoLang().loyalty;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div className="loyalty-card">
          <div className="lbl">{D.gold}</div>
          <div className="nm">{D.nm}</div>
          <div className="num">{D.since}</div>
          <div className="row">
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', textTransform: 'uppercase' }}>{D.points}</div>
              <div className="pts">1 840<small>/ 2 500</small></div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(250,247,242,0.6)', textAlign: 'right' }}>{D.next}</div>
          </div>
          <div className="loyalty-tiers">
            <span className="on"/><span className="on"/><span className="on"/><span className="on"/><span/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginTop: 4 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{D.recent}</div>
          {D.visits.map((v, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--cream-2)', borderRadius: 8 }}>
              <div><div style={{ fontWeight: 500, color: 'var(--forest)' }}>{v.d} · {v.pl}</div></div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{v.sp}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terra)', fontWeight: 600 }}>{v.pt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
