import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Preloader from './components/Preloader';
import ScrollIndicator from './components/ScrollIndicator';
import CustomCursor from './components/CustomCursor';
import BackgroundFX from './components/BackgroundFX';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroStats from './components/HeroStats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  useLenis();
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Control scrolling lock based on isLoaded state
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isLoaded]);

  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // easeInOutCubic
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Preloader 
            onStartExit={() => setIsLoaded(true)} 
            onLoadComplete={() => setLoading(false)} 
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="bg-[#080808] min-h-screen relative overflow-hidden select-none"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        {/* Base Visual Utilities */}
        <BackgroundFX />
        <ScrollIndicator />
        <CustomCursor />
        <Navbar />
        
        {/* Main Layout Sections */}
        <main className="relative z-10">
          <Hero />
          <HeroStats />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Achievements />
          <Contact />
        </main>

        {/* Premium Footer */}
        <footer className="relative z-20 bg-[#080808]/80 border-t border-white/5 py-12 px-6 md:px-12 font-satoshi text-zinc-500 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo / copyright */}
            <div className="text-center w-full md:w-auto flex justify-center">
              <span>© 2026 Mohamed Younus M A K. All Rights Reserved.</span>
            </div>

            {/* Social Anchors */}
            <div className="flex gap-6 font-mono uppercase tracking-widest text-[10px]">
              <a href="https://github.com/MohamedYounus05" target="_blank" rel="noreferrer" className="hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 interactive">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/mohamed-younus05" target="_blank" rel="noreferrer" className="hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 interactive">LinkedIn ↗</a>
              <a href="https://www.instagram.com/_mohamed_younus_05?igsh=aTR3bmZkZzQ0M3Vm" target="_blank" rel="noreferrer" className="hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 interactive">Instagram ↗</a>
              <a href="mailto:mohamedyounus0572@gmail.com" className="hover:text-[#00D9FF] hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] transition-all duration-300 interactive">Email</a>
            </div>

            {/* Back to top scroll trigger */}
            <button
              onClick={handleScrollToTop}
              className="px-4 py-2 border border-white/10 hover:border-[#00D9FF]/40 hover:text-[#00D9FF] rounded-full transition-colors duration-300 font-mono uppercase tracking-wider text-[10px] interactive"
            >
              Back to Top ↑
            </button>

          </div>
        </footer>
      </motion.div>
    </>
  );
}

export default App;
