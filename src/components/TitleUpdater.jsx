'use client';
import { useEffect } from 'react';
import { useLang } from '@/context/AppContext';
import { I18N } from '@/lib/i18n';

export default function TitleUpdater() {
  const lang = useLang();
  useEffect(() => {
    document.title = I18N[lang]?.siteTitle ?? I18N.en.siteTitle;
  }, [lang]);
  return null;
}
