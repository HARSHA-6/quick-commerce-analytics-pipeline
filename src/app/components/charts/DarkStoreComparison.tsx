import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell, ReferenceLine,
} from 'recharts';
import { darkStoreComparisonData } from '../../data/mockData';
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
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, fontWeight: 700, color: '#0A0A0A' }}>
        {payload[0]?.value} min avg delivery
      </div>
      {payload[1] && (
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#FF4F00' }}>
          {payload[1]?.value}% SLA breach
        </div>
      )}
    </div>
  );
}

export function DarkStoreComparison() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useApp();

  const gridColor = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const axisColor = theme === 'dark' ? '#444444' : '#AAAAAA';
  const baseBarColor = theme === 'dark' ? '#303030' : '#D0CEC9';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={darkStoreComparisonData}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 80, bottom: 0 }}
        barSize={14}
      >
        <CartesianGrid strokeDasharray="2 4" stroke={gridColor} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          domain={[0, 16]}
        />
        <YAxis
          type="category"
          dataKey="store"
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          width={76}
        />
        <ReferenceLine
          x={10}
          stroke="#FF4F00"
          strokeDasharray="3 3"
          strokeWidth={1}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          dataKey="avgDelivery"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {darkStoreComparisonData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                activeIndex === null
                  ? entry.avgDelivery > 10 ? '#FF4F0044' : baseBarColor
                  : activeIndex === index
                    ? '#FF4F00'
                    : `${baseBarColor}44`
              }
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
