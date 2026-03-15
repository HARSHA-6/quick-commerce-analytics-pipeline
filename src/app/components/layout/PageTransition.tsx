import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export function PageTransition() {
  const { isTransitioning } = useApp();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="page-wipe"
          initial={{ x: '-100%' }}
          animate={{ x: '60%' }}
          exit={{ x: '110%' }}
          transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#FF4F00',
            zIndex: 9997,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
