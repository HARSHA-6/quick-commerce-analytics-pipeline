import { useApp } from '../../context/AppContext';

export function SkeletonChart({ height = 240 }: { height?: number }) {
  const { theme } = useApp();
  const shimmer = theme === 'dark' ? '#1E1E1E' : '#E8E6E3';
  const shimmerLight = theme === 'dark' ? '#262626' : '#DDDBD8';

  return (
    <div style={{ height, display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 0' }}>
      <style>{`
        @keyframes velox-shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
      {/* Fake chart bars */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        {[60, 85, 45, 90, 70, 55, 80, 40, 75, 95, 50, 65].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: shimmer,
              animation: `velox-shimmer 1.6s ease-in-out ${i * 0.08}s infinite`,
            }}
          />
        ))}
      </div>
      {/* Fake axis */}
      <div style={{ height: 1, background: shimmerLight }} />
      <div style={{ display: 'flex', gap: 12 }}>
        {[40, 60, 50, 70, 45].map((w, i) => (
          <div key={i} style={{
            height: 8, width: `${w}px`, background: shimmer,
            animation: `velox-shimmer 1.6s ease-in-out ${i * 0.12}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
