'use client';
import { useLang } from '@/context/AppContext';
import Icon from './Icon';

// REWRITTEN FROM NOTHING, 2026-10-05.
//
// The previous version of this file was fiction: a 2018 founding with two
// cofounders, a 2020 pandemic chapter, "2,400+ venues", "8.2M orders monthly",
// "ARR tripled", a 32-person team and four named executives — including a CEO
// who is not the person who owns this company. None of it was true. RestOS
// launched in January 2026 and is one person.
//
// THE RULE FOR THIS FILE: every sentence here must be true of a two-person
// company with a handful of customers. The only people named are Boris Vasylev
// (CEO) and Furqat Saydamadov (CTO), who are real and hold those roles. No
// invented colleagues. No venue counts. No revenue. No percentages. No history
// that did not happen. If a claim needs a number to land, it does not belong on
// this page — the smallness IS the pitch, because direct access to the person
// who wrote the software is the one thing a larger vendor structurally cannot
// offer. If the team grows, add the person; never round the number up.
const ABOUT_I18N = {
  en: {
    eyebrow: 'About RestOS',
    title_a: "I'm Furqat.",
    title_b: 'I wrote this system.',
    lede: 'RestOS was built in Tashkent in 2026. I wrote it, I install it, and when something breaks you talk to me — not to a support department.',
    storyEyebrow: 'Why it exists',
    storyTitle: 'One system instead of',
    storyTitleEm: 'five subscriptions.',
    story: [
      'A café in Tashkent runs its till in one program, its stock in a second, its delivery orders on three tablets, and its real numbers in a notebook. Nothing talks to anything. At the end of the month the owner still does not know what a dish actually costs.',
      'RestOS is one connected system instead: till, kitchen, stock, delivery and finance on the same spine. Every sale deducts the ingredients. Food cost is a number you can look at today, not a guess you settle after a stock count.',
      'It is a new product — it went live in 2026, and it runs in a small number of venues in Tashkent. I am not going to pretend otherwise. What those venues get in exchange is the thing below.',
    ],
    valuesEyebrow: 'What you actually get',
    valuesTitle: 'A two-person company,',
    valuesTitleEm: 'on purpose.',
    values: [
      { num: '01', t: 'You talk to the developer', b: 'Not a reseller, not a first-line agent reading a script. The person who wrote the code is the person who answers you, and he can change the code.' },
      { num: '02', t: 'I set it up myself', b: 'I import your menu, set up your stock, and train your staff in your venue. I am there on the day you go live, not a partner you have never met.' },
      { num: '03', t: 'My number is on this page', b: 'Telegram and a phone number that reach me directly. No ticket queue standing between you and a fix.' },
    ],
    teamEyebrow: 'Who we are',
    teamTitle: 'Two people.',
    teamTitleEm: 'That is the company.',
    team: [
      { i: 'B', c: '', n: 'Boris Vasylev', r: 'CEO' },
      { i: 'F', c: 't2', n: 'Furqat Saydamadov', r: 'CTO' },
    ],
    contactEyebrow: 'Talk to me',
    contactTitle: 'Directly.',
    contactBody: 'If you run a venue in Tashkent and want to see whether this fits, write to me. I will answer you, not a bot.',
    tg: 'Telegram',
    phone: 'Phone',
  },
  ru: {
    eyebrow: 'О RestOS',
    title_a: 'Меня зовут Фуркат.',
    title_b: 'Эту систему написал я.',
    lede: 'RestOS сделан в Ташкенте в 2026 году. Я его написал, я его внедряю, и если что-то ломается — вы разговариваете со мной, а не с отделом поддержки.',
    storyEyebrow: 'Зачем это',
    storyTitle: 'Одна система вместо',
    storyTitleEm: 'пяти подписок.',
    story: [
      'Кафе в Ташкенте пробивает чеки в одной программе, склад ведёт во второй, доставку принимает на трёх планшетах, а реальные цифры держит в тетради. Ничего ни с чем не связано. В конце месяца владелец всё равно не знает, сколько на самом деле стоит блюдо.',
      'RestOS — это одна связанная система: касса, кухня, склад, доставка и финансы на одном хребте. Каждая продажа списывает ингредиенты. Фудкост — число, которое можно посмотреть сегодня, а не догадка до инвентаризации.',
      'Это новый продукт: запущен в 2026 году и работает в небольшом числе заведений Ташкента. Я не буду делать вид, что это не так. Взамен эти заведения получают то, что ниже.',
    ],
    valuesEyebrow: 'Что вы получаете',
    valuesTitle: 'Компания из двух человек —',
    valuesTitleEm: 'и это осознанно.',
    values: [
      { num: '01', t: 'Вы говорите с разработчиком', b: 'Не с дилером и не с первой линией по скрипту. Отвечает тот, кто написал код, — и он может этот код поменять.' },
      { num: '02', t: 'Внедряю я сам', b: 'Сам импортирую меню, настраиваю склад и обучаю персонал у вас в заведении. В день запуска я на месте, а не партнёр, которого вы никогда не видели.' },
      { num: '03', t: 'Мой номер — на этой странице', b: 'Telegram и телефон, которые ведут напрямую ко мне. Между вами и решением проблемы нет очереди тикетов.' },
    ],
    teamEyebrow: 'Кто мы',
    teamTitle: 'Два человека.',
    teamTitleEm: 'Это вся компания.',
    team: [
      { i: 'Б', c: '', n: 'Борис Василев', r: 'CEO' },
      { i: 'Ф', c: 't2', n: 'Фуркат Сайдамадов', r: 'CTO' },
    ],
    contactEyebrow: 'Напишите мне',
    contactTitle: 'Напрямую.',
    contactBody: 'Если у вас заведение в Ташкенте и вы хотите посмотреть, подходит ли это вам — напишите. Ответит человек, а не бот.',
    tg: 'Telegram',
    phone: 'Телефон',
  },
  uz: {
    eyebrow: 'RestOS haqida',
    title_a: 'Men Furqat.',
    title_b: 'Bu tizimni men yozdim.',
    lede: "RestOS — 2026 yilda Toshkentda qurilgan. Men uni yozdim, men o'rnataman, va muammo bo'lsa siz men bilan gaplashasiz — qo'llab-quvvatlash bo'limi bilan emas.",
    storyEyebrow: 'Nega kerak',
    storyTitle: "Besh obuna o'rniga",
    storyTitleEm: 'bitta tizim.',
    story: [
      "Toshkentdagi kafe cheklarni bitta dasturda uradi, omborni ikkinchisida yuritadi, yetkazib berishni uchta planshetda qabul qiladi, haqiqiy raqamlarni esa daftarda saqlaydi. Hech narsa bir-biri bilan bog'lanmagan. Oy oxirida egasi baribir bir taomning aslida qanchaga tushishini bilmaydi.",
      "RestOS — bitta bog'langan tizim: kassa, oshxona, ombor, yetkazib berish va moliya bitta o'zakda. Har bir savdo ingredientlarni hisobdan chiqaradi. Fudkost — inventarizatsiyadan keyingi taxmin emas, bugun ko'rish mumkin bo'lgan raqam.",
      "Bu yangi mahsulot: 2026 yilda ishga tushdi va Toshkentning oz sonli muassasalarida ishlaydi. Men buni boshqacha ko'rsatmoqchi emasman. Buning evaziga o'sha muassasalar quyidagini oladi.",
    ],
    valuesEyebrow: 'Siz nima olasiz',
    valuesTitle: 'Ikki kishilik kompaniya —',
    valuesTitleEm: 'va bu ataylab shunday.',
    values: [
      { num: '01', t: 'Siz dasturchining o\'zi bilan gaplashasiz', b: "Diler ham, skript o'qiyotgan birinchi liniya ham emas. Kodni yozgan odam javob beradi — va u kodni o'zgartira oladi." },
      { num: '02', t: "O'rnatishni o'zim qilaman", b: "Menyuni o'zim ko'chiraman, omborni sozlayman va xodimlaringizni o'z muassasangizda o'qitaman. Ishga tushgan kuni men joyda bo'laman." },
      { num: '03', t: 'Raqamim shu sahifada', b: "To'g'ridan-to'g'ri menga chiqadigan Telegram va telefon. Siz bilan yechim o'rtasida tiket navbati yo'q." },
    ],
    teamEyebrow: 'Biz kimmiz',
    teamTitle: 'Ikki kishi.',
    teamTitleEm: 'Kompaniya shu.',
    team: [
      { i: 'B', c: '', n: 'Boris Vasylev', r: 'CEO' },
      { i: 'F', c: 't2', n: 'Furqat Saydamadov', r: 'CTO' },
    ],
    contactEyebrow: 'Menga yozing',
    contactTitle: "To'g'ridan-to'g'ri.",
    contactBody: "Toshkentda muassasangiz bo'lsa va bu sizga mos keladimi, ko'rmoqchi bo'lsangiz — yozing. Sizga bot emas, odam javob beradi.",
    tg: 'Telegram',
    phone: 'Telefon',
  },
  'uz-cyr': {
    eyebrow: 'RestOS ҳақида',
    title_a: 'Мен Фурқат.',
    title_b: 'Бу тизимни мен ёздим.',
    lede: 'RestOS — 2026 йилда Тошкентда қурилган. Мен уни ёздим, мен ўрнатаман, ва муаммо бўлса сиз мен билан гаплашасиз — қўллаб-қувватлаш бўлими билан эмас.',
    storyEyebrow: 'Нега керак',
    storyTitle: 'Беш обуна ўрнига',
    storyTitleEm: 'битта тизим.',
    story: [
      'Тошкентдаги кафе чекларни битта дастурда уради, омборни иккинчисида юритади, етказиб беришни учта планшетда қабул қилади, ҳақиқий рақамларни эса дафтарда сақлайди. Ҳеч нарса бир-бири билан боғланмаган. Ой охирида эгаси барибир бир таомнинг аслида қанчага тушишини билмайди.',
      'RestOS — битта боғланган тизим: касса, ошхона, омбор, етказиб бериш ва молия битта ўзакда. Ҳар бир савдо ингредиентларни ҳисобдан чиқаради. Фудкост — инвентаризациядан кейинги тахмин эмас, бугун кўриш мумкин бўлган рақам.',
      'Бу янги маҳсулот: 2026 йилда ишга тушди ва Тошкентнинг оз сонли муассасаларида ишлайди. Мен буни бошқача кўрсатмоқчи эмасман. Бунинг эвазига ўша муассасалар қуйидагини олади.',
    ],
    valuesEyebrow: 'Сиз нима оласиз',
    valuesTitle: 'Икки кишилик компания —',
    valuesTitleEm: 'ва бу атайлаб шундай.',
    values: [
      { num: '01', t: 'Сиз дастурчининг ўзи билан гаплашасиз', b: 'Дилер ҳам, скрипт ўқиётган биринчи линия ҳам эмас. Кодни ёзган одам жавоб беради — ва у кодни ўзгартира олади.' },
      { num: '02', t: 'Ўрнатишни ўзим қиламан', b: 'Менюни ўзим кўчираман, омборни созлайман ва ходимларингизни ўз муассасангизда ўқитаман. Ишга тушган куни мен жойда бўламан.' },
      { num: '03', t: 'Рақамим шу саҳифада', b: 'Тўғридан-тўғри менга чиқадиган Telegram ва телефон. Сиз билан ечим ўртасида тикет навбати йўқ.' },
    ],
    teamEyebrow: 'Биз киммиз',
    teamTitle: 'Икки киши.',
    teamTitleEm: 'Компания шу.',
    team: [
      { i: 'Б', c: '', n: 'Борис Василев', r: 'CEO' },
      { i: 'Ф', c: 't2', n: 'Фурқат Сайдамадов', r: 'CTO' },
    ],
    contactEyebrow: 'Менга ёзинг',
    contactTitle: 'Тўғридан-тўғри.',
    contactBody: 'Тошкентда муассасангиз бўлса ва бу сизга мос келадими, кўрмоқчи бўлсангиз — ёзинг. Сизга бот эмас, одам жавоб беради.',
    tg: 'Telegram',
    phone: 'Телефон',
  },
  kaa: {
    eyebrow: 'RestOS haqqında',
    title_a: 'Men Furqat.',
    title_b: 'Bul sistemanı men jazdım.',
    lede: "RestOS — 2026 jılı Tashkentte qurılǵan. Onı men jazdım, men ornatamın, hám másele bolsa siz men menen sóylesesiz — qollap-quwatlaw bólimi menen emes.",
    storyEyebrow: 'Ne ushın kerek',
    storyTitle: 'Bes jazılıw ornına',
    storyTitleEm: 'bir sistema.',
    story: [
      "Tashkenttegi kafe cheklerdi bir baǵdarlamada uradı, ambardı ekinshisinde júrgizedi, jetkeriwdi úsh planshette qabıl etedi, haqıyqıy sanlardı bolsa dápterde saqlaydı. Hesh nárse bir-biri menen baylanıspaǵan. Ay aqırında iyesi báribir bir tamaqtıń shınında qanshaǵa túsetuǵının bilmeydi.",
      "RestOS — bir baylanısqan sistema: kassa, asxana, ambar, jetkeriw hám finans bir ózekte. Hár bir sawda ingredientlerdi esaptan shıǵaradı. Fudkost — inventarizaciyadan keyingi boljaw emes, búgin kóriwge bolatuǵın san.",
      "Bul jańa ónim: 2026 jılı iske tústi hám Tashkenttiń az sanlı orınlarında isleydi. Men bunı basqasha kórsetpekshi emespen. Onıń ornına sol orınlar tómendegini aladı.",
    ],
    valuesEyebrow: 'Siz ne alasız',
    valuesTitle: 'Eki adamnan ibarat kompaniya —',
    valuesTitleEm: 'hám bul ataylap sonday.',
    values: [
      { num: '01', t: 'Siz baǵdarlamashınıń ózi menen sóylesesiz', b: "Diler de, skript oqıp atırǵan birinshi liniya da emes. Kodtı jazǵan adam juwap beredi — hám ol kodtı ózgerte aladı." },
      { num: '02', t: 'Ornatıwdı ózim islaymen', b: "Menyudı ózim kóshiremen, ambardı sazlayman hám xızmetkerlerińizdi óz orınıńızda oqıtaman. Iske túsken kúni men jayda bolaman." },
      { num: '03', t: 'Nomerim usı bette', b: "Tuwrıdan-tuwrı maǵan shıǵatuǵın Telegram hám telefon. Siz benen sheshim ortasında tiket gezegi joq." },
    ],
    teamEyebrow: 'Biz kimbiz',
    teamTitle: 'Eki adam.',
    teamTitleEm: 'Kompaniya usı.',
    team: [
      { i: 'B', c: '', n: 'Boris Vasylev', r: 'CEO' },
      { i: 'F', c: 't2', n: 'Furqat Saydamadov', r: 'CTO' },
    ],
    contactEyebrow: 'Maǵan jazıń',
    contactTitle: 'Tuwrıdan-tuwrı.',
    contactBody: "Tashkentte orınıńız bolsa hám bul sizge sáykes pe, kórmekshi bolsańız — jazıń. Sizge bot emes, adam juwap beredi.",
    tg: 'Telegram',
    phone: 'Telefon',
  },
};

