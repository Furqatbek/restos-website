'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function KitchenDemo() {
  const D = useDemoLang().kitchen;
  const [tickets, setTickets] = useState([
    { id: 2478, tbl: 'T07', time: '02:14', items: ['2× Plov', '1× Lagman', '1× Tea'], state: 'firing' },
    { id: 2479, tbl: 'T12', time: '04:30', items: ['3× Somsa', '1× Shurpa'], state: 'firing' },
    { id: 2480, tbl: 'BAR', time: '00:42', items: ['2× Espresso', '1× Croissant'], state: 'new' },
    { id: 2476, tbl: 'T03', time: '06:58', items: ['4× Manti', '2× Ayran'], state: 'ready' },
    { id: 2477, tbl: 'T15', time: '05:20', items: ['1× Shashlik mix'], state: 'firing' },
    { id: 2481, tbl: 'D·W', time: '00:10', items: ['2× Plov', '2× Samsa'], state: 'new' },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setTickets(ts => ts.map(t => {
        if (t.state === 'new') return { ...t, state: 'firing' };
        if (t.state === 'firing' && Math.random() > 0.7) return { ...t, state: 'ready' };
        return t;
      }));
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top(tickets.filter(t => t.state === 'firing').length)}</div>
      <div className="widget-body">
        <div className="kds-grid">
          {tickets.map(t => (
            <div key={t.id} className={'kds-ticket ' + t.state}>
              <div className="kds-head">
                <span className="tbl">{t.tbl}</span>
                <span className="kds-meta">#{t.id} · {t.time}</span>
              </div>
              {t.items.map((it, i) => (
                <div key={i} className="kds-line">
                  <span>{it}</span>
                  <span className="x">{t.state === 'ready' ? '✓' : '·'}</span>
                </div>
              ))}
              {t.state === 'ready' && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', marginTop: 'auto' }}>{D.ready}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
