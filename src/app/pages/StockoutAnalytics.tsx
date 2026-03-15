import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { stockoutTrendData, stockoutsByCategoryData } from '../data/mockData';
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
          {p.name}: {p.value}{p.name === 'rate' ? '%' : ''}
        </div>
      ))}
    </div>
  );
}

const skuData = [
  { sku: 'Spinach 200g', category: 'Fresh Produce', stockouts: 14, store: 'STR-004' },
  { sku: 'Full Cream Milk 1L', category: 'Dairy', stockouts: 11, store: 'STR-005' },
  { sku: 'Orange Juice 1L', category: 'Beverages', stockouts: 9, store: 'STR-003' },
  { sku: 'Tomatoes 500g', category: 'Fresh Produce', stockouts: 9, store: 'STR-006' },
  { sku: 'Greek Yogurt 400g', category: 'Dairy', stockouts: 8, store: 'STR-004' },
  { sku: 'Banana Bundle', category: 'Fresh Produce', stockouts: 8, store: 'STR-002' },
  { sku: 'Whole Bread Loaf', category: 'Bakery', stockouts: 7, store: 'STR-005' },
  { sku: 'Coke 500ml', category: 'Beverages', stockouts: 7, store: 'STR-006' },
];

export function StockoutAnalytics() {
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
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
          Stockout Analytics
        </h1>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 6 }}>
          Inventory shortage tracking · category and SKU level
        </p>
      </motion.div>

      {/* KPI Strip */}
      <motion.div custom={1} variants={staggerVariants} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Total Stockouts Today', value: '156', delta: '+12 vs yesterday', deltaPositive: false },
          { label: 'Stockout Rate', value: '4.7%', delta: '+0.8pp vs yesterday', deltaPositive: false },
          { label: 'Most Affected Category', value: 'Fresh Produce', delta: '42 events today', deltaPositive: null },
          { label: 'Avg Recovery Time', value: '38 min', delta: '-4m vs yesterday', deltaPositive: true },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: bg, border: `1px solid ${border}`, padding: '16px 18px' }}>
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: textMuted, textTransform: 'uppercase', marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: textPrimary, letterSpacing: '-0.02em', marginBottom: 6 }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: kpi.deltaPositive === null ? textMuted : kpi.deltaPositive ? '#22C55E' : '#FF4F00' }}>
              {kpi.delta}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <motion.div custom={2} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer title="7-Day Stockout Trend" subtitle="Daily stockout rate %" height={220}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockoutTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} domain={[2, 6]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="rate" stroke="#FF4F00" strokeWidth={1.5} dot={{ fill: '#FF4F00', r: 3 }} activeDot={{ r: 5, fill: '#FF4F00' }} name="rate" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>

        <motion.div custom={3} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer title="Stockouts by Category" subtitle="Event count today" height={220}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockoutsByCategoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={20} onMouseLeave={() => setActiveBarIndex(null)}>
                <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
                <XAxis dataKey="category" tick={{ fontFamily: 'Space Mono, monospace', fontSize: 8, fill: axisColor }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="stockouts">
                  {stockoutsByCategoryData.map((_, i) => (
                    <Cell key={i}
                      fill={activeBarIndex === null ? (i === 0 ? '#FF4F00' : baseBar) : activeBarIndex === i ? '#FF4F00' : `${baseBar}44`}
                      onMouseEnter={() => setActiveBarIndex(i)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      </div>

      {/* SKU-Level Table */}
      <motion.div custom={4} variants={staggerVariants} initial="hidden" animate="visible">
        <div style={{ background: bg, border: `1px solid ${border}` }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary, textTransform: 'uppercase' }}>
              TOP AFFECTED SKUs
            </span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted }}>TODAY</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: headerBg }}>
                {['SKU NAME', 'CATEGORY', 'STOCKOUT EVENTS', 'MOST AFFECTED STORE', 'IMPACT BAR'].map(col => (
                  <th key={col} style={{ padding: '9px 16px', textAlign: 'left', borderBottom: `1px solid ${border}` }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: textMuted }}>{col}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skuData.map((sku, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${border}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#1A1A1A' : '#F8F7F5')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, color: textPrimary, fontWeight: 600 }}>{sku.sku}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted }}>{sku.category}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#FF4F00', fontWeight: 700 }}>{sku.stockouts}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>{sku.store}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ height: 4, background: theme === 'dark' ? '#222222' : '#E4E2DF', width: '100%', maxWidth: 120 }}>
                      <div style={{ height: '100%', width: `${(sku.stockouts / 14) * 100}%`, background: '#FF4F00' }} />
                    </div>
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