'use client';
import { useEffect } from 'react';
import { useLang } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';

// Map our locale keys to valid BCP-47 lang attribute values.
const HTML_LANG = { en: 'en', ru: 'ru', uz: 'uz', 'uz-cyr': 'uz-Cyrl', kaa: 'kaa' };

export default function TitleUpdater() {
  const lang = useLang();
  useEffect(() => {
    document.title = I18N[lang]?.siteTitle ?? I18N.en.siteTitle;
    // Keep the document language attribute in sync for screen readers.
    document.documentElement.lang = HTML_LANG[lang] || 'en';
  }, [lang]);
  return null;
}
