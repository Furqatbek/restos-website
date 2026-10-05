'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function DeliveryDemo() {
  const D = useDemoLang().delivery;
  const [orders, setOrders] = useState({ uzum: 18, express24: 12, yandex: 9, wolt: 6, own: 23 });

  useEffect(() => {
    const t = setInterval(() => {
      setOrders(o => {
        const k = ['uzum', 'express24', 'yandex', 'wolt', 'own'][Math.floor(Math.random() * 5)];
        return { ...o, [k]: o[k] + 1 };
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  // The aggregators that actually operate here, in the same order the rest of
  // the site lists them. Glovo and Uber Eats used to sit in this demo; neither
  // runs in Uzbekistan, so they made the product look like it was built for a
  // different market.
  const items = [
    { k: 'uzum', nm: 'Uzum Tezkor', bg: '#7000ff', sym: 'U' },
    { k: 'express24', nm: 'Express24', bg: '#ff6b00', sym: 'E' },
    { k: 'yandex', nm: 'Yandex Eats', bg: '#ff3d00', sym: 'Y' },
    { k: 'wolt', nm: 'Wolt', bg: '#00c2e8', sym: 'W' },
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
