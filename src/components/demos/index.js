// One map from module key to its live demo and icon, shared by the homepage
// Modules section and the per-module pages so the two can never disagree about
// which demo belongs to which module.
import PosDemo from './PosDemo';
import WaiterDemo from './WaiterDemo';
import SelfDemo from './SelfDemo';
import DeliveryDemo from './DeliveryDemo';
import PaymentDemo from './PaymentDemo';
import KitchenDemo from './KitchenDemo';
import InventoryDemo from './InventoryDemo';
import AnalyticsDemo from './AnalyticsDemo';
import CourierDemo from './CourierDemo';
import LoyaltyDemo from './LoyaltyDemo';
import FinanceDemo from './FinanceDemo';
import MarketingDemo from './MarketingDemo';

export const DEMOS = {
  pos: PosDemo, waiter: WaiterDemo, self: SelfDemo, delivery: DeliveryDemo,
  payment: PaymentDemo, kitchen: KitchenDemo, inventory: InventoryDemo,
  analytics: AnalyticsDemo, courier: CourierDemo, loyalty: LoyaltyDemo,
  finance: FinanceDemo, marketing: MarketingDemo,
};

// Every module key is also an icon name in Icon.jsx.
export const MODULE_ICONS = Object.fromEntries(Object.keys(DEMOS).map((k) => [k, k]));
