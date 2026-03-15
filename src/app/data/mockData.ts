// ─── Delivery Time Trend (Hourly) ───────────────────────────────────────────
export const deliveryTimeTrendData = [
  { hour: '00:00', avgTime: 7.2, slaBreaches: 3 },
  { hour: '01:00', avgTime: 6.8, slaBreaches: 1 },
  { hour: '02:00', avgTime: 6.5, slaBreaches: 0 },
  { hour: '03:00', avgTime: 6.9, slaBreaches: 2 },
  { hour: '04:00', avgTime: 7.1, slaBreaches: 2 },
  { hour: '05:00', avgTime: 7.8, slaBreaches: 5 },
  { hour: '06:00', avgTime: 8.4, slaBreaches: 9 },
  { hour: '07:00', avgTime: 9.1, slaBreaches: 14 },
  { hour: '08:00', avgTime: 10.3, slaBreaches: 22 },
  { hour: '09:00', avgTime: 9.7, slaBreaches: 18 },
  { hour: '10:00', avgTime: 8.9, slaBreaches: 12 },
  { hour: '11:00', avgTime: 8.6, slaBreaches: 10 },
  { hour: '12:00', avgTime: 9.8, slaBreaches: 21 },
  { hour: '13:00', avgTime: 10.4, slaBreaches: 26 },
  { hour: '14:00', avgTime: 9.2, slaBreaches: 16 },
  { hour: '15:00', avgTime: 8.7, slaBreaches: 11 },
  { hour: '16:00', avgTime: 8.4, slaBreaches: 9 },
  { hour: '17:00', avgTime: 9.3, slaBreaches: 17 },
  { hour: '18:00', avgTime: 11.2, slaBreaches: 34 },
  { hour: '19:00', avgTime: 12.8, slaBreaches: 47 },
  { hour: '20:00', avgTime: 13.1, slaBreaches: 52 },
  { hour: '21:00', avgTime: 11.9, slaBreaches: 39 },
  { hour: '22:00', avgTime: 10.2, slaBreaches: 24 },
  { hour: '23:00', avgTime: 8.6, slaBreaches: 10 },
];

// ─── Orders by Hour ──────────────────────────────────────────────────────────
export const ordersByHourData = [
  { hour: '00', orders: 18 },
  { hour: '01', orders: 9 },
  { hour: '02', orders: 6 },
  { hour: '03', orders: 4 },
  { hour: '04', orders: 7 },
  { hour: '05', orders: 22 },
  { hour: '06', orders: 51 },
  { hour: '07', orders: 89 },
  { hour: '08', orders: 142 },
  { hour: '09', orders: 127 },
  { hour: '10', orders: 108 },
  { hour: '11', orders: 119 },
  { hour: '12', orders: 198 },
  { hour: '13', orders: 221 },
  { hour: '14', orders: 174 },
  { hour: '15', orders: 139 },
  { hour: '16', orders: 148 },
  { hour: '17', orders: 183 },
  { hour: '18', orders: 264 },
  { hour: '19', orders: 312 },
  { hour: '20', orders: 287 },
  { hour: '21', orders: 231 },
  { hour: '22', orders: 156 },
  { hour: '23', orders: 74 },
];

// ─── Stockouts by Category ───────────────────────────────────────────────────
export const stockoutsByCategoryData = [
  { category: 'Fresh Produce', stockouts: 42, rate: 8.3 },
  { category: 'Dairy', stockouts: 31, rate: 6.1 },
  { category: 'Beverages', stockouts: 28, rate: 5.5 },
  { category: 'Snacks', stockouts: 19, rate: 3.7 },
  { category: 'Frozen', stockouts: 15, rate: 2.9 },
  { category: 'Bakery', stockouts: 12, rate: 2.4 },
  { category: 'Household', stockouts: 9, rate: 1.8 },
];

// ─── Dark Store Comparison ───────────────────────────────────────────────────
export const darkStoreComparisonData = [
  { store: 'South Mumbai', avgDelivery: 7.2, slaBreachRate: 12, orders: 847 },
  { store: 'Bandra West', avgDelivery: 8.9, slaBreachRate: 21, orders: 643 },
  { store: 'Andheri East', avgDelivery: 9.4, slaBreachRate: 28, orders: 512 },
  { store: 'Powai', avgDelivery: 10.1, slaBreachRate: 34, orders: 398 },
  { store: 'Thane', avgDelivery: 11.3, slaBreachRate: 42, orders: 287 },
  { store: 'Navi Mumbai', avgDelivery: 12.8, slaBreachRate: 51, orders: 201 },
];

// ─── Orders Table ─────────────────────────────────────────────────────────────
const storeIds = ['STR-001', 'STR-002', 'STR-003', 'STR-004', 'STR-005', 'STR-006'];
const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

