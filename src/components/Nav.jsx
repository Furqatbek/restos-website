'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang, useOpenDemo, useDemoOpen, useOpenFoodCost } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import { localePath, isLocale } from '@/lib/locale';
import { landingList, SOLUTIONS_LABEL } from '@/lib/landing-pages';
import Icon from './Icon';

const LANGS = [
  { k: 'uz', name: "O'zbekcha", flag: 'UZ' },
  { k: 'ru', name: 'Русский', flag: 'RU' },
  { k: 'en', name: 'English', flag: 'EN' },
  { k: 'uz-cyr', name: 'Ўзбекча', flag: 'UZ-C' },
  { k: 'kaa', name: 'Qaraqalpaqsha', flag: 'KAA' },
];

export default function Nav({ activePage = 'home' }) {
  const lang = useLang();
  const { setLang } = useDemoOpen();
  const openDemo = useOpenDemo();
  const openFoodCost = useOpenFoodCost();
  const t = I18N[lang] || I18N.en;
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const solutions = landingList(lang);

  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest('.lang-switch')) setOpen(false);
      if (!e.target.closest('.solutions-switch')) setSolOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Switch language by navigating to the same page under the new locale.
  const switchLang = (l) => {
    setLang(l);
    setOpen(false);
    const parts = (pathname || '/').split('/');
    const rest = isLocale(parts[1]) ? '/' + parts.slice(2).join('/') : (pathname || '/');
    router.push(localePath(l, rest || '/'));
  };

  const isHome = activePage === 'home';
  const home = localePath(lang, '/');

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="logo" href={home}>
          <span className="logo-mark">R</span>RestOS
        </Link>
        <div className="nav-links">
          {isHome
            ? <a href="#modules">{t.nav.modules}</a>
            : <Link href={`${home}#modules`}>{t.nav.modules}</Link>
          }
          {solutions.length > 0 && (
            <button className="solutions-switch" onClick={(e) => { e.stopPropagation(); setSolOpen(o => !o); }}>
              {SOLUTIONS_LABEL[lang] || SOLUTIONS_LABEL.en}
              <span style={{ fontSize: 9, color: 'var(--muted)' }}>▾</span>
              {solOpen && (
                <div className="solutions-menu" onClick={e => e.stopPropagation()}>
                  {solutions.map((s) => (
                    <Link key={s.slug} href={localePath(lang, `/${s.slug}`)} onClick={() => setSolOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </button>
          )}
          {isHome
            ? <a href="#pricing">{t.nav.pricing}</a>
            : <Link href={`${home}#pricing`}>{t.nav.pricing}</Link>
          }
          <Link href={localePath(lang, '/about')} className={activePage === 'about' ? 'active' : ''}>{t.nav.about}</Link>
          <Link href={localePath(lang, '/careers')} className={activePage === 'vacancy' ? 'active' : ''}>{t.nav.vacancy}</Link>
          <Link href={localePath(lang, '/blog')} className={activePage === 'blog' ? 'active' : ''}>{t.nav.blog}</Link>
        </div>
        <div className="nav-right">
          <button className="lang-switch" onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}>
            <Icon name="globe" size={14}/>
            {LANGS.find(l => l.k === lang)?.flag || 'EN'}
            <span style={{ fontSize: 9, color: 'var(--muted)' }}>▾</span>
            {open && (
              <div className="lang-menu" onClick={e => e.stopPropagation()}>
                {LANGS.map(l => (
                  <button key={l.k} className={lang === l.k ? 'active' : ''}
                    onClick={() => switchLang(l.k)}>
                    <span>{l.name}</span>
                    <span className="flag">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </button>
          <button className="btn btn-outline" onClick={openDemo}>{t.nav.demo}</button>
          <button className="btn btn-primary" onClick={openFoodCost}>{t.nav.foodcost}</button>
        </div>
      </div>
    </nav>
  );
}
