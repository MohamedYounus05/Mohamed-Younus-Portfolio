import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const Experience = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // State for lightbox modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-black border-b border-white/5 font-satoshi text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[clamp(1.6rem,6vw,3.75rem)] font-extrabold tracking-tighter font-syne text-white leading-none break-words">
            WORK EXPERIENCE
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4 md:ml-12 flex flex-col gap-12 w-full max-w-5xl">
          {personalInfo.experience.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.2, duration: 0.8, ease: 'easeOut' }}
              className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full justify-between"
            >
              {/* Pulsing Node */}
              <div className="absolute left-[-33px] sm:left-[-37px] top-[6px] w-6 h-6 rounded-full bg-black border-2 border-[#00D9FF] flex items-center justify-center shadow-[0_0_10px_rgba(0,217,255,0.8)] z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] absolute" />
              </div>

              {/* Left Side: Experience Details */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                {/* Title & Metadata */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-[#00D9FF] font-mono">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00D9FF]">
                    {exp.duration}
                  </span>
                </div>

                {/* Details Bullet List */}
                <ul className="flex flex-col gap-3 mt-2">
                  {exp.details.map((detail, dIdx) => (
                    <li 
                      key={dIdx} 
                      className="text-zinc-400 leading-relaxed font-light text-sm flex items-start gap-3"
                    >
                      <span className="text-[#00D9FF] mt-1.5 text-xs">▪</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Internship Certificate Preview */}
              {exp.company.toLowerCase().includes("ilife") && (
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col items-center gap-3 mt-6 lg:mt-0 relative z-20">
                  {/* Glassmorphism frame around the certificate */}
                  <motion.div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative p-2 rounded-[18px] bg-white/[0.03] border border-[#00D9FF]/20 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.5),_0_0_15px_rgba(0,217,255,0.02)] group cursor-pointer overflow-hidden max-w-[300px] w-full aspect-[4/3] flex items-center justify-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: idx * 0.2 + 0.3, duration: 0.8 }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: "rgba(0, 217, 255, 0.55)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(0, 217, 255, 0.3)"
                    }}
                  >
                    {/* Gloss sweeping highlight */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
                    
                    <img
                      src="/assets/certificates/ILife certificate.jpg"
                      alt="ILife Technologies Internship Certificate Preview"
                      className="w-full h-full object-cover rounded-[14px] transition-all duration-300 group-hover:brightness-110"
                    />
                  </motion.div>

                  {/* Small "View Certificate" Button */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-wider text-[#00D9FF] hover:text-[#00f2fe] transition-colors duration-200 mt-1 cursor-pointer select-none group"
                  >
                    <span>View Certificate</span>
                    <svg 
                      className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-110" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal Overlay with blurred dark background */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-[20px] border border-white/10 bg-[#0B0F19]/90 shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#00D9FF] hover:text-black transition-all duration-300 cursor-pointer"
                aria-label="Close lightbox"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              {/* Full-size image */}
              <img
                src="/assets/certificates/ILife certificate.jpg"
                alt="ILife Technologies Internship Certificate Full View"
                className="max-w-full max-h-[80vh] object-contain rounded-[16px] block select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
