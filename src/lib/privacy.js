// Privacy policy text, per language. Every statement describes what the code
// actually does; change this file whenever data handling changes:
//   forms        components/DemoModal.jsx, FoodCostModal.jsx, BlogContent.jsx
//   storage      lib/db.js (SQLite on our server)
//   statistics   lib/track.js, components/FunnelTracker.jsx, api/events
//   alerts       lib/telegram.js (each lead is sent to our Telegram chat)
//   analytics    GA4 in app/[lang]/layout.js; Meta pixel when META_PIXEL_ID is set
//   retention    api/events prunes statistics older than STATS_RETENTION_MONTHS

import { META_PIXEL_ID } from './analytics-config';

export const PRIVACY_UPDATED = '2026-11-17';
export const STATS_RETENTION_MONTHS = 13;
// Leads are kept while we work with the venue and deleted on request, and at
// the latest this long after the last contact. The owner deletes them.
export const LEAD_RETENTION_YEARS = 3;

// Fill in once registered: the legal name and taxpayer number (STIR / ИНН).
export const OPERATOR = { legalName: 'ISTIQLOL TECH MCHJ', stir: '' };

const PHONE = '+998 94 114 3232';
const TELEGRAM = '@furqaty';

// Languages with their own text. Others show the Uzbek one.
export const PRIVACY_LANGS = ['uz', 'ru', 'en'];

function operatorLine(lang) {
  const { legalName, stir } = OPERATOR;
  const id = legalName ? `${legalName}${stir ? ` (${lang === 'en' ? 'TIN' : lang === 'ru' ? 'ИНН' : 'STIR'} ${stir})` : ''}` : 'RestOS';
  return {
    uz: `Ushbu sayt va undagi ma'lumotlar egasi — ${id}, Toshkent, O'zbekiston.`,
    ru: `Владелец сайта и оператор данных — ${id}, Ташкент, Узбекистан.`,
    en: `This site and the data it collects belong to ${id}, Tashkent, Uzbekistan.`,
  }[lang];
}

