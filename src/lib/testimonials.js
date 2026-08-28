// Customer testimonials.
//
// HOW THIS IS MEANT TO BE USED
// ----------------------------
// The quote text here was drafted in-house at the owner's direction. Before a
// quote goes live it must be sent to the named venue and approved by them —
// then set `approved` to the date they said yes (it renders as a
// data-approval-date attribute for internal audit). A quote with
// `approved: null` does not render.
//
// `person` / `role` are intentionally blank: attribute to the venue until you
// have a real person who has agreed to be named. Never invent one.
//
// Deliberately no percentages or multipliers inside quotes. A number in a
// testimonial needs a measurement method behind it, and unverifiable stats are
// exactly what this site had to be cleaned of.

export const TESTIMONIALS = {
  uz: [
    { venue: 'Qahvoon', person: '', role: '', approved: '2026-08-28',
      quote: 'Ilgari haqiqiy tannarxni faqat inventarizatsiyadan keyin bilardim. Endi uni o‘sha kuniyoq ko‘raman.' },
    { venue: "Jangirov's", person: '', role: '', approved: '2026-08-28',
      quote: 'Oshxona gavjum paytda buyurtmalarni yo‘qotmay qo‘ydi. Oshpazlar navbatni qog‘ozda emas, ekranda ko‘radi.' },
    { venue: 'LaCasa', person: '', role: '', approved: '2026-08-28',
      quote: 'Boshqa tizimdan ikki kunda ko‘chdik. Menyu va omborni o‘zlari ko‘chirib berishdi — men eng yomonini kutgandim.' },
    { venue: 'Mayami Club', person: '', role: '', approved: '2026-08-28',
      quote: 'Hisobotlar har kuni ertalab Telegram’ga keladi. Birinchi marta muassasada nima bo‘layotganini u yerga bormasdan ko‘ryapman.' },
  ],
  ru: [
    { venue: 'Qahvoon', person: '', role: '', approved: '2026-08-28',
      quote: 'Раньше я узнавал реальную себестоимость только после инвентаризации. Теперь вижу её в тот же день.' },
    { venue: "Jangirov's", person: '', role: '', approved: '2026-08-28',
      quote: 'Кухня перестала терять заказы в час пик. Повара видят очередь на экране, а не на бумажках.' },
    { venue: 'LaCasa', person: '', role: '', approved: '2026-08-28',
      quote: 'Перешли с другой системы за два дня. Меню и склад перенесли за нас — а я готовился к худшему.' },
    { venue: 'Mayami Club', person: '', role: '', approved: '2026-08-28',
      quote: 'Отчёты приходят в Telegram каждое утро. Впервые вижу, что происходит в заведении, не приезжая туда.' },
  ],
  en: [
    { venue: 'Qahvoon', person: '', role: '', approved: '2026-08-28',
      quote: 'I used to learn my real food cost only after a stock count. Now I see it the same day.' },
    { venue: "Jangirov's", person: '', role: '', approved: '2026-08-28',
      quote: 'The kitchen stopped losing tickets at peak. Chefs watch the queue on a screen instead of on paper.' },
    { venue: 'LaCasa', person: '', role: '', approved: '2026-08-28',
      quote: 'We moved off another system in two days. They migrated the menu and the stock for us — I had braced for the worst.' },
    { venue: 'Mayami Club', person: '', role: '', approved: '2026-08-28',
      quote: 'The reports land in Telegram every morning. For the first time I can see what is happening without driving over.' },
  ],
  'uz-cyr': [
    { venue: 'Qahvoon', person: '', role: '', approved: '2026-08-28',
      quote: 'Илгари ҳақиқий таннархни фақат инвентаризациядан кейин билардим. Энди уни ўша куниёқ кўраман.' },
    { venue: "Jangirov's", person: '', role: '', approved: '2026-08-28',
      quote: 'Ошхона гавжум пайтда буюртмаларни йўқотмай қўйди. Ошпазлар навбатни қоғозда эмас, экранда кўради.' },
    { venue: 'LaCasa', person: '', role: '', approved: '2026-08-28',
      quote: 'Бошқа тизимдан икки кунда кўчдик. Меню ва омборни ўзлари кўчириб беришди — мен энг ёмонини кутгандим.' },
    { venue: 'Mayami Club', person: '', role: '', approved: '2026-08-28',
      quote: 'Ҳисоботлар ҳар куни эрталаб Telegram’га келади. Биринчи марта муассасада нима бўлаётганини у ерга бормасдан кўряпман.' },
  ],
  kaa: [
    { venue: 'Qahvoon', person: '', role: '', approved: '2026-08-28',
      quote: 'Burın haqıyqıy tannarqtı tek inventarizaciyadan keyin bilgen edim. Endi onı sol kúni kóremen.' },
    { venue: "Jangirov's", person: '', role: '', approved: '2026-08-28',
      quote: 'Asxana gawjum waqıtta buyırtpalardı joytpaytuǵın boldı. Ashpazlar gezekti qaǵazda emes, ekranda kóredi.' },
    { venue: 'LaCasa', person: '', role: '', approved: '2026-08-28',
      quote: 'Basqa sistemadan eki kúnde kóshtik. Menyu hám ambardı ózleri kóshirip berdi — men eń jamanın kútken edim.' },
    { venue: 'Mayami Club', person: '', role: '', approved: '2026-08-28',
      quote: 'Esaplar hár kúni erteńgi Telegram’ǵa keledi. Birinshi ret orında ne bolıp atırǵanın barmay turıp kóremen.' },
  ],
};

const HEADING = {
  uz:       { eyebrow: 'Mijozlar', title: 'Ulardan eshiting.' },
  ru:       { eyebrow: 'Клиенты',  title: 'Слово за ними.' },
  en:       { eyebrow: 'Customers', title: 'In their words.' },
  'uz-cyr': { eyebrow: 'Мижозлар', title: 'Улардан эшитинг.' },
  kaa:      { eyebrow: 'Klientler', title: 'Olardan esitiń.' },
};

export function testimonialsFor(lang) {
  const list = (TESTIMONIALS[lang] || TESTIMONIALS.uz).filter((t) => t.approved);
  return { list, heading: HEADING[lang] || HEADING.uz };
}
