'use client';
import { useState, useEffect } from 'react';
import { useDemoLang } from '@/context/AppContext';

export default function PaymentDemo() {
  const D = useDemoLang().payment;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(x => (x + 1) % 12), 1400);
    return () => clearInterval(t);
  }, []);

  const methods = ['CLICK', 'PAYME', 'UZUM', 'APELSIN', 'HUMO', 'UZCARD', 'VISA', 'MC', 'APPLE', 'GOOGLE', 'CASH', 'SPLIT'];

  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.checkout}</div>
      <div className="widget-body">
        <div style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--forest)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          248 500 <span style={{ fontSize: 20, color: 'var(--muted)' }}>UZS</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: -4 }}>{D.guests}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8 }}>{D.payWith}</div>
        <div className="pay-grid">
          {methods.map((m, i) => (
            <div key={m} className={'pay-cell' + (i === active ? ' active' : '')}>{m}</div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', padding: '10px 12px', background: 'var(--cream-2)', borderRadius: 10, fontSize: 12, color: 'var(--forest)', display: 'flex', justifyContent: 'space-between' }}>
          <span>{D.split(methods[active])}</span>
          <span style={{ fontFamily: 'var(--mono)' }}>{D.fee}</span>
        </div>
      </div>
    </div>
  );
}
