import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percentage = (window.pageYOffset / totalScroll) * 100;
        setProgress(percentage);
      }
      
      // Show on scroll
      setVisible(true);

      // Hide after scrolling stops for 1.5s
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisible(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 h-[3px] z-[999] pointer-events-none"
        >
          <div
            className="h-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
