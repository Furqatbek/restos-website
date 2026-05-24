'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function DeliveryDemo() {
  const D = useDemoLang().delivery;
  const [orders, setOrders] = useState({ yandex: 18, wolt: 12, glovo: 9, uber: 6, own: 23 });

  useEffect(() => {
    const t = setInterval(() => {
      setOrders(o => {
        const k = ['yandex', 'wolt', 'glovo', 'uber', 'own'][Math.floor(Math.random() * 5)];
        return { ...o, [k]: o[k] + 1 };
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const items = [
    { k: 'yandex', nm: 'Yandex Eats', bg: '#ff3d00', sym: 'Y' },
    { k: 'wolt', nm: 'Wolt', bg: '#00c2e8', sym: 'W' },
    { k: 'glovo', nm: 'Glovo', bg: '#ffc244', sym: 'G' },
    { k: 'uber', nm: 'Uber Eats', bg: '#06c167', sym: 'U' },
    { k: 'own', nm: D.direct, bg: '#0f2d24', sym: '⌂' },
  ];

  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.feed}</div>
      <div className="widget-body" style={{ gap: 8 }}>
        {items.map(it => (
          <div key={it.k} className="int-row">
            <div className="int-logo" style={{ background: it.bg }}>{it.sym}</div>
            <div>
              <div className="nm">{it.nm}</div>
              <div className="meta">{D.meta(orders[it.k])}</div>
            </div>
            <span className="status">{D.live}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
