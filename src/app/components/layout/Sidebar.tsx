import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Store, PackageX, Truck,
  ClipboardList, Settings, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Dark Store Performance', icon: Store, path: '/dark-store' },
  { label: 'Stockout Analytics', icon: PackageX, path: '/stockout' },
  { label: 'Delivery Efficiency', icon: Truck, path: '/delivery' },
  { label: 'Order Activity', icon: ClipboardList, path: '/orders' },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, theme, setIsTransitioning } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const bg = theme === 'dark' ? '#111111' : '#F0EFED';
  const borderColor = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#666666' : '#888888';
  const hoverBg = theme === 'dark' ? '#1A1A1A' : '#E8E6E3';

  function handleNavigate(path: string) {
    if (location.pathname === path) return;
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setTimeout(() => setIsTransitioning(false), 320);
    }, 180);
  }

  return (
    <motion.div
      animate={{ width: sidebarCollapsed ? 60 : 240 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: bg,
        borderRight: `1px solid ${borderColor}`,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          padding: sidebarCollapsed ? '24px 14px' : '24px 20px',
          borderBottom: `1px solid ${borderColor}`,
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Logo
          collapsed={sidebarCollapsed}
          onClick={() => handleNavigate('/')}
          theme={theme}
        />
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const isHovered = hoveredItem === item.path;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: sidebarCollapsed ? '10px 18px' : '10px 20px',
                background: isActive ? (theme === 'dark' ? '#1E1E1E' : '#E4E2DF') : isHovered ? hoverBg : 'transparent',
                border: 'none',
                borderLeft: `2px solid ${isActive ? '#FF4F00' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                textAlign: 'left',
                flexShrink: 0,
                color: isActive ? '#FF4F00' : isHovered ? textPrimary : textMuted,
              }}
            >
              <item.icon
                size={16}
                style={{ flexShrink: 0, color: isActive ? '#FF4F00' : isHovered ? textPrimary : textMuted }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div style={{ borderTop: `1px solid ${borderColor}`, padding: '8px 0' }}>
        <button
          onClick={() => handleNavigate('/settings')}
          onMouseEnter={() => setHoveredItem('settings')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: sidebarCollapsed ? '10px 18px' : '10px 20px',
            background: location.pathname === '/settings'
              ? (theme === 'dark' ? '#1E1E1E' : '#E4E2DF')
              : hoveredItem === 'settings' ? hoverBg : 'transparent',
            border: 'none',
            borderLeft: `2px solid ${location.pathname === '/settings' ? '#FF4F00' : 'transparent'}`,
            cursor: 'pointer',
            transition: 'all 0.1s ease',
            color: location.pathname === '/settings' ? '#FF4F00' : textMuted,
          }}
        >
          <Settings size={16} style={{ flexShrink: 0 }} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-end',
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: textMuted,
          }}
        >
          {sidebarCollapsed
            ? <ChevronRight size={14} />
            : <ChevronLeft size={14} />
          }
        </button>
      </div>
    </motion.div>
  );
}
