import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { notificationsData } from '../../data/mockData';

export function NotificationPanel() {
  const { notificationsPanelOpen, setNotificationsPanelOpen, sidebarCollapsed, theme } = useApp();

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const borderColor = theme === 'dark' ? '#222222' : '#DDDBD8';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#666666' : '#888888';
  const itemBg = theme === 'dark' ? '#1A1A1A' : '#F8F7F5';

  const typeConfig = {
    critical: { color: '#FF4F00', Icon: AlertCircle },
    warning: { color: '#F59E0B', Icon: AlertTriangle },
    info: { color: '#6B7280', Icon: Info },
    success: { color: '#22C55E', Icon: CheckCircle },
  };

  return (
    <AnimatePresence>
      {notificationsPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setNotificationsPanelOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 149 }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 56,
              right: 0,
              bottom: 0,
              width: 360,
              background: bg,
              borderLeft: `1px solid ${borderColor}`,
              zIndex: 150,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: textPrimary,
                }}>
                  NOTIFICATIONS
                </span>
                <span style={{
                  marginLeft: 8,
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 10,
                  color: '#FF4F00',
                }}>
                  3 UNREAD
                </span>
              </div>
              <button
                onClick={() => setNotificationsPanelOpen(false)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: textMuted, padding: 4,
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Notifications List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {notificationsData.map((n, i) => {
                const { color, Icon } = typeConfig[n.type as keyof typeof typeConfig];
                return (
                  <div
                    key={n.id}
                    style={{
                      padding: '14px 20px',
                      borderBottom: `1px solid ${borderColor}`,
                      background: !n.read ? (theme === 'dark' ? '#161616' : '#F5F4F2') : bg,
                      borderLeft: !n.read ? `2px solid ${color}` : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <Icon size={13} style={{ color, marginTop: 2, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{
                            fontFamily: 'Inter Tight, sans-serif',
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: textPrimary,
                          }}>
                            {n.title}
                          </span>
                          <span style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: 9,
                            color: textMuted,
                            flexShrink: 0,
                            marginLeft: 8,
                          }}>
                            {n.time}
                          </span>
                        </div>
                        <p style={{
                          fontFamily: 'Inter Tight, sans-serif',
                          fontSize: 11,
                          color: textMuted,
                          lineHeight: 1.5,
                          margin: 0,
                        }}>
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 20px', borderTop: `1px solid ${borderColor}` }}>
              <button style={{
                width: '100%',
                background: 'transparent',
                border: `1px solid ${borderColor}`,
                padding: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: textMuted,
              }}>
                MARK ALL AS READ
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
