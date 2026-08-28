'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMOS } from '@/lib/demos-i18n';
import { track } from '@/lib/track';

const LangContext = createContext('en');
const DemoContext = createContext(() => {});
const DemoOpenContext = createContext({ open: false, setOpen: () => {} });
// Primary CTA: free food-cost analysis (the demo is now secondary).
const FoodCostContext = createContext(() => {});
const FoodCostOpenContext = createContext({ open: false, setOpen: () => {} });

export function useLang() { return useContext(LangContext); }
export function useOpenDemo() { return useContext(DemoContext); }
export function useDemoOpen() { return useContext(DemoOpenContext); }
export function useOpenFoodCost() { return useContext(FoodCostContext); }
export function useFoodCostOpen() { return useContext(FoodCostOpenContext); }
export function useDemoLang() {
  const lang = useLang();
  return DEMOS[lang] || DEMOS.en;
}

export function AppProvider({ children, initialLang = 'en' }) {
  const [lang, setLangRaw] = useState(initialLang);
  const [demoOpen, setDemoOpen] = useState(false);
  const [foodCostOpen, setFoodCostOpen] = useState(false);

  // Follow the route-driven locale (client-side navigation between /en, /ru, …).
  useEffect(() => {
    if (initialLang && initialLang !== lang) setLangRaw(initialLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLang]);

  const setLang = useCallback((next) => {
    setLangRaw(prev => {
      if (prev !== next) {
        track('lang_change', { from: prev, to: next }, next);
        // Persist for middleware locale detection on locale-less visits.
        document.cookie = `restos-lang=${next}; path=/; max-age=31536000; samesite=lax`;
      }
      return next;
    });
  }, []);

  const openDemo = () => setDemoOpen(true);
  const openFoodCost = () => setFoodCostOpen(true);

  return (
    <LangContext.Provider value={lang}>
      <DemoContext.Provider value={openDemo}>
        <DemoOpenContext.Provider value={{ open: demoOpen, setOpen: setDemoOpen, lang, setLang }}>
          <FoodCostContext.Provider value={openFoodCost}>
            <FoodCostOpenContext.Provider value={{ open: foodCostOpen, setOpen: setFoodCostOpen }}>
              {children}
            </FoodCostOpenContext.Provider>
          </FoodCostContext.Provider>
        </DemoOpenContext.Provider>
      </DemoContext.Provider>
    </LangContext.Provider>
  );
}
