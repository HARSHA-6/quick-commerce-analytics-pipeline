import { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  height?: number;
  action?: ReactNode;
}

export function ChartContainer({ title, subtitle, children, height = 240, action }: ChartContainerProps) {
  const { theme } = useApp();

  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#222222' : '#DDDBD8';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';

  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      padding: '18px 20px 16px',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div>
          <div style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: textPrimary,
            textTransform: 'uppercase',
          }}>
            {title}
          </div>
          {subtitle && (
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: textMuted,
              marginTop: 2,
            }}>
              {subtitle}
            </div>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div style={{ height }}>
        {children}
      </div>
    </div>
  );
}
