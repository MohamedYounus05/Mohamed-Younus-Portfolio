import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { certificates } from '../data/portfolioData';

const Certificates = () => {
  const [filter, setFilter] = useState('AI');
  const [lightbox, setLightbox] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Get unique categories (no 'All' button)
  const allCategories = [...new Set(certificates.flatMap((c) => c.categories))];

  const filtered = certificates.filter((c) => c.categories.includes(filter));

  return (
    <section id="certificates" ref={containerRef} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-black border-b border-white/5 font-satoshi text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Heading */}
<<<<<<< HEAD
        <div className="flex flex-col gap-3">
         <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-none break-words font-syne">
  CERTIFICATES
</h2>
          <p className="text-sm text-zinc-500 max-w-xl font-light">{certificates.length} certifications from industry leaders</p>
=======
        <div className="flex flex-col gap-3 overflow-hidden">
          <h2 className="text-[clamp(1.6rem,6vw,3.75rem)] font-extrabold tracking-tighter font-syne text-white leading-none break-words">CERTIFICATES</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl font-light">{certificates.length} certifications from industry leaders</p>
>>>>>>> 0278855 (Improve mobile responsiveness and update portfolio)
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-bold transition-all duration-300 interactive ${
                filter === cat
                  ? 'bg-[#00D9FF] text-black shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificate Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(140px, 100%), 1fr))' }}
          >
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => setLightbox(cert)}
                className="cert-card group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer hover:border-[#00D9FF]/30 hover:scale-[1.03] transition-all duration-300 interactive"
              >
                <img
                  src={cert.src}
                  alt={cert.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-white truncate">{cert.title}</h4>
                  <span className="text-[9px] text-[#00D9FF] font-mono">{cert.issuer}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center gap-5"
            >
              <button onClick={() => setLightbox(null)} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all interactive z-20">
                ✕
              </button>
              <img src={lightbox.src} alt={lightbox.title} className="max-h-[75vh] w-auto rounded-2xl border border-white/10 shadow-2xl" />
              <div className="text-center">
                <h3 className="text-lg font-bold text-white font-syne">{lightbox.title}</h3>
                <span className="text-xs text-[#00D9FF] font-mono">{lightbox.issuer}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
