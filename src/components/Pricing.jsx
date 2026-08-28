'use client';
import { useLang, useOpenFoodCost } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { LOCALE } from '@/lib/locale-extras';
import Icon from './Icon';

export default function Pricing() {
  const lang = useLang();
  const openFoodCost = useOpenFoodCost();
  const t = I18N[lang] || I18N.en;
  const L = LOCALE[lang] || LOCALE.en;

  // One price per tier, as approved. There is no annual rate published yet,
  // so the monthly/annual toggle is gone rather than showing an invented
  // discount — add it back when annual figures are confirmed.
  const prices = [
    { price: 500, variant: 'outline' },
    { price: 900, variant: 'gold', featured: true },
    { custom: true, variant: 'outline' },
  ];
  const fmt = (k) => (k * 1000).toLocaleString('ru-RU').replace(/,/g, ' ');
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
                  <span className="amount">{fmt(tier.price)}</span>
                  <span className="curr">UZS</span>
                  <span className="per">{L.pricing.per}</span>
                </div>
              )}
              {/* The setup fee sits on the card on purpose: it is a
                  credibility signal, not a cost to bury in a footnote. */}
              <div className="tier-setup">
                <span className="tier-setup-label">{L.pricing.setup}</span>
                <span className="tier-setup-price">
                  {L.pricing.setupPrice} <em>{L.pricing.setupPer}</em>
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
      </div>
    </section>
  );
}
