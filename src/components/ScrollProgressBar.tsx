import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-black/5 dark:bg-white/5 pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-[#0066CC] via-[#3898FF] to-[#0066CC] origin-left shadow-[0_0_10px_rgba(0,102,204,0.8)]"
      />
    </div>
  );
};
