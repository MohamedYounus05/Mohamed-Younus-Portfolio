import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────────
   8 technologies
   ──────────────────────────────────────────────────────────────────── */
const techList = [
  { name: "Python",          desc: "Automation, analytics, and scripting workflows.",       color: "#3776AB", gradient: "from-[#3776AB] to-[#FFD43B]" },
  { name: "SQL",             desc: "Structured database queries and data definition.",      color: "#00BCF2", gradient: "from-[#00BCF2] to-[#0078D4]" },
  { name: "Machine Learning",desc: "Training algorithms on statistical datashapes.",        color: "#3B82F6", gradient: "from-[#3B82F6] to-[#8B5CF6]" },
  { name: "Data Analytics",  desc: "Data processing, wrangling, and forecasting.",          color: "#14B8A6", gradient: "from-[#14B8A6] to-[#06B6D4]" },
  { name: "Django",          desc: "Robust and secure Python web backends.",                color: "#092E20", gradient: "from-[#092E20] to-[#44B78B]" },
  { name: "GitHub",          desc: "Collaborative code repos and issue trackers.",          color: "#FFFFFF", gradient: "from-[#24292F] to-[#FFFFFF]" },
  { name: "OpenCV",          desc: "Computer vision and real-time image processing.",       color: "#5C3EE8", gradient: "from-[#5C3EE8] to-[#00D4AA]" },
  { name: "Power BI",        desc: "Business intelligence modeling and dashboarding.",      color: "#F2C811", gradient: "from-[#F2C811] to-[#D5A300]" },
];

/* ──────────────────────────────────────────────────────────────────────
   SVG Icons
   ──────────────────────────────────────────────────────────────────── */
const TechIcon = ({ name }) => {
  const cls = "w-10 h-10 text-zinc-300";
  switch (name) {
    case "Python":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c5.52 0 6 1 6 4v2H6V6c0-3 .48-4 6-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-5.52 0-6-1-6-4v-2h12v2c0 3-.48 4-6 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9c-2 0-4 1-4 3v2c0 2 2 3 4 3h2c2 0 4-1 4-3v-2c0-2-2-3-4-3h-2z" />
          <circle cx="9.5" cy="5.5" r="0.5" fill="currentColor" />
          <circle cx="14.5" cy="18.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "SQL":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <ellipse cx="12" cy="5" rx="7" ry="2.5" />
          <path strokeLinecap="round" d="M5 5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
          <path strokeLinecap="round" d="M5 10v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
          <path strokeLinecap="round" d="M5 15v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-4" />
        </svg>
      );
    case "Machine Learning":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="5" cy="6" r="2.5" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="13" cy="12" r="2.5" />
          <circle cx="21" cy="6" r="2.5" />
          <circle cx="21" cy="18" r="2.5" />
          <line x1="7.5" y1="7" x2="10.5" y2="11" strokeLinecap="round" />
          <line x1="7.5" y1="17" x2="10.5" y2="13" strokeLinecap="round" />
          <line x1="15.5" y1="11" x2="18.5" y2="7.5" strokeLinecap="round" />
          <line x1="15.5" y1="13" x2="18.5" y2="16.5" strokeLinecap="round" />
        </svg>
      );
    case "Data Analytics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l4-5 4 3 6-8" />
          <circle cx="7" cy="16" r="1.5" fill="currentColor" />
          <circle cx="11" cy="11" r="1.5" fill="currentColor" />
          <circle cx="15" cy="14" r="1.5" fill="currentColor" />
          <circle cx="21" cy="6" r="1.5" fill="currentColor" />
        </svg>
      );
    case "Django":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h3c2 0 3 1 3 2.5S13 13 11 13H8V8z" />
          <path strokeLinecap="round" d="M11 13c1.5 0 3 .5 3 2.5S12.5 18 10 18H8v-5" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case "OpenCV":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="7" cy="17" r="4" />
          <circle cx="17" cy="17" r="4" />
          <circle cx="12" cy="7" r="4" />
          <path strokeLinecap="round" d="M9.5 9.5l1 3M14.5 9.5l-1 3M9 15h6" />
        </svg>
      );
    case "Power BI":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <rect x="3" y="14" width="4" height="7" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
        </svg>
      );
  }
};

/* ──────────────────────────────────────────────────────────────────────
   Premium Glassmorphic Skill Card
   ──────────────────────────────────────────────────────────────────── */
