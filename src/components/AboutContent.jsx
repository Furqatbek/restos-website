'use client';
import { useLang } from '@/context/AppContext';

const ABOUT_I18N = {
  en: {
    eyebrow: 'About RestOS',
    title_a: 'Profits up. Costs down.',
    title_b: 'Chaos gone.',
    lede: 'RestOS is the operating system 2,400+ independent venues run to lift margins, cut waste and finish the night without the panic. One platform. Twelve modules. Zero spreadsheets.',
    storyTitle: 'Why we',
    storyTitleEm: 'exist.',
    storyEyebrow: 'Mission',
    story: [
      'Every restaurant owner we meet is running the same broken stack: four POS vendors, three delivery tablets, two spreadsheets and one paper ticket book. The money leaks between the tools. The chaos lives in the kitchen.',
      'RestOS replaces that stack with one connected system. Every order, every ingredient, every som passes through the same spine — so the owner sees the truth, the chef sees the queue, and the line cook sees the next ticket. No double entry. No reconciliation. No 11 p.m. spreadsheet.',
      'We are an independent platform with one job: turn hospitality margins from a guess into a number. We measure ourselves by the line items we move on our customers\' P&L. Nothing else.',
    ],
    timelineEyebrow: 'Platform milestones',
    timelineTitle: 'Eight years of',
    timelineTitleEm: 'compounding margin.',
    timeline: [
      ['2018', 'Founded', 'Two cofounders. One bet: that hospitality margin was a software problem, not a luck problem.'],
      ['2020', 'Offline-first sync', 'Shipped during the pandemic. Customers kept selling when the internet didn\'t. None went dark.'],
      ['2022', 'Live food-cost engine', 'Recipe-level costing in real time. The customer base shaved an average of 3 points off food cost in six months.'],
      ['2024', 'Multi-venue rollout', 'Group consolidation, franchise controls and a unified P&L across locations. ARR tripled.'],
      ['2026', 'Today', '2,400+ venues. 8.2M orders monthly. Customers report a median 11% labour saving and 28% repeat-rate lift in year one.'],
    ],
    valuesEyebrow: 'How we operate',
    valuesTitle: 'Three rules',
    valuesTitleEm: 'for the platform.',
    values: [
      { num: '01', t: 'Margin or it doesn\'t ship', b: 'Every feature is justified against a line item — labour, food cost, fees, or table turns. If it doesn\'t move the P&L, it doesn\'t ship.' },
      { num: '02', t: 'Owners are the user', b: 'We design for the person who signs the cheques. Speed, clarity and one number that tells them whether they made money tonight.' },
      { num: '03', t: 'One bill of truth', b: 'One menu, one inventory, one customer record across the platform. No syncs to debug. No money leaking through the cracks.' },
    ],
    teamEyebrow: 'The team',
    teamTitle: 'Builders behind',
    teamTitleEm: 'the platform.',
    teamSubtitle: '32 product, engineering, design and success operators shipping the system 2,400+ venues run their P&L on.',
    team: [
      { i: 'D', c: '', n: 'Diyor Tashkent', r: 'CEO & Co-founder' },
      { i: 'M', c: 't2', n: 'Mavluda Saidova', r: 'CTO' },
      { i: 'R', c: 't3', n: 'Ravshan Yusupov', r: 'VP Product' },
      { i: 'N', c: 't4', n: 'Nargiza Karimova', r: 'Head of Design' },
    ],
  },
  ru: {
    eyebrow: 'О платформе',
    title_a: 'Прибыль вверх. Издержки вниз.',
    title_b: 'Хаос — в прошлом.',
    lede: 'RestOS — операционная система, на которой 2 400+ независимых заведений поднимают маржу, режут потери и заканчивают вечер без паники. Одна платформа. Двенадцать модулей. Ноль таблиц.',
    storyTitle: 'Зачем мы',
    storyTitleEm: 'существуем.',
    storyEyebrow: 'Миссия',
    story: [
      'Каждый владелец, к которому мы приходим, тянет один и тот же сломанный стек: четыре кассы, три планшета доставок, две таблицы и один блокнот. Деньги утекают между инструментами. Хаос живёт на кухне.',
      'RestOS заменяет этот стек одной связанной системой. Каждый заказ, каждый ингредиент, каждый сум проходит через один хребет — собственник видит правду, шеф видит очередь, повар видит следующий тикет. Без двойного ввода. Без сверок. Без таблицы в 23:00.',
      'Мы независимая платформа с одной задачей: превратить маржу в HoReCa из догадки в число. Мы измеряем себя строчками P&L наших клиентов. Больше нечем.',
    ],
    timelineEyebrow: 'Этапы платформы',
    timelineTitle: 'Восемь лет',
    timelineTitleEm: 'сложенной маржи.',
    timeline: [
      ['2018', 'Старт', 'Два сооснователя. Одна гипотеза: маржа в HoReCa — это софтверная проблема, а не вопрос удачи.'],
      ['2020', 'Offline-first синхронизация', 'Запустили в пандемию. Клиенты продолжали продавать, когда отключался интернет. Никто не закрылся.'],
      ['2022', 'Живой фудкост', 'Калькуляция рецептов в реальном времени. В среднем по базе фудкост упал на 3 пункта за полгода.'],
      ['2024', 'Мульти-точки', 'Консолидация группы, контроль франшизы, единый P&L по точкам. ARR утроился.'],
      ['2026', 'Сегодня', '2 400+ заведений. 8.2М заказов в месяц. Медианный клиент: −11% по фонду оплаты, +28% по повторам в первый год.'],
    ],
    valuesEyebrow: 'Как работает платформа',
    valuesTitle: 'Три правила,',
    valuesTitleEm: 'и всё.',
    values: [
      { num: '01', t: 'Маржа — или не релиз', b: 'Каждая фича оправдывается строчкой P&L: ФОТ, фудкост, комиссии или оборачиваемость. Не двигает цифру — не выходит.' },
      { num: '02', t: 'Пользователь — собственник', b: 'Мы проектируем для того, кто подписывает счета. Скорость, ясность, одна цифра: заработали мы сегодня или нет.' },
      { num: '03', t: 'Одна правда', b: 'Одно меню, склад и клиент по всей платформе. Никаких синхронов для отладки. Деньги не утекают между модулями.' },
    ],
    teamEyebrow: 'Команда',
    teamTitle: 'Те, кто строит',
    teamTitleEm: 'платформу.',
    teamSubtitle: '32 человека в продукте, инженерии, дизайне и поддержке — катят систему, на которой 2 400+ заведений ведут P&L.',
    team: [
      { i: 'Д', c: '', n: 'Диёр Ташкент', r: 'CEO и сооснователь' },
      { i: 'М', c: 't2', n: 'Мавлуда Саидова', r: 'CTO' },
      { i: 'Р', c: 't3', n: 'Равшан Юсупов', r: 'VP Product' },
      { i: 'Н', c: 't4', n: 'Наргиза Каримова', r: 'Глава дизайна' },
    ],
  },
  uz: {
    eyebrow: 'RestOS haqida',
    title_a: 'Foyda — yuqori. Xarajat — past.',
    title_b: 'Tartibsizlik — yo\'q.',
    lede: 'RestOS — 2 400+ mustaqil muassasa marjani ko\'tarish, isrofni qisqartirish va kechni paniksiz yakunlash uchun ishlatadigan operatsion tizim. Bitta platforma. O\'n ikki modul. Jadvallar — yo\'q.',
    storyTitle: 'Nima uchun',
    storyTitleEm: 'mavjudmiz.',
    storyEyebrow: 'Missiya',
    story: [
      'Har bir muassasa egasida bir xil singan stek: to\'rt kassa, uch yetkazib berish planshet, ikki jadval va bir daftar. Pul vositalar orasidan oqib chiqadi. Tartibsizlik — oshxonada yashaydi.',
      'RestOS bu stekni bitta bog\'langan tizim bilan almashtiradi. Har buyurtma, har ingrediyent, har som — bir umurtqa orqali o\'tadi. Egasi haqiqatni, oshpaz navbatni, oshpaz yordamchisi keyingi tiketni ko\'radi.',
      'Biz mustaqil platformamiz, bitta vazifa bilan: HoReCa marjasini taxmin emas, raqamga aylantirish.',
    ],
    timelineEyebrow: 'Platforma bosqichlari',
    timelineTitle: 'Sakkiz yil',
    timelineTitleEm: 'yig\'ilgan marja.',
    timeline: [
      ['2018', 'Boshlanish', 'Ikki ta\'sischi. Bir farazli: HoReCa marjasi omad emas, dasturiy ta\'minot masalasi.'],
      ['2020', 'Offline-first sinxronlash', 'Pandemiyada chiqdik. Mijozlar internet o\'chsa ham sotishni davom ettirdi. Hech kim yopilmadi.'],
      ['2022', 'Jonli fudkost', 'Real vaqtda retsept kalkulyatsiyasi. 6 oyda baza bo\'yicha fudkost o\'rtacha 3 punktga tushdi.'],
      ['2024', 'Ko\'p nuqtali yoyilish', 'Guruh konsolidatsiyasi, franshiza nazorati, birlashtirilgan P&L. ARR uch baravar oshdi.'],
      ['2026', 'Bugun', '2 400+ muassasa. Oyiga 8.2M buyurtma. O\'rtacha mijoz: ish haqi −11%, qaytuv +28% birinchi yilda.'],
    ],
    valuesEyebrow: 'Platforma qoidalari',
    valuesTitle: 'Uchta qoida —',
    valuesTitleEm: 'boshqasi yo\'q.',
    values: [
      { num: '01', t: 'Marja yoki yo\'q', b: 'Har funksiya P&L satri bilan oqlanadi: ish haqi, fudkost, komissiya yoki aylanma.' },
      { num: '02', t: 'Foydalanuvchi — egasi', b: 'Hisoblarni imzolaydiganlar uchun loyihalashtiramiz. Tezlik, aniqlik va bitta raqam.' },
      { num: '03', t: 'Bitta haqiqat', b: 'Bir menyu, ombor, mijoz — butun platformada. Sinxronlar tuzatilmaydi.' },
    ],
    teamEyebrow: 'Jamoa',
    teamTitle: 'Platformani',
    teamTitleEm: 'quruvchilar.',
    teamSubtitle: 'Mahsulot, muhandislik, dizayn va mijoz xizmatida 32 inson.',
    team: [
      { i: 'D', c: '', n: 'Diyor Toshkent', r: 'CEO va ta\'sischi' },
      { i: 'M', c: 't2', n: 'Mavluda Saidova', r: 'CTO' },
      { i: 'R', c: 't3', n: 'Ravshan Yusupov', r: 'VP Product' },
      { i: 'N', c: 't4', n: 'Nargiza Karimova', r: 'Bosh dizayner' },
    ],
  },
  'uz-cyr': {
    eyebrow: 'RestOS ҳақида',
    title_a: 'Фойда — юқори. Харажат — паст.',
    title_b: 'Тартибсизлик — йўқ.',
    lede: 'RestOS — 2 400+ мустақил муассаса маржани кўтариш, исрофни қисқартириш ва кечни паниксиз якунлаш учун ишлатадиган операцион тизим.',
    storyTitle: 'Нима учун',
    storyTitleEm: 'мавжудмиз.',
    storyEyebrow: 'Миссия',
    story: [
      'Ҳар бир муассаса эгасида бир хил синган стек: тўрт касса, уч етказиб бериш планшет, икки жадвал ва бир дафтар.',
      'RestOS бу стекни битта боғланган тизим билан алмаштиради.',
      'Биз мустақил платформамиз, битта вазифа билан: HoReCa маржасини тахмин эмас, рақамга айлантириш.',
    ],
    timelineEyebrow: 'Платформа босқичлари',
    timelineTitle: 'Саккиз йил',
    timelineTitleEm: 'йиғилган маржа.',
    timeline: [
      ['2018', 'Бошланиш', 'Икки таъсисчи. Бир фаразли: HoReCa маржаси омад эмас, дастурий таъминот масаласи.'],
      ['2020', 'Offline-first синхронлаш', 'Пандемияда чиқдик. Мижозлар интернет ўчса ҳам сотишни давом эттирди.'],
      ['2022', 'Жонли фудкост', 'Реал вақтда рецепт калькуляцияси. 6 ойда фудкост ўртача 3 пунктга тушди.'],
      ['2024', 'Кўп нуқтали ёйилиш', 'Гуруҳ консолидацияси, франшиза назорати, бирлаштирилган P&L. ARR уч баравар ошди.'],
      ['2026', 'Бугун', '2 400+ муассаса. Ойига 8.2M буюртма.'],
    ],
    valuesEyebrow: 'Платформа қоидалари',
    valuesTitle: 'Учта қоида —',
    valuesTitleEm: 'бошқаси йўқ.',
    values: [
      { num: '01', t: 'Маржа ёки йўқ', b: 'Ҳар функция P&L сатри билан оқланади.' },
      { num: '02', t: 'Фойдаланувчи — эгаси', b: 'Ҳисобларни имзолайдиганлар учун лойиҳалаштирамиз.' },
      { num: '03', t: 'Битта ҳақиқат', b: 'Бир меню, омбор, мижоз — бутун платформада.' },
    ],
    teamEyebrow: 'Жамоа',
    teamTitle: 'Платформани',
    teamTitleEm: 'қурувчилар.',
    teamSubtitle: 'Маҳсулот, муҳандислик, дизайн ва мижоз хизматида 32 инсон.',
    team: [
      { i: 'Д', c: '', n: 'Диёр Тошкент', r: 'CEO ва таъсисчи' },
      { i: 'М', c: 't2', n: 'Мавлуда Саидова', r: 'CTO' },
      { i: 'Р', c: 't3', n: 'Равшан Юсупов', r: 'VP Product' },
      { i: 'Н', c: 't4', n: 'Наргиза Каримова', r: 'Бош дизайнер' },
    ],
  },
  kaa: {
    eyebrow: 'RestOS haqında',
    title_a: 'Payda — joqarı. Shıǵın — tómen.',
    title_b: 'Tártipsizlik — joq.',
    lede: 'RestOS — 2 400+ ǵárezsiz muassasa marjanı kóteriw, ısırapty qısqartırıw hám keshti paniksiz juwmaqlaw ushın isletetuǵın operacion sistema.',
    storyTitle: 'Nege bizler',
    storyTitleEm: 'barmız.',
    storyEyebrow: 'Missiya',
    story: [
      'Hár bir muassasa iyesinde bir qıylı sınǵan stek: tórt kassa, úsh jetkeriw planshet, eki keste hám bir dápter.',
      'RestOS bul stekti bir baylanısqan sistema menen almastıradı.',
      'Biz ǵárezsiz platforma — bir wazıypa menen: HoReCa marjasın boljaw emes, sanǵa aylandırıw.',
    ],
    timelineEyebrow: 'Platforma basqıshları',
    timelineTitle: 'Segiz jıl',
    timelineTitleEm: 'jıynalǵan marja.',
    timeline: [
      ['2018', 'Baslanıs', 'Eki tiykarlawshı. Bir gipoteza: HoReCa marjası baxıt emes, baǵdarlama másele.'],
      ['2020', 'Offline-first sinxronlaw', 'Pandemiyada shıqtıq. Klientler internet ózishken de sata berdi.'],
      ['2022', 'Janlı fudkost', 'Real waqıtta retsept kalkulaciyası. 6 ay ishinde fudkost orta 3 punktke tústi.'],
      ['2024', 'Kóp orın jayılıw', 'Topar konsolidaciyası, franshiza baqlaw, birlestirilgen P&L. ARR úsh ese ósti.'],
      ['2026', 'Búgin', '2 400+ muassasa. Ayına 8.2M buyurtpa.'],
    ],
    valuesEyebrow: 'Platforma qaǵıydaları',
    valuesTitle: 'Úsh qaǵıyda —',
    valuesTitleEm: 'basqası joq.',
    values: [
      { num: '01', t: 'Marja yamasa joq', b: 'Hár funksiya P&L satırı menen aqlanadı.' },
      { num: '02', t: 'Paydalanıwshı — iyesi', b: 'Esaplarǵa qol qoyatuǵın adam ushın jobalaymız.' },
      { num: '03', t: 'Bir haqıyqat', b: 'Bir menyu, ambar, klient — pútkil platformada.' },
    ],
    teamEyebrow: 'Komanda',
    teamTitle: 'Platformanı',
    teamTitleEm: 'quruwshılar.',
    teamSubtitle: 'Ónim, injenerlik, dizayn hám klient xızmetinde 32 insan.',
    team: [
      { i: 'D', c: '', n: 'Diyor Tashkent', r: 'CEO hám tiykarlawshı' },
      { i: 'M', c: 't2', n: 'Mavluda Saidova', r: 'CTO' },
      { i: 'R', c: 't3', n: 'Ravshan Yusupov', r: 'VP Product' },
      { i: 'N', c: 't4', n: 'Nargiza Karimova', r: 'Bas dizayner' },
    ],
  },
};

