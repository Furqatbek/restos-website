'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMOS } from '@/lib/demos-i18n';
import { track } from '@/lib/track';

const LangContext = createContext('en');
const DemoContext = createContext(() => {});
const DemoOpenContext = createContext({ open: false, setOpen: () => {} });

export function useLang() { return useContext(LangContext); }
export function useOpenDemo() { return useContext(DemoContext); }
export function useDemoOpen() { return useContext(DemoOpenContext); }
export function useDemoLang() {
  const lang = useLang();
  return DEMOS[lang] || DEMOS.en;
}

export function AppProvider({ children }) {
  const [lang, setLangRaw] = useState('en');
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('restos-lang');
    if (saved) setLangRaw(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('restos-lang', lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangRaw(prev => {
      if (prev !== next) track('lang_change', { from: prev, to: next }, next);
      return next;
    });
  }, []);

  const openDemo = () => setDemoOpen(true);

  return (
    <LangContext.Provider value={lang}>
      <DemoContext.Provider value={openDemo}>
        <DemoOpenContext.Provider value={{ open: demoOpen, setOpen: setDemoOpen, lang, setLang }}>
          {children}
        </DemoOpenContext.Provider>
      </DemoContext.Provider>
    </LangContext.Provider>
  );
}
