'use client';
import { useLang, useOpenDemo } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import Icon from './Icon';

const iconMap = { pos: 'pos', waiter: 'waiter', self: 'self', delivery: 'delivery', payment: 'payment', kitchen: 'kitchen', inventory: 'inventory', analytics: 'analytics', courier: 'courier', loyalty: 'loyalty', finance: 'finance', marketing: 'marketing' };

export default function Hero() {
  const lang = useLang();
  const openDemo = useOpenDemo();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;

  const modules = Object.keys(L.modules).map(key => ({
    key, icon: iconMap[key], title: L.modules[key].title,
  }));

  const outer = modules.slice(0, 7);
  const inner = modules.slice(7);

  const chipPos = (count, r, offset = 0) => (i) => {
    const a = (i / count) * Math.PI * 2 + offset;
    return { left: 50 + Math.cos(a) * r + '%', top: 50 + Math.sin(a) * r + '%' };
  };
  const outerPos = chipPos(outer.length, 48, -Math.PI / 2);
  const innerPos = chipPos(inner.length, 33, -Math.PI / 2 + 0.3);

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow"><span className="dot"/>{t.hero.eyebrow}</span>
            <h1>
              {t.hero.title_1}<br/>
              {t.hero.title_2}<br/>
              <span className="em">{t.hero.title_3}</span>
            </h1>
            <p className="hero-sub">{t.hero.subtitle}</p>
            <div className="hero-ctas">
              <button className="btn btn-primary btn-lg" onClick={openDemo}>
                {t.hero.cta_primary} <Icon name="arrow" size={14}/>
              </button>
              <button className="btn btn-outline btn-lg" onClick={openDemo}>
                {t.hero.cta_secondary}
              </button>
            </div>
            <div className="hero-trust">{t.hero.trust}</div>
          </div>
          <div>
            <div className="orbit-stage">
              <div className="orbit-ring"/>
              <div className="orbit-ring r2"/>
              <div className="orbit-ring r3"/>
              <div className="orbit-center">
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="label">RestOS · core</div>
                  <div className="name">one<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>system</span></div>
                  <div className="pulse"/>
                </div>
              </div>
              {outer.map((m, i) => {
                const p = outerPos(i);
                const variant = i === 0 ? 'accent' : i === 3 ? 'accent2' : '';
                return (
                  <div key={m.key} className={'orbit-chip ' + variant} style={p}>
                    <div className="chip-ico"><Icon name={m.icon} size={14}/></div>
                    <span>{m.title}</span>
                  </div>
                );
              })}
              {inner.map((m, i) => {
                const p = innerPos(i);
                const variant = i === 1 ? 'accent' : '';
                return (
                  <div key={m.key} className={'orbit-chip r2 ' + variant} style={p}>
                    <div className="chip-ico"><Icon name={m.icon} size={14}/></div>
                    <span>{m.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
