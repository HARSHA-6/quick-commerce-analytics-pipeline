import { useState } from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  collapsed: boolean;
  onClick: () => void;
  theme: 'dark' | 'light';
}

export function Logo({ collapsed, onClick, theme }: LogoProps) {
  const [hovered, setHovered] = useState(false);

  const textColor = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 w-full focus:outline-none"
      style={{ padding: '0', background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      {/* Geometric Icon */}
      <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
        {/* Shape A */}
        <motion.div
          animate={{
            x: hovered ? -3 : 0,
            rotate: hovered ? -8 : 0,
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            width: 16,
            height: 16,
            background: '#FF4F00',
          }}
        />
        {/* Shape B */}
        <motion.div
          animate={{
            x: hovered ? 3 : 0,
            rotate: hovered ? 8 : 0,
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 16,
            height: 16,
            background: textColor,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.15 }}
        >
          <span
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 15,
              fontWeight: hovered ? 900 : 700,
              letterSpacing: '-0.04em',
              color: textColor,
              transition: 'font-weight 0.12s ease',
              display: 'block',
              lineHeight: 1.1,
            }}
          >
            VELOX
          </span>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: '0.12em',
              color: '#FF4F00',
              display: 'block',
              lineHeight: 1,
            }}
          >
            OPS
          </span>
        </motion.div>
      )}
    </button>
  );
}
