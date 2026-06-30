'use client';
import { AppProvider } from '@/context/AppContext';
import DemoModal from './DemoModal';

export function Providers({ children, initialLang }) {
  return (
    <AppProvider initialLang={initialLang}>
      {children}
      <DemoModal/>
    </AppProvider>
  );
}
