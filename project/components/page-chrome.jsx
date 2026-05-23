// Reusable page chrome: PageShell wraps secondary pages (About, Clients, Careers, Blog)
// with the same nav + footer + demo modal + language switcher as the landing page.
const _PageChrome_LANGS = [
  { k: "en", name: "English", flag: "EN" },
  { k: "ru", name: "Русский", flag: "RU" },
  { k: "uz", name: "O'zbekcha", flag: "UZ" },
  { k: "uz-cyr", name: "Ўзбекча", flag: "UZ-C" },
  { k: "kaa", name: "Qaraqalpaqsha", flag: "KAA" },
];

const _PageChrome_I18N = JSON.parse(document.getElementById("i18n-data").textContent);

// Shared contexts mirror app.jsx so demo widgets and modals stay localised
if (!window.__DemoContext) {
  window.__DemoContext = React.createContext(() => {});
  window.__LangContext = React.createContext("en");
  window.useOpenDemo = () => React.useContext(window.__DemoContext);
  window.useDemoLang = () => {
    const lang = React.useContext(window.__LangContext);
    return (window.DEMOS && window.DEMOS[lang]) || (window.DEMOS && window.DEMOS.en) || {};
  };
}

const PageNav = ({ t, lang, setLang, active }) => {
  const [open, setOpen] = React.useState(false);
  const openDemo = window.useOpenDemo();
  React.useEffect(() => {
    const onClick = (e) => { if (!e.target.closest(".lang-switch")) setOpen(false); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  const links = [
    { k: "modules", label: t.nav.modules, href: "Landing Page.html#modules" },
    { k: "about",   label: t.nav.about,   href: "About.html" },
    { k: "clients", label: t.nav.clients, href: "Clients.html" },
    { k: "vacancy", label: t.nav.vacancy, href: "Careers.html" },
    { k: "blog",    label: t.nav.blog,    href: "Blog.html" },
    { k: "pricing", label: t.nav.pricing, href: "Landing Page.html#pricing" },
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="Landing Page.html">
          <span className="logo-mark">R</span>RestOS
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.k} href={l.href} className={active === l.k ? "active" : ""}>{l.label}</a>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-switch" onClick={(e) => {e.stopPropagation(); setOpen(o => !o);}}>
            <Icon name="globe" size={14}/>
            {_PageChrome_LANGS.find(l => l.k === lang).flag}
            <span style={{fontSize:9, color:"var(--muted)"}}>▾</span>
            {open && (
              <div className="lang-menu" onClick={e => e.stopPropagation()}>
                {_PageChrome_LANGS.map(l => (
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

const PageShell = ({ active, children }) => {
  const [lang, setLang] = React.useState(() => localStorage.getItem("restos-lang") || "en");
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { localStorage.setItem("restos-lang", lang); }, [lang]);

  const t = _PageChrome_I18N[lang] || _PageChrome_I18N.en;
  const L = (window.LOCALE && window.LOCALE[lang]) || window.LOCALE.en;

  return (
    <window.__DemoContext.Provider value={openDemo}>
      <window.__LangContext.Provider value={lang}>
        <PageNav t={t} lang={lang} setLang={setLang} active={active}/>
        {typeof children === "function" ? children({ t, L, lang }) : children}
        <Footer L={L}/>
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} t={t} lang={lang}/>
      </window.__LangContext.Provider>
    </window.__DemoContext.Provider>
  );
};

window.PageShell = PageShell;
window.PageNav = PageNav;
