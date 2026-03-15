import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { DarkStorePerformance } from './pages/DarkStorePerformance';
import { StockoutAnalytics } from './pages/StockoutAnalytics';
import { DeliveryEfficiency } from './pages/DeliveryEfficiency';
import { OrderActivity } from './pages/OrderActivity';
import { Settings } from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'dark-store', Component: DarkStorePerformance },
      { path: 'stockout', Component: StockoutAnalytics },
      { path: 'delivery', Component: DeliveryEfficiency },
      { path: 'orders', Component: OrderActivity },
      { path: 'settings', Component: Settings },
    ],
  },
]);
