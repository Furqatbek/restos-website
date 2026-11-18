'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/AppContext';
import { localePath } from '@/lib/locale';

const BLOG_I18N = {
  en: {
    eyebrow: "Operator's notebook",
    title_a: 'Margin, costs',
    title_b: '& the chaos in between.',
    lede: 'Tactics from the people building RestOS and the owners running on it. Pull the right lever — labour, food cost, table turns, fees — and watch the number move.',
    featuredEyebrow: 'Featured',
    latestEyebrow: 'All posts',
    latestTitle: 'Latest from',
    latestTitleEm: 'the floor.',
    noPosts: 'No posts yet.',
    noFeatured: 'No featured post yet.',
    newsEyebrow: 'Telegram',
    newsTitle: 'Follow us on Telegram.',
    newsDesc: 'New articles and practical notes for restaurant owners, in our Telegram channel.',
    newsCta: 'Subscribe on Telegram',
  },
  ru: {
    eyebrow: 'Записная книжка оператора',
    title_a: 'Маржа, издержки',
    title_b: 'и хаос между ними.',
    lede: 'Тактики от тех, кто строит RestOS, и владельцев, которые на нём работают.',
    featuredEyebrow: 'Главное',
    latestEyebrow: 'Все материалы',
    latestTitle: 'Свежее',
    latestTitleEm: 'с пола.',
    noPosts: 'Материалов пока нет.',
    noFeatured: 'Главного материала пока нет.',
    newsEyebrow: 'Telegram',
    newsTitle: 'Мы в Telegram.',
    newsDesc: 'Новые статьи и практичные заметки для владельцев ресторанов — в нашем Telegram-канале.',
    newsCta: 'Подписаться в Telegram',
  },
  uz: {
    eyebrow: 'Operator daftari',
    title_a: 'Marja, xarajat',
    title_b: 'va orasidagi tartibsizlik.',
    lede: 'RestOS-ni quruvchilar va undagi egalardan taktikalar.',
    featuredEyebrow: 'Asosiy',
    latestEyebrow: 'Barchasi',
    latestTitle: 'Zaldan',
    latestTitleEm: 'yangi.',
    noPosts: 'Hozircha maqolalar yo\'q.',
    noFeatured: 'Asosiy maqola hali yo\'q.',
    newsEyebrow: 'Telegram',
    newsTitle: "Biz Telegram'da.",
    newsDesc: 'Restoran egalari uchun yangi maqolalar va amaliy maslahatlar — Telegram kanalimizda.',
    newsCta: "Telegram'da obuna bo'lish",
  },
  'uz-cyr': {
    eyebrow: 'Оператор дафтари',
    title_a: 'Маржа, харажат',
    title_b: 'ва орасидаги тартибсизлик.',
    lede: 'RestOS-ни қурувчилар ва ундаги эгалардан тактикалар.',
    featuredEyebrow: 'Асосий',
    latestEyebrow: 'Барчаси',
    latestTitle: 'Залдан',
    latestTitleEm: 'янги.',
    noPosts: 'Ҳозирча мақолалар йўқ.',
    noFeatured: 'Асосий мақола ҳали йўқ.',
    newsEyebrow: 'Telegram',
    newsTitle: "Биз Telegram'да.",
    newsDesc: 'Ресторан эгалари учун янги мақолалар ва амалий маслаҳатлар — Telegram каналимизда.',
    newsCta: "Telegram'да обуна бўлиш",
  },
  kaa: {
    eyebrow: 'Operator dápteri',
    title_a: 'Marja, shıǵın',
    title_b: 'hám arasındaǵı tártipsizlik.',
    lede: 'RestOS-tı quruwshılar hám ondaǵı iyelerden taktikalar.',
    featuredEyebrow: 'Bas',
    latestEyebrow: 'Hámmesi',
    latestTitle: 'Zaldan',
    latestTitleEm: 'jańa.',
    noPosts: 'Házir maqalalar joq.',
    noFeatured: 'Bas maqala hálde joq.',
    newsEyebrow: 'Telegram',
    newsTitle: "Biz Telegram'damız.",
    newsDesc: 'Restoran iyeleri ushın jańa maqalalar hám ámeliy keńesler — Telegram kanalımızda.',
    newsCta: "Telegram'da jazılıw",
  },
};

// Posts are passed in from the server so the listing (and every link to a
// post) exists in the server-rendered HTML. That matters twice over: it is
// what search engines follow to discover posts, and most AI crawlers do not
// execute JavaScript at all, so a client-only fetch is invisible to them.
export default function BlogContent({ initialPosts = [], initialFeatured = null, initialLang }) {
  const lang = useLang();
  const B = BLOG_I18N[lang] || BLOG_I18N.en;
  const [posts, setPosts] = useState(initialPosts);
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The server already rendered this locale's posts; only refetch if the
    // active language somehow diverges from what was rendered.
    if (!initialLang || lang === initialLang) return;
    setLoading(true);
    fetch(`/api/posts?lang=${lang}&status=published`)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setFeatured(data.find(p => p.featured) || null);
        setPosts(data.filter(p => !p.featured));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lang, initialLang]);

  const emptyStyle = { padding: '40px 0', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' };

  return (
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
          {loading ? (
            <div style={emptyStyle}>…</div>
          ) : featured ? (
            <Link href={localePath(lang, `/blog/${featured.slug || featured.id}`)} className="featured-post">
              <div className="pcover">
                <div className="glyph">{featured.glyph}</div>
              </div>
              <div className="pbody">
                <div className="pcat">{featured.category}</div>
                <h3>{featured.title}</h3>
                <p className="pexcerpt">{featured.excerpt}</p>
                <div className="pmeta">{featured.read_time} min read</div>
              </div>
            </Link>
          ) : (
            <div style={emptyStyle}>{B.noFeatured}</div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">{B.latestEyebrow}</div>
            <h2>{B.latestTitle} <em>{B.latestTitleEm}</em></h2>
          </div>
          {loading ? (
            <div style={emptyStyle}>…</div>
          ) : posts.length === 0 ? (
            <div style={emptyStyle}>{B.noPosts}</div>
          ) : (
            <div className="blog-grid">
              {posts.map(p => (
                <Link href={localePath(lang, `/blog/${p.slug || p.id}`)} className="blog-card" key={p.id}>
                  <div className={`pthumb ${p.color}`}>
                    <div className="glyph">{p.glyph}</div>
                  </div>
                  <div className="pbody">
                    <div className="pcat">{p.category}</div>
                    <h4>{p.title}</h4>
                    <div className="pmeta">{p.read_time} min</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="newsletter">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{B.newsEyebrow}</div>
            <h3>{B.newsTitle}</h3>
            <p>{B.newsDesc}</p>
            {/* This was an email signup promising "one email a month", but no email
                was ever sent. The Telegram channel is where new articles go. */}
            <a className="newsletter-tg" href="https://t.me/restos_blog" target="_blank" rel="noopener">
              {B.newsCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
