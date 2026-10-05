'use client';
import { useState } from 'react';
import { useLang, useOpenFoodCost } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import { MONTHLY_UZS, SETUP_UZS, annualMonthlyUZS, groupUZS } from '@/lib/pricing';
import Icon from './Icon';

export default function Pricing() {
  const lang = useLang();
  const openFoodCost = useOpenFoodCost();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;

  // Annual is the confirmed rate now, so the toggle is back. Both figures are
  // derived from the same constants the structured data and the ROI copy use.
  const [annual, setAnnual] = useState(false);
  const rate = (key) => (annual ? annualMonthlyUZS(key) : MONTHLY_UZS[key]);

  const prices = [
    { key: 'counter', price: rate('counter'), setup: SETUP_UZS.counter, variant: 'outline' },
    { key: 'service', price: rate('service'), setup: SETUP_UZS.service, variant: 'gold', featured: true },
    { custom: true, variant: 'outline' },
  ];
  const tiers = L.pricing.tiers.map((tier, i) => ({
    ...tier, ...prices[i],
    cta: prices[i].custom ? t.pricing.contact : t.pricing.cta,
  }));

  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{t.pricing.eyebrow}</div>
          <h2>{t.pricing.title}</h2>
          <p>{t.pricing.subtitle}</p>
          <div className="pricing-toggle" role="group" aria-label={t.pricing.eyebrow}>
            <button className={annual ? '' : 'active'} aria-pressed={!annual} onClick={() => setAnnual(false)}>
              {t.pricing.monthly}
            </button>
            <button className={annual ? 'active' : ''} aria-pressed={annual} onClick={() => setAnnual(true)}>
              {t.pricing.annual}<span className="save">{t.pricing.save}</span>
            </button>
          </div>
        </div>
        <div className="tiers">
          {tiers.map((tier) => (
            <div className={'tier' + (tier.featured ? ' featured' : '')} key={tier.name}>
              {tier.featured && <span className="tier-flag">{L.pricing.popular}</span>}
              <h3>{tier.name}</h3>
              <div className="tier-desc">{tier.desc}</div>
              {tier.custom ? (
                <div className="price">{L.pricing.custom}<span className="per"> </span></div>
              ) : (
                <div className="price price-uzs">
                  <span className="amount">{groupUZS(tier.price)}</span>
                  <span className="curr">{L.pricing.setupCurrency}</span>
                  <span className="per">
                    {L.pricing.per}
                    {annual && <em className="per-annual">{L.pricing.billedAnnually}</em>}
                  </span>
                </div>
              )}
              {/* The setup fee sits on the card on purpose: it is a
                  credibility signal, not a cost to bury in a footnote. */}
              <div className="tier-setup">
                <span className="tier-setup-label">{L.pricing.setup}</span>
                <span className="tier-setup-price">
                  {tier.setup
                    ? <>{groupUZS(tier.setup)} {L.pricing.setupCurrency} <em>{L.pricing.setupPer}</em></>
                    : <em>{L.pricing.custom}</em>}
                </span>
              </div>
              <hr className="tier-divider"/>
              <ul>
                {tier.features.map((f, j) => (
                  <li key={j}>
                    <span className="check"><Icon name="check" size={14} stroke={2.2}/></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={'btn btn-lg ' + (tier.variant === 'gold' ? 'btn-gold' : 'btn-outline')}
                onClick={openFoodCost}
              >
                {tier.cta} <Icon name="arrow" size={14}/>
              </button>
            </div>
          ))}
        </div>
        <p className="pricing-note">{L.pricing.setupNote}</p>
        <p className="pricing-roi">{L.pricing.roi}</p>
        {/* The conclusion the ROI figure is there to support: what a year costs
            against what it saves. Shown as arithmetic, not as a bare multiple. */}
        <p className="pricing-payback">{L.pricing.payback}</p>
      </div>
    </section>
  );
}
