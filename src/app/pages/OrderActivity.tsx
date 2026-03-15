import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { ordersTableData, ordersByHourData } from '../data/mockData';
import { ChartContainer } from '../components/dashboard/ChartContainer';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
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
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', marginBottom: 2 }}>{label}:00</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, fontWeight: 700, color: '#0A0A0A' }}>{payload[0]?.value} orders</div>
    </div>
  );
}

export function OrderActivity() {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [liveOrders, setLiveOrders] = useState(ordersTableData.slice(0, 15));
  const [tick, setTick] = useState(0);
  const { theme } = useApp();

  // Simulate live order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const headerBg = theme === 'dark' ? '#111111' : '#F0EFED';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const gridColor = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const axisColor = theme === 'dark' ? '#444444' : '#AAAAAA';
  const baseBar = theme === 'dark' ? '#303030' : '#D0CEC9';

  const statusConfig = {
    ON_TIME: { color: '#22C55E', Icon: CheckCircle, label: 'ON TIME' },
    DELAYED: { color: '#F59E0B', Icon: Clock, label: 'DELAYED' },
    SLA_BREACH: { color: '#FF4F00', Icon: AlertCircle, label: 'SLA BREACH' },
  };

  const totalOrders = ordersByHourData.reduce((s, d) => s + d.orders, 0);
  const onTimeCount = ordersTableData.filter(o => o.status === 'ON_TIME').length;
  const delayedCount = ordersTableData.filter(o => o.status === 'DELAYED').length;
  const breachCount = ordersTableData.filter(o => o.status === 'SLA_BREACH').length;

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1440 }}>
      <motion.div custom={0} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: textPrimary, lineHeight: 1.1, margin: 0 }}>
              Order Activity
            </h1>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted, marginTop: 6 }}>
              Live order feed · volume trends · status tracking
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#22C55E', letterSpacing: '0.1em' }}>LIVE FEED</span>
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* KPIs */}
      <motion.div custom={1} variants={staggerVariants} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Total Orders Today', value: totalOrders.toLocaleString(), color: textPrimary },
          { label: 'On-Time Deliveries', value: `${((onTimeCount / ordersTableData.length) * 100).toFixed(0)}%`, color: '#22C55E' },
          { label: 'Delayed', value: delayedCount, color: '#F59E0B' },
          { label: 'SLA Breaches', value: breachCount, color: '#FF4F00' },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: bg, border: `1px solid ${border}`, padding: '16px 18px' }}>
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: textMuted, textTransform: 'uppercase', marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: kpi.color, letterSpacing: '-0.02em' }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Order Volume Chart */}
      <motion.div custom={2} variants={staggerVariants} initial="hidden" animate="visible" style={{ marginBottom: 20 }}>
        <ChartContainer title="Order Volume by Hour" subtitle="Today's order distribution" height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersByHourData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14} onMouseLeave={() => setActiveBar(null)}>
              <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
              <XAxis dataKey="hour" tick={{ fontFamily: 'Space Mono, monospace', fontSize: 8, fill: axisColor }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="orders">
                {ordersByHourData.map((_, i) => (
                  <Cell key={i}
                    fill={activeBar === null ? baseBar : activeBar === i ? '#FF4F00' : `${baseBar}44`}
                    onMouseEnter={() => setActiveBar(i)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </motion.div>

      {/* Live Order Feed Table */}
      <motion.div custom={3} variants={staggerVariants} initial="hidden" animate="visible">
        <div style={{ background: bg, border: `1px solid ${border}` }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: textPrimary, textTransform: 'uppercase' }}>
              LIVE ORDER FEED
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#22C55E' }}>AUTO-REFRESH 3.5s</span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: headerBg }}>
                  {['ORDER ID', 'STORE', 'ZONE', 'ORDER TIME', 'DELIVERY TIME', 'DURATION', 'STATUS'].map(col => (
                    <th key={col} style={{ padding: '9px 16px', textAlign: 'left', borderBottom: `1px solid ${border}` }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: textMuted }}>{col}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {liveOrders.map((order, i) => {
                  const sc = statusConfig[order.status as keyof typeof statusConfig];
                  const isNew = i === 0 && tick > 0;
                  return (
                    <motion.tr
                      key={`${order.orderId}-${tick}`}
                      initial={isNew ? { opacity: 0, x: -8 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ borderBottom: `1px solid ${border}` }}
                      onMouseEnter={e => (e.currentTarget.style.background = theme === 'dark' ? '#1A1A1A' : '#F8F7F5')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#FF4F00', fontWeight: 700 }}>{order.orderId}</span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>{order.storeId}</span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: textMuted }}>{order.zone}</span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>{order.orderTime}</span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>{order.deliveryTime}</span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: order.duration > 10 ? '#FF4F00' : textPrimary, fontWeight: order.duration > 10 ? 700 : 400 }}>
                          {order.duration}m
                        </span>
                      </td>
                      <td style={{ padding: '9px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <sc.Icon size={10} style={{ color: sc.color }} />
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700, color: sc.color, letterSpacing: '0.04em' }}>{sc.label}</span>
                        </div>
                      </td>
                    </motion.tr>
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