const SkillCard = React.forwardRef(({ tech, index }, ref) => {
  const innerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setRotate({
      x: -((y - rect.height / 2) / (rect.height / 2)) * 12,
      y: ((x - rect.width / 2) / (rect.width / 2)) * 12,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05) translateY(-8px)`
    : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`;

  return (
    <div
      ref={ref}
      className="absolute w-[210px] h-[310px] md:w-[250px] md:h-[350px] flex items-center justify-center pointer-events-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full rounded-2xl border border-white/20 flex flex-col justify-between p-6 shadow-[0_12px_40px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-all duration-300 ease-out select-none group relative bg-zinc-950/85 pointer-events-auto cursor-pointer"
        style={{
          transform: transformStyle,
          background: "linear-gradient(135deg, rgba(22,22,22,0.9) 0%, rgba(10,10,10,0.96) 100%)",
          boxShadow: isHovered
            ? `0 16px 48px rgba(0,0,0,0.85), 0 0 25px rgba(6, 182, 212, 0.08)`
            : "0 12px 40px rgba(0,0,0,0.75)",
        }}
      >
        {/* Spotlight Follow Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(150px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.06), transparent 70%)`,
          }}
        />

        {/* Accent border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${tech.color}30` }}
        />

        {/* Card Header */}
        <div className="flex justify-between items-start w-full relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative transition-all duration-300 group-hover:border-white/20 shadow-inner">
            <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
            <TechIcon name={tech.name} />
          </div>
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Card Footer */}
        <div className="flex flex-col gap-4 relative z-10">
          <div className={`w-12 h-1 rounded bg-gradient-to-r ${tech.gradient} shadow-[0_0_8px_rgba(6,182,212,0.15)]`} />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white font-syne group-hover:text-[#00D9FF] transition-colors">
              {tech.name}
            </h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-light leading-relaxed">
              {tech.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

SkillCard.displayName = "SkillCard";

/* ──────────────────────────────────────────────────────────────────────
   Skills Section — REVERSED timeline:
   
   ORIGINAL:  Row of all cards → collapse into stack → cycle out one-by-one
   REVERSED:  One card → cards slide in one-by-one → expand into full row
   
   Same animation parameters, opposite direction.
   ──────────────────────────────────────────────────────────────────── */
const Skills = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealedCount, setRevealedCount] = useState(1);

  const revealedCountRef = useRef(1);

  // Initialize cardRefs
  if (cardRefs.current.length !== techList.length) {
    cardRefs.current = Array(techList.length)
      .fill(null)
      .map((_, i) => cardRefs.current[i] || React.createRef());
  }

  /* ── Particle Canvas Background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.25 + 0.08,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  /* ──────────────────────────────────────────────────────────────────
     GSAP Scroll-Pinned Reversed Animation
     
     Phase 1 (0 → 0.85):  Build the deck — cards slide in one-by-one
                           from behind the front card and settle into
                           the stack. Reverse of the original cycling.
     
     Phase 2 (0.85 → 1.0): Stack expands into a clean horizontal row.
                            Reverse of the original collapse.
     ────────────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const cardElements = cardRefs.current.map((r) => r.current);
    const totalCards = techList.length; // 8

    const isMobile = window.innerWidth < 768;

    // ── Original stack parameters (kept identical) ──
    const getStackProps = (depthIdx) => ({
      x: depthIdx * 3.5,
      y: depthIdx * 7,
      rotate: depthIdx * 1.5,
      scale: 1 - depthIdx * 0.035,
      opacity: depthIdx < 5 ? 1 - depthIdx * 0.18 : 0,
      blur: depthIdx === 0 ? 0 : Math.min(4, depthIdx),
    });

    // ── Original horizontal row positions (kept identical) ──
    const spacing = isMobile ? 110 : 210;
    const centerIdx = (totalCards - 1) / 2; // 3.5
    const getRowX = (idx) => (idx - centerIdx) * spacing;

    const ctx = gsap.context(() => {
      /* ── Initial state: Card 0 front-and-center, rest invisible behind ── */
      cardElements.forEach((el, idx) => {
        if (idx === 0) {
          // Front card: fully visible at stack front position
          gsap.set(el, {
            x: 0, y: 0, scale: 1, opacity: 1, rotate: 0,
            filter: "none",
            zIndex: totalCards,
          });
        } else {
          // Hidden: off-screen to the left (reverse of being dismissed left)
          // This is where cards END UP in the original cycling animation
          gsap.set(el, {
            x: isMobile ? -260 : -480,
            y: 40,
            scale: 0.85,
            opacity: 0,
            rotate: -15,
            filter: "blur(5px)",
            zIndex: 0,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.85) {
              // During the build phase, count how many cards are revealed
              const buildProgress = p / 0.85;
              const count = Math.min(
                totalCards,
                Math.floor(buildProgress * (totalCards - 1)) + 1
              );
              if (revealedCountRef.current !== count) {
                revealedCountRef.current = count;
                setRevealedCount(count);
              }
            } else {
              if (revealedCountRef.current !== totalCards) {
                revealedCountRef.current = totalCards;
                setRevealedCount(totalCards);
              }
            }
          },
        },
      });

      /* ────────────────────────────────────────────────────────
         Phase 1: Build the deck (progress 0 → 0.85)
         
         Reverse of original cycling:
         Original: front card slides off LEFT, others step forward
         Reversed: new card slides IN FROM LEFT, takes position at
                   back of stack, others stay in place
         ──────────────────────────────────────────────────────── */
      const buildEnd = 0.85;
      const step = buildEnd / (totalCards - 1);

      for (let i = 1; i < totalCards; i++) {
        const timeStart = (i - 1) * step;

        // The new card (i) slides in from off-screen left
        // and settles into the BACK of the visible stack.
        // In the stack, card 0 is front (depthIdx 0),
        // card 1 is behind it (depthIdx 1), etc.
        const stackPos = getStackProps(i);

        tl.to(
          cardElements[i],
          {
            x: stackPos.x,
            y: stackPos.y,
            scale: stackPos.scale,
            rotate: stackPos.rotate,
            opacity: stackPos.opacity,
            filter: stackPos.blur === 0 ? "none" : `blur(${stackPos.blur}px)`,
            zIndex: totalCards - i,
            duration: 0.85,
            ease: "power2.out",
          },
          timeStart
        );

        // Keep ALL previously revealed cards in their correct
        // stack positions (exactly as the original stack hierarchy)
        for (let j = 0; j < i; j++) {
          const pos = getStackProps(j);
          tl.to(
            cardElements[j],
            {
              x: pos.x,
              y: pos.y,
              scale: pos.scale,
              rotate: pos.rotate,
              opacity: 1, // previously revealed cards always stay visible
              filter: pos.blur === 0 ? "none" : `blur(${pos.blur}px)`,
              zIndex: totalCards - j,
              duration: 0.85,
              ease: "power2.out",
            },
            timeStart
          );
        }
      }

      /* ────────────────────────────────────────────────────────
         Phase 2: Expand to horizontal row (progress 0.85 → 1.0)
         
         Reverse of original Phase 1 collapse:
         Original: row collapses INTO stack
         Reversed: stack EXPANDS into row
         
         Same positions, same scale, just the end state.
         ──────────────────────────────────────────────────────── */
      const fanStart = buildEnd;

      for (let i = 0; i < totalCards; i++) {
        tl.to(
          cardElements[i],
          {
            x: getRowX(i),
            y: 0,
            scale: 0.95,
            rotate: 0,
            opacity: 1,
            filter: "none",
            zIndex: totalCards - i,
            duration: 1,
            ease: "power2.inOut",
          },
          fanStart
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-black w-full h-[450vh] border-b border-white/5 overflow-visible"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 md:py-20 overflow-hidden bg-black z-10"
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
        />

        {/* Ambient glow lights */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#00D9FF]/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#00D9FF]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 px-6 z-20 relative select-none">
          <h2 className="text-4.5xl md:text-6xl font-extrabold tracking-tighter font-syne text-white leading-none">
            TECH ARSENAL
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 max-w-xl font-light leading-relaxed">
            Technologies and tools I use to build intelligent, scalable, and modern software solutions.
          </p>
        </div>

        {/* Interactive Cards Container */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-visible z-10 py-6">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#00D9FF]/[0.03] to-transparent blur-3xl pointer-events-none" />

          {/* Cards Frame */}
          <div className="relative w-[210px] h-[310px] md:w-[250px] md:h-[350px] flex items-center justify-center">
            {techList.map((tech, idx) => (
              <SkillCard
                key={tech.name}
                ref={cardRefs.current[idx]}
                tech={tech}
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* Footer counter */}
        <div className="text-center text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] z-20 relative select-none flex flex-col items-center gap-2">
          <span>
            {revealedCount < techList.length
              ? "Scroll to build your stack"
              : "Stack complete — your arsenal"}
          </span>
          <div className="flex items-center gap-1.5 mt-1 bg-white/[0.02] px-3 py-1 rounded-full border border-white/5 font-bold">
            <span className="text-[#00D9FF]">
              {String(revealedCount).padStart(2, '0')}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">
              {String(techList.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
