import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { personalInfo, headlines } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

const MagneticButton = ({ children, href, target, rel, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull (cap at 12px max movement for stability and elegance)
    const pullX = Math.min(Math.max(distanceX * 0.35, -12), 12);
    const pullY = Math.min(Math.max(distanceY * 0.35, -12), 12);
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const canvasStickyContainerRef = useRef(null);
  // Element Refs for split text & reveals
  const nameLeftRef = useRef(null);
  const nameRightRef = useRef(null);
  const subtitleRef = useRef(null);
  const tickerRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [buffering, setBuffering] = useState(true);
  const imagesRef = useRef([]);
  const socialLinks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohamed-younus05',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/MohamedYounus05',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/_mohamed_younus_05?igsh=aTR3bmZkZzQ0M3Vm',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      id: 'email',
      label: 'Email',
      url: 'mailto:mohamedyounus0572@gmail.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    }
  ];
  // Load canvas frame sequence
  useEffect(() => {
    const runLoading = async () => {
      const initialBatchSize = 40;
      const promises = [];

      // First, load frame 1 to show immediately
      const firstImg = new Image();
      firstImg.src = `/assets/hero-sequence/frame_0001.webp`;
      const firstPromise = new Promise((resolve) => {
        firstImg.onload = () => {
          imagesRef.current[0] = firstImg;
          setImagesLoaded(1);
          // Initial render of first frame
          const canvas = canvasRef.current;
          if (canvas) {
            const context = canvas.getContext('2d');
            canvas.width = 1280;
            canvas.height = 720;
            context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
          }
          resolve();
        };
        firstImg.onerror = () => resolve();
      });
      await firstPromise;

      // Load initial batch up to 40 frames to allow scroll buffer
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/assets/hero-sequence/frame_${String(i).padStart(4, '0')}.webp`;
        
        const p = new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current[i-1] = img;
            setImagesLoaded((prev) => {
              const next = prev + 1;
              if (next >= initialBatchSize) {
                setBuffering(false);
              }
              return next;
            });
            resolve();
          };
          img.onerror = () => resolve();
        });
        promises.push(p);
      }
      
      // Load everything else in the background
      await Promise.all(promises);
    };

    runLoading();
  }, []);

  // Canvas Scroll Playback and Content Fade
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    canvas.width = 1280;
    canvas.height = 720;

    const render = (index) => {
      const img = imagesRef.current[index];
      if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Draw first frame if loaded
    if (imagesRef.current[0]) {
      render(0);
    }

    const ctx = gsap.context(() => {
      // Single unified timeline that pins the sticky container and scrubs frames/reveals
      // Fixed at 300vh (double/triple normal view track)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: canvasStickyContainerRef.current,
          pinSpacing: true,
          scrub: 1.5,
        }
      });

      let obj = { frame: 0 };
      
      // We map the frame scrub over the entire 10s timeline
      tl.to(obj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 10,
        onUpdate: () => {
          render(Math.round(obj.frame));
        }
      }, 0);

      // Synchronized text reveals based on timeline duration of 10s
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "95% top",
          scrub: 1,
        }
      });

      // Set initial states
      gsap.set(nameLeftRef.current, { opacity: 0, x: -80, scale: 0.9, filter: "blur(15px)" });
      gsap.set(nameRightRef.current, { opacity: 0, x: 80, scale: 0.9, filter: "blur(15px)" });
      gsap.set(tickerRef.current, { opacity: 0, y: 20 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(socialsRef.current, { opacity: 0, y: 20 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 });

      // Sequence progress mapping (mapped to 10s total duration):
      // 0%–20%:   Only the cinematic video. No text.
      // 20%–40%:  Reveal MOHAMED from the left (opacity, scale, blur->sharp, lift).
      // 40%–60%:  Reveal YOUNUS from the right (both names fully visible).
      // 60%–85%:  Keep both names fully visible while continuing to scroll.
      // 85%–100%: Reveal headline ticker, professional subtitle, scroll indicator, and socials bar.
      textTimeline
        // 20% to 40%: MOHAMED entrance
        .to(nameLeftRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out"
        }, 2)

        // 40% to 60%: YOUNUS entrance
        .to(nameRightRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out"
        }, 4)

        // 60% to 8.5s: Slow elegant float parallax (keep names fully visible)
        .to([nameLeftRef.current, nameRightRef.current], {
          scale: 1.03,
          y: -15,
          duration: 2.5,
          ease: "none"
        }, 6)

        // 85% to 92%: Reveal Ticker, Socials, Subtitle, and Scroll Indicator
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 8.5)
        .to(tickerRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 8.6)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 8.7)
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 8.8)

        // 98% to 100%: Smooth fade out of everything for About section transition
        .to([nameLeftRef.current, nameRightRef.current, subtitleRef.current, tickerRef.current, socialsRef.current, scrollIndicatorRef.current], {
          opacity: 0,
          y: -60,
          duration: 0.5,
          ease: "power2.in"
        }, 9.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Force re-render of frame 1 once loaded
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && imagesRef.current[0]) {
      const context = canvas.getContext('2d');
      context.drawImage(imagesRef.current[0], 0, 0, canvas.width, canvas.height);
    }
  }, [imagesLoaded]);

  const handleScrollToSection = (id) => {
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
    <div id="home" ref={containerRef} className="relative h-[300vh] bg-[#080808]">
      {/* Pinned child container, controlled entirely by GSAP ScrollTrigger */}
      <div ref={canvasStickyContainerRef} className="relative h-screen w-full overflow-hidden z-10 bg-[#080808]">
        
        {/* Layer 1 (z-5): Canvas Render Panel */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover filter saturate-[1.1] brightness-[0.7] contrast-[1.05] z-5 pointer-events-none"
        />

        {/* Layer 2 (z-10): Centered Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center select-none pointer-events-none">
          
          {/* Split Name Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full px-[6vw] h-1/3 gap-4 sm:gap-0">
            
            {/* Left Name Block */}
            <div ref={nameLeftRef} className="flex-1 text-center will-change-transform">
              <h1 className="text-[clamp(1.8rem,6vw,2.5rem)] sm:text-[clamp(1.2rem,3.4vw,5rem)] font-extrabold tracking-widest text-white font-syne drop-shadow-[0_0_15px_rgba(255,255,255,0.12)] whitespace-nowrap">
                MOHAMED
              </h1>
            </div>

            {/* Spacer for centered video subject (vertical face alignment) */}
            <div className="hidden sm:block w-[12vw] sm:w-[14vw] md:w-[16vw] lg:w-[18vw] flex-shrink-0" />

            {/* Right Name Block */}
            <div ref={nameRightRef} className="flex-1 text-center will-change-transform">
              <h1 className="text-[clamp(1.8rem,6vw,2.5rem)] sm:text-[clamp(1.2rem,3.4vw,5rem)] font-extrabold tracking-widest text-white font-syne drop-shadow-[0_0_15px_rgba(255,255,255,0.12)] whitespace-nowrap">
                YOUNUS
              </h1>
            </div>

          </div>

          {/* Subtitle - Pushed down to fully reveal the tie and suit area */}
          <div ref={subtitleRef} className="relative top-[75px] mt-28 text-center px-6">
            <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] text-white font-syne uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
              Python Developer • Artificial Intelligence • Machine Learning • Data Analyst
            </p>
          </div>

          {/* Headline Ticker Loop - Pushed down slightly below the subtitle */}
          <div ref={tickerRef} className="w-full max-w-5xl relative top-[75px] mt-[28px] overflow-hidden py-3 pointer-events-auto">
            <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
              {[...headlines, ...headlines].map((headline, i) => (
                <div key={i} className="flex items-center gap-6 whitespace-nowrap">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 font-mono hover:text-white transition-colors duration-300">
                    {headline}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Layer 3 (z-20): Social Links Bar — Cinematic Glassmorphism */}
        <div
          ref={socialsRef}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-[280px] sm:w-auto">
            {socialLinks.map((link) => (
              <MagneticButton
                key={link.id}
                href={link.url}
                target={link.id === 'email' ? undefined : '_blank'}
                rel={link.id === 'email' ? undefined : 'noreferrer'}
                className="group/social relative flex-1 sm:flex-none flex items-center justify-center gap-1 px-2 sm:px-4 py-2 rounded-full text-white/70 hover:text-white transition-all duration-300 hover:bg-[#00D9FF]/10 hover:shadow-[0_0_18px_rgba(0,217,255,0.25)] interactive"
              >
                <span className="transition-colors duration-300 group-hover/social:text-[#00D9FF]">
                  {link.icon}
                </span>
                <span className="text-[11px] font-semibold tracking-wide font-mono uppercase hidden sm:inline transition-colors duration-300 group-hover/social:text-[#00D9FF]">
                  {link.label}
                </span>
                {/* Tooltip for mobile */}
                <span className="sm:hidden absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-[9px] font-mono text-white uppercase tracking-wider opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {link.label}
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Layer 4 (z-20): Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>

      </div>
    </div>
  );
};

export default Hero;
