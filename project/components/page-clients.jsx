// Clients page — show the P&L impact, not the menu
const CLIENTS_I18N = {
  en: {
    eyebrow: "Customers",
    title_a: "The numbers",
    title_b: "tell the story.",
    lede: "Independent owners use RestOS to move the lines that matter — labour down, food cost down, repeats up, table turns up. Real venues. Real P&L impact.",
    filterAll: "All",
    filters: ["Café", "Bistro", "Fine dining", "Bar", "Hotel F&B"],
    stories: [
      { c:"c1", nm:"Qahvoon", k:"Bistro · 3 locations",   s1:"+22% revenue", s2:"labour −11%, food cost −3pt" },
      { c:"c2", nm:"Jangirov's", k:"Steakhouse",          s1:"+18% margin",  s2:"ticket time 14 → 9 min" },
      { c:"c3", nm:"Mayami",    k:"Café",                 s1:"+28% repeats", s2:"loyalty drives 41% of orders" },
      { c:"c4", nm:"Osh & Sons",k:"Plov hall",            s1:"2.4× turns",   s2:"QR menu live in 6 hours" },
      { c:"c5", nm:"Lazzat",    k:"Bar",                  s1:"+14% cheque",  s2:"tip routing automated" },
      { c:"c6", nm:"Café Bilim",k:"Café",                 s1:"+38% bundles", s2:"avg cheque +21%" },
    ],
    caseEyebrow: "Customer story",
    caseQuote: "RestOS replaced four vendors in one week. Labour is down 11%, food cost is down 3 points, and I finally read a P&L that ties to my bank account.",
    caseAuthor: "Dilnoza Rakhimova",
    caseRole: "Founder, Qahvoon",
    impactEyebrow: "Aggregate impact",
    impactTitle: "What customers",
    impactTitleEm: "actually see.",
    impactSubtitle: "Median outcomes across RestOS customers in their first year on the platform.",
    impact: [
      { v:"−11%", l:"Labour cost", s:"P95: −16%" },
      { v:"−3 pt", l:"Food cost", s:"recipe-level enforcement" },
      { v:"+28%", l:"Repeat visits", s:"phone-based loyalty" },
      { v:"2.4×", l:"Table turns", s:"QR + pay-at-table" },
    ],
  },
  ru: {
    eyebrow: "Клиенты",
    title_a: "Цифры",
    title_b: "говорят сами.",
    lede: "Независимые владельцы используют RestOS, чтобы двигать строки, которые реально считаются — ФОТ вниз, фудкост вниз, повторы вверх, оборачиваемость вверх. Настоящие точки. Настоящий эффект на P&L.",
    filterAll: "Все",
    filters: ["Кафе", "Бистро", "Fine dining", "Бар", "F&B в отеле"],
    stories: [
      { c:"c1", nm:"Qahvoon", k:"Бистро · 3 точки",   s1:"+22% выручка",   s2:"ФОТ −11%, фудкост −3 п." },
      { c:"c2", nm:"Jangirov's", k:"Стейк-хаус",      s1:"+18% маржа",     s2:"тикет 14 → 9 мин" },
      { c:"c3", nm:"Mayami",    k:"Кафе",             s1:"+28% повторы",   s2:"лояльность — 41% заказов" },
      { c:"c4", nm:"Osh & Sons",k:"Плов-зал",         s1:"2.4× оборот",    s2:"QR-меню за 6 часов" },
      { c:"c5", nm:"Lazzat",    k:"Бар",              s1:"+14% чек",       s2:"авто-чаевые" },
      { c:"c6", nm:"Café Bilim",k:"Кафе",             s1:"+38% бандлы",    s2:"средний чек +21%" },
    ],
    caseEyebrow: "Кейс",
    caseQuote: "RestOS заменил четырёх вендоров за неделю. ФОТ снизился на 11%, фудкост — на 3 пункта, и я наконец читаю P&L, который сходится с банком.",
    caseAuthor: "Дилноза Рахимова",
    caseRole: "Основатель, Qahvoon",
    impactEyebrow: "Совокупный эффект",
    impactTitle: "Что",
    impactTitleEm: "видят клиенты.",
    impactSubtitle: "Медианные результаты в первый год работы на платформе.",
    impact: [
      { v:"−11%", l:"ФОТ", s:"P95: −16%" },
      { v:"−3 п.", l:"Фудкост", s:"калькуляция по рецептам" },
      { v:"+28%", l:"Повторные визиты", s:"лояльность по телефону" },
      { v:"2.4×", l:"Оборачиваемость", s:"QR + оплата за столом" },
    ],
  },
  uz: {
    eyebrow: "Mijozlar",
    title_a: "Raqamlar",
    title_b: "o'zi gapiradi.",
    lede: "Mustaqil egalar RestOS bilan haqiqatdan hisoblanadigan satrlarni harakatga keltiradi — ish haqi pastga, fudkost pastga, qaytuv yuqoriga, aylanma yuqoriga. Haqiqiy nuqtalar. P&L da haqiqiy ta'sir.",
    filterAll: "Barchasi",
    filters: ["Kafe", "Bistro", "Fine dining", "Bar", "Mehmonxona F&B"],
    stories: [
      { c:"c1", nm:"Qahvoon", k:"Bistro · 3 filial", s1:"+22% tushum",   s2:"ish haqi −11%, fudkost −3 p." },
      { c:"c2", nm:"Jangirov's", k:"Steyk-haus",     s1:"+18% marja",    s2:"tiket 14 → 9 daq" },
      { c:"c3", nm:"Mayami",    k:"Kafe",            s1:"+28% qaytuv",   s2:"loyallik — 41% buyurtma" },
      { c:"c4", nm:"Osh & Sons",k:"Palov zal",       s1:"2.4× aylanma",  s2:"QR menyu 6 soatda" },
      { c:"c5", nm:"Lazzat",    k:"Bar",             s1:"+14% chek",     s2:"avto-chaevoy" },
      { c:"c6", nm:"Café Bilim",k:"Kafe",            s1:"+38% bundle",   s2:"o'rt. chek +21%" },
    ],
    caseEyebrow: "Mijoz hikoyasi",
    caseQuote: "RestOS to'rt vendorni bir hafta ichida almashtirdi. Ish haqi 11%, fudkost 3 punktga tushdi, va nihoyat bank bilan to'g'ri keladigan P&L o'qiyman.",
    caseAuthor: "Dilnoza Rahimova",
    caseRole: "Asoschisi, Qahvoon",
    impactEyebrow: "Yig'iladi ta'sir",
    impactTitle: "Mijozlar nimani",
    impactTitleEm: "ko'radi.",
    impactSubtitle: "Platformada birinchi yildagi o'rtacha natijalar.",
    impact: [
      { v:"−11%", l:"Ish haqi", s:"P95: −16%" },
      { v:"−3 p.", l:"Fudkost", s:"retsept bo'yicha kalkulyatsiya" },
      { v:"+28%", l:"Qayta tashrif", s:"telefon orqali loyallik" },
      { v:"2.4×", l:"Aylanma", s:"QR + stolda to'lov" },
    ],
  },
  "uz-cyr": {
    eyebrow: "Мижозлар",
    title_a: "Рақамлар",
    title_b: "ўзи гапиради.",
    lede: "Мустақил эгалар RestOS билан ҳақиқатдан ҳисобланадиган сатрларни ҳаракатга келтиради — иш ҳақи пастга, фудкост пастга, қайтув юқорига, айланма юқорига. Ҳақиқий нуқталар. P&L да ҳақиқий таъсир.",
    filterAll: "Барчаси",
    filters: ["Кафе", "Бистро", "Fine dining", "Бар", "Меҳмонхона F&B"],
    stories: [
      { c:"c1", nm:"Qahvoon", k:"Бистро · 3 филиал", s1:"+22% тушум",    s2:"иш ҳақи −11%, фудкост −3 п." },
      { c:"c2", nm:"Jangirov's", k:"Стейк-хаус",     s1:"+18% маржа",    s2:"тикет 14 → 9 дақ" },
      { c:"c3", nm:"Mayami",    k:"Кафе",            s1:"+28% қайтув",   s2:"лояллик — 41% буюртма" },
      { c:"c4", nm:"Osh & Sons",k:"Палов зал",       s1:"2.4× айланма",  s2:"QR меню 6 соатда" },
      { c:"c5", nm:"Lazzat",    k:"Бар",             s1:"+14% чек",      s2:"авто-чаевой" },
      { c:"c6", nm:"Café Bilim",k:"Кафе",            s1:"+38% бандл",    s2:"ўрт. чек +21%" },
    ],
    caseEyebrow: "Мижоз ҳикояси",
    caseQuote: "RestOS тўрт вендорни бир ҳафта ичида алмаштирди. Иш ҳақи 11%, фудкост 3 пунктга тушди, ва ниҳоят банк билан тўғри келадиган P&L ўқийман.",
    caseAuthor: "Дилноза Раҳимова",
    caseRole: "Асосчиси, Qahvoon",
    impactEyebrow: "Йиғилади таъсир",
    impactTitle: "Мижозлар нимани",
    impactTitleEm: "кўради.",
    impactSubtitle: "Платформада биринчи йилдаги ўртача натижалар.",
    impact: [
      { v:"−11%", l:"Иш ҳақи", s:"P95: −16%" },
      { v:"−3 п.", l:"Фудкост", s:"рецепт бўйича калькуляция" },
      { v:"+28%", l:"Қайта ташриф", s:"телефон орқали лояллик" },
      { v:"2.4×", l:"Айланма", s:"QR + столда тўлов" },
    ],
  },
  kaa: {
    eyebrow: "Klientler",
    title_a: "Sanlar",
    title_b: "ózi aytadı.",
    lede: "Ǵárezsiz iyeler RestOS penen haqıyqattan esaplanatuǵın satırlardı qımıldatadı — aylıq tómen, fudkost tómen, qaytıw joqarı, aylanıw joqarı. Haqıyqıy orınlar. P&L da haqıyqıy tásir.",
    filterAll: "Barlıǵı",
    filters: ["Kafe", "Bistro", "Fine dining", "Bar", "Miymanxana F&B"],
    stories: [
      { c:"c1", nm:"Qahvoon", k:"Bistro · 3 filial", s1:"+22% kirim",    s2:"aylıq −11%, fudkost −3 p." },
      { c:"c2", nm:"Jangirov's", k:"Steyk-xaus",     s1:"+18% marja",    s2:"tiket 14 → 9 minut" },
      { c:"c3", nm:"Mayami",    k:"Kafe",            s1:"+28% qaytıw",   s2:"loyallıq — 41% buyurtpa" },
      { c:"c4", nm:"Osh & Sons",k:"Palaw zal",       s1:"2.4× aylanıw",  s2:"QR menyu 6 saatta" },
      { c:"c5", nm:"Lazzat",    k:"Bar",             s1:"+14% chek",     s2:"avto-chaevoy" },
      { c:"c6", nm:"Café Bilim",k:"Kafe",            s1:"+38% bundle",   s2:"orta chek +21%" },
    ],
    caseEyebrow: "Klient tariyxı",
    caseQuote: "RestOS tórt vendordı bir hápte ishinde almastırdı. Aylıq 11%, fudkost 3 punktke tústi, hám aqır bank penen sáykes keletuǵın P&L oqıyman.",
    caseAuthor: "Dilnoza Raxımova",
    caseRole: "Tiykarshısı, Qahvoon",
    impactEyebrow: "Jámi tásir",
    impactTitle: "Klientler",
    impactTitleEm: "kóretuǵın naǵız.",
    impactSubtitle: "Platformada birinshi jılda orta nátiyjeler.",
    impact: [
      { v:"−11%", l:"Aylıq", s:"P95: −16%" },
      { v:"−3 p.", l:"Fudkost", s:"retsept boyınsha kalkulaciya" },
      { v:"+28%", l:"Qaytıp keliw", s:"telefon arqalı loyallıq" },
      { v:"2.4×", l:"Aylanıw", s:"QR + stolda tólem" },
    ],
  },
};

