'use client';
import Link from 'next/link';
import { useLang } from '@/context/AppContext';
import { LOCALE } from '@/lib/locale-extras';
import { localePath } from '@/lib/locale';
import { landingList, SOLUTIONS_LABEL } from '@/lib/landing-pages';
import Icon from './Icon';

const TELEGRAM_CONTACT = 'furqaty';
const DEV_SITE_URL = 'https://www.istech.uz';
const DEV_SITE_LABEL = 'istech.uz';

// The credit line is localised, and the word order differs per language
// (Uzbek puts the studio first), so the string carries {heart} and {istech}
// placeholders instead of being stitched together from fragments here.
function madeBy(template) {
  if (!template) return null;
  return template.split(/(\{heart\}|\{istech\})/).map((part, i) => {
    if (part === '{heart}') {
      return <span className="footer-made-heart" key={i}><Icon name="heart" size={12}/></span>;
    }
    if (part === '{istech}') {
      return (
        <a href={DEV_SITE_URL} target="_blank" rel="noreferrer" key={i}>{DEV_SITE_LABEL}</a>
      );
    }
    const text = part.trim();
    return text ? <span key={i}>{text}</span> : null;
  });
}

export default function Footer() {
  const lang = useLang();
  const L = LOCALE[lang] || LOCALE.en;
  const f = L.footer;
  const home = localePath(lang, '/');
  const solutions = landingList(lang);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className={`footer-grid${solutions.length ? ' footer-grid--6' : ''}`}>
          <div className="brand-block">
            <div className="logo"><span className="logo-mark">R</span>RestOS</div>
            <p>{f.tagline}</p>
            <div className="social-links">
              <a href="https://instagram.com/restos.uz" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={18}/>
              </a>
              <a href="https://t.me/restos_blog" target="_blank" rel="noreferrer" aria-label="Telegram">
                <Icon name="telegram" size={18}/>
              </a>
            </div>
          </div>
          {solutions.length > 0 && (
            <div>
              <h4>{SOLUTIONS_LABEL[lang] || SOLUTIONS_LABEL.en}</h4>
              <ul>
                {solutions.map((s) => (
                  <li key={s.slug}><Link href={localePath(lang, `/${s.slug}`)}>{s.label}</Link></li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4>{f.company}</h4>
            <ul>
              {f.companyLinks.map((x, i) => {
                const hrefs = ['/about', '/careers', '/blog'];
                return <li key={i}><Link href={localePath(lang, hrefs[i] || '/')}>{x}</Link></li>;
              })}
            </ul>
          </div>
          <div>
            <h4>{f.contact}</h4>
            <ul>
              <li><a href="tel:+998941143232">+998 94 114 3232</a></li>
              <li>
                <a className="footer-tg" href={`https://t.me/${TELEGRAM_CONTACT}`}
                   target="_blank" rel="noreferrer">
                  <Icon name="telegram" size={15}/>@{TELEGRAM_CONTACT}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{f.copyright}</span>
          <span className="footer-made">{madeBy(f.madeBy)}</span>
          <span>{f.legal}</span>
        </div>
      </div>
    </footer>
  );
}
