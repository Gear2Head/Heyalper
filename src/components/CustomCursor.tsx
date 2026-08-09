import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { data } = usePortfolio();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for smooth physics
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer fluid ring
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Dynamic theme accent color mapper
  const getAccentColorHex = () => {
    switch (data.theme.accentColor) {
      case 'purple': return '#AF52DE';
      case 'emerald': return '#34C759';
      case 'amber': return '#FF9500';
      case 'rose': return '#FF2D55';
      case 'slate': return '#8E8E93';
      default: return '#0066CC'; // Apple standard blue
    }
  };

  useEffect(() => {
    // Check if device is touch-based or has no precise pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-hover="true"]'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleHoverCheck);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHoverCheck);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const accentColor = getAccentColorHex();

  return (
    <>
      {/* Inject cursor hiding rules inside the page only when custom cursor is loaded */}
      <style>{`
        html, body, a, button, input, textarea, select, [role="button"], .cursor-pointer, * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer Glow & Fluid Frame */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border backdrop-blur-[1.5px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovered 
            ? `${accentColor}10` // 10% opacity
            : 'rgba(255, 255, 255, 0.05)',
          borderColor: isHovered 
            ? accentColor 
            : data.theme.darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
          boxShadow: isHovered
            ? `0 0 20px ${accentColor}40` // 40% opacity glow
            : 'none',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.3,
        }}
      />

      {/* Inner Dot Precision Indicator */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: accentColor,
        }}
        animate={{
          width: isHovered ? 4 : 8,
          height: isHovered ? 4 : 8,
          scale: isClicking ? 1.5 : 1,
          boxShadow: isClicking 
            ? `0 0 10px ${accentColor}80` 
            : 'none',
        }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
        }}
      />
    </>
  );
};