const ClientsContent = ({ C }) => {
  const [activeFilter, setActiveFilter] = React.useState(-1);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{C.eyebrow}</div>
          <h1>{C.title_a} <em>{C.title_b}</em></h1>
          <p className="lede">{C.lede}</p>
          <div className="chips">
            <button className={"chip" + (activeFilter === -1 ? " active" : "")} onClick={() => setActiveFilter(-1)}>{C.filterAll}</button>
            {C.filters.map((f, i) => (
              <button key={i} className={"chip" + (activeFilter === i ? " active" : "")} onClick={() => setActiveFilter(i)}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="client-grid">
            {C.stories.map((s, i) => (
              <div className="client-card" key={i}>
                <div className={"client-cover " + s.c}>{s.nm}</div>
                <div className="client-meta">
                  <div className="ki">{s.k}</div>
                  <div className="nm">{s.nm}</div>
                  <div className="stat"><strong>{s.s1}</strong> · {s.s2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow" style={{color:"var(--gold)"}}>{C.impactEyebrow}</div>
            <h2 style={{color:"var(--cream)"}}>{C.impactTitle} <em>{C.impactTitleEm}</em></h2>
            <p>{C.impactSubtitle}</p>
          </div>
          <div className="stats-grid">
            {C.impact.map((s, i) => (
              <div className="stat-cell" key={i}>
                <div className="stat-value">{s.v}</div>
                <div className="stat-label">{s.l}</div>
                <div className="stat-sub">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case">
        <div className="wrap">
          <div className="case-card">
            <div className="case-content">
              <div className="eyebrow">{C.caseEyebrow}</div>
              <p className="case-quote">&ldquo;{C.caseQuote}&rdquo;</p>
              <div className="case-attr"><strong>{C.caseAuthor}</strong><br/>{C.caseRole}</div>
              <div className="case-stats">
                <div className="case-stat"><div className="v">−11%</div><div className="l">Labour</div></div>
                <div className="case-stat"><div className="v">−3pt</div><div className="l">Food cost</div></div>
                <div className="case-stat"><div className="v">+28%</div><div className="l">Repeats</div></div>
              </div>
            </div>
            <div className="case-visual">
              <div className="case-chinor">Qahvoon</div>
              <div className="case-badge">
                <span>4 vendors → 1</span>
                <span>ROI: 46 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ClientsApp = () => (
  <PageShell active="clients">
    {({ lang }) => {
      const C = CLIENTS_I18N[lang] || CLIENTS_I18N.en;
      return <ClientsContent C={C}/>;
    }}
  </PageShell>
);

ReactDOM.createRoot(document.getElementById("root")).render(<ClientsApp/>);
