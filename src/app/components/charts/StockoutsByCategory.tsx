import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { stockoutsByCategoryData } from '../../data/mockData';
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
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, fontWeight: 700, color: '#0A0A0A' }}>
        {payload[0]?.value} stockouts
      </div>
      {payload[1] && (
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#FF4F00' }}>
          {payload[1]?.value}% rate
        </div>
      )}
    </div>
  );
}

export function StockoutsByCategory() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useApp();

  const gridColor = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const axisColor = theme === 'dark' ? '#444444' : '#AAAAAA';
  const baseBarColor = theme === 'dark' ? '#303030' : '#D0CEC9';

  const displayData = stockoutsByCategoryData.map(d => ({
    ...d,
    category: d.category.replace(' ', '\n'),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={stockoutsByCategoryData}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 8, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          interval={0}
          width={60}
        />
        <YAxis
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 9, fill: axisColor }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          dataKey="stockouts"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {stockoutsByCategoryData.map((_, index) => (
            <Cell
              key={index}
              fill={
                activeIndex === null
                  ? index === 0 ? '#FF4F00' : baseBarColor
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
