import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { personalInfo, projectsData, certificates } from '../data/portfolioData';

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;
      const duration = 2;
      const totalSteps = 50;
      const stepTime = (duration * 1000) / totalSteps;

      const timer = setInterval(() => {
        start += Math.ceil(end / totalSteps);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tighter text-white font-syne drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    >
      {count}{suffix}
    </span>
  );
};

const stats = [
  { id: 'projects',     label: 'Projects Completed',     value: Math.max(5, projectsData.length), suffix: '+' },
  { id: 'certificates', label: 'Certifications Earned',  value: certificates.length,              suffix: '+' },
  { id: 'skills',       label: 'Technologies Mastered',  value: 15,                               suffix: '+' },
  { id: 'internship',   label: 'Internships Completed',  value: personalInfo.experience.length,   suffix: ''  },
  { id: 'years',        label: 'Years of Learning',      value: 4,                                suffix: '+' },
];

/**
 * HeroStats — extracted from Hero to live in normal document flow.
 * Previously it lived inside the Hero's h-[300vh] scroll-pin container,
 * which caused GSAP pinSpacing to overflow it into the About section.
 * Placing it here (between Hero and About in App.jsx) eliminates the overlap.
 */
const HeroStats = () => (
  <section
    id="hero-stats"
    className="relative z-10 w-full bg-black py-12 sm:py-16 md:py-20 border-b border-white/5 font-satoshi"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-center">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col justify-center gap-2 p-4 sm:p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-500 w-[calc(50%-8px)] sm:w-[calc(33.33%-16px)] md:w-[calc(20%-20px)] min-w-[130px] flex-grow max-w-[220px]"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 font-mono leading-relaxed">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroStats;
