import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onStartExit, onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId;
    let pageLoaded = false;
    let finishStartTime = null;
    let startProgressBeforeFinish = 0;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (!pageLoaded) {
        // Simulate a smooth ease-out progress towards 95%
        const simulated = Math.min(Math.floor(95 * (1 - Math.exp(-elapsed / 1200))), 95);
        setProgress(simulated);
      } else {
        // Page has loaded
        if (finishStartTime === null) {
          finishStartTime = now;
          setProgress((prev) => {
            startProgressBeforeFinish = prev;
            return prev;
          });
        }

        const finishElapsed = now - finishStartTime;
        const duration = 500; // Final 100% sweep takes 500ms
        const t = Math.min(finishElapsed / duration, 1);
        const easeT = t * (2 - t); // Ease out quad
        const current = Math.min(Math.floor(startProgressBeforeFinish + (100 - startProgressBeforeFinish) * easeT), 100);
        setProgress(current);

        if (t >= 1) {
          // Hold at 100% for 0.5s (500ms)
          setTimeout(() => {
            setIsExiting(true);
            if (onStartExit) onStartExit();

            // Wait for exit animation (0.8s) before unmounting
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete();
            }, 800);
          }, 500);
          return; // Stop animation loop
        }
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    const handleLoad = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      // Ensure at least 1500ms elapsed before moving to completion phase,
      // so that 1500ms + 500ms linear completion >= 2000ms (2s minimum load screen)
      const delay = Math.max(1500 - elapsed, 0);

      setTimeout(() => {
        pageLoaded = true;
      }, delay);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener('load', handleLoad);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onStartExit, onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] select-none"
    >
      {/* Cinematic Cyan Radial Glow */}
      <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

      {/* Main content column */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* GIF Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] flex items-center justify-center relative"
        >
          <img
            src="https://cdn.dribbble.com/userupload/42146377/file/original-5db0bb5bde5120cb0292c95f5e5dd104.gif"
            alt="Loading..."
            className="w-full h-full object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Loading percentage text */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-[28px] font-bold text-white font-syne select-none mt-3"
          style={{ textShadow: '0 0 12px rgba(0, 217, 255, 0.7)' }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;

