// Logo band, stats, case study, testimonials, FAQ, CTA band, footer
const LogoBand = ({ t }) => {
  const venues = ["Qahvoon", "Jangirov's", "Mayami"];
  // Repeat enough times to fill width and loop smoothly
  const reel = [...venues, ...venues, ...venues, ...venues, ...venues, ...venues];
  return (
    <section className="logos">
      <div className="logos-marquee">
        <div className="logos-track">
          {reel.map((v, i) => (
            <div className="logo-cell" key={i}>{v}</div>
          ))}
        </div>
        <div className="logos-track" aria-hidden="true">
          {reel.map((v, i) => (
            <div className="logo-cell" key={i}>{v}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = ({ t, L }) => {
  const stats = L.stats;
  return (
    <section className="stats" id="stats">
      <div className="wrap">
        <div className="section-head">
          <h2>{t.stats.title}</h2>
          <p>{t.stats.subtitle}</p>
        </div>
        <div className="stats-grid">
          {stats.map((s,i) => (
            <div key={i} className="stat-cell">
              <div className="stat-value">{s.v}<span className="unit">{s.u}</span></div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-sub">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudy = ({ t, L }) => (
  <section className="case" id="customers">
    <div className="wrap">
      <div className="case-card">
        <div className="case-content">
          <div className="eyebrow">{t.case.eyebrow}</div>
          <p className="case-quote">&ldquo;{t.case.quote}&rdquo;</p>
          <div className="case-attr"><strong>{t.case.author}</strong><br/>{t.case.role}</div>
          <div className="case-stats">
            {L.caseStats.map(([v,l],i) => (
              <div className="case-stat" key={i}><div className="v">{v}</div><div className="l">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="case-visual">
          <div className="case-chinor">
            Qahvoon
          </div>
          <div className="case-badge">
            <span>{L.caseBadge[0]}</span>
            <span>{L.caseBadge[1]}</span>
          </div>
        </div>
      </div>

      <div className="quotes">
        {L.quotes.map((q, i) => (
          <div className="quote-card" key={i}>
            <p>&ldquo;{q.p}&rdquo;</p>
            <div className="quote-meta">
              <div className="quote-avatar">{q.a[0]}</div>
              <div>
                <div className="who">{q.a}</div>
                <div className="role">{q.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = ({ t, lang }) => {
  const faqs = {
    en: [
      ["New hardware?", "No. Runs on any iPad, Android or PC. Your printers and terminals just work."],
      ["Setup time?", "48 hours to first order. We import your menu. We train your staff."],
      ["One module at a time?", "Yes. Start with POS. Add as you grow. One menu, one stock, one customer."],
      ["Internet down?", "Keeps selling offline. Syncs when back."],
      ["Which delivery apps?", "Yandex Eats, Wolt, Glovo, Uber Eats, regional. New ones monthly."],
    ],
    ru: [
      ["Новое оборудование?", "Нет. iPad, Android, ПК. Ваши принтеры и терминалы работают."],
      ["Сроки запуска?", "48 часов до первого заказа. Импортируем меню. Обучаем персонал."],
      ["По одному модулю?", "Да. Начните с POS. Добавляйте по росту. Одно меню, склад, клиент."],
      ["Нет интернета?", "Продолжает продавать оффлайн. Синхронизация потом."],
      ["Какие доставки?", "Yandex Eats, Wolt, Glovo, Uber Eats, локальные. Новые каждый месяц."],
    ],
    uz: [
      ["Yangi uskuna?", "Yo'q. iPad, Android, PC. Printer va terminallar ishlaydi."],
      ["Qancha vaqt?", "48 soat. Menyu import qilamiz. Xodimlarni o'qitamiz."],
      ["Bittadan?", "Ha. POS-dan boshlang. O'ssangiz qo'shing."],
      ["Internet yo'q?", "Offline sotadi. Qaytgach sinxronlanadi."],
      ["Qaysi yetkazuvchilar?", "Yandex Eats, Wolt, Glovo, Uber Eats, mahalliy."],
    ],
    "uz-cyr": [
      ["Янги ускуна?", "Йўқ. iPad, Android, PC. Принтер ва терминаллар ишлайди."],
      ["Қанча вақт?", "48 соат. Меню импорт қиламиз. Ходимларни ўқитамиз."],
      ["Биттадан?", "Ҳа. POS-дан бошланг. Ўссангиз қўшинг."],
      ["Интернет йўқ?", "Оффлайн сотади. Қайтгач синхронланади."],
      ["Қайси етказувчилар?", "Yandex Eats, Wolt, Glovo, Uber Eats, маҳаллий."],
    ],
    kaa: [
      ["Jańa úskene?", "Yaq. iPad, Android, PC. Printer hám terminallar isleydi."],
      ["Qansha waqıt?", "48 saat. Menyu import etemiz. Xızmetkerlerdi oqıtamız."],
      ["Bir-birlep?", "Awa. POS-tan baslań. Ósseńiz qosıń."],
      ["Internet joq?", "Oflayn satadı. Qaytqan soń sinxronlanadı."],
      ["Qaysı jetkeriwshiler?", "Yandex Eats, Wolt, Glovo, Uber Eats, jergilikli."],
    ],
  };
  const list = faqs[lang] || faqs.en;
  return (
    <section className="section">
      <div className="wrap">
        <div className="faq">
          <div>
            <div className="section-head">
              <div className="eyebrow">FAQ</div>
              <h2>{t.faq_title}</h2>
            </div>
          </div>
          <div className="faq-list">
            {list.map(([q, a], i) => (
              <details className="faq-item" key={i} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaBand = ({ t }) => {
  const openDemo = useOpenDemo();
  return (
  <section className="cta-band" id="trial">
    <div className="wrap">
      <h2>{t.cta_band.title}</h2>
      <p>{t.cta_band.subtitle}</p>
      <button className="btn btn-gold btn-lg" onClick={openDemo}>
        {t.cta_band.cta} <Icon name="arrow" size={14}/>
      </button>
    </div>
  </section>
  );
};

const Footer = ({ L }) => {
  const f = L.footer;
  const productHrefs = [
    "Landing Page.html#modules",
    "Landing Page.html#modules",
    "Landing Page.html#modules",
    "Landing Page.html#modules",
  ];
  const companyHrefs = ["About.html", "Clients.html", "Careers.html", "Blog.html"];
  const resourcesHrefs = ["Blog.html", "Landing Page.html#modules", "Landing Page.html#modules", "Landing Page.html#modules"];
  return (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="brand-block">
          <div className="logo"><span className="logo-mark">R</span>RestOS</div>
          <p>{f.tagline}</p>
          <div className="social-links">
            <a href="https://instagram.com/restos" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={18}/>
            </a>
            <a href="https://t.me/restos" target="_blank" rel="noreferrer" aria-label="Telegram">
              <Icon name="telegram" size={18}/>
            </a>
          </div>
        </div>
        <div>
          <h4>{f.product}</h4>
          <ul>{f.productLinks.map((x,i) => <li key={i}><a href={productHrefs[i]}>{x}</a></li>)}</ul>
        </div>
        <div>
          <h4>{f.company}</h4>
          <ul>{f.companyLinks.map((x,i) => <li key={i}><a href={companyHrefs[i]}>{x}</a></li>)}</ul>
        </div>
        <div>
          <h4>{f.resources}</h4>
          <ul>{f.resourcesLinks.map((x,i) => <li key={i}><a href={resourcesHrefs[i]}>{x}</a></li>)}</ul>
        </div>
        <div>
          <h4>{f.contact}</h4>
          <ul>
            <li><a href="mailto:sales@restos.app">sales@restos.app</a></li>
            <li><a href="tel:+998712000000">+998 71 200 0000</a></li>
            <li><a href="https://maps.google.com/?q=Tashkent" target="_blank" rel="noreferrer">Tashkent · Almaty</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{f.copyright}</span>
        <span>{f.legal}</span>
      </div>
    </div>
  </footer>
  );
};

Object.assign(window, { LogoBand, Stats, CaseStudy, FAQ, CtaBand, Footer });
