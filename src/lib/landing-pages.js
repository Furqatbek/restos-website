// Keyword-targeted landing pages. Each entry is a commercial-intent page
// built to rank for one head keyword. Add entries here; the [lang]/[slug]
// route, sitemap, and static params pick them up automatically.
//
// Structure: LANDING_PAGES[lang][slug] = { keyword, title, description,
//   eyebrow, h1, lede, sections: [{ h2, body }], faqs: [[q, a]] }
// `body` and answers are plain text (rendered as paragraphs).

export const LANDING_PAGES = {
  ru: {
    'pos-sistema-dlya-kafe-i-restoranov': {
      keyword: 'POS система для кафе и ресторанов',
      title: 'POS система для кафе и ресторанов — RestOS',
      description:
        'POS система RestOS для кафе и ресторанов в Узбекистане: быстрые продажи, работа офлайн, интеграции с доставкой и кухней. Запуск за 48 часов.',
      eyebrow: 'POS система',
      h1: 'POS система для кафе и ресторанов',
      lede: 'Касса, которая учится за одну смену, работает без интернета и связывает зал, кухню и склад в одну систему. Запуск за 48 часов — на вашем оборудовании.',
      sections: [
        {
          h2: 'Быстрые продажи без обучения',
          body: 'Официант пробивает заказ меньше чем за 12 секунд. Интерфейс рассчитан на палец, а не на мышку, поэтому новый сотрудник осваивает кассу за одну смену. Заказ из зала сразу уходит на кухонный экран — без беготни и потерянных бумажек.',
        },
        {
          h2: 'Работает, даже когда падает интернет',
          body: 'POS система RestOS продолжает принимать заказы и печатать чеки офлайн. Как только связь восстанавливается, всё автоматически синхронизируется с сервером. Вы не теряете ни одной продажи в час пик.',
        },
        {
          h2: 'Одна система вместо пяти подписок',
          body: 'Касса связана со складом, доставкой, лояльностью и финансами. Каждая продажа списывает ингредиенты, обновляет фудкост и попадает в отчёты. Не нужно вручную сводить данные из разных программ.',
        },
        {
          h2: 'Интеграции с доставкой и оплатой',
          body: 'Yandex Eats, Wolt, Glovo и локальные агрегаторы — в одном окне, на один принтер. Оплата картой, кошельком, Click и Payme, чаевые и разделение счёта — всё сверяется автоматически.',
        },
      ],
      faqs: [
        ['Нужно ли новое оборудование?', 'Нет. RestOS работает на любом iPad, Android-планшете или ПК. Ваши принтеры и терминалы подключаются как есть.'],
        ['За сколько можно запуститься?', '48 часов до первого заказа. Мы импортируем ваше меню и обучаем персонал.'],
        ['Сколько стоит?', 'От 280 000 сум в месяц за заведение, без ограничения по числу сотрудников. Есть бесплатный пробный период.'],
      ],
    },
    'avtomatizatsiya-restorana': {
      keyword: 'автоматизация ресторана',
      title: 'Автоматизация ресторана — система управления RestOS',
      description:
        'Автоматизация ресторана и кафе под ключ: касса, кухня, склад, доставка, лояльность и финансы в одной системе. Снижайте фудкост и затраты на персонал.',
      eyebrow: 'Автоматизация ресторана',
      h1: 'Автоматизация ресторана от кассы до P&L',
      lede: 'Двенадцать модулей в одной системе управления. Включайте по мере роста: одно меню, один склад, одна правда о вашем бизнесе.',
      sections: [
        {
          h2: 'Что значит автоматизировать ресторан',
          body: 'Это значит перестать сводить Excel-таблицы по вечерам. Продажи, остатки, себестоимость, смены и отчёты живут в одной системе и обновляются в реальном времени. Вы видите маржу по каждому блюду, а не раз в месяц по итогам инвентаризации.',
        },
        {
          h2: 'Контроль себестоимости и склада',
          body: 'Каждая продажа автоматически списывает ингредиенты по техкарте. Фудкост считается вживую, а не постфактум. Система предупреждает о расхождениях и заканчивающихся позициях до того, как они станут проблемой.',
        },
        {
          h2: 'Меньше затрат на персонал',
          body: 'Клиенты RestOS в среднем экономят 11% фонда оплаты труда за полгода. Автоматический учёт смен, понятные роли и быстрая касса снимают рутину с менеджеров.',
        },
        {
          h2: 'Финансы и отчёты, которые открывают',
          body: 'Живой P&L, расчёт зарплаты, НДС и сверка — без бухгалтера-аналитика. Десять отчётов, которые владельцы действительно смотрят, готовы из коробки и приходят в Telegram.',
        },
      ],
      faqs: [
        ['С чего начать автоматизацию?', 'Начните с POS-кассы и складского учёта — это даёт быстрый эффект. Остальные модули подключаются по мере роста, без миграции данных.'],
        ['Подходит ли для одной точки и для сети?', 'Да. Тариф Counter — для кафе и одиночных точек, Group — для сетей и отельного F&B с неограниченным числом заведений.'],
        ['Сколько времени занимает внедрение?', 'Базовый запуск — 48 часов. Полную автоматизацию со всеми модулями обычно разворачивают за неделю.'],
      ],
    },
    'programma-skladskogo-ucheta-dlya-restorana': {
      keyword: 'программа складского учёта для ресторана',
      title: 'Программа складского учёта для ресторана и кафе — RestOS',
      description:
        'Складской учёт для ресторана: автоматическое списание по техкартам, живой фудкост, инвентаризация и оповещения об остатках. Часть системы RestOS.',
      eyebrow: 'Складской учёт',
      h1: 'Программа складского учёта для ресторана',
      lede: 'Остатки, техкарты и себестоимость, которые считаются сами. Каждая продажа списывает ингредиенты — без ручной инвентаризации по ночам.',
      sections: [
        {
          h2: 'Автоматическое списание по техкартам',
          body: 'Заведите рецептуру один раз — дальше система списывает ингредиенты с каждой продажи автоматически. Остатки на складе всегда отражают реальность, а не последнюю инвентаризацию.',
        },
        {
          h2: 'Живой фудкост по каждому блюду',
          body: 'Себестоимость пересчитывается при изменении закупочных цен. Вы сразу видите, какие позиции съедают маржу, и можете поднять цену или изменить рецепт до того, как потеряете деньги.',
        },
        {
          h2: 'Инвентаризация и оповещения',
          body: 'Сверка факта и системы за минуты, а не за ночь. Автоматические уведомления о заканчивающихся и расходящихся позициях помогают избежать стоп-листов и списаний.',
        },
      ],
      faqs: [
        ['Можно ли использовать только складской модуль?', 'Складской учёт работает в связке с кассой RestOS, чтобы списание происходило автоматически с продаж. Это и даёт точность в реальном времени.'],
        ['Поддерживаются ли полуфабрикаты и техкарты?', 'Да, поддерживаются вложенные техкарты и полуфабрикаты — себестоимость считается по всей цепочке.'],
        ['Как часто обновляются остатки?', 'В реальном времени: каждая продажа сразу уменьшает остаток соответствующих ингредиентов.'],
      ],
    },
  },
  uz: {
    'kafe-va-restoranlar-uchun-pos-tizimi': {
      keyword: 'kafe va restoranlar uchun POS tizimi',
      title: 'Kafe va restoranlar uchun POS tizimi — RestOS',
      description:
        'RestOS — kafe va restoranlar uchun POS tizimi: tez savdo, internetsiz ishlash, yetkazib berish va oshxona bilan integratsiya. 48 soatda ishga tushirish.',
      eyebrow: 'POS tizimi',
      h1: 'Kafe va restoranlar uchun POS tizimi',
      lede: 'Bir smenada o‘rganiladigan, internetsiz ishlaydigan va zal, oshxona hamda omborni bitta tizimga bog‘laydigan kassa. 48 soatda — o‘z uskunangizda.',
      sections: [
        {
          h2: 'O‘rgatishsiz tez savdo',
          body: 'Ofitsiant buyurtmani 12 soniyadan kamroq vaqtda kiritadi. Interfeys barmoq uchun mo‘ljallangan, shuning uchun yangi xodim kassani bir smenada o‘rganadi. Buyurtma zaldan to‘g‘ridan-to‘g‘ri oshxona ekraniga tushadi.',
        },
        {
          h2: 'Internet uzilganda ham ishlaydi',
          body: 'RestOS POS tizimi offline rejimda buyurtma qabul qilishni va chek chiqarishni davom ettiradi. Aloqa tiklanishi bilan barchasi avtomatik sinxronlanadi — eng gavjum paytda ham birorta savdo yo‘qolmaydi.',
        },
        {
          h2: 'Besh obuna o‘rniga bitta tizim',
          body: 'Kassa ombor, yetkazib berish, sodiqlik va moliya bilan bog‘langan. Har bir savdo ingredientlarni hisobdan chiqaradi va hisobotlarga tushadi — ma’lumotlarni qo‘lda solishtirish shart emas.',
        },
      ],
      faqs: [
        ['Yangi uskuna kerakmi?', 'Yo‘q. RestOS istalgan iPad, Android planshet yoki PK’da ishlaydi. Printer va terminallaringiz borligicha ulanadi.'],
        ['Qancha vaqtda ishga tushadi?', 'Birinchi buyurtmagacha 48 soat. Menyuni import qilamiz va xodimlarni o‘qitamiz.'],
        ['Narxi qancha?', 'Bir muassasa uchun oyiga 280 000 so‘mdan, xodimlar soni cheklanmagan. Bepul sinov muddati bor.'],
      ],
    },
    'restoran-avtomatizatsiyasi': {
      keyword: 'restoran avtomatizatsiyasi',
      title: 'Restoran avtomatizatsiyasi — RestOS boshqaruv tizimi',
      description:
        'Restoran va kafe avtomatizatsiyasi: kassa, oshxona, ombor, yetkazib berish, sodiqlik va moliya bitta tizimda. Fudkost va xodim xarajatlarini kamaytiring.',
      eyebrow: 'Restoran avtomatizatsiyasi',
      h1: 'Restoran avtomatizatsiyasi — kassadan P&L gacha',
      lede: 'Bitta tizimda o‘n ikkita modul. O‘sishingizga qarab yoqing: bitta menyu, bitta ombor, biznesingiz haqida bitta haqiqat.',
      sections: [
        {
          h2: 'Restoranni avtomatlashtirish nima beradi',
          body: 'Kechqurunlari Excel jadvallarini yig‘ishni to‘xtatasiz. Savdo, qoldiq, tannarx, smenalar va hisobotlar bitta tizimda real vaqtda yangilanadi. Har bir taomning marjasini oyiga bir marta emas, hoziroq ko‘rasiz.',
        },
        {
          h2: 'Tannarx va ombor nazorati',
          body: 'Har bir savdo texnologik karta bo‘yicha ingredientlarni avtomatik hisobdan chiqaradi. Fudkost real vaqtda hisoblanadi. Tizim tugab qolayotgan pozitsiyalar va chetlanishlar haqida oldindan ogohlantiradi.',
        },
        {
          h2: 'Xodim xarajatlari kamayadi',
          body: 'RestOS mijozlari olti oyda o‘rtacha ish haqi fondining 11% ini tejaydi. Smenalarni avtomatik hisobga olish va tez kassa menejerlardan rutinani oladi.',
        },
        {
          h2: 'Moliya va hisobotlar',
          body: 'Jonli P&L, ish haqi, QQS va solishtirish — tahlilchi-buxgaltersiz. Egalar haqiqatan ochadigan o‘nta hisobot quticha bilan tayyor va Telegram’ga keladi.',
        },
      ],
      faqs: [
        ['Avtomatlashtirishni nimadan boshlash kerak?', 'POS-kassa va ombor hisobidan boshlang — bu tez natija beradi. Qolgan modullar o‘sish jarayonida, ma’lumotlarni ko‘chirmasdan ulanadi.'],
        ['Bitta nuqta va tarmoq uchun mos keladimi?', 'Ha. Counter tarifi — kafe va yakka nuqtalar uchun, Group — tarmoq va mehmonxona F&B uchun cheksiz muassasalar bilan.'],
        ['Joriy etish qancha vaqt oladi?', 'Asosiy ishga tushirish — 48 soat. To‘liq avtomatlashtirish odatda bir haftada amalga oshiriladi.'],
      ],
    },
    'kafe-uchun-dastur': {
      keyword: 'kafe uchun dastur',
      title: 'Kafe uchun dastur — RestOS savdo va hisob tizimi',
      description:
        'Kafe uchun dastur: kassa, ombor hisobi, QR-menyu, yetkazib berish va sodiqlik dasturi bitta tizimda. 48 soatda ishga tushadi, o‘z uskunangizda ishlaydi.',
      eyebrow: 'Kafe uchun dastur',
      h1: 'Kafe uchun dastur — hammasi bitta tizimda',
      lede: 'Kassa, ombor, QR-menyu va sodiqlik — kafengizni bitta oynadan boshqaring. Alohida beshta obuna o‘rniga bitta tizim.',
      sections: [
        {
          h2: 'Tez kassa va QR-menyu',
          body: 'Mijoz QR-kodni skanerlaydi, buyurtma beradi va to‘laydi — ofitsiantni kutmasdan. Bu stol aylanishini tezlashtiradi va o‘rtacha chekni oshiradi.',
        },
        {
          h2: 'Ombor va tannarx nazorati',
          body: 'Har bir savdo ingredientlarni avtomatik hisobdan chiqaradi. Fudkost jonli hisoblanadi, qoldiqlar har doim haqiqatni aks ettiradi — tungi inventarizatsiyasiz.',
        },
        {
          h2: 'Sodiqlik va qaytadigan mijozlar',
          body: 'QR-hamyon, darajalar va avtomatik bonuslar bir martalik mijozlarni doimiyga aylantiradi. Kassada mijoz avtomatik aniqlanadi.',
        },
      ],
      faqs: [
        ['Kichik kafe uchun ham foydalimi?', 'Ha. Counter tarifi aynan kafe, kiosk va yakka nuqtalar uchun mo‘ljallangan, xodimlar soni cheklanmagan.'],
        ['Yandex Eats, Wolt bilan ishlaydimi?', 'Ha, barcha yetkazib berish agregatorlari bitta oynada, bitta printerda birlashtiriladi.'],
        ['Internetsiz ishlaydimi?', 'Ha, offline rejimda savdo davom etadi va aloqa tiklangach avtomatik sinxronlanadi.'],
      ],
    },
  },
};

