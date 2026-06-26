import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const observers = [];
    
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' } // adjusted offsets for precise snaps
      );
      
      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, {
          offset: -80,
          duration: 1.2,
          easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // easeInOutCubic
        });
      } else {
        const navbarHeight = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[99] transition-all duration-500 font-satoshi ${
          scrolled
            ? 'py-4 bg-[#080808]/60 border-b border-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="cursor-pointer group flex items-center"
          >
            <span className="font-bold text-white font-syne tracking-wide group-hover:text-zinc-300 transition-colors text-base sm:text-lg">
              Mohamed Younus
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {sections.map((section) => (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative py-1 hover:text-[#00D9FF] interactive ${
                    activeSection === section.id ? 'text-[#00D9FF]' : 'text-zinc-500'
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#00D9FF] shadow-[0_0_8px_rgba(0,217,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none interactive"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'transform rotate-45 translate-y-[8px]' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'transform -rotate-45 -translate-y-[8px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-[#080808]/95 backdrop-blur-lg flex items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {sections.map((section, idx) => (
                <motion.button
                  key={section.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: idx * 0.05, ease: 'easeOut' }}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-2xl font-bold font-syne uppercase tracking-wider ${
                    activeSection === section.id
                      ? 'text-[#00D9FF] drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
