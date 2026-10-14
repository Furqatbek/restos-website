'use client';
import { useLang, useOpenDemo, useOpenFoodCost } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import Icon from './Icon';

export default function CtaBand() {
  const lang = useLang();
  const openFoodCost = useOpenFoodCost();
  const t = I18N[lang] || I18N.en;
  return (
    <section className="cta-band" id="trial">
      <div className="wrap">
        <h2>{t.cta_band.title}</h2>
        <p>{t.cta_band.subtitle}</p>
        <button className="btn btn-gold btn-lg" onClick={openFoodCost}>
          {t.cta_band.cta} <Icon name="arrow" size={14}/>
        </button>
      </div>
    </section>
  );
}
