import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartContainer } from '../components/dashboard/ChartContainer';
import { SkeletonChart } from '../components/dashboard/SkeletonChart';
import { OrdersTable } from '../components/dashboard/OrdersTable';
import { DeliveryTimeTrend } from '../components/charts/DeliveryTimeTrend';
import { OrdersByHour } from '../components/charts/OrdersByHour';
import { StockoutsByCategory } from '../components/charts/StockoutsByCategory';
import { DarkStoreComparison } from '../components/charts/DarkStoreComparison';
import { useApp } from '../context/AppContext';

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
};

export function Dashboard() {
  const { selectedStore, dateRange, theme } = useApp();
  const [chartsLoading, setChartsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setChartsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const border = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1440 }}>

      {/* Page Header */}
      <motion.div
        custom={0} variants={staggerVariants} initial="hidden" animate="visible"
        style={{ marginBottom: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: textPrimary,
              lineHeight: 1.1,
              margin: 0,
            }}>
              Operations Overview
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: textMuted,
              }}>
                {today}
              </span>
              <span style={{
                width: 1, height: 12, background: border, display: 'inline-block',
              }} />
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: '#FF4F00',
              }}>
                {selectedStore.toUpperCase()}
              </span>
            </div>
          </div>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22C55E',
              display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#22C55E',
              letterSpacing: '0.1em',
            }}>
              LIVE
            </span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        {[
          {
            label: 'Avg Delivery Time',
            value: '8.4', unit: 'min',
            trend: 'down' as const, trendPositive: true,
            delta: '-0.8m', comparison: 'vs yesterday',
            subLabel: 'All active stores',
          },
          {
            label: '% Exceeding 10-min SLA',
            value: '18.3', unit: '%',
            trend: 'up' as const, trendPositive: false,
            delta: '+3.8pp', comparison: 'vs yesterday',
            subLabel: 'SLA threshold: 10 minutes',
          },
          {
            label: 'Stockout Rate',
            value: '4.7', unit: '%',
            trend: 'up' as const, trendPositive: false,
            delta: '+0.8pp', comparison: 'vs yesterday',
            subLabel: 'Across all categories',
          },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            custom={i + 1}
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Charts — Row 1 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gap: 12,
        marginBottom: 12,
      }}>
        <motion.div custom={4} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer
            title="Delivery Time Trend"
            subtitle={`${dateRange} · avg min per hour · — SLA breach events`}
            height={220}
          >
            {chartsLoading ? <SkeletonChart height={220} /> : <DeliveryTimeTrend />}
          </ChartContainer>
        </motion.div>
        <motion.div custom={5} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer
            title="Orders by Hour"
            subtitle="Total orders per hour today"
            height={220}
          >
            {chartsLoading ? <SkeletonChart height={220} /> : <OrdersByHour />}
          </ChartContainer>
        </motion.div>
      </div>

      {/* Charts — Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '5fr 7fr',
        gap: 12,
        marginBottom: 20,
      }}>
        <motion.div custom={6} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer
            title="Stockouts by Category"
            subtitle="Total stockout events today"
            height={220}
          >
            {chartsLoading ? <SkeletonChart height={220} /> : <StockoutsByCategory />}
          </ChartContainer>
        </motion.div>
        <motion.div custom={7} variants={staggerVariants} initial="hidden" animate="visible">
          <ChartContainer
            title="Dark Store Comparison"
            subtitle="Avg delivery time by store · orange line = SLA threshold"
            height={220}
          >
            {chartsLoading ? <SkeletonChart height={220} /> : <DarkStoreComparison />}
          </ChartContainer>
        </motion.div>
      </div>

      {/* Orders Table */}
      <motion.div custom={8} variants={staggerVariants} initial="hidden" animate="visible">
        <OrdersTable />
      </motion.div>
    </div>
  );
}
