import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { NotificationPanel } from './NotificationPanel';
import { GrainOverlay } from './GrainOverlay';
import { PageTransition } from './PageTransition';
import { useApp } from '../../context/AppContext';

export function Layout() {
  const { sidebarCollapsed, theme } = useApp();
  const location = useLocation();
  const sidebarW = sidebarCollapsed ? 60 : 240;

  const bg = theme === 'dark' ? '#0A0A0A' : '#F2F1EF';

  return (
    <div style={{ background: bg, minHeight: '100vh', position: 'relative' }}>
      <GrainOverlay />
      <Sidebar />
      <TopNav />
      <NotificationPanel />
      <PageTransition />

      <main
        style={{
          marginLeft: sidebarW,
          paddingTop: 56,
          minHeight: '100vh',
          transition: 'margin-left 0.22s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
