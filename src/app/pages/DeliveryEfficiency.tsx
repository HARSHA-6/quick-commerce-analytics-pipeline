import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer, BarChart, Bar, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { deliveryDistributionData, deliveryTimeTrendData } from '../data/mockData';
import { ChartContainer } from '../components/dashboard/ChartContainer';
import { useApp } from '../context/AppContext';

const staggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.28, ease: 'easeOut' },
  }),
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#F2F2F2', border: '1px solid #0A0A0A', padding: '8px 12px', borderRadius: 0, boxShadow: '4px 4px 0 #FF4F00' }}>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', marginBottom: 2 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700, color: '#0A0A0A' }}>
          {p.value}{typeof p.value === 'number' && p.name === 'pct' ? '%' : p.name === 'avgTime' ? ' min' : ''}
        </div>
      ))}
    </div>
  );
}

const zoneData = [
  { zone: 'Zone A', avgTime: 7.2, slaRate: 94, orders: 312 },
  { zone: 'Zone B', avgTime: 8.7, slaRate: 82, orders: 287 },
  { zone: 'Zone C', avgTime: 9.4, slaRate: 74, orders: 241 },
  { zone: 'Zone D', avgTime: 10.8, slaRate: 61, orders: 198 },
  { zone: 'Zone E', avgTime: 12.3, slaRate: 49, orders: 134 },
];

export function DeliveryEfficiency() {
  const [activeDistBar, setActiveDistBar] = useState<number | null>(null);
  const [activeZoneBar, setActiveZoneBar] = useState<number | null>(null);
  const { theme } = useApp();

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const headerBg = theme === 'dark' ? '#111111' : '#F0EFED';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const gridColor = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const axisColor = theme === 'dark' ? '#444444' : '#AAAAAA';
  const baseBar = theme === 'dark' ? '#303030' : '#D0CEC9';

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1440 }}>
      <motion.div custom={0} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: textPrimary, lineHeight: 1.1, margin: 0 }}>
          Delivery Efficiency
        </h1>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 6 }}>
          SLA performance · delivery distribution · zone analysis
        </p>
      </motion.div>

      {/* KPIs */}
      <motion.div custom={1} variants={staggerVariants} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Avg Delivery Time', value: '8.4 min', color: textPrimary },
          { label: 'SLA Compliance Rate', value: '81.7%', color: '#22C55E' },
          { label: 'SLA Breach Count', value: '317', color: '#FF4F00' },
          { label: 'Fastest Delivery', value: '4.1 min', color: textPrimary },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: bg, border: `1px solid ${border}`, padding: '16px 18px' }}>
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: textMuted, textTransform: 'uppercase', marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: kpi.color, letterSpacing: '-0.02em' }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <motion.div custom={2} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer title="Delivery Time Distribution" subtitle="Order count by delivery duration bracket" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryDistributionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28} onMouseLeave={() => setActiveDistBar(null)}>
                <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
                <XAxis dataKey="range" tick={{ fontFamily: 'Space Mono, monospace', fontSize: 8, fill: axisColor }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="count" name="orders">
                  {deliveryDistributionData.map((d, i) => (
                    <Cell key={i}
                      fill={activeDistBar === null ? (d.range === '10–12 min' || d.range === '>12 min' ? '#FF4F0066' : baseBar) : activeDistBar === i ? '#FF4F00' : `${baseBar}44`}
                      onMouseEnter={() => setActiveDistBar(i)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>

        <motion.div custom={3} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer title="Hourly Delivery Trend" subtitle="Average delivery time per hour" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryTimeTrendData.filter((_, i) => i % 2 === 0)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
                <XAxis dataKey="hour" tick={{ fontFamily: 'Space Mono, monospace', fontSize: 8, fill: axisColor }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} domain={[4, 16]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="avgTime" stroke="#525252" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: '#FF4F00' }} name="avgTime" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      </div>

      {/* Zone Analysis Table */}
      <motion.div custom={4} variants={staggerVariants} initial="hidden" animate="visible">
        <div style={{ background: bg, border: `1px solid ${border}` }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary, textTransform: 'uppercase' }}>
              ZONE PERFORMANCE BREAKDOWN
            </span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: headerBg }}>
                {['ZONE', 'TOTAL ORDERS', 'AVG DELIVERY', 'SLA COMPLIANCE', 'PERFORMANCE'].map(col => (
                  <th key={col} style={{ padding: '9px 16px', textAlign: 'left', borderBottom: `1px solid ${border}` }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: textMuted }}>{col}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zoneData.map((zone) => (
                <tr key={zone.zone} style={{ borderBottom: `1px solid ${border}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#1A1A1A' : '#F8F7F5')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, color: textPrimary, fontWeight: 700 }}>{zone.zone}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>{zone.orders}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: zone.avgTime > 10 ? '#FF4F00' : textPrimary, fontWeight: zone.avgTime > 10 ? 700 : 400 }}>
                      {zone.avgTime} min
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 80, height: 3, background: theme === 'dark' ? '#222222' : '#E4E2DF' }}>
                        <div style={{ height: '100%', width: `${zone.slaRate}%`, background: zone.slaRate >= 80 ? '#22C55E' : zone.slaRate >= 65 ? '#F59E0B' : '#FF4F00' }} />
                      </div>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textPrimary }}>{zone.slaRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.04em',
                      color: zone.slaRate >= 80 ? '#22C55E' : zone.slaRate >= 65 ? '#F59E0B' : '#FF4F00',
                    }}>
                      {zone.slaRate >= 80 ? 'OPTIMAL' : zone.slaRate >= 65 ? 'AT RISK' : 'CRITICAL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
