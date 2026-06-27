import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { achievements } from '../data/portfolioData';

const Achievements = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // src to open in lightbox
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section 
      id="achievements" 
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-black border-b border-white/5 font-satoshi text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-4">
      <h2 className="w-full text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-none break-words">
  ACHIEVEMENTS
</h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              onClick={() => setSelectedPhoto(ach)}
              className="group relative rounded-3xl bg-zinc-900/30 border border-white/5 p-6 backdrop-blur-md cursor-pointer hover:border-[#00D9FF]/30 hover:shadow-[0_8px_30px_rgba(0,217,255,0.05)] hover:scale-[1.02] transition-all duration-500 flex flex-col gap-6"
            >
              {/* Photo preview container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black border border-white/5">
                <img 
                  src={ach.src} 
                  alt={ach.title} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />
                {/* Search overlay indicator */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md">
                    Enlarge Credential
                  </span>
                </div>
              </div>

              {/* Title Description */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏆</span>
                  <h3 className="text-lg font-bold font-syne text-white group-hover:text-[#00D9FF] transition-colors duration-300">
                    {ach.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-light font-mono">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state fallback */}
        {achievements.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
            <span className="text-4xl">🏅</span>
            <p className="text-zinc-500 text-sm mt-4 font-mono">
              Analyzing directory: no achievement photo files registered.
            </p>
          </div>
        )}

      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              <div className="p-6 bg-zinc-950 border-t border-white/5 flex flex-col gap-1 text-center">
                <h4 className="text-lg font-bold font-syne text-[#00D9FF]">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs text-zinc-500 font-light">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
            
            {/* Help guidelines */}
            <span className="absolute bottom-6 text-[10px] text-zinc-600 font-mono">
              Click anywhere outside image to exit lightbox view
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
