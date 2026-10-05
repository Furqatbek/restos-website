// Per-locale meta descriptions for the pages whose copy does not already
// supply one.
//
// These were hardcoded English strings in each page's generateMetadata, so a
// Russian or Uzbek search result showed an English snippet under a translated
// title — on the pages a buyer is most likely to land on from a brand search.
//
// The home page builds its description from the hero and footer tagline, the
// clients page from its own lede, and the landing pages and blog posts from
// their own content, so none of those appear here.
export const PAGE_META = {
  uz: {
    about:
      "RestOS 2026 yilda Toshkentda qurilgan. Tizimni yozgan dasturchining o'zi uni o'rnatadi va qo'llab-quvvatlaydi — bo'lim orqali emas, to'g'ridan-to'g'ri.",
    blog:
      "Restoran va kafe egalari uchun amaliy materiallar: fudkost, ombor, xodimlar, yetkazib berish va avtomatlashtirish — RestOS jamoasidan.",
    careers:
      "RestOS'da ochiq ish o'rinlari. Kodingiz ishlab turgan muassasalarga boradi, ichki sinov muhitiga emas.",
  },
  ru: {
    about:
      'RestOS сделан в Ташкенте в 2026 году. Разработчик, который написал систему, сам её внедряет и сам отвечает на поддержку — напрямую, а не через отдел.',
    blog:
      'Практические материалы для владельцев ресторанов и кафе: фудкост, склад, персонал, доставка и автоматизация — от команды RestOS.',
    careers:
      'Открытые вакансии в RestOS. Ваш код едет в работающие заведения, а не во внутренний сэндбокс.',
  },
  en: {
    about:
      'RestOS was built in Tashkent in 2026. The developer who wrote the system installs it and answers support himself — directly, not through a department.',
    blog:
      'Practical guides for restaurant and café owners: food cost, inventory, staffing, delivery and automation — from the RestOS team.',
    careers:
      'Open roles at RestOS. Your code goes into venues that are open and trading, not an internal-only sandbox.',
  },
  'uz-cyr': {
    about:
      'RestOS 2026 йилда Тошкентда қурилган. Тизимни ёзган дастурчининг ўзи уни ўрнатади ва қўллаб-қувватлайди — бўлим орқали эмас, тўғридан-тўғри.',
    blog:
      'Ресторан ва кафе эгалари учун амалий материаллар: фудкост, омбор, ходимлар, етказиб бериш ва автоматлаштириш — RestOS жамоасидан.',
    careers:
      'RestOSда очиқ иш ўринлари. Кодингиз ишлаб турган муассасаларга боради, ички синов муҳитига эмас.',
  },
  kaa: {
    about:
      'RestOS 2026 jılı Tashkentte qurılǵan. Sistemanı jazǵan baǵdarlamashınıń ózi onı ornatadı hám qollap-quwatlaydı — bólim arqalı emes, tuwrıdan-tuwrı.',
    blog:
      'Restoran hám kafe iyeleri ushın ámeliy materiallar: fudkost, ambar, xızmetkerler, jetkeriw hám avtomatlastırıw — RestOS toparınan.',
    careers:
      'RestOS\'ta ashıq jumıs orınları. Kodıńız islep turǵan orınlarǵa baradı, ishki sınaw ortalıǵına emes.',
  },
};

export function pageMeta(lang, page) {
  return (PAGE_META[lang] || PAGE_META.uz)[page];
}
