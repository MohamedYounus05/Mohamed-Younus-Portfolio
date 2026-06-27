import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_tvp6nf4",
        "template_rfxs4yh",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "odtukmv_qznrNwK54"
      );

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-black overflow-hidden font-satoshi text-white"
    >
      {/* Background glow orbs */}
      <div className="absolute bottom-[-100px] left-[50%] transform -translate-x-1/2 w-[60vw] h-[300px] bg-gradient-to-t from-[#00D9FF]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne">
            CONTACT ME
          </h2>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Direct info listing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold font-syne text-white">
                Let's Build Something Secure & Intelligent
              </h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Reach out for internship collaborations, open-source work, full stack projects, or prompt orchestrations queries.
              </p>
            </div>

            {/* Direct details card set */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-[#00D9FF]/40 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-white hover:text-[#00D9FF] transition-colors break-all">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#00D9FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:scale-105 transition-all duration-300 text-xs font-bold font-mono uppercase interactive"
                  >
                    Send
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-xs font-bold font-mono uppercase interactive"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* LinkedIn, GitHub & Instagram Links */}
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col gap-1 hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/[0.02] hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] hover:scale-[1.03] transition-all duration-300 group interactive"
                >
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">LinkedIn ↗</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">LinkedIn</span>
                </a>
                
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col gap-1 hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/[0.02] hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] hover:scale-[1.03] transition-all duration-300 group interactive"
                >
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">GitHub ↗</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">GitHub</span>
                </a>

                <a 
                  href={personalInfo.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col gap-1 hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/[0.02] hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] hover:scale-[1.03] transition-all duration-300 group interactive"
                >
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Instagram ↗</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">Instagram</span>
                </a>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col gap-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Location Coordinates</span>
                <span className="text-sm font-bold text-white">{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={sendEmail} className="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-900/20 border border-white/5 backdrop-blur-md relative overflow-hidden">
              
              {/* Form Input fields */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-zinc-500">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="bg-white/5 border border-white/5 rounded-xl px-5 py-4 w-full text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D9FF]/60 focus:bg-white/[0.08] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-zinc-500">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="bg-white/5 border border-white/5 rounded-xl px-5 py-4 w-full text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D9FF]/60 focus:bg-white/[0.08] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-zinc-500">Message</label>
                <textarea 
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message details..."
                  className="bg-white/5 border border-white/5 rounded-xl px-5 py-4 w-full text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D9FF]/60 focus:bg-white/[0.08] transition-all resize-none"
                />
              </div>

              {/* Validation/API error display */}
              {error && (
                <div className="text-red-400 text-xs font-mono bg-red-950/20 border border-red-500/20 rounded-xl px-4 py-3">
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button with loader */}
              <button
                type="submit"
                className="py-4 bg-[#00D9FF] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 interactive"
              >
                TRANSMIT MESSAGE
              </button>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6 z-20"
                  >
                    <span className="text-5xl animate-bounce">📨</span>
                    <h4 className="text-2xl font-bold font-syne text-[#00D9FF]">
                      Transmission Confirmed
                    </h4>
                    <p className="text-sm text-zinc-400 font-light max-w-xs leading-relaxed">
                      Thank you! Your message has been successfully transmitted. Younus will respond to your address shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

