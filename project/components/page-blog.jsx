// Blog — operations intelligence for restaurant owners
const BLOG_I18N = {
  en: {
    eyebrow: "Operator's notebook",
    title_a: "Margin, costs",
    title_b: "& the chaos in between.",
    lede: "Tactics from the people building RestOS and the owners running on it. Pull the right lever — labour, food cost, table turns, fees — and watch the number move.",
    featuredEyebrow: "Featured",
    featuredCat: "P&L deep-dive",
    featuredTitle: "How Qahvoon added $14k to monthly profit in 6 months.",
    featuredExcerpt: "A three-location bistro swapped four vendors for one platform, tightened recipe costing, and pulled labour down 11%. Inside: the exact P&L moves, the rollout calendar, and the moment the food-cost graph crossed below 30%.",
    featuredMeta: "12 min read · Apr 14 · Case study",
    featuredGlyph: "Q",
    latestEyebrow: "All posts",
    latestTitle: "Latest from",
    latestTitleEm: "the floor.",
    posts: [
      { c:"b1", g:"O", cat:"Operations", t:"The eight hours that decide your Friday night margin.", m:"6 min · Apr 09" },
      { c:"b2", g:"K", cat:"Kitchen",    t:"What a KDS removes from your P&L (and what it doesn't).", m:"4 min · Apr 02" },
      { c:"b3", g:"M", cat:"Marketing",  t:"Bundles, combos and the math behind a +28% attach lift.", m:"7 min · Mar 26" },
      { c:"b4", g:"F", cat:"Food cost",  t:"Why food-cost percentage is the wrong KPI — and what to chase instead.", m:"5 min · Mar 18" },
      { c:"b5", g:"L", cat:"Loyalty",    t:"Phone-number loyalty: 41% of orders, zero printed cards.", m:"4 min · Mar 10" },
      { c:"b6", g:"P", cat:"Platform",   t:"Inside the offline-first sync that keeps your venue selling when the wifi dies.", m:"9 min · Mar 02" },
    ],
    newsEyebrow: "Newsletter",
    newsTitle: "One margin lever a month.",
    newsDesc: "We send one email a month: a single P&L lever, the data behind it, and a one-page playbook to pull it. No fluff.",
    newsPlaceholder: "you@restaurant.com",
    newsCta: "Subscribe",
  },
  ru: {
    eyebrow: "Записная книжка оператора",
    title_a: "Маржа, издержки",
    title_b: "и хаос между ними.",
    lede: "Тактики от тех, кто строит RestOS, и владельцев, которые на нём работают. Тянешь правильный рычаг — ФОТ, фудкост, оборачиваемость, комиссии — и цифра двигается.",
    featuredEyebrow: "Главное",
    featuredCat: "Разбор P&L",
    featuredTitle: "Как Qahvoon добавил $14k к месячной прибыли за полгода.",
    featuredExcerpt: "Бистро на три точки заменило четырёх вендоров одной платформой, затянуло калькуляцию рецептов и срезало ФОТ на 11%. Внутри: точные движения по P&L, календарь внедрения и момент, когда график фудкоста упал ниже 30%.",
    featuredMeta: "12 мин · 14 апр · кейс",
    featuredGlyph: "Q",
    latestEyebrow: "Все материалы",
    latestTitle: "Свежее",
    latestTitleEm: "с пола.",
    posts: [
      { c:"b1", g:"О", cat:"Операции", t:"Восемь часов, которые решают маржу пятничного вечера.", m:"6 мин · 09 апр" },
      { c:"b2", g:"К", cat:"Кухня",     t:"Что KDS убирает из P&L (и что не убирает).", m:"4 мин · 02 апр" },
      { c:"b3", g:"М", cat:"Маркетинг", t:"Бандлы, комбо и математика +28% к чеку.", m:"7 мин · 26 мар" },
      { c:"b4", g:"Ф", cat:"Фудкост",   t:"Почему процент фудкоста — не та цифра, и за чем гнаться вместо.", m:"5 мин · 18 мар" },
      { c:"b5", g:"Л", cat:"Лояльность",t:"Лояльность по номеру: 41% заказов, ноль пластика.", m:"4 мин · 10 мар" },
      { c:"b6", g:"П", cat:"Платформа", t:"Внутри offline-first синхронизации, которая держит точку открытой при отключении сети.", m:"9 мин · 02 мар" },
    ],
    newsEyebrow: "Рассылка",
    newsTitle: "Один рычаг маржи в месяц.",
    newsDesc: "Раз в месяц — один рычаг P&L, цифры за ним и одностраничный плейбук, как его потянуть. Без воды.",
    newsPlaceholder: "you@restaurant.com",
    newsCta: "Подписаться",
  },
  uz: {
    eyebrow: "Operator daftari",
    title_a: "Marja, xarajat",
    title_b: "va orasidagi tartibsizlik.",
    lede: "RestOS-ni quruvchilar va undagi egalardan taktikalar. To'g'ri richagni torting — ish haqi, fudkost, aylanma, komissiya — raqam siljiydi.",
    featuredEyebrow: "Asosiy",
    featuredCat: "P&L tahlili",
    featuredTitle: "Qahvoon olti oyda oylik foydaga $14k qanday qo'shdi.",
    featuredExcerpt: "Uch filialli bistro to'rt vendor o'rniga bitta platforma oldi, retsept kalkulyatsiyasini mahkamladi va ish haqini 11% ga tushirdi. Ichida: aniq P&L harakatlari, joriy etish kalendari va fudkost grafigi 30% dan pastga o'tgan moment.",
    featuredMeta: "12 daq · 14 apr · keys",
    featuredGlyph: "Q",
    latestEyebrow: "Barchasi",
    latestTitle: "Zaldan",
    latestTitleEm: "yangi.",
    posts: [
      { c:"b1", g:"O", cat:"Operatsiyalar", t:"Juma kechasi marjasini hal qiladigan sakkiz soat.", m:"6 daq · 09 apr" },
      { c:"b2", g:"K", cat:"Oshxona",       t:"KDS P&L dan nimani olib tashlaydi (va olib tashlamaydi).", m:"4 daq · 02 apr" },
      { c:"b3", g:"M", cat:"Marketing",     t:"Bundle, kombo va +28% chek matematikasi.", m:"7 daq · 26 mar" },
      { c:"b4", g:"F", cat:"Fudkost",       t:"Nega fudkost foizi noto'g'ri KPI — va o'rniga nimani quvib yurish.", m:"5 daq · 18 mar" },
      { c:"b5", g:"L", cat:"Loyallik",      t:"Telefon raqami loyalligi: 41% buyurtma, nol plastik.", m:"4 daq · 10 mar" },
      { c:"b6", g:"P", cat:"Platforma",     t:"Wifi o'chsa ham nuqtani sotayotgan offline-first sinxron ichida.", m:"9 daq · 02 mar" },
    ],
    newsEyebrow: "Yangiliklar",
    newsTitle: "Oyiga bitta marja richagi.",
    newsDesc: "Oyiga bir xat: bitta P&L richag, ortidagi raqamlar va uni tortish uchun bir sahifalik playbook. Suvsiz.",
    newsPlaceholder: "you@restaurant.com",
    newsCta: "Obuna",
  },
  "uz-cyr": {
    eyebrow: "Оператор дафтари",
    title_a: "Маржа, харажат",
    title_b: "ва орасидаги тартибсизлик.",
    lede: "RestOS-ни қурувчилар ва ундаги эгалардан тактикалар. Тўғри ричагни тортинг — иш ҳақи, фудкост, айланма, комиссия — рақам силжиди.",
    featuredEyebrow: "Асосий",
    featuredCat: "P&L таҳлили",
    featuredTitle: "Qahvoon олти ойда ойлик фойдага $14k қандай қўшди.",
    featuredExcerpt: "Уч филиалли бистро тўрт вендор ўрнига битта платформа олди, рецепт калькуляциясини маҳкамлади ва иш ҳақини 11% га туширди. Ичида: аниқ P&L ҳаракатлари, жорий этиш календари ва фудкост графиги 30% дан пастга ўтган момент.",
    featuredMeta: "12 дақ · 14 апр · кейс",
    featuredGlyph: "Q",
    latestEyebrow: "Барчаси",
    latestTitle: "Залдан",
    latestTitleEm: "янги.",
    posts: [
      { c:"b1", g:"О", cat:"Операциялар", t:"Жума кечаси маржасини ҳал қиладиган саккиз соат.", m:"6 дақ · 09 апр" },
      { c:"b2", g:"К", cat:"Ошхона",       t:"KDS P&L дан нимани олиб ташлайди (ва олиб ташламайди).", m:"4 дақ · 02 апр" },
      { c:"b3", g:"М", cat:"Маркетинг",    t:"Бандл, комбо ва +28% чек математикаси.", m:"7 дақ · 26 мар" },
      { c:"b4", g:"Ф", cat:"Фудкост",      t:"Нега фудкост фоизи нотўғри KPI — ва ўрнига нимани қувиб юриш.", m:"5 дақ · 18 мар" },
      { c:"b5", g:"Л", cat:"Лояллик",      t:"Телефон рақами лояллиги: 41% буюртма, нол пластик.", m:"4 дақ · 10 мар" },
      { c:"b6", g:"П", cat:"Платформа",    t:"Wifi ўчса ҳам нуқтани сотаётган offline-first синхрон ичида.", m:"9 дақ · 02 мар" },
    ],
    newsEyebrow: "Янгиликлар",
    newsTitle: "Ойига битта маржа ричаги.",
    newsDesc: "Ойига бир хат: битта P&L ричаг, ортидаги рақамлар ва уни тортиш учун бир саҳифалик playbook. Сувсиз.",
    newsPlaceholder: "you@restaurant.com",
    newsCta: "Обуна",
  },
  kaa: {
    eyebrow: "Operator dápteri",
    title_a: "Marja, shıǵın",
    title_b: "hám arasındaǵı tártipsizlik.",
    lede: "RestOS-tı quruwshılar hám ondaǵı iyelerden taktikalar. Tuwra rıshaktı tartıń — aylıq, fudkost, aylanıw, komissiya — san qımıldaydı.",
    featuredEyebrow: "Bas",
    featuredCat: "P&L talqılaw",
    featuredTitle: "Qahvoon altı ayda aylıq paydaǵa $14k qalay qostı.",
    featuredExcerpt: "Úsh filialdan ibarat bistro tórt vendor ornına bir platforma aldı, retsept kalkulaciyasın tartıldı hám aylıqtı 11% ke tústirdi. İshinde: anıq P&L qımıldawları, joriy qılıw kúntizbesi hám fudkost grafiklerlik 30% den tómen ótken minut.",
    featuredMeta: "12 minut · 14 apr · keys",
    featuredGlyph: "Q",
    latestEyebrow: "Hámmesi",
    latestTitle: "Zaldan",
    latestTitleEm: "jańa.",
    posts: [
      { c:"b1", g:"O", cat:"Operaciya", t:"Juma keshesi marjasın shesh aluwshı segiz saat.", m:"6 minut · 09 apr" },
      { c:"b2", g:"K", cat:"Ashxana",   t:"KDS P&L den neni alıp tasaydı (hám neni emes).", m:"4 minut · 02 apr" },
      { c:"b3", g:"M", cat:"Marketing", t:"Bundle, kombo hám +28% chek matematikası.", m:"7 minut · 26 mar" },
      { c:"b4", g:"F", cat:"Fudkost",   t:"Nege fudkost procenti durıs emes KPI — hám ornına neni quwıp júriw.", m:"5 minut · 18 mar" },
      { c:"b5", g:"L", cat:"Loyallıq",  t:"Telefon nomeri loyallıǵı: 41% buyurtpa, nol plastik.", m:"4 minut · 10 mar" },
      { c:"b6", g:"P", cat:"Platforma", t:"Wifi ózishken jaǵdayda da orındı sata berеtuǵın offline-first sinxron ishinde.", m:"9 minut · 02 mar" },
    ],
    newsEyebrow: "Pochta",
    newsTitle: "Ayına bir marja rıshagı.",
    newsDesc: "Ayına bir xat: bir P&L rıshak, sonıń artındaǵı sanlar hám onı tartıw ushın bir bet playbook. Suwsız.",
    newsPlaceholder: "you@restaurant.com",
    newsCta: "Jazılıw",
  },
};

