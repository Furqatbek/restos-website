'use client';
import { useState } from 'react';
import { useLang } from '@/context/AppContext';
import { track } from '@/lib/track';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import Icon from './Icon';
import WaiterDemo from './demos/WaiterDemo';
import SelfDemo from './demos/SelfDemo';
import DeliveryDemo from './demos/DeliveryDemo';
import PaymentDemo from './demos/PaymentDemo';
import KitchenDemo from './demos/KitchenDemo';
import InventoryDemo from './demos/InventoryDemo';
import AnalyticsDemo from './demos/AnalyticsDemo';
import CourierDemo from './demos/CourierDemo';
import LoyaltyDemo from './demos/LoyaltyDemo';
import FinanceDemo from './demos/FinanceDemo';
import PosDemo from './demos/PosDemo';
import MarketingDemo from './demos/MarketingDemo';

const demoMap = {
  pos: PosDemo, waiter: WaiterDemo, self: SelfDemo, delivery: DeliveryDemo,
  payment: PaymentDemo, kitchen: KitchenDemo, inventory: InventoryDemo,
  analytics: AnalyticsDemo, courier: CourierDemo, loyalty: LoyaltyDemo,
  finance: FinanceDemo, marketing: MarketingDemo,
};
const iconMap = {
  pos: 'pos', waiter: 'waiter', self: 'self', delivery: 'delivery',
  payment: 'payment', kitchen: 'kitchen', inventory: 'inventory',
  analytics: 'analytics', courier: 'courier', loyalty: 'loyalty',
  finance: 'finance', marketing: 'marketing',
};

export default function ModulesShowcase() {
  const lang = useLang();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;
  const [active, setActive] = useState(0);

  const modules = Object.keys(L.modules).map(key => ({
    key,
    icon: iconMap[key],
    title: L.modules[key].title,
    desc: L.modules[key].desc,
    kpis: L.modules[key].kpis,
    Demo: demoMap[key],
  }));

  const current = modules[active];
  const Demo = current?.Demo;

  return (
    <section className="section" id="modules">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{t.modules.eyebrow}</div>
          <h2>{t.modules.title} <em>{t.modules.title_em}</em></h2>
          <p>{t.modules.subtitle}</p>
        </div>
        <div className="modules-shell">
          <div className="tab-rail" role="tablist">
            {modules.map((m, i) => (
              <button
                key={m.key}
                className={'tab' + (i === active ? ' active' : '')}
                onClick={() => { setActive(i); track('module_view', { module: m.key }, lang); }}
                role="tab"
                aria-selected={i === active}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ico"><Icon name={m.icon} size={14}/></span>
                <span>{m.title}</span>
              </button>
            ))}
          </div>
          <div className="demo-stage" key={active}>
            <div className="demo-header">
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {L.ui.module} {String(active + 1).padStart(2, '0')} {L.ui.of} 12
                </div>
                <h3 className="demo-title">{current?.title}</h3>
                <p className="demo-desc">{current?.desc}</p>
              </div>
              <span className="demo-badge">● {L.ui.liveDemo}</span>
            </div>
            <div className="demo-body">
              {Demo && <Demo/>}
            </div>
            <div className="demo-footer">
              {current?.kpis.map((k, i) => (
                <div key={i} className="demo-kpi">
                  <span className="v">{k.v}</span>
                  <span>{k.l}</span>
                  {k.d && <span className={'delta' + (k.neg ? ' neg' : '')}>{k.d}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
