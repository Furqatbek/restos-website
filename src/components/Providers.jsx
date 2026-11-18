'use client';
import { AppProvider } from '@/context/AppContext';
import DemoModal from './DemoModal';
import FoodCostModal from './FoodCostModal';
import FunnelTracker from './FunnelTracker';
import HelpPopup from './HelpPopup';

export function Providers({ children, initialLang }) {
  return (
    <AppProvider initialLang={initialLang}>
      {children}
      <DemoModal/>
      <FoodCostModal/>
      <FunnelTracker/>
      <HelpPopup/>
    </AppProvider>
  );
}