const BlogContent = ({ B }) => (
  <>
    <section className="page-hero">
      <div className="wrap">
        <div className="eyebrow">{B.eyebrow}</div>
        <h1>{B.title_a} <em>{B.title_b}</em></h1>
        <p className="lede">{B.lede}</p>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{B.featuredEyebrow}</div>
        </div>
        <div className="featured-post">
          <div className="pcover">
            <div className="glyph">{B.featuredGlyph}</div>
          </div>
          <div className="pbody">
            <div className="pcat">{B.featuredCat}</div>
            <h3>{B.featuredTitle}</h3>
            <p className="pexcerpt">{B.featuredExcerpt}</p>
            <div className="pmeta">{B.featuredMeta}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{B.latestEyebrow}</div>
          <h2>{B.latestTitle} <em>{B.latestTitleEm}</em></h2>
        </div>
        <div className="blog-grid">
          {B.posts.map((p, i) => (
            <article className="blog-card" key={i}>
              <div className={"pthumb " + p.c}>
                <div className="glyph">{p.g}</div>
              </div>
              <div className="pbody">
                <div className="pcat">{p.cat}</div>
                <h4>{p.t}</h4>
                <div className="pmeta">{p.m}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="newsletter">
          <div style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--gold)", letterSpacing:"0.06em", textTransform:"uppercase"}}>{B.newsEyebrow}</div>
          <h3>{B.newsTitle}</h3>
          <p>{B.newsDesc}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={B.newsPlaceholder} required/>
            <button type="submit">{B.newsCta}</button>
          </form>
        </div>
      </div>
    </section>
  </>
);

const BlogApp = () => (
  <PageShell active="blog">
    {({ lang }) => {
      const B = BLOG_I18N[lang] || BLOG_I18N.en;
      return <BlogContent B={B}/>;
    }}
  </PageShell>
);

ReactDOM.createRoot(document.getElementById("root")).render(<BlogApp/>);
