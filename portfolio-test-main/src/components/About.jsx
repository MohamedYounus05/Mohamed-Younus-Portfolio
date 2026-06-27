import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-black border-b border-white/5 font-satoshi text-white overflow-hidden"
      style={{ position: 'relative', zIndex: 10 }}
    >

      {/* Subtle Background Glows — pointer-events-none so they never intercept clicks */}
      <div className="absolute top-1/4 left-[5%] w-[500px] max-w-[80vw] h-[500px] max-h-[80vw] bg-zinc-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[500px] max-w-[80vw] h-[500px] max-h-[80vw] bg-zinc-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 sm:gap-10">

        {/* ── Section Heading (same pattern as TECH ARSENAL / PROJECTS) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-[clamp(1.6rem,6vw,3.75rem)] font-extrabold tracking-tighter font-syne text-white leading-none break-words">
            ABOUT ME
          </h2>
          <div className="w-16 h-[3px] bg-white rounded-full mt-1" />
        </motion.div>

        {/* ── Professional Description ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:gap-5 text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl"
        >
          <p>
            I'm Mohamed Younus, an aspiring Python Developer passionate about Artificial
            Intelligence, Machine Learning, Data Analytics, and Web Development.
          </p>
          <p>
            I enjoy building scalable, real-world applications, exploring emerging
            technologies, and continuously enhancing my skills through practical projects
            and lifelong learning.
          </p>
          <p>
            I aim to create meaningful software solutions while growing as a technology
            professional.
          </p>
        </motion.div>

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {/* Download Resume */}
          <a
            id="about-download-resume"
            href="/assets/younus_resume.pdf"
            download="Mohamed_Younus_Resume.pdf"
            className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 interactive"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>

          {/* GitHub */}
          <a
            id="about-github"
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 interactive"
          >
            GitHub ↗
          </a>

          {/* LinkedIn */}
          <a
            id="about-linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 interactive"
          >
            LinkedIn ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
