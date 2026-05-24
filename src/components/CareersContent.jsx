'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/context/AppContext';

const VACANCY_I18N = {
  en: {
    eyebrow: 'Careers',
    title_a: 'Help us put',
    title_b: 'profit back on the menu.',
    lede: 'Every line we ship moves a P&L for an independent venue. Cut labour. Cut food cost. Cut the chaos. We\'re hiring across product, engineering and customer success.',
    perksEyebrow: 'Compensation & perks',
    perksTitle: 'Paid well. Shipped fast.',
    perks: [
      { nm: 'USD salary + equity', desc: 'Above-market base in stable currency. Real equity in a profitable platform.' },
      { nm: '4-day weeks in summer', desc: 'July–August. We\'re shipping for hospitality — we know what overtime feels like.' },
      { nm: 'Your stack, your machine', desc: 'MacBook or ThinkPad. Refresh every 3 years. Whatever editor, whatever OS.' },
      { nm: 'Real users from day one', desc: 'Every shipper lands code into 2,400+ live venues. No internal-only sandboxes.' },
      { nm: '$80/month venue credit', desc: 'Eat at customer venues. Bring back observations. Margin moves that way.' },
      { nm: '$1,200/year learning', desc: 'Courses, conferences, books. Sharpen the people who sharpen the platform.' },
    ],
    rolesEyebrow: 'Open roles',
    rolesTitle: 'Roles that move',
    rolesTitleEm: 'the platform.',
    rolesSubtitle: 'Each one ships into a real P&L. Don\'t see your role? Send us the line item you\'d move.',
    apply: 'Apply',
    noRoles: 'No open roles right now. Check back soon.',
    valuesEyebrow: 'How we operate',
    valuesTitle: 'Three rules',
    valuesTitleEm: 'we ship by.',
    values: [
      { num: '01', t: 'Ship to the P&L', b: 'Every feature gets pre-committed to a line: labour, food cost, fees or turns.' },
      { num: '02', t: 'Write before you build', b: 'One-page RFC before any feature. Forces clarity. Saves quarters.' },
      { num: '03', t: 'Owners are the user', b: 'Quarterly, every employee works a shift at a customer venue.' },
    ],
  },
  ru: {
    eyebrow: 'Карьера',
    title_a: 'Помогите вернуть',
    title_b: 'прибыль в меню.',
    lede: 'Каждая строчка, которую мы катим, двигает P&L независимого заведения.',
    perksEyebrow: 'Компенсация',
    perksTitle: 'Платим хорошо. Релизим быстро.',
    perks: [
      { nm: 'USD + equity', desc: 'База выше рынка в стабильной валюте. Реальный equity в прибыльной платформе.' },
      { nm: '4-дневка летом', desc: 'Июль–август. Мы строим для HoReCa — знаем, что такое переработки.' },
      { nm: 'Твой стек, твоя машина', desc: 'MacBook или ThinkPad. Обновление раз в 3 года.' },
      { nm: 'Живые юзеры с первого дня', desc: 'Каждый шиппер катит в 2 400+ работающих заведений.' },
      { nm: '$80/мес на заведения', desc: 'Ешь у клиентов. Возвращайся с наблюдениями.' },
      { nm: '$1 200/год на обучение', desc: 'Курсы, конференции, книги.' },
    ],
    rolesEyebrow: 'Открытые позиции',
    rolesTitle: 'Позиции, которые двигают',
    rolesTitleEm: 'платформу.',
    rolesSubtitle: 'Каждая релизится в реальный P&L.',
    apply: 'Отклик',
    noRoles: 'Открытых позиций пока нет. Заходите позже.',
    valuesEyebrow: 'Как мы катим',
    valuesTitle: 'Три правила',
    valuesTitleEm: 'релизов.',
    values: [
      { num: '01', t: 'Катим в P&L', b: 'Каждая фича заранее привязана к строке.' },
      { num: '02', t: 'Сначала пишем', b: 'Одностраничный RFC перед фичей.' },
      { num: '03', t: 'Пользователь — владелец', b: 'Раз в квартал каждый отрабатывает смену у клиента.' },
    ],
  },
  uz: {
    eyebrow: 'Karyera',
    title_a: 'Foydani menyuga',
    title_b: 'qaytarishga yordam bering.',
    lede: 'Biz chiqaradigan har bir satr mustaqil muassasaning P&L ini qimirlatadi.',
    perksEyebrow: 'Kompensatsiya',
    perksTitle: 'Yaxshi to\'laymiz. Tez chiqaramiz.',
    perks: [
      { nm: 'USD + equity', desc: 'Bozordan yuqori baza barqaror valyutada.' },
      { nm: 'Yozda 4-kunlik', desc: 'Iyul–avgust.' },
      { nm: 'Sizning stek, sizning mashina', desc: 'MacBook yoki ThinkPad. 3 yilda yangilanadi.' },
      { nm: 'Birinchi kundan jonli mijozlar', desc: 'Har shipper 2 400+ ishlayotgan nuqtaga kod yetkazadi.' },
      { nm: 'Oyiga $80 muassasa krediti', desc: 'Mijozlarda ovqatlaning.' },
      { nm: 'Yiliga $1 200 o\'qish', desc: 'Kurslar, konferensiyalar, kitoblar.' },
    ],
    rolesEyebrow: 'Ochiq lavozimlar',
    rolesTitle: 'Platformani siljitadigan',
    rolesTitleEm: 'rollar.',
    rolesSubtitle: 'Har biri haqiqiy P&L ga chiqadi.',
    apply: 'Ariza',
    noRoles: 'Hozircha ochiq lavozimlar yo\'q. Keyinroq kiring.',
    valuesEyebrow: 'Qanday chiqaramiz',
    valuesTitle: 'Uch qoida',
    valuesTitleEm: 'biz bo\'yicha.',
    values: [
      { num: '01', t: 'P&L ga chiqaramiz', b: 'Har funksiya satrga oldindan bog\'lanadi.' },
      { num: '02', t: 'Avval yozamiz', b: 'Har funksiyadan oldin bir sahifalik RFC.' },
      { num: '03', t: 'Foydalanuvchi — egasi', b: 'Chorakda har xodim mijoz nuqtasida smena ishlaydi.' },
    ],
  },
  'uz-cyr': {
    eyebrow: 'Карьера',
    title_a: 'Фойдани менюга',
    title_b: 'қайтаришга ёрдам беринг.',
    lede: 'Биз чиқарадиган ҳар бир сатр мустақил муассасанинг P&L ини қимирлатади.',
    perksEyebrow: 'Компенсация',
    perksTitle: 'Яхши тўлаймиз. Тез чиқарамиз.',
    perks: [
      { nm: 'USD + equity', desc: 'Бозордан юқори база барқарор валютада.' },
      { nm: 'Ёзда 4-кунлик', desc: 'Июль–август.' },
      { nm: 'Сизнинг стек, сизнинг машина', desc: 'MacBook ёки ThinkPad. 3 йилда янгиланади.' },
      { nm: 'Биринчи кундан жонли мижозлар', desc: 'Ҳар шиппер 2 400+ ишлаётган нуқтага код етказади.' },
      { nm: 'Ойига $80 муассаса кредити', desc: 'Мижозларда овқатланинг.' },
      { nm: 'Йилига $1 200 ўқиш', desc: 'Курслар, конференциялар, китоблар.' },
    ],
    rolesEyebrow: 'Очиқ лавозимлар',
    rolesTitle: 'Платформани силжитадиган',
    rolesTitleEm: 'роллар.',
    rolesSubtitle: 'Ҳар бири ҳақиқий P&L га чиқади.',
    apply: 'Ариза',
    noRoles: 'Ҳозирча очиқ лавозимлар йўқ. Кейинроқ киринг.',
    valuesEyebrow: 'Қандай чиқарамиз',
    valuesTitle: 'Уч қоида',
    valuesTitleEm: 'биз бўйича.',
    values: [
      { num: '01', t: 'P&L га чиқарамиз', b: 'Ҳар функция сатрга олдиндан боғланади.' },
      { num: '02', t: 'Аввал ёзамиз', b: 'Ҳар функциядан олдин бир саҳифалик RFC.' },
      { num: '03', t: 'Фойдаланувчи — эгаси', b: 'Чоракда ҳар ходим мижоз нуқтасида смена ишлайди.' },
    ],
  },
  kaa: {
    eyebrow: 'Kareyra',
    title_a: 'Paydanı menyuǵa',
    title_b: 'qaytarıwǵa kómek beriń.',
    lede: 'Biz shıǵaratuǵın hár qatar ǵárezsiz muassasaniń P&L in qımıldatadı.',
    perksEyebrow: 'Kompensaciya',
    perksTitle: 'Jaqsı tólenedi. Tez shıǵaramız.',
    perks: [
      { nm: 'USD + equity', desc: 'Bazardan joqarı baza turaqlı valyutada.' },
      { nm: 'Yaz 4-kúnlik', desc: 'İyul–avgust.' },
      { nm: 'Sizdiń stek, sizdiń mashinańız', desc: 'MacBook yamasa ThinkPad.' },
      { nm: 'Birinshi kúnden janlı klientler', desc: 'Hár shipper 2 400+ islep atırǵan orınǵa kod jetkeredi.' },
      { nm: 'Ayına $80 muassasa krediti', desc: 'Klientlerde awqatlanıń.' },
      { nm: 'Jılına $1 200 oqıw', desc: 'Kurslar, konferensiyalar, kitaplar.' },
    ],
    rolesEyebrow: 'Ashıq lawazımlar',
    rolesTitle: 'Platformanı qımıldatatuǵın',
    rolesTitleEm: 'rollar.',
    rolesSubtitle: 'Hár birewi haqıyqıy P&L ǵa shıǵadı.',
    apply: 'Arız',
    noRoles: 'Házir ashıq lawazımlar joq. Keyinrek kiriń.',
    valuesEyebrow: 'Qalay shıǵaramız',
    valuesTitle: 'Úsh qaǵıyda',
    valuesTitleEm: 'biz boyınsha.',
    values: [
      { num: '01', t: 'P&L ǵa shıǵaramız', b: 'Hár funksiya qatarǵa aldın baylanadı.' },
      { num: '02', t: 'Aldın jazamız', b: 'Hár funksiyadan aldın bir bet RFC.' },
      { num: '03', t: 'Paydalanıwshı — iyesi', b: 'Toqsanda hár xızmetker klient orınında smena isleydi.' },
    ],
  },
};

