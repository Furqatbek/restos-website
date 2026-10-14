'use client';
import { AppProvider } from '@/context/AppContext';
import DemoModal from './DemoModal';
import FoodCostModal from './FoodCostModal';

export function Providers({ children, initialLang }) {
  return (
    <AppProvider initialLang={initialLang}>
      {children}
      <DemoModal/>
      <FoodCostModal/>
    </AppProvider>
  );
}
