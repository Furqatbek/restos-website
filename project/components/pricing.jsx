const Pricing = ({ t, L }) => {
  const [annual, setAnnual] = React.useState(true);
  const openDemo = useOpenDemo();
  // Prices in UZS (thousands)
  const prices = [
    { priceM: 350, priceA: 280, variant: "outline" },
    { priceM: 600, priceA: 480, variant: "gold", featured: true },
    { custom: true, variant: "outline" },
  ];
  const fmt = (k) => (k * 1000).toLocaleString("ru-RU").replace(/,/g, " ");
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
          <div className="pricing-toggle">
            <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>{t.pricing.monthly}</button>
            <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>{t.pricing.annual} <span className="save">{t.pricing.save}</span></button>
          </div>
        </div>
        <div className="tiers">
          {tiers.map((tier) => (
            <div className={"tier" + (tier.featured ? " featured" : "")} key={tier.name}>
              {tier.featured && <span className="tier-flag">{L.pricing.popular}</span>}
              <h3>{tier.name}</h3>
              <div className="tier-desc">{tier.desc}</div>
              {tier.custom ? (
                <div className="price">{L.pricing.custom}<span className="per"> </span></div>
              ) : (
                <div className="price price-uzs">
                  <span className="amount">{fmt(annual ? tier.priceA : tier.priceM)}</span>
                  <span className="curr">UZS</span>
                  <span className="per">{L.pricing.per}</span>
                </div>
              )}
              <hr className="tier-divider"/>
              <ul>
                {tier.features.map((f,j) => (
                  <li key={j}>
                    <span className="check"><Icon name="check" size={14} stroke={2.2}/></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={"btn btn-lg " + (tier.variant === "gold" ? "btn-gold" : "btn-outline")} onClick={openDemo}>
                {tier.cta} <Icon name="arrow" size={14}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Pricing = Pricing;
