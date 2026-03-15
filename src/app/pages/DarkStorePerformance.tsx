import { useState } from 'react';
import { motion } from 'motion/react';
import { storeHealthData } from '../data/mockData';
import { ChartContainer } from '../components/dashboard/ChartContainer';
import { DarkStoreComparison } from '../components/charts/DarkStoreComparison';
import { AlertCircle, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const staggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.28, ease: 'easeOut' },
  }),
};

export function DarkStorePerformance() {
  const [selectedStoreRow, setSelectedStoreRow] = useState<string | null>(null);
  const { theme } = useApp();

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const headerBg = theme === 'dark' ? '#111111' : '#F0EFED';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const hoverBg = theme === 'dark' ? '#1A1A1A' : '#F8F7F5';

  const statusConfig = {
    healthy: { color: '#22C55E', Icon: CheckCircle, label: 'HEALTHY' },
    warning: { color: '#F59E0B', Icon: AlertTriangle, label: 'WARNING' },
    critical: { color: '#FF4F00', Icon: AlertCircle, label: 'CRITICAL' },
  };

  const healthCounts = {
    healthy: storeHealthData.filter(s => s.status === 'healthy').length,
    warning: storeHealthData.filter(s => s.status === 'warning').length,
    critical: storeHealthData.filter(s => s.status === 'critical').length,
  };

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1440 }}>
      <motion.div custom={0} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: 'Inter Tight, sans-serif', fontSize: 26, fontWeight: 700,
          letterSpacing: '-0.04em', color: textPrimary, lineHeight: 1.1, margin: 0,
        }}>
          Dark Store Performance
        </h1>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 6 }}>
          Real-time store health · {storeHealthData.length} active stores
        </p>
      </motion.div>

      {/* Summary Chips */}
      <motion.div custom={1} variants={staggerVariants} initial="hidden" animate="visible"
        style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {Object.entries(healthCounts).map(([status, count]) => {
          const sc = statusConfig[status as keyof typeof statusConfig];
          return (
            <div key={status} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: bg, border: `1px solid ${border}`,
              padding: '8px 14px',
            }}>
              <sc.Icon size={11} style={{ color: sc.color }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: sc.color, fontWeight: 700 }}>
                {count} {sc.label}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <motion.div custom={2} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer title="Delivery Time by Store" subtitle="Avg delivery minutes · orange = SLA breach" height={280}>
            <DarkStoreComparison />
          </ChartContainer>
        </motion.div>

        {/* Zone Map Placeholder */}
        <motion.div custom={3} variants={staggerVariants} initial="hidden" animate="visible">
          <div style={{ background: bg, border: `1px solid ${border}`, padding: '18px 20px', height: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary, textTransform: 'uppercase', marginBottom: 4 }}>
                ZONE MAP
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted }}>
                Geographic delivery coverage
              </div>
            </div>
            {/* Placeholder zone grid */}
            <div style={{ position: 'relative', height: 240, background: theme === 'dark' ? '#0F0F0F' : '#F5F4F2', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Zone indicators */}
              {[
                { label: 'STR-001', x: '30%', y: '60%', status: 'healthy' },
                { label: 'STR-002', x: '45%', y: '40%', status: 'warning' },
                { label: 'STR-003', x: '60%', y: '35%', status: 'warning' },
                { label: 'STR-004', x: '65%', y: '55%', status: 'critical' },
                { label: 'STR-005', x: '72%', y: '30%', status: 'critical' },
                { label: 'STR-006', x: '75%', y: '65%', status: 'critical' },
              ].map(pin => {
                const sc = statusConfig[pin.status as keyof typeof statusConfig];
                return (
                  <div key={pin.label} style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <MapPin size={14} style={{ color: sc.color }} />
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: sc.color, whiteSpace: 'nowrap' }}>
                      {pin.label}
                    </span>
                  </div>
                );
              })}
              <div style={{ position: 'absolute', bottom: 8, left: 8, fontFamily: 'Space Mono, monospace', fontSize: 8, color: textMuted, letterSpacing: '0.06em' }}>
                MUMBAI METRO — EMBED READY
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Store Health Table */}
      <motion.div custom={4} variants={staggerVariants} initial="hidden" animate="visible">
        <div style={{ background: bg, border: `1px solid ${border}` }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary, textTransform: 'uppercase' }}>
              STORE HEALTH MATRIX
            </span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted }}>
              {storeHealthData.length} STORES
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: headerBg }}>
                  {['STORE ID', 'NAME', 'ZONE', 'ORDERS', 'AVG DELIVERY', 'SLA COMPLIANCE', 'STOCK AVAIL.', 'STATUS'].map(col => (
                    <th key={col} style={{ padding: '9px 16px', textAlign: 'left', borderBottom: `1px solid ${border}`, whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: textMuted }}>
                        {col}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {storeHealthData.map((store) => {
                  const sc = statusConfig[store.status as keyof typeof statusConfig];
                  const isSelected = selectedStoreRow === store.id;
                  return (
                    <tr
                      key={store.id}
                      onClick={() => setSelectedStoreRow(isSelected ? null : store.id)}
                      style={{
                        borderBottom: `1px solid ${border}`,
                        background: isSelected ? (theme === 'dark' ? '#1A1A1A' : '#F5F4F2') : 'transparent',
                        cursor: 'pointer',
                        borderLeft: isSelected ? '2px solid #FF4F00' : '2px solid transparent',
                        transition: 'background 0.08s ease',
                      }}
                    >
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#FF4F00', fontWeight: 700 }}>
                          {store.id}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, color: textPrimary, fontWeight: 600 }}>
                          {store.name}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: textMuted }}>
                          {store.zone}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>
                          {store.orders}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: store.avgDelivery > 10 ? '#FF4F00' : textPrimary, fontWeight: store.avgDelivery > 10 ? 700 : 400 }}>
                          {store.avgDelivery}m
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 3, background: theme === 'dark' ? '#222222' : '#E4E2DF', maxWidth: 80 }}>
                            <div style={{
                              width: `${store.slaCompliance}%`,
                              height: '100%',
                              background: store.slaCompliance >= 80 ? '#22C55E' : store.slaCompliance >= 65 ? '#F59E0B' : '#FF4F00',
                            }} />
                          </div>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textPrimary }}>
                            {store.slaCompliance}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>
                          {store.stockAvailability}%
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <sc.Icon size={10} style={{ color: sc.color }} />
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, color: sc.color, letterSpacing: '0.04em' }}>
                            {sc.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}