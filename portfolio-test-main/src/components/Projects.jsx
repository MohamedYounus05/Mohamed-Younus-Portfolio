import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projectsData } from '../data/portfolioData';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const trackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const ProjectCard = ({ project }) => {
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      className="relative flex flex-col justify-between p-8 md:p-10 rounded-[22px] bg-[#0B0F19]/50 border border-[#00D9FF]/20 shadow-[0_15px_30px_rgba(0,0,0,0.5),_0_0_15px_rgba(0,217,255,0.02)] backdrop-blur-md group select-none w-full h-full min-h-[400px] z-10"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      whileHover={{
        y: -8,
        borderColor: "rgba(0, 217, 255, 0.5)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 217, 255, 0.25)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    >
      {/* Gloss sweep & mouse glow overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[22px] pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,217,255,0.08), transparent 80%)'
          }}
        />
        {/* Shine sweeping line */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
      </div>

      {/* Top: Category Badge, Title & Description (Flex-Grow to push button down) */}
      <div className="relative z-10 flex flex-col flex-grow w-full">
        <div>
          <span className="inline-block text-[10px] uppercase tracking-widest text-[#00D9FF] font-mono px-3 py-1 rounded-full bg-[#00D9FF]/5 border border-[#00D9FF]/20">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-syne mt-4 group-hover:text-[#00D9FF] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-400 font-light leading-relaxed text-sm mt-3">
          {project.description}
        </p>

        {/* Technology Pills */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2.5 py-1 text-[10px] rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-mono uppercase tracking-wider transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#00D9FF] group-hover:border-[#00D9FF]/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Actions: Large Cyan GitHub Only (aligned correctly at card bottom) */}
      <div className="relative z-10 mt-auto pt-4 pointer-events-auto w-full">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl bg-[#00D9FF] text-[#05070B] group-hover:bg-[#00f2fe] font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,217,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.65)] relative group/btn overflow-hidden"
        >
          <span>GitHub</span>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center">
            <svg 
              className="w-4 h-4 fill-current transition-transform duration-300 group-hover/btn:scale-110" 
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        </a>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-24 bg-[#05070B] border-b border-white/5 font-satoshi text-white overflow-hidden w-full z-10"
    >
      {/* Local keyframe styles for floating backgrounds */}
      <style>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.08); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.08); }
          50% { transform: translate(30px, -20px) scale(1); }
        }
      `}</style>

      {/* Subtle floating blurred cyan lights */}
      <div className="absolute top-1/4 left-[-10%] w-[380px] h-[380px] bg-[#00D9FF]/[0.04] rounded-full blur-[110px] pointer-events-none animate-[float-slow-1_15s_ease-in-out_infinite] z-0" />
      <div className="absolute bottom-1/4 right-[-10%] w-[420px] h-[420px] bg-[#00D9FF]/[0.03] rounded-full blur-[130px] pointer-events-none animate-[float-slow-2_20s_ease-in-out_infinite] z-0" />

      <div className="max-w-[1400px] mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center gap-3 px-6 select-none"
        >
          <h2 className="text-4.5xl md:text-6xl font-extrabold tracking-tighter font-syne text-white leading-none">
            MY WORKS
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
            A selection of my personal software projects built using Python, Artificial Intelligence, Machine Learning, Data Analytics, and OpenCV.
          </p>
        </motion.div>

        {/* Centered Flex Wrap Layout for 5 projects */}
        <motion.div
          variants={trackVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-8 w-full max-w-[1400px] mx-auto px-6 z-10"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc((100%-64px)/3)] flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
