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
    newsEyebrow: 'Newsletter',
    newsTitle: 'One margin lever a month.',
    newsDesc: 'We send one email a month: a single P&L lever, the data behind it, and a one-page playbook to pull it. No fluff.',
    newsPlaceholder: 'you@restaurant.com',
    newsCta: 'Subscribe',
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
    newsEyebrow: 'Рассылка',
    newsTitle: 'Один рычаг маржи в месяц.',
    newsDesc: 'Раз в месяц — один рычаг P&L, цифры за ним и одностраничный плейбук. Без воды.',
    newsPlaceholder: 'you@restaurant.com',
    newsCta: 'Подписаться',
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
    newsEyebrow: 'Yangiliklar',
    newsTitle: 'Oyiga bitta marja richagi.',
    newsDesc: 'Oyiga bir xat: bitta P&L richag, ortidagi raqamlar. Suvsiz.',
    newsPlaceholder: 'you@restaurant.com',
    newsCta: 'Obuna',
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
    newsEyebrow: 'Янгиликлар',
    newsTitle: 'Ойига битта маржа ричаги.',
    newsDesc: 'Ойига бир хат. Сувсиз.',
    newsPlaceholder: 'you@restaurant.com',
    newsCta: 'Обуна',
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
    newsEyebrow: 'Pochta',
    newsTitle: 'Ayına bir marja rıshagı.',
    newsDesc: 'Ayına bir xat. Suwsız.',
    newsPlaceholder: 'you@restaurant.com',
    newsCta: 'Jazılıw',
  },
};

export default function BlogContent() {
  const lang = useLang();
  const B = BLOG_I18N[lang] || BLOG_I18N.en;
  const [email, setEmail] = useState('');
  const [newsState, setNewsState] = useState('idle');
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [lang]);

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
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!email || newsState === 'loading') return;
              setNewsState('loading');
              try {
                await fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, lang }),
                });
                setNewsState('done');
              } catch (_) {
                setNewsState('error');
              }
            }}>
              {newsState === 'done' ? (
                <p style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 13 }}>✓ {B.newsCta}</p>
              ) : (
                <>
                  <input type="email" placeholder={B.newsPlaceholder} required
                    value={email} onChange={e => setEmail(e.target.value)}/>
                  <button type="submit" disabled={newsState === 'loading'}>
                    {newsState === 'loading' ? '…' : B.newsCta}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
