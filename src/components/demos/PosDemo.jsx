'use client';
import { useDemoLang } from '@/context/AppContext';

export default function PosDemo() {
  const D = useDemoLang().pos;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div className="pos-grid">
          <div>
            <div className="pos-cats">
              {D.cats.map((c, i) => <span key={c} className={'c' + (i === 1 ? ' active' : '')}>{c}</span>)}
            </div>
            <div className="pos-items">
              {D.items.map((it, i) => (
                <div key={i} className="pos-tile">
                  <div className="nm">{it.n}</div>
                  <div className="pr">{it.p}k</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pos-bill">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>{D.bill}</div>
            {D.billItems.map((b, i) => (
              <div key={i} className="pos-bill-row">
                <span className="nm">{b.n}</span>
                <span className="pr">{b.p}</span>
              </div>
            ))}
            <div className="pos-bill-total">
              <span>{D.total}</span>
              <span>178k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
