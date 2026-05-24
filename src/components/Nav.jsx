'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang, useOpenDemo, useDemoOpen } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';
import Icon from './Icon';

const LANGS = [
  { k: 'en', name: 'English', flag: 'EN' },
  { k: 'ru', name: 'Русский', flag: 'RU' },
  { k: 'uz', name: "O'zbekcha", flag: 'UZ' },
  { k: 'uz-cyr', name: 'Ўзбекча', flag: 'UZ-C' },
  { k: 'kaa', name: 'Qaraqalpaqsha', flag: 'KAA' },
];

export default function Nav({ activePage = 'home' }) {
  const lang = useLang();
  const { setLang } = useDemoOpen();
  const openDemo = useOpenDemo();
  const t = I18N[lang] || I18N.en;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest('.lang-switch')) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const isHome = activePage === 'home';

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">R</span>RestOS
        </Link>
        <div className="nav-links">
          {isHome
            ? <a href="#modules">{t.nav.modules}</a>
            : <Link href="/#modules">{t.nav.modules}</Link>
          }
          {isHome
            ? <a href="#pricing">{t.nav.pricing}</a>
            : <Link href="/#pricing">{t.nav.pricing}</Link>
          }
          <Link href="/about" className={activePage === 'about' ? 'active' : ''}>{t.nav.about}</Link>
          <Link href="/clients" className={activePage === 'clients' ? 'active' : ''}>{t.nav.clients}</Link>
          <Link href="/careers" className={activePage === 'vacancy' ? 'active' : ''}>{t.nav.vacancy}</Link>
          <Link href="/blog" className={activePage === 'blog' ? 'active' : ''}>{t.nav.blog}</Link>
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
                    onClick={() => { setLang(l.k); setOpen(false); }}>
                    <span>{l.name}</span>
                    <span className="flag">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </button>
          <button className="btn btn-outline" onClick={openDemo}>{t.nav.demo}</button>
          <button className="btn btn-primary" onClick={openDemo}>{t.nav.trial}</button>
        </div>
      </div>
    </nav>
  );
}
