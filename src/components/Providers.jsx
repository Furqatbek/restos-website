'use client';
import { AppProvider } from '@/context/AppContext';
import DemoModal from './DemoModal';
import TitleUpdater from './TitleUpdater';

export function Providers({ children }) {
  return (
    <AppProvider>
      <TitleUpdater />
      {children}
      <DemoModal/>
    </AppProvider>
  );
}
