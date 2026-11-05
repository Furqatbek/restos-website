// Long-form copy for module pages, per module, per language.
//
// SOURCE RULE: every product claim here must already be published elsewhere on
// the site — the module's description and KPIs (locale-extras.js), what its
// live demo shows (components/demos), the pricing tier that includes it, or a
// site-wide fact (runs on existing iPads/Android/PCs and printers). Problem
// framing and worked arithmetic are explanation, not product claims.
//
// Deliberately NOT claimed for loyalty, because nothing on the site establishes
// them: a configurable earn rate or minimum bill, a redemption ceiling, a
// double-bonus day, a digital stamp card, or refund/expiry entries in the
// ledger. Add them only once the product is confirmed to do them.
//
// Written 2026-11-05 for owner review. Pages stay noindex until reviewed and
// added to `indexed` in module-pages.js.

export const MODULE_CONTENT = {
  delivery: {
    ru: {
      sections: [
        { h2: 'Четыре агрегатора — четыре планшета',
          body: 'В типичном кафе в Ташкенте у стойки стоят несколько планшетов: Uzum Tezkor, Express24, Yandex Eats, Wolt. Каждый пищит по-своему, у каждого своё меню, свои стоп-листы и свой отчёт в конце дня. В час пик кассир переключается между ними, заказ переписывают на кухню вручную, а когда блюдо закончилось, его приходится снимать в четырёх местах. Ошибки здесь не случайность — это сама схема работы.' },
        { h2: 'Все заказы — в одном окне',
          body: 'Модуль доставки собирает заказы Uzum Tezkor, Express24, Yandex Eats и Wolt в одну ленту прямо в кассе. Рядом идут заказы с вашего собственного сайта. Не нужно держать отдельный планшет под каждый сервис и переключаться между ними: всё видно на одном экране и печатается на одном принтере.' },
        { h2: 'Меню синхронизируется само',
          body: 'Меню и цены ведутся в одном месте и уходят во все подключённые сервисы. Блюдо закончилось — вы снимаете его один раз, а не четыре. Это убирает самую частую причину отмен и плохих отзывов: заказ на то, чего на кухне уже нет.' },
        { h2: 'Доставка — часть общей системы',
          body: 'Заказ с агрегатора попадает туда же, куда и заказ из зала: на кухонный экран, в списание склада и в отчёты. Поэтому выручка по каждому каналу видна рядом с остальными цифрами, а не в четырёх разных личных кабинетах. Если у вас есть свои курьеры, для них есть отдельный модуль.' },
        { h2: 'Что нужно для запуска',
          body: 'Отдельное оборудование не требуется: модуль работает на iPad, Android-планшете или ПК, которые у вас уже есть, и с вашими принтерами. При запуске мы сами импортируем меню, настраиваем склад и обучаем персонал. Доставка входит в тариф «Сервис» и выше.' },
      ],
      faqs: [
        ['Какие сервисы доставки подключаются?', 'Uzum Tezkor, Express24, Yandex Eats и Wolt. Заказы с них падают прямо в кассу — без второго планшета.'],
        ['Нужно ли менять оборудование?', 'Нет. Модуль работает на iPad, Android-планшете или ПК, а ваши принтеры подключаются как есть.'],
        ['В какой тариф входит доставка?', 'В тариф «Сервис» и все тарифы выше.'],
        ['Мы уже работаем в iiko или r_keeper. Можно перейти?', 'Да. Переносим ваше меню, склад и историю, оборудование остаётся ваше. Если не подойдёт — вернётесь обратно, и с этим мы тоже поможем.'],
      ],
    },
    uz: {
      sections: [
        { h2: "To'rtta agregator — to'rtta planshet",
          body: "Toshkentdagi oddiy kafeda kassa yonida bir nechta planshet turadi: Uzum Tezkor, Express24, Yandex Eats, Wolt. Har biri o'zicha signal beradi, har birining o'z menyusi, o'z stop-listi va kun oxirida o'z hisoboti bor. Gavjum paytda kassir ular orasida almashib yuradi, buyurtma oshxonaga qo'lda ko'chiriladi, taom tugasa esa uni to'rt joyda o'chirish kerak. Bu yerda xato tasodif emas — ish tartibining o'zi shunday." },
        { h2: 'Barcha buyurtmalar — bitta oynada',
          body: "Yetkazib berish moduli Uzum Tezkor, Express24, Yandex Eats va Wolt buyurtmalarini to'g'ridan-to'g'ri kassadagi bitta lentaga yig'adi. Yonida o'z saytingizdan kelgan buyurtmalar ham turadi. Har bir xizmat uchun alohida planshet saqlash va ular orasida almashib yurish shart emas: hammasi bitta ekranda ko'rinadi va bitta printerda chop etiladi." },
        { h2: "Menyu o'zi sinxronlanadi",
          body: "Menyu va narxlar bitta joyda yuritiladi va barcha ulangan xizmatlarga yuboriladi. Taom tugadimi — uni to'rt marta emas, bir marta o'chirasiz. Bu bekor qilingan buyurtmalar va yomon sharhlarning eng ko'p uchraydigan sababini yo'qotadi: oshxonada allaqachon yo'q taomga buyurtma." },
        { h2: 'Yetkazib berish — umumiy tizimning bir qismi',
          body: "Agregatordan kelgan buyurtma zaldagi buyurtma boradigan joyga boradi: oshxona ekraniga, ombor hisobiga va hisobotlarga. Shuning uchun har bir kanal bo'yicha tushum to'rtta alohida shaxsiy kabinetda emas, boshqa raqamlar yonida ko'rinadi. O'z kuryerlaringiz bo'lsa, ular uchun alohida modul bor." },
        { h2: 'Ishga tushirish uchun nima kerak',
          body: "Alohida uskuna kerak emas: modul sizda bor iPad, Android planshet yoki kompyuterda ishlaydi va printerlaringiz bilan ulanadi. Ishga tushirishda menyuni o'zimiz import qilamiz, omborni sozlaymiz va xodimlarni o'qitamiz. Yetkazib berish «Servis» va undan yuqori tariflarga kiradi." },
      ],
      faqs: [
        ['Qaysi yetkazib berish xizmatlari ulanadi?', "Uzum Tezkor, Express24, Yandex Eats va Wolt. Ulardan kelgan buyurtmalar to'g'ridan-to'g'ri kassangizga tushadi — ikkinchi planshetsiz."],
        ['Uskunani almashtirish kerakmi?', "Yo'q. Modul iPad, Android planshet yoki kompyuterda ishlaydi, printerlaringiz esa borligicha ulanadi."],
        ['Yetkazib berish qaysi tarifga kiradi?', '«Servis» va undan yuqori barcha tariflarga.'],
        ["Biz iiko yoki r_keeper'da ishlaymiz. O'tish mumkinmi?", "Ha. Menyu, ombor va tarixingizni ko'chiramiz, uskunangiz o'zingizda qoladi. To'g'ri kelmasa — ortga qaytasiz, bunda ham yordam beramiz."],
      ],
    },
  },

  kitchen: {
    ru: {
      sections: [
        { h2: 'Почему бумажный тикет подводит в час пик',
          body: 'Официант пишет заказ на бумаге, несёт на кухню, бумажка ложится в общую кучу. В час пик тикеты теряются, путаются и залипают на краю стола. Повар не видит, какой заказ ждёт дольше всех, а официант не знает, готово ли блюдо, пока не сходит проверить. Гость всё это время ждёт.' },
        { h2: 'Заказ уходит на кухню сразу',
          body: 'Заказ, пробитый на кассе или в приложении официанта, сразу появляется на кухонном экране — без беготни и потерянных бумажек. Тикет автоматически уходит в нужный цех: горячее — на горячий цех, напитки — на бар. Каждый повар видит свои позиции, а не весь поток.' },
        { h2: 'Видно, что ждёт дольше всех',
          body: 'На каждом тикете идёт время с момента заказа. Заказы, которые задерживаются, помечаются, поэтому повар сразу видит, что нужно отдать первым, а не то, что лежит сверху. Когда блюдо готово, повар отмечает тикет, и официанта вызывают голосом — без лишних шагов.' },
        { h2: 'Зал и доставка на одном экране',
          body: 'Заказы из зала, с бара и с сервисов доставки приходят на тот же экран и стоят в одной очереди. Кухня работает с одним потоком, а не с несколькими каналами одновременно. Это особенно заметно в обед, когда зал и доставка пиковеют в одно и то же время.' },
        { h2: 'Что нужно для запуска',
          body: 'Подойдёт планшет или экран, который у вас уже есть: iPad, Android или ПК. При запуске мы обучаем персонал, который будет работать с экраном, — чтобы кухня перешла с бумаги на экран вся сразу, а не по одному повару. Кухонный экран входит уже в базовый тариф «Касса».' },
      ],
      faqs: [
        ['Нужен ли специальный кухонный монитор?', 'Нет. Подойдёт iPad, Android-планшет или ПК, который у вас уже есть.'],
        ['Как тикет попадает в нужный цех?', 'Автоматически: заказ сразу распределяется по цехам, и каждый видит свои позиции.'],
        ['В какой тариф входит KDS?', 'В базовый тариф «Касса» и все тарифы выше.'],
        ['Официанту нужно ходить на кухню проверять заказ?', 'Нет. Когда блюдо готово, повар отмечает тикет, и официанта вызывают голосом.'],
        ['Мы уже работаем в iiko или r_keeper. Можно перейти?', 'Да. Переносим ваше меню, склад и историю, оборудование остаётся ваше. Если не подойдёт — вернётесь обратно, и с этим мы тоже поможем.'],
      ],
    },
    uz: {
      sections: [
        { h2: "Nega qog'oz tiket gavjum paytda pand beradi",
          body: "Ofitsiant buyurtmani qog'ozga yozadi, oshxonaga olib boradi, qog'oz esa umumiy uyumga tushadi. Gavjum paytda tiketlar yo'qoladi, chalkashadi va stol chetida qolib ketadi. Oshpaz qaysi buyurtma eng uzoq kutayotganini ko'rmaydi, ofitsiant esa borib tekshirmaguncha taom tayyorligini bilmaydi. Mehmon bu vaqt davomida kutadi." },
        { h2: 'Buyurtma oshxonaga darhol yetadi',
          body: "Kassada yoki ofitsiant ilovasida urilgan buyurtma darhol oshxona ekranida paydo bo'ladi — yugur-yugursiz va yo'qolgan qog'ozlarsiz. Tiket avtomatik ravishda kerakli sexga yo'naltiriladi: issiq taom — issiq sexga, ichimliklar — barga. Har bir oshpaz butun oqimni emas, o'z pozitsiyalarini ko'radi." },
        { h2: "Eng uzoq kutayotgani ko'rinib turadi",
          body: "Har bir tiketda buyurtma berilgan paytdan beri o'tgan vaqt ko'rsatiladi. Kechikayotgan buyurtmalar belgilanadi, shuning uchun oshpaz eng ustidagini emas, birinchi navbatda berilishi kerak bo'lganini darhol ko'radi. Taom tayyor bo'lganda oshpaz tiketni belgilaydi va ofitsiant ovozli chaqiriq bilan chaqiriladi — ortiqcha qadamlarsiz." },
        { h2: 'Zal va yetkazib berish — bitta ekranda',
          body: "Zaldan, bardan va yetkazib berish xizmatlaridan kelgan buyurtmalar bitta ekranga tushadi va bitta navbatda turadi. Oshxona bir vaqtning o'zida bir nechta kanal bilan emas, bitta oqim bilan ishlaydi. Bu ayniqsa tushlik paytida, zal va yetkazib berish bir vaqtda gavjum bo'lganda sezilarli." },
        { h2: 'Ishga tushirish uchun nima kerak',
          body: "Sizda bor planshet yoki ekran yetarli: iPad, Android yoki kompyuter. Ishga tushirishda ekran bilan ishlaydigan xodimlarni o'qitamiz — oshxona qog'ozdan ekranga oshpazma-oshpaz emas, hammasi birga o'tishi uchun. Oshxona ekrani asosiy «Kassa» tarifiga allaqachon kiradi." },
      ],
      faqs: [
        ['Maxsus oshxona monitori kerakmi?', "Yo'q. Sizda bor iPad, Android planshet yoki kompyuter yetarli."],
        ['Tiket kerakli sexga qanday tushadi?', "Avtomatik: buyurtma darhol sexlar bo'yicha taqsimlanadi va har kim o'z pozitsiyalarini ko'radi."],
        ['KDS qaysi tarifga kiradi?', "Asosiy «Kassa» tarifiga va undan yuqori barcha tariflarga."],
        ["Ofitsiant buyurtmani tekshirish uchun oshxonaga borishi kerakmi?", "Yo'q. Taom tayyor bo'lganda oshpaz tiketni belgilaydi va ofitsiant ovozli chaqiriq bilan chaqiriladi."],
        ["Biz iiko yoki r_keeper'da ishlaymiz. O'tish mumkinmi?", "Ha. Menyu, ombor va tarixingizni ko'chiramiz, uskunangiz o'zingizda qoladi. To'g'ri kelmasa — ortga qaytasiz, bunda ham yordam beramiz."],
      ],
    },
  },

  loyalty: {
    ru: {
      sections: [
        { h2: 'Вы знаете своих постоянных гостей по имени?',
          body: 'У каждого кафе есть постоянные гости. Но большинство владельцев не могут назвать и десятка из них. Бумажная карта с печатями этого не меняет: её теряют, её подделывают чужой ручкой, а когда она заполнена, вы отдаёте бесплатный кофе, так и не узнав, чей это был кофе.' },
        { h2: 'Гостя узнают на кассе по номеру телефона',
          body: 'Карты и брелоки не нужны. Гость называет номер телефона, касса узнаёт его автоматически, и визит записывается в его историю: когда пришёл, куда и на какую сумму. Баллы начисляются от суммы чека и копятся на его счёте.' },
        { h2: 'Уровни, которые вы задаёте сами',
          body: 'Количество уровней вы настраиваете под своё заведение. Видно, сколько гостю осталось до следующего уровня, — об этом можно ему сказать, и у него появляется причина прийти ещё раз. Реферальная программа и акции работают из того же модуля.' },
        { h2: 'Сначала посчитайте, во сколько обходится скидка',
          body: 'Прежде чем запускать любую программу лояльности, переведите один процент скидки в деньги. Для заведения с оборотом 88 млн сум в месяц это 880 000 сум в месяц — 10,5 млн в год. Программа, в которой видно, кому и за какой визит ушёл каждый бонус, стоит этих денег. Программа, в которой не видно, — просто скидка.' },
        { h2: 'Акции — туда, где они что-то дают',
          body: 'Бесплатный кофе в полную субботу ничего не покупает: этот гость и так стоял у вашей стойки. Та же скидка в самый слабый день недели покупает визит, которого иначе не было бы. Поэтому акции имеет смысл запускать именно на слабые дни — а потом смотреть по истории визитов, сработали ли они.' },
        { h2: 'Что нужно для запуска',
          body: 'Модуль работает на той же кассе — iPad, Android или ПК. При запуске мы обучаем персонал работе с модулем. Лояльность и CRM входят в тариф «Сервис» и выше.' },
      ],
      faqs: [
        ['Нужны ли гостю пластиковые карты или приложение?', 'Нет. Гостя узнают по номеру телефона прямо на кассе.'],
        ['Можно ли настроить уровни под себя?', 'Да. Количество уровней вы задаёте сами.'],
        ['В какой тариф входит лояльность?', 'Лояльность и CRM входят в тариф «Сервис» и все тарифы выше.'],
        ['Зачем это, если постоянных гостей и так знают в лицо?', 'Бармен знает постоянных гостей, пока работает у вас. История визитов в системе остаётся, когда он уходит, — и новый сотрудник видит её с первого дня.'],
        ['Мы уже работаем в iiko или r_keeper. Можно перейти?', 'Да. Переносим ваше меню, склад и историю, оборудование остаётся ваше. Если не подойдёт — вернётесь обратно, и с этим мы тоже поможем.'],
      ],
    },
    uz: {
      sections: [
        { h2: 'Doimiy mehmonlaringizni ism bilan bilasizmi?',
          body: "Har bir kafeda doimiy mehmonlar bor. Ammo ko'pchilik egalar ulardan o'ntasini ham nomma-nom ayta olmaydi. Muhrli qog'oz karta buni o'zgartirmaydi: u yo'qoladi, birovning ruchkasi bilan soxtalashtiriladi, to'lganda esa bepul kofeni berasiz-u, bu kimning kofesi bo'lganini bilmay qolasiz." },
        { h2: 'Mehmon kassada telefon raqami orqali taniladi',
          body: "Karta yoki brelok kerak emas. Mehmon telefon raqamini aytadi, kassa uni avtomatik taniydi va tashrif uning tarixiga yoziladi: qachon kelgani, qayerga va qancha summaga. Ballar chek summasidan hisoblanadi va uning hisobida to'planadi." },
        { h2: 'Darajalarni o\'zingiz belgilaysiz',
          body: "Darajalar sonini muassasangizga moslab sozlaysiz. Mehmonning keyingi darajagacha qancha qolgani ko'rinib turadi — buni unga aytish mumkin, va bu unga yana kelish uchun sabab bo'ladi. Do'st taklif qilish dasturi va aksiyalar ham shu moduldan ishlaydi." },
        { h2: 'Avval chegirma qanchaga tushishini hisoblang',
          body: "Har qanday loyallik dasturini ishga tushirishdan oldin bir foiz chegirmani pulga aylantiring. Oyiga 88 mln so'm aylanmasi bor muassasa uchun bu oyiga 880 000 so'm — yiliga 10,5 mln. Har bir bonus kimga va qaysi tashrif uchun ketganini ko'rsatadigan dastur bu pulga arziydi. Ko'rsatmaydigan dastur esa shunchaki chegirma." },
        { h2: 'Aksiyalar — natija beradigan joyga',
          body: "To'la shanba kuni berilgan bepul kofe hech narsa sotib olmaydi: u mehmon baribir peshtaxtangiz oldida turgan edi. O'sha chegirma haftaning eng bo'sh kunida esa bo'lmasligi mumkin bo'lgan tashrifni sotib oladi. Shuning uchun aksiyalarni aynan bo'sh kunlarga qo'yish mantiqli — keyin esa tashriflar tarixidan ular ishlaganini tekshirish kerak." },
        { h2: 'Ishga tushirish uchun nima kerak',
          body: "Modul o'sha kassada ishlaydi — iPad, Android yoki kompyuter. Ishga tushirishda xodimlarni modul bilan ishlashga o'rgatamiz. Loyallik va CRM «Servis» va undan yuqori tariflarga kiradi." },
      ],
      faqs: [
        ['Mehmonga plastik karta yoki ilova kerakmi?', "Yo'q. Mehmon to'g'ridan-to'g'ri kassada telefon raqami orqali taniladi."],
        ["Darajalarni o'zimga moslab sozlash mumkinmi?", "Ha. Darajalar sonini o'zingiz belgilaysiz."],
        ['Loyallik qaysi tarifga kiradi?', "Loyallik va CRM «Servis» va undan yuqori barcha tariflarga kiradi."],
        ["Doimiy mehmonlarni baribir yuzidan tanishsa, bu nima uchun kerak?", "Barmen doimiy mehmonlarni u sizda ishlab turgan paytda taniydi. Tizimdagi tashriflar tarixi esa u ketganda ham qoladi — va yangi xodim uni birinchi kundanoq ko'radi."],
        ["Biz iiko yoki r_keeper'da ishlaymiz. O'tish mumkinmi?", "Ha. Menyu, ombor va tarixingizni ko'chiramiz, uskunangiz o'zingizda qoladi. To'g'ri kelmasa — ortga qaytasiz, bunda ham yordam beramiz."],
      ],
    },
  },
};