function pad(n: number) { return String(n).padStart(2, '0'); }

export const ordersTableData = Array.from({ length: 60 }, (_, i) => {
  const id = `ORD-${(10047 + i).toString(36).toUpperCase().padStart(6, '0')}`;
  const orderH = 6 + Math.floor(i * 0.28);
  const orderM = (i * 11) % 60;
  const duration = parseFloat((5.8 + (i % 12) * 0.6).toFixed(1));
  const deliveryM = orderM + Math.floor(duration);
  const deliveryH = orderH + (deliveryM >= 60 ? 1 : 0);
  return {
    orderId: id,
    storeId: storeIds[i % storeIds.length],
    zone: zones[i % zones.length],
    orderTime: `${pad(orderH % 24)}:${pad(orderM)}`,
    deliveryTime: `${pad(deliveryH % 24)}:${pad(deliveryM % 60)}`,
    duration,
    stockoutFlag: i % 7 === 0,
    status: duration > 10 ? 'SLA_BREACH' : duration > 8.5 ? 'DELAYED' : 'ON_TIME',
  };
});

// ─── Store Health ─────────────────────────────────────────────────────────────
export const storeHealthData = [
  { id: 'STR-001', name: 'South Mumbai', zone: 'Zone A', orders: 847, avgDelivery: 7.2, slaCompliance: 88, stockAvailability: 96.2, status: 'healthy' },
  { id: 'STR-002', name: 'Bandra West', zone: 'Zone B', orders: 643, avgDelivery: 8.9, slaCompliance: 79, stockAvailability: 94.1, status: 'warning' },
  { id: 'STR-003', name: 'Andheri East', zone: 'Zone C', orders: 512, avgDelivery: 9.4, slaCompliance: 72, stockAvailability: 93.8, status: 'warning' },
  { id: 'STR-004', name: 'Powai', zone: 'Zone D', orders: 398, avgDelivery: 10.1, slaCompliance: 66, stockAvailability: 91.3, status: 'critical' },
  { id: 'STR-005', name: 'Thane', zone: 'Zone E', orders: 287, avgDelivery: 11.3, slaCompliance: 58, stockAvailability: 89.7, status: 'critical' },
  { id: 'STR-006', name: 'Navi Mumbai', zone: 'Zone E', orders: 201, avgDelivery: 12.8, slaCompliance: 49, stockAvailability: 87.4, status: 'critical' },
];

// ─── Stockout Trend ───────────────────────────────────────────────────────────
export const stockoutTrendData = [
  { date: 'Feb 26', rate: 3.2, count: 18 },
  { date: 'Feb 27', rate: 3.8, count: 22 },
  { date: 'Feb 28', rate: 4.1, count: 25 },
  { date: 'Mar 01', rate: 3.9, count: 24 },
  { date: 'Mar 02', rate: 4.4, count: 27 },
  { date: 'Mar 03', rate: 4.7, count: 29 },
  { date: 'Mar 04', rate: 5.1, count: 31 },
];

// ─── Delivery Distribution ────────────────────────────────────────────────────
export const deliveryDistributionData = [
  { range: '<5 min', count: 142, pct: 8.2 },
  { range: '5–6 min', count: 287, pct: 16.6 },
  { range: '6–7 min', count: 341, pct: 19.7 },
  { range: '7–8 min', count: 298, pct: 17.2 },
  { range: '8–9 min', count: 224, pct: 12.9 },
  { range: '9–10 min', count: 178, pct: 10.3 },
  { range: '10–12 min', count: 156, pct: 9.0 },
  { range: '>12 min', count: 106, pct: 6.1 },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationsData = [
  { id: 1, type: 'critical', title: 'SLA Breach Spike', message: 'STR-005 (Thane) showing 58% SLA breach rate in last hour', time: '2 min ago', read: false },
  { id: 2, type: 'warning', title: 'Stockout Alert', message: 'Fresh Produce category critically low across 3 stores', time: '8 min ago', read: false },
  { id: 3, type: 'warning', title: 'Delivery Delay', message: 'Average delivery time exceeded 12 min in Zone E', time: '15 min ago', read: false },
  { id: 4, type: 'info', title: 'Peak Hour Starting', message: 'Dinner rush expected in 45 min. Prep inventory.', time: '22 min ago', read: true },
  { id: 5, type: 'success', title: 'Store Restored', message: 'STR-001 (South Mumbai) back to optimal performance', time: '1 hr ago', read: true },
  { id: 6, type: 'info', title: 'Report Ready', message: 'Weekly ops summary for Feb 26 – Mar 04 is ready', time: '2 hr ago', read: true },
];
