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

// Keep in step with the breakpoint in globals.css that swaps the inline links
// for the burger. Only used to close the panel when a resize makes it moot.
const MOBILE_BREAKPOINT = 900;

export default function Nav({ activePage = 'home' }) {
  const lang = useLang();
  const { setLang } = useDemoOpen();
  const openDemo = useOpenDemo();
  const openFoodCost = useOpenFoodCost();
  const t = I18N[lang] || I18N.en;
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const solutions = landingList(lang);

  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest('.lang-switch')) setOpen(false);
      if (!e.target.closest('.solutions-switch')) setSolOpen(false);
      // The panel owns the rest of the viewport, so only a tap on the bar
      // itself (outside the burger) should dismiss it.
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-burger')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Escape closes the panel, matching what a dialog-like overlay should do.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // A resize past the breakpoint hides the burger in CSS; drop the open state
  // too, so the body scroll lock below never outlives the panel.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onResize = () => { if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  // Stop the page scrolling behind the open panel.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  // Navigating to another page closes the panel. In-page anchors do not change
  // the pathname, so those links close it themselves via closeMenu.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  // Switch language by navigating to the same page under the new locale.
  const switchLang = (l) => {
    setLang(l);
    setOpen(false);
    setMenuOpen(false);
    const parts = (pathname || '/').split('/');
    const rest = isLocale(parts[1]) ? '/' + parts.slice(2).join('/') : (pathname || '/');
    router.push(localePath(l, rest || '/'));
  };

  const isHome = activePage === 'home';
  const home = localePath(lang, '/');

  const pageLinks = [
    { href: '/clients', label: t.nav.clients, page: 'clients' },
    { href: '/about', label: t.nav.about, page: 'about' },
    { href: '/careers', label: t.nav.vacancy, page: 'vacancy' },
    { href: '/blog', label: t.nav.blog, page: 'blog' },
  ];

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="logo" href={home} onClick={closeMenu}>
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
          <Link href={localePath(lang, '/clients')} className={activePage === 'clients' ? 'active' : ''}>{t.nav.clients}</Link>
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
          <button className="btn btn-outline nav-cta" onClick={openDemo}>{t.nav.demo}</button>
          <button className="btn btn-primary nav-cta" onClick={openFoodCost}>{t.nav.foodcost}</button>
          <button
            className="nav-burger"
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
          >
            <span className="burger-lines" aria-hidden="true"><span/><span/><span/></span>
          </button>
        </div>
      </div>

      {menuOpen && <div className="mm-scrim" aria-hidden="true"/>}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu" onClick={e => e.stopPropagation()}>
          <div className="mm-links">
            {isHome
              ? <a className="mm-link" href="#modules" onClick={closeMenu}>{t.nav.modules}</a>
              : <Link className="mm-link" href={`${home}#modules`} onClick={closeMenu}>{t.nav.modules}</Link>
            }
            {isHome
              ? <a className="mm-link" href="#pricing" onClick={closeMenu}>{t.nav.pricing}</a>
              : <Link className="mm-link" href={`${home}#pricing`} onClick={closeMenu}>{t.nav.pricing}</Link>
            }
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                className={'mm-link' + (activePage === l.page ? ' active' : '')}
                href={localePath(lang, l.href)}
                onClick={closeMenu}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {solutions.length > 0 && (
            <div className="mm-group">
              <div className="mm-group-label">{SOLUTIONS_LABEL[lang] || SOLUTIONS_LABEL.en}</div>
              {solutions.map((s) => (
                <Link key={s.slug} className="mm-sublink" href={localePath(lang, `/${s.slug}`)} onClick={closeMenu}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <div className="mm-actions">
            <button className="btn btn-outline btn-lg" onClick={() => { closeMenu(); openDemo(); }}>
              {t.nav.demo}
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => { closeMenu(); openFoodCost(); }}>
              {t.nav.foodcost} <Icon name="arrow" size={14}/>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
