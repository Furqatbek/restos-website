'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';
import Icon from '../Icon';

export default function WaiterDemo() {
  const D = useDemoLang().waiter;
  const [items, setItems] = useState(D.items);
  const [tick, setTick] = useState(0);

  useEffect(() => { setItems(D.items); }, [D]);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (tick === 0) return;
    setItems(prev => {
      const next = [...prev];
      if (next.length > 4) next.shift();
      next.push(D.pool[tick % D.pool.length]);
      return next;
    });
  }, [tick]);

  const total = items.reduce((s, i) => s + i.q * i.p, 0);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div className="phone-frame">
        <div className="phone-notch"/>
        <div className="phone-screen">
          <div className="phone-bar">
            <div>
              <div className="s">{D.table}</div>
              <div className="t">{D.order}</div>
            </div>
            <Icon name="bell" size={16}/>
          </div>
          <div className="phone-section">
            <span className="phone-table-pill"><Icon name="clock" size={12}/> {D.guests}</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {items.map((it, i) => (
              <div key={i + it.n} className="phone-item" style={{ animation: i === items.length - 1 ? 'fadein .4s' : undefined }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="q">{it.q}</span>
                  <span>{it.n}</span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{(it.q * it.p).toFixed(0)}k</span>
              </div>
            ))}
          </div>
          <div className="phone-cta">{D.cta} · {total}k UZS</div>
        </div>
      </div>
    </div>
  );
}
