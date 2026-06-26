import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState('default'); // 'default', 'hover', 'link'
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(true);
  const requestRef = useRef();
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device is mobile or touch
    const checkDevice = () => {
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const smallScreen = window.innerWidth < 768;
      setIsMobile(coarsePointer || smallScreen);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .interactive');
      if (target) {
        if (target.tagName === 'A' || target.classList.contains('link-item')) {
          setHoverType('link');
        } else {
          setHoverType('hover');
        }

        // Magnetic hook check
        if (target.classList.contains('magnetic')) {
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Pull target slightly, and snap cursor center
          setPosition({ x: centerX, y: centerY });
        }
      } else {
        setHoverType('default');
      }
    };

    const handleMouseDown = (e) => {
      // Create particle burst
      const count = 8;
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        return {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: hoverType === 'link' ? '#d946ef' : '#06b6d4', // Purple or Cyan
          scale: 4 + Math.random() * 4,
          opacity: 1
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    // Smooth trailing interpolation
    const updateTrail = () => {
      const currentTrail = trailRef.current;
      const targetX = position.x;
      const targetY = position.y;
      
      // Interpolation factor
      const ease = 0.15;
      const nextX = currentTrail.x + (targetX - currentTrail.x) * ease;
      const nextY = currentTrail.y + (targetY - currentTrail.y) * ease;

      trailRef.current = { x: nextX, y: nextY };
      setTrail({ x: nextX, y: nextY });

      // Animate burst particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.05,
            scale: Math.max(0, p.scale - 0.2)
          }))
          .filter((p) => p.opacity > 0)
      );

      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(requestRef.current);
    };
  }, [position, hoverType, isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Click Particles Burst */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.scale,
            height: p.scale,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 8px ${p.color}`
          }}
        />
      ))}

      {/* Trailing Outer Ring */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-cyan-500/50 mix-blend-screen pointer-events-none"
        animate={{
          x: trail.x - 16,
          y: trail.y - 16,
          scale: hoverType === 'hover' ? 1.5 : hoverType === 'link' ? 1.8 : 1,
          borderColor: hoverType === 'link' ? '#d946ef' : '#06b6d4', // purple vs cyan
          backgroundColor: hoverType === 'hover' ? 'rgba(6, 182, 212, 0.05)' : hoverType === 'link' ? 'rgba(217, 70, 239, 0.08)' : 'rgba(0, 0, 0, 0)'
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        style={{
          boxShadow: hoverType !== 'default' ? `0 0 12px ${hoverType === 'link' ? 'rgba(217,70,239,0.3)' : 'rgba(6,182,212,0.3)'}` : 'none'
        }}
      />

      {/* Central Dot */}
      <div
        className="absolute w-2 h-2 rounded-full pointer-events-none translate-x-[-50%] translate-y-[-50%]"
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: hoverType === 'link' ? '#d946ef' : '#06b6d4',
          boxShadow: `0 0 8px ${hoverType === 'link' ? '#d946ef' : '#06b6d4'}`
        }}
      />
    </div>
  );
};

export default CustomCursor;