export default function AboutContent() {
  const lang = useLang();
  const A = ABOUT_I18N[lang] || ABOUT_I18N.en;
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
        <div className="wrap" style={{ display: 'contents' }}>
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
            <div className="eyebrow">{A.timelineEyebrow}</div>
            <h2>{A.timelineTitle} <em>{A.timelineTitleEm}</em></h2>
          </div>
          <div className="timeline" style={{ marginTop: 48 }}>
            {A.timeline.map(([y, t, b], i) => (
              <div className="tl-row" key={i}>
                <div className="tl-year">{y}</div>
                <div>
                  <div className="tl-title">{t}</div>
                  <div className="tl-body">{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, background: 'var(--cream-2)' }}>
        <div className="wrap" style={{ paddingTop: 120 }}>
          <div className="section-head">
            <div className="eyebrow">{A.valuesEyebrow}</div>
            <h2>{A.valuesTitle} <em>{A.valuesTitleEm}</em></h2>
          </div>
          <div className="values-grid">
            {A.values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="num">{v.num}</div>
                <h4>{v.t}</h4>
                <p>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{A.teamEyebrow}</div>
            <h2>{A.teamTitle} <em>{A.teamTitleEm}</em></h2>
            <p>{A.teamSubtitle}</p>
          </div>
          <div className="team-grid">
            {A.team.map((m, i) => (
              <div className="team-card" key={i}>
                <div className={'team-photo ' + m.c}>{m.i}</div>
                <div className="nm">{m.n}</div>
                <div className="ro">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