export default function CareersContent() {
  const lang = useLang();
  const V = VACANCY_I18N[lang] || VACANCY_I18N.en;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/vacancies?lang=${lang}&status=open`)
      .then(r => r.json())
      .then(data => setRoles(Array.isArray(data) ? data : []))
      .catch(() => setRoles([]))
      .finally(() => setLoading(false));
  }, [lang]);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{V.eyebrow}</div>
          <h1>{V.title_a} <em>{V.title_b}</em></h1>
          <p className="lede">{V.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{V.rolesEyebrow}</div>
            <h2>{V.rolesTitle} <em>{V.rolesTitleEm}</em></h2>
            <p>{V.rolesSubtitle}</p>
          </div>
          <div className="jobs-list">
            {loading ? (
              <div style={{ padding: '40px 0', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>…</div>
            ) : roles.length === 0 ? (
              <div style={{ padding: '40px 0', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>{V.noRoles}</div>
            ) : roles.map(r => (
              <div className="job-row" key={r.id}>
                <div className="title">{r.title}</div>
                <div className="dept">{r.department}</div>
                <div className="where">{r.location}</div>
                <a className="apply" href="#">{V.apply}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, background: 'var(--cream-2)' }}>
        <div className="wrap" style={{ paddingTop: 120 }}>
          <div className="section-head">
            <div className="eyebrow">{V.perksEyebrow}</div>
            <h2>{V.perksTitle}</h2>
          </div>
          <div className="perks-grid">
            {V.perks.map((p, i) => (
              <div className="perk" key={i}>
                <span className="dot"/>
                <div>
                  <div className="nm">{p.nm}</div>
                  <div className="desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{V.valuesEyebrow}</div>
            <h2>{V.valuesTitle} <em>{V.valuesTitleEm}</em></h2>
          </div>
          <div className="values-grid">
            {V.values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="num">{v.num}</div>
                <h4>{v.t}</h4>
                <p>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
