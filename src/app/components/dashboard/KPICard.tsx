import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface KPICardProps {
  label: string;
  value: string;
  unit?: string;
  trend: 'up' | 'down' | 'neutral';
  trendPositive: boolean;
  delta: string;
  comparison: string;
  subLabel?: string;
}

export function KPICard({
  label, value, unit, trend, trendPositive, delta, comparison, subLabel
}: KPICardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useApp();

  const defaultBg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const defaultBorder = theme === 'dark' ? '#222222' : '#DDDBD8';
  const defaultText = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const defaultMuted = theme === 'dark' ? '#555555' : '#888888';

  const bg = hovered ? '#F2F2F2' : defaultBg;
  const textColor = hovered ? '#0A0A0A' : defaultText;
  const mutedColor = hovered ? '#555555' : defaultMuted;
  const trendColor = trendPositive ? '#22C55E' : '#FF4F00';
  const activeTrendColor = hovered ? (trendPositive ? '#16A34A' : '#DC2626') : trendColor;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        border: `1px solid ${hovered ? '#0A0A0A' : defaultBorder}`,
        padding: '20px 24px',
        cursor: 'default',
        transition: 'background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease',
        boxShadow: hovered ? '8px 8px 0 #FF4F00' : 'none',
        position: 'relative',
      }}
    >
      {/* Label */}
      <div style={{
        fontFamily: 'Inter Tight, sans-serif',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: mutedColor,
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        {label}
      </div>

      {/* Main Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 36,
          fontWeight: 700,
          color: textColor,
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}>
          {value}
        </span>
        {unit && (
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 14,
            color: mutedColor,
          }}>
            {unit}
          </span>
        )}
      </div>

      {/* Sub Label */}
      {subLabel && (
        <div style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 11,
          color: mutedColor,
          marginBottom: 12,
        }}>
          {subLabel}
        </div>
      )}

      {/* Trend + Delta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3,
          color: activeTrendColor,
        }}>
          <TrendIcon size={11} />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            fontWeight: 700,
          }}>
            {delta}
          </span>
        </div>
        <span style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 11,
          color: mutedColor,
        }}>
          {comparison}
        </span>
      </div>

      {/* Accent line at bottom */}
      {!hovered && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '100%', height: 2,
          background: '#FF4F00',
          opacity: 0.35,
        }} />
      )}
    </div>
  );
}
