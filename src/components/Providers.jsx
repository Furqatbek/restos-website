'use client';
import { AppProvider } from '@/context/AppContext';
import DemoModal from './DemoModal';

export function Providers({ children }) {
  return (
    <AppProvider>
      {children}
      <DemoModal/>
    </AppProvider>
  );
}
