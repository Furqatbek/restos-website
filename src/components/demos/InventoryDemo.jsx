'use client';
import { useDemoLang } from '@/context/AppContext';

export default function InventoryDemo() {
  const D = useDemoLang().inventory;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.foodCost}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--forest)' }}>28.4%</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.margin}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--terra)' }}>71.6%</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>{D.alerts}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--terra)' }}>3</div>
          </div>
        </div>
        <div>
          {D.items.map((it, i) => (
            <div className="inv-row" key={i}>
              <div className="inv-name"><span className={'inv-dot ' + it.s}/>{it.n}</div>
              <div className={'inv-bar ' + it.s}><span style={{ width: it.pct + '%' }}/></div>
              <div className="inv-val">{it.k} {it.u}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>{it.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