// The one place these live on this page. Same handle as the footer contact.
const TELEGRAM = 'furqaty';
const PHONE_DISPLAY = '+998 94 114 3232';
const PHONE_HREF = '+998941143232';

export default function AboutContent() {
  const lang = useLang();
  const A = ABOUT_I18N[lang] || ABOUT_I18N.uz;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{A.eyebrow}</div>
          <h1>{A.title_a} <em>{A.title_b}</em></h1>
          <p className="lede">{A.lede}</p>
        </div>
      </section>

      <section className="split">
        <div className="wrap">
          <div>
            <div className="eyebrow">{A.storyEyebrow}</div>
            <h2>{A.storyTitle} <em>{A.storyTitleEm}</em></h2>
          </div>
          <div className="body">
            {A.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{A.valuesEyebrow}</div>
            <h2>{A.valuesTitle} <em>{A.valuesTitleEm}</em></h2>
          </div>
          <div className="values-grid">
            {A.values.map((v) => (
              <div className="value-card" key={v.num}>
                <div className="num">{v.num}</div>
                <h4>{v.t}</h4>
                <p>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{A.teamEyebrow}</div>
            <h2>{A.teamTitle} <em>{A.teamTitleEm}</em></h2>
          </div>
          <div className="team-grid team-grid--2">
            {A.team.map((m) => (
              <div className="team-card" key={m.n}>
                <div className={'team-photo' + (m.c ? ' ' + m.c : '')} aria-hidden="true">{m.i}</div>
                <div className="nm">{m.n}</div>
                <div className="ro">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{A.contactEyebrow}</div>
            <h2><em>{A.contactTitle}</em></h2>
            <p>{A.contactBody}</p>
          </div>
          <div className="about-contact">
            <a className="about-contact-card" href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer">
              <span className="about-contact-icon"><Icon name="telegram" size={18}/></span>
              <span>
                <span className="about-contact-label">{A.tg}</span>
                <span className="about-contact-value">@{TELEGRAM}</span>
              </span>
            </a>
            <a className="about-contact-card" href={`tel:${PHONE_HREF}`}>
              <span className="about-contact-icon"><Icon name="bell" size={18}/></span>
              <span>
                <span className="about-contact-label">{A.phone}</span>
                <span className="about-contact-value">{PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
