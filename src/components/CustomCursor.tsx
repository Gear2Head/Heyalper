import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export type CursorType = 'default' | 'pointer' | 'text' | 'grab' | 'discord' | 'pdf' | 'video';

export const CustomCursor: React.FC = () => {
  const { data } = usePortfolio();
  const [cursorType, setCursorType] = useState<CursorType>('default');
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

      // Check hierarchy
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-hover="true"], [data-cursor]'
      );

      if (!interactive) {
        setCursorType('default');
        return;
      }

      // Check specific cursor attributes or content
      const dataCursor = interactive.getAttribute('data-cursor');
      if (dataCursor) {
        setCursorType(dataCursor as CursorType);
        return;
      }

      const href = interactive.getAttribute('href') || '';
      const tagName = interactive.tagName.toLowerCase();

      if (href.includes('discord.gg') || href.includes('discord.com')) {
        setCursorType('discord');
      } else if (href.endsWith('.pdf') || href.includes('cv.pdf') || interactive.classList.contains('download-pdf')) {
        setCursorType('pdf');
      } else if (tagName === 'input' || tagName === 'textarea') {
        setCursorType('text');
      } else if (interactive.classList.contains('cursor-grab') || interactive.classList.contains('draggable')) {
        setCursorType('grab');
      } else if (interactive.classList.contains('video-trigger')) {
        setCursorType('video');
      } else {
        setCursorType('pointer');
      }
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

  // Custom SVG renderers for cursor icons
  const renderCursorIcon = () => {
    switch (cursorType) {
      case 'discord':
        return (
          <svg className="w-5 h-5 text-white" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.71-1.32,2.51-2a75.46,75.46,0,0,0,73,0c.8,0.7,1.64,1.38,2.51,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,50.7,122.64,27.78,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        );
      case 'grab':
        return (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h12M8 15h12M4 6h2M4 12h2M4 18h2" />
          </svg>
        );
      case 'text':
        return (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14M12 4v16M9 20h6" />
          </svg>
        );
      case 'pointer':
        return (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      default:
        return null;
    }
  };

  const isSpecialCursor = cursorType !== 'default';

  return (
    <>
      <style>{`
        html, body, a, button, input, textarea, select, [role="button"], .cursor-pointer, * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer Glow & Fluid Frame */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border backdrop-blur-[1px] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isSpecialCursor ? 48 : 24,
          height: isSpecialCursor ? 48 : 24,
          scale: isClicking ? 0.85 : 1,
          backgroundColor: isSpecialCursor
            ? cursorType === 'discord'
              ? 'rgba(88, 101, 242, 0.9)'
              : cursorType === 'video'
              ? 'rgba(239, 68, 68, 0.9)'
              : cursorType === 'pdf' || cursorType === 'grab'
              ? 'rgba(16, 185, 129, 0.9)'
              : `${accentColor}cc` // 80% opacity accent
            : 'rgba(255, 255, 255, 0.05)',
          borderColor: isSpecialCursor
            ? cursorType === 'discord'
              ? '#5865F2'
              : cursorType === 'video'
              ? '#EF4444'
              : cursorType === 'pdf' || cursorType === 'grab'
              ? '#10B981'
              : accentColor
            : data.theme.darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
          boxShadow: isSpecialCursor
            ? cursorType === 'discord'
              ? '0 0 15px rgba(88, 101, 242, 0.5)'
              : `0 0 15px ${accentColor}50`
            : 'none',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.3,
        }}
      >
        {/* Custom SVG Icon Inside Outer Ring */}
        <div className="absolute transition-opacity duration-200">
          {renderCursorIcon()}
        </div>
      </motion.div>

      {/* Inner Dot Precision Indicator (only visible when in default mode) */}
      {!isSpecialCursor && (
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
            width: 6,
            height: 6,
            scale: isClicking ? 1.5 : 1,
          }}
          transition={{
            duration: 0.05,
            ease: 'easeOut',
          }}
        />
      )}
    </>
  );
};
