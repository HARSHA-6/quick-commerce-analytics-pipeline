import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import { deliveryTimeTrendData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#F2F2F2',
      border: '1px solid #0A0A0A',
      padding: '8px 12px',
      borderRadius: 0,
      boxShadow: '4px 4px 0 #FF4F00',
    }}>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, fontWeight: 700, color: '#0A0A0A' }}>
        {payload[0]?.value} min avg
      </div>
      {payload[1] && (
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#FF4F00' }}>
          {payload[1]?.value} SLA breaches
        </div>
      )}
    </div>
  );
}

export function DeliveryTimeTrend() {
  const { theme } = useApp();
  const gridColor = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const axisColor = theme === 'dark' ? '#444444' : '#AAAAAA';

  const displayData = deliveryTimeTrendData.filter((_, i) => i % 2 === 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={displayData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="2 4"
          stroke={gridColor}
          vertical={false}
        />
        <XAxis
          dataKey="hour"
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          domain={[4, 16]}
        />
        <ReferenceLine
          y={10}
          stroke="#FF4F00"
          strokeDasharray="3 3"
          strokeWidth={1}
          label={{
            value: 'SLA 10m',
            position: 'right',
            fill: '#FF4F00',
            fontFamily: 'Space Mono, monospace',
            fontSize: 8,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="avgTime"
          stroke="#525252"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 4, fill: '#FF4F00', stroke: 'none' }}
        />
        <Line
          type="monotone"
          dataKey="slaBreaches"
          stroke="#FF4F00"
          strokeWidth={1}
          dot={false}
          strokeDasharray="2 3"
          activeDot={{ r: 3, fill: '#FF4F00', stroke: 'none' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