const T = {
  uz: () => ({
    title: 'Maxfiylik siyosati',
    description: "RestOS saytida qanday ma'lumot to'planadi, nima uchun, kim ko'radi va uni qanday o'chirish mumkin.",
    updatedLabel: 'Oxirgi yangilanish',
    updated: '2026-yil 17-noyabr',
    intro: "Bu sahifa restos.uz saytida qanday ma'lumot to'plashimiz, undan nima uchun foydalanishimiz va kimga berishimizni tushuntiradi. Biz faqat siz bilan bog'lanish va saytni yaxshilash uchun kerak bo'lgan narsani to'playmiz. Ma'lumotlaringizni sotmaymiz.",
    sections: [
      { h2: 'Biz kimmiz', paras: [
        operatorLine('uz'),
        `Maxfiylik bo'yicha har qanday savol bilan: telefon ${PHONE}, Telegram ${TELEGRAM}.`,
      ] },
      { h2: "Qanday ma'lumot to'playmiz", list: [
        "Demo so'rovi shakli: ismingiz, telefon raqamingiz, muassasa nomi, til, shuningdek sizni qaysi sahifa, tugma yoki reklama olib kelgani. Siz bilan bog'lanib, RestOS'ni ko'rsatish uchun.",
        "Fudkost tekshiruvi shakli: telefon raqamingiz (majburiy), ixtiyoriy ravishda muassasa nomi, aloqa uchun ism, filiallar soni, hozirgi tizim va aylanma oralig'i. Tekshiruvni tayyorlash va siz bilan bog'lanish uchun.",
        "Ikkala shaklda ham: IP manzilingiz va brauzer turi — spamdan himoyalanish uchun.",
        "Blogga obuna: email manzilingiz, til va IP manzil. Yangi maqolalarni yuborish uchun.",
        "Tashrif statistikasi: qaysi sahifalarni ochganingiz, sahifani qanchalik pastga aylantirganingiz, qaysi tugmalarni bosganingiz, shaklning qaysi qadamiga yetganingiz (yozgan matningiz emas), sizni qayerdan kelganingiz (reklama havolasi yoki boshqa sayt) va til. Bularga ism, telefon yoki IP manzil biriktirilmaydi. Saytning qayeri tushunarsizligini bilish uchun.",
        "Instagram yoki Facebook reklamamizdagi shakl orqali so'rov yuborsangiz, Meta bizga ismingiz, telefon raqamingiz va shakldagi javoblaringizni beradi. Siz bilan bog'lanish uchun.",
      ] },
      { h2: 'Cookie va brauzer xotirasi', list: [
        "restos-lang — tanlagan tilingizni eslab qoladi, 1 yil saqlanadi.",
        "Tashrif identifikatori va manbasi — tasodifiy raqam va sizni olib kelgan havola. Brauzer sessiyasi xotirasida turadi va oyna yopilganda o'chadi.",
        "Google Analytics cookie fayllari (_ga va boshqalar) — Google tomonidan o'rnatiladi.",
        ...(META_PIXEL_ID ? ["Meta piksel cookie fayllari (_fbp va boshqalar) — Meta tomonidan o'rnatiladi."] : []),
        "Brauzer sozlamalarida cookie fayllarni o'chirib qo'yishingiz mumkin; sayt ishlashda davom etadi.",
      ] },
      { h2: "Ma'lumotlarni kim ko'radi", list: [
        "Biz — RestOS jamoasi.",
        "Telegram: har bir yangi so'rov (ism, telefon, muassasa nomi, manba) Telegram serverlari orqali bizning ichki chatimizga yuboriladi, shunda tezroq qo'ng'iroq qilamiz. Telegram serverlari O'zbekistondan tashqarida joylashgan.",
        "Google (Google Analytics): tashrif statistikasini oladi — ism yoki telefon raqamisiz. Google IP manzilingizni o'z qoidalariga ko'ra qayta ishlaydi.",
        ...(META_PIXEL_ID ? ["Meta (Instagram, Facebook): saytda so'rov yuborganingiz yoki telefon/Telegram tugmasini bosganingiz haqida xabar oladi — ism, raqam yoki yozgan matningizsiz. Bu reklamamizni kerakli odamlarga ko'rsatish uchun."] : []),
        "Ma'lumotlarni boshqa hech kimga sotmaymiz va bermaymiz, qonun talab qilgan hollar bundan mustasno.",
      ] },
      { h2: 'Qayerda saqlanadi', paras: [
        "Shakllardan kelgan so'rovlar va tashrif statistikasi bizning serverimizdagi ma'lumotlar bazasida, O'zbekistonda saqlanadi. Yuqorida aytilganidek, so'rov haqidagi xabarnoma Telegram orqali ham o'tadi.",
      ] },
      { h2: 'Qancha saqlanadi', list: [
        `So'rovlar — siz bilan ishlayotgan vaqtimizda; so'rasangiz, darhol o'chiramiz. Har holda oxirgi aloqadan keyin ${LEAD_RETENTION_YEARS} yildan ortiq saqlamaymiz.`,
        `Tashrif statistikasi — ${STATS_RETENTION_MONTHS} oy, keyin avtomatik o'chiriladi.`,
        "Google Analytics ma'lumotlari — Google Analytics hisobimizda belgilangan muddat davomida.",
      ] },
      { h2: 'Sizning huquqlaringiz', paras: [
        "O'zbekiston Respublikasining \"Shaxsga doir ma'lumotlar to'g'risida\"gi Qonuniga (O'RQ-547) muvofiq siz quyidagilarga haqlisiz: biz siz haqingizda qanday ma'lumot saqlayotganimizni bilish va nusxasini olish, uni tuzatish, o'chirish, shuningdek ma'lumotlaringizni qayta ishlashga rozilikni qaytarib olish. Shikoyatingiz bo'lsa, shaxsga doir ma'lumotlar bo'yicha vakolatli davlat organiga murojaat qilishingiz mumkin.",
        `Buning uchun ${TELEGRAM} ga Telegram'da yozing yoki ${PHONE} raqamiga qo'ng'iroq qiling. So'rovingiz siz yuborgan raqam yoki manzildan kelganini tekshiramiz.`,
      ] },
      { h2: 'Rozilik', paras: [
        "Saytdagi shaklni yuborish orqali siz ushbu sahifada tasvirlangan tarzda ma'lumotlaringizni qayta ishlashga rozilik bildirasiz.",
      ] },
      { h2: "O'zgarishlar", paras: [
        "Ma'lumotlar bilan ishlash tartibimiz o'zgarsa, bu sahifani yangilaymiz va yuqoridagi sanani o'zgartiramiz.",
      ] },
    ],
  }),

  ru: () => ({
    title: 'Политика конфиденциальности',
    description: 'Какие данные собирает сайт RestOS, зачем, кто их видит и как их удалить.',
    updatedLabel: 'Последнее обновление',
    updated: '17 ноября 2026 г.',
    intro: 'Эта страница объясняет, какие данные мы собираем на сайте restos.uz, зачем и кому их передаём. Мы собираем только то, что нужно, чтобы связаться с вами и сделать сайт понятнее. Мы не продаём ваши данные.',
    sections: [
      { h2: 'Кто мы', paras: [
        operatorLine('ru'),
        `По любым вопросам о данных: телефон ${PHONE}, Telegram ${TELEGRAM}.`,
      ] },
      { h2: 'Какие данные мы собираем', list: [
        'Форма заявки на демо: имя, номер телефона, название заведения, язык, а также какая страница, кнопка или реклама привела вас на сайт. Чтобы связаться с вами и показать RestOS.',
        'Форма проверки фудкоста: номер телефона (обязательно), по желанию — название заведения, имя для связи, число точек, текущая система и диапазон оборота. Чтобы подготовить проверку и связаться с вами.',
        'В обеих формах: ваш IP-адрес и тип браузера — для защиты от спама.',
        'Подписка на блог: email, язык и IP-адрес. Чтобы присылать новые статьи.',
        'Статистика посещений: какие страницы вы открыли, насколько прокрутили страницу, какие кнопки нажали, до какого шага формы дошли (но не то, что вы ввели), откуда пришли (рекламная ссылка или другой сайт) и язык. К этим данным не привязаны имя, телефон или IP-адрес. Чтобы понимать, где сайт непонятен.',
        'Если вы отправите заявку через форму в нашей рекламе в Instagram или Facebook, Meta передаст нам ваше имя, номер телефона и ответы в форме. Чтобы связаться с вами.',
      ] },
      { h2: 'Cookie и память браузера', list: [
        'restos-lang — запоминает выбранный язык, хранится 1 год.',
        'Идентификатор визита и его источник — случайный номер и ссылка, по которой вы пришли. Хранятся в памяти сессии браузера и удаляются, когда вы закрываете вкладку.',
        'Cookie Google Analytics (_ga и другие) — устанавливает Google.',
        ...(META_PIXEL_ID ? ['Cookie пикселя Meta (_fbp и другие) — устанавливает Meta.'] : []),
        'Cookie можно отключить в настройках браузера; сайт продолжит работать.',
      ] },
      { h2: 'Кто видит данные', list: [
        'Мы — команда RestOS.',
        'Telegram: каждая новая заявка (имя, телефон, заведение, источник) отправляется через серверы Telegram в наш рабочий чат, чтобы мы быстрее перезвонили. Серверы Telegram находятся за пределами Узбекистана.',
        'Google (Google Analytics): получает статистику посещений — без имени и телефона. Google обрабатывает ваш IP-адрес по своим правилам.',
        ...(META_PIXEL_ID ? ['Meta (Instagram, Facebook): получает отметку о том, что вы отправили заявку или нажали на телефон или Telegram, — без имени, номера и того, что вы ввели. Чтобы показывать нашу рекламу тем, кому она нужна.'] : []),
        'Мы никому больше не продаём и не передаём данные, кроме случаев, когда этого требует закон.',
      ] },
      { h2: 'Где хранятся данные', paras: [
        'Заявки из форм и статистика посещений хранятся в базе данных на нашем сервере в Узбекистане. Уведомление о заявке, как сказано выше, проходит также через Telegram.',
      ] },
      { h2: 'Сколько хранятся', list: [
        `Заявки — пока мы с вами работаем; по вашей просьбе удалим сразу. В любом случае не дольше ${LEAD_RETENTION_YEARS} лет после последнего контакта.`,
        `Статистика посещений — ${STATS_RETENTION_MONTHS} месяцев, затем удаляется автоматически.`,
        'Данные Google Analytics — в течение срока, заданного в нашем аккаунте Google Analytics.',
      ] },
      { h2: 'Ваши права', paras: [
        'По Закону Республики Узбекистан «О персональных данных» (ЗРУ-547) вы вправе узнать, какие данные о вас мы храним, получить их копию, исправить их, удалить, а также отозвать согласие на обработку. Если у вас есть жалоба, вы можете обратиться в уполномоченный государственный орган по персональным данным.',
        `Для этого напишите в Telegram ${TELEGRAM} или позвоните по номеру ${PHONE}. Мы проверим, что запрос пришёл с того номера или адреса, который вы нам оставляли.`,
      ] },
      { h2: 'Согласие', paras: [
        'Отправляя форму на сайте, вы соглашаетесь на обработку ваших данных так, как описано на этой странице.',
      ] },
      { h2: 'Изменения', paras: [
        'Если порядок работы с данными изменится, мы обновим эту страницу и дату вверху.',
      ] },
    ],
  }),

  en: () => ({
    title: 'Privacy policy',
    description: 'What data the RestOS website collects, why, who sees it and how to have it deleted.',
    updatedLabel: 'Last updated',
    updated: '17 November 2026',
    intro: 'This page explains what data we collect on restos.uz, why, and who we share it with. We collect only what we need to contact you and to make the site clearer. We do not sell your data.',
    sections: [
      { h2: 'Who we are', paras: [
        operatorLine('en'),
        `For any question about your data: phone ${PHONE}, Telegram ${TELEGRAM}.`,
      ] },
      { h2: 'What we collect', list: [
        'Demo request form: your name, phone number, venue name, language, and which page, button or ad brought you to the site. To contact you and show you RestOS.',
        'Food-cost check form: your phone number (required) and, if you choose, venue name, contact name, number of venues, current system and revenue range. To prepare the check and contact you.',
        'Both forms: your IP address and browser type, to protect against spam.',
        'Blog subscription: your email address, language and IP address. To send you new articles.',
        'Visit statistics: which pages you opened, how far you scrolled, which buttons you pressed, how far you got in a form (never what you typed), where you came from (an ad link or another site) and your language. No name, phone number or IP address is attached. To learn where the site is unclear.',
        'If you send a request through a form in our Instagram or Facebook ads, Meta passes us your name, phone number and your answers in that form. To contact you.',
      ] },
      { h2: 'Cookies and browser storage', list: [
        'restos-lang remembers your language, kept for 1 year.',
        'A visit id and its source: a random number and the link that brought you. Kept in the browser session and deleted when you close the tab.',
        'Google Analytics cookies (_ga and others), set by Google.',
        ...(META_PIXEL_ID ? ['Meta pixel cookies (_fbp and others), set by Meta.'] : []),
        'You can turn cookies off in your browser settings; the site keeps working.',
      ] },
      { h2: 'Who sees the data', list: [
        'Us, the RestOS team.',
        'Telegram: each new request (name, phone, venue, source) is sent through Telegram\'s servers to our team chat so we can call back sooner. Telegram\'s servers are outside Uzbekistan.',
        'Google (Google Analytics) receives the visit statistics, without your name or phone number. Google processes your IP address under its own terms.',
        ...(META_PIXEL_ID ? ['Meta (Instagram, Facebook) is told when you send a request or tap the phone or Telegram link, without your name, number or anything you typed. This lets us show our ads to the right people.'] : []),
        'We do not sell or give your data to anyone else, except where the law requires it.',
      ] },
      { h2: 'Where it is stored', paras: [
        'Form requests and visit statistics are stored in the database on our server in Uzbekistan. As said above, the alert about a new request also passes through Telegram.',
      ] },
      { h2: 'How long we keep it', list: [
        `Requests: while we work with you, and deleted at once if you ask. In any case no longer than ${LEAD_RETENTION_YEARS} years after our last contact.`,
        `Visit statistics: ${STATS_RETENTION_MONTHS} months, then deleted automatically.`,
        'Google Analytics data: for the period set in our Google Analytics account.',
      ] },
      { h2: 'Your rights', paras: [
        'Under the Law of the Republic of Uzbekistan "On Personal Data" (ZRU-547) you may find out what data we hold about you, get a copy, have it corrected or deleted, and withdraw your consent to its processing. If you have a complaint, you may turn to the authorised state body for personal data.',
        `To do this, write to ${TELEGRAM} on Telegram or call ${PHONE}. We check that the request comes from the number or address you gave us.`,
      ] },
      { h2: 'Consent', paras: [
        'By sending a form on this site you agree to your data being processed as described on this page.',
      ] },
      { h2: 'Changes', paras: [
        'If the way we handle data changes, we will update this page and the date at the top.',
      ] },
    ],
  }),
};

export function privacyContent(lang) {
  return (T[lang] || T.uz)();
}
