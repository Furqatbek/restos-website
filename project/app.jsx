const { useState, useEffect, createContext, useContext } = React;

const DemoContext = createContext(() => {});
const useOpenDemo = () => useContext(DemoContext);
window.useOpenDemo = useOpenDemo;

const LangContext = createContext("en");
const useDemoLang = () => {
  const lang = useContext(LangContext);
  return (window.DEMOS && window.DEMOS[lang]) || window.DEMOS.en;
};
window.useDemoLang = useDemoLang;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "gold",
  "theme": "forest",
  "headline": "Poetic",
  "motion": "Slow"
}/*EDITMODE-END*/;

const I18N = JSON.parse(document.getElementById("i18n-data").textContent);
const LANGS = [
  { k: "en", name: "English", flag: "EN" },
  { k: "ru", name: "Русский", flag: "RU" },
  { k: "uz", name: "O'zbekcha", flag: "UZ" },
  { k: "uz-cyr", name: "Ўзбекча", flag: "UZ-C" },
  { k: "kaa", name: "Qaraqalpaqsha", flag: "KAA" },
];

const Nav = ({ t, lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const openDemo = useOpenDemo();
  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest(".lang-switch")) setOpen(false); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#">
          <span className="logo-mark">R</span>RestOS
        </a>
        <div className="nav-links">
          <a href="#modules">{t.nav.modules}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="About.html">{t.nav.about}</a>
          <a href="Clients.html">{t.nav.clients}</a>
          <a href="Careers.html">{t.nav.vacancy}</a>
          <a href="Blog.html">{t.nav.blog}</a>
        </div>
        <div className="nav-right">
          <button className="lang-switch" onClick={(e) => {e.stopPropagation(); setOpen(o => !o);}}>
            <Icon name="globe" size={14}/>
            {LANGS.find(l => l.k === lang).flag}
            <span style={{fontSize:9, color:"var(--muted)"}}>▾</span>
            {open && (
              <div className="lang-menu" onClick={e => e.stopPropagation()}>
                {LANGS.map(l => (
                  <button key={l.k} className={lang === l.k ? "active" : ""}
                    onClick={() => { setLang(l.k); setOpen(false); }}>
                    <span>{l.name}</span>
                    <span className="flag">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </button>
          <button className="btn btn-outline" onClick={openDemo}>{t.nav.demo}</button>
          <button className="btn btn-primary" onClick={openDemo}>{t.nav.trial}</button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("restos-lang") || "en");
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);

  useEffect(() => {
    localStorage.setItem("restos-lang", lang);
  }, [lang]);

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({type: "__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Apply accent colors live
  useEffect(() => {
    const root = document.documentElement;
    const palette = {
      gold: ["#e8b84d","#c99a2f"],
      terra: ["#d97757","#b55a3f"],
      saffron: ["#e07a2f","#b85c1a"],
      sage: ["#8fb58a","#6b9466"],
    }[tweaks.accent] || ["#e8b84d","#c99a2f"];
    root.style.setProperty("--gold", palette[0]);
    root.style.setProperty("--gold-deep", palette[1]);
  }, [tweaks.accent]);

  const t = I18N[lang] || I18N.en;

  // Headline variants (all bold & short)
  const headlineVariants = {
    Poetic: { t1: "Sell more.", t2: "Waste less.", t3: "Go home early." },
    Direct: { t1: "One system.", t2: "Every table.", t3: "Zero chaos." },
    Bold:   { t1: "Run it.", t2: "All of it.", t3: "From one screen." },
  };
  const tOverride = {
    ...t,
    hero: { ...t.hero, ...(
      lang === "en" && tweaks.headline !== "Poetic" ? {
        title_1: headlineVariants[tweaks.headline].t1,
        title_2: headlineVariants[tweaks.headline].t2,
        title_3: headlineVariants[tweaks.headline].t3,
      } : {}
    )}
  };

  // Orbit motion
  useEffect(() => {
    const speeds = { Slow: 80, Med: 40, Fast: 20, Off: 0 };
    const s = speeds[tweaks.motion] ?? 80;
    document.querySelectorAll(".orbit-ring, .orbit-chip").forEach(el => {
      if (s === 0) {
        el.style.animationPlayState = "paused";
      } else {
        el.style.animationPlayState = "running";
        // keep CSS defaults, just toggle play state for simplicity
      }
    });
  }, [tweaks.motion, lang]);

  const L = LOCALE[lang] || LOCALE.en;
  const demoMap = { pos:PosDemo, waiter:WaiterDemo, self:SelfDemo, delivery:DeliveryDemo, payment:PaymentDemo, kitchen:KitchenDemo, inventory:InventoryDemo, analytics:AnalyticsDemo, courier:CourierDemo, loyalty:LoyaltyDemo, finance:FinanceDemo, marketing:MarketingDemo };
  const iconMap = { pos:"pos", waiter:"waiter", self:"self", delivery:"delivery", payment:"payment", kitchen:"kitchen", inventory:"inventory", analytics:"analytics", courier:"courier", loyalty:"loyalty", finance:"finance", marketing:"marketing" };
  const modules = Object.keys(L.modules).map(key => ({
    key, icon: iconMap[key],
    title: L.modules[key].title,
    desc: L.modules[key].desc,
    kpis: L.modules[key].kpis,
    demo: demoMap[key],
  }));

  return (
    <DemoContext.Provider value={openDemo}>
      <LangContext.Provider value={lang}>
      <Nav t={tOverride} lang={lang} setLang={setLang}/>
      <Hero t={tOverride} modules={modules}/>
      <LogoBand t={tOverride}/>
      <Stats t={tOverride} L={L}/>
      <ModulesShowcase t={tOverride} modules={modules} L={L}/>
      <CaseStudy t={tOverride} L={L}/>
      <Pricing t={tOverride} L={L}/>
      <FAQ t={tOverride} lang={lang}/>
      <CtaBand t={tOverride}/>
      <Footer L={L}/>
      {tweaksVisible && <TweakPanel tweaks={tweaks} setTweaks={setTweaks}/>}
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} t={tOverride} lang={lang}/>
      </LangContext.Provider>
    </DemoContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
