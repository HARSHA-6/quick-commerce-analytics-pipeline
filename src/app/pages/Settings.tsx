import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Bell, Shield, Database, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const staggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.28, ease: 'easeOut' },
  }),
};

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  accent?: boolean;
}

function Toggle({ checked, onChange, accent }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 36, height: 18,
        background: checked ? (accent ? '#FF4F00' : '#22C55E') : '#333',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.15s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 2, left: checked ? 18 : 2,
        width: 14, height: 14,
        background: '#FFFFFF',
        transition: 'left 0.15s ease',
      }} />
    </button>
  );
}

export function Settings() {
  const { theme, setTheme } = useApp();
  const [notifSLA, setNotifSLA] = useState(true);
  const [notifStockout, setNotifStockout] = useState(true);
  const [notifPeak, setNotifPeak] = useState(false);
  const [notifReports, setNotifReports] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSLALine, setShowSLALine] = useState(true);
  const [slaThreshold, setSlaThreshold] = useState('10');
  const [refreshInterval, setRefreshInterval] = useState('30');

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const sectionBg = theme === 'dark' ? '#111111' : '#F5F4F2';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const inputBg = theme === 'dark' ? '#0A0A0A' : '#ECEAE7';

  const sections = [
    {
      title: 'APPEARANCE',
      icon: Sun,
      items: [
        {
          label: 'Interface Theme',
          description: 'Switch between dark and light interface',
          control: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Moon size={12} style={{ color: textMuted }} />
              <Toggle checked={theme === 'light'} onChange={v => setTheme(v ? 'light' : 'dark')} />
              <Sun size={12} style={{ color: textMuted }} />
            </div>
          ),
        },
      ],
    },
    {
      title: 'NOTIFICATIONS',
      icon: Bell,
      items: [
        { label: 'SLA Breach Alerts', description: 'Alert when stores exceed 10-min SLA', control: <Toggle checked={notifSLA} onChange={setNotifSLA} /> },
        { label: 'Stockout Warnings', description: 'Alert when stockout rate exceeds threshold', control: <Toggle checked={notifStockout} onChange={setNotifStockout} /> },
        { label: 'Peak Hour Reminders', description: 'Pre-peak inventory preparation alerts', control: <Toggle checked={notifPeak} onChange={setNotifPeak} /> },
        { label: 'Report Ready', description: 'Notify when weekly reports are generated', control: <Toggle checked={notifReports} onChange={setNotifReports} /> },
      ],
    },
    {
      title: 'DATA & REFRESH',
      icon: Zap,
      items: [
        { label: 'Auto-Refresh Dashboard', description: 'Automatically refresh metrics', control: <Toggle checked={autoRefresh} onChange={setAutoRefresh} /> },
        { label: 'Show SLA Reference Line', description: 'Display threshold line on delivery charts', control: <Toggle checked={showSLALine} onChange={setShowSLALine} /> },
      ],
    },
  ];

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 960 }}>
      <motion.div custom={0} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: textPrimary, lineHeight: 1.1, margin: 0 }}>
          Settings
        </h1>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 6 }}>
          Platform configuration · preferences · integrations
        </p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div custom={1} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 16 }}>
        <div style={{ background: bg, border: `1px solid ${border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, background: '#FF4F00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>AK</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 14, fontWeight: 700, color: textPrimary, letterSpacing: '-0.02em' }}>
              Arjun Kumar
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 2 }}>
              arjun.kumar@veloxops.in · Operations Manager
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FF4F0020', border: '1px solid #FF4F0040', padding: '4px 10px' }}>
              <Shield size={10} style={{ color: '#FF4F00' }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#FF4F00', fontWeight: 700 }}>ADMIN</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {sections.map((section, si) => (
        <motion.div
          key={section.title}
          custom={si + 2}
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: 12 }}
        >
          <div style={{ background: bg, border: `1px solid ${border}` }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${border}`, background: sectionBg, display: 'flex', alignItems: 'center', gap: 8 }}>
              <section.icon size={12} style={{ color: '#FF4F00' }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary }}>
                {section.title}
              </span>
            </div>
            {section.items.map((item, ii) => (
              <div
                key={item.label}
                style={{
                  padding: '14px 20px',
                  borderBottom: ii < section.items.length - 1 ? `1px solid ${border}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                }}
              >
                <div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 13, fontWeight: 600, color: textPrimary, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: textMuted }}>
                    {item.description}
                  </div>
                </div>
                {item.control}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Thresholds */}
      <motion.div custom={sections.length + 2} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 12 }}>
        <div style={{ background: bg, border: `1px solid ${border}` }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${border}`, background: sectionBg, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Database size={12} style={{ color: '#FF4F00' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary }}>THRESHOLDS</span>
          </div>
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { label: 'SLA Threshold (minutes)', value: slaThreshold, onChange: setSlaThreshold, suffix: 'min' },
              { label: 'Data Refresh Interval', value: refreshInterval, onChange: setRefreshInterval, suffix: 's' },
            ].map(field => (
              <div key={field.label}>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, color: textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {field.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="number"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    style={{
                      background: inputBg, border: `1px solid ${border}`, color: textPrimary,
                      padding: '8px 12px', fontFamily: 'Space Mono, monospace', fontSize: 14,
                      width: 80, outline: 'none',
                    }}
                  />
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: textMuted }}>{field.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div custom={sections.length + 3} variants={staggerVariants} initial="hidden" animate="visible">
        <button style={{
          background: '#FF4F00', border: 'none', padding: '12px 28px',
          cursor: 'pointer', color: '#FFFFFF',
          fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'box-shadow 0.12s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.4)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
        >
          SAVE CHANGES
        </button>
      </motion.div>
    </div>
  );
}