export function getLandingPage(lang, slug) {
  return LANDING_PAGES[lang]?.[slug] || null;
}

// Pick the most relevant landing page for a blog post, by matching the post's
// category / keywords / title against theme words. Falls back to the first
// landing page in that language. Returns { slug, ...page } or null.
const THEME_RULES = [
  { slug: 'programma-skladskogo-ucheta-dlya-restorana', words: ['склад', 'фудкост', 'себестоим', 'инвентар', 'ombor', 'tannarx'] },
  { slug: 'pos-sistema-dlya-kafe-i-restoranov', words: ['pos', 'касса', 'kassa', 'продаж', 'savdo', 'чек'] },
  { slug: 'kafe-va-restoranlar-uchun-pos-tizimi', words: ['pos', 'kassa', 'savdo', 'kafe'] },
  { slug: 'avtomatizatsiya-restorana', words: ['автоматизац', 'маркетинг', 'лояльн', 'отчет', 'avtomat', 'boshqaruv', 'операц', 'marketing'] },
];

export function relatedLanding(lang, post) {
  const pages = LANDING_PAGES[lang];
  if (!pages || !post) return null;
  const hay = `${post.category || ''} ${post.keywords || ''} ${post.title || ''}`.toLowerCase();

  for (const rule of THEME_RULES) {
    if (pages[rule.slug] && rule.words.some((w) => hay.includes(w))) {
      return { slug: rule.slug, ...pages[rule.slug] };
    }
  }
  const firstSlug = Object.keys(pages)[0];
  return firstSlug ? { slug: firstSlug, ...pages[firstSlug] } : null;
}

// All { lang, slug } pairs for generateStaticParams + sitemap.
export function allLandingParams() {
  const out = [];
  for (const lang of Object.keys(LANDING_PAGES)) {
    for (const slug of Object.keys(LANDING_PAGES[lang])) {
      out.push({ lang, slug });
    }
  }
  return out;
}
