import React, { useEffect, useRef, useState } from 'react';

const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    // Track mouse move for spotlight
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 1 + Math.random() * 2;
        this.alpha = 0.15 + Math.random() * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`; // Cyan theme
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    const particles = Array.from({ length: particleCount }).map(() => new Particle());

    // Loop
    let animId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth spotlight coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw mouse-follow spotlight gradient (Layer 6)
      const spotlight = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, Math.max(350, canvas.width * 0.25)
      );
      spotlight.addColorStop(0, 'rgba(6, 182, 212, 0.04)'); // Cyan soft glow
      spotlight.addColorStop(0.5, 'rgba(59, 130, 246, 0.02)'); // Blue soft glow
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & Draw particles (Layer 3)
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connection lines (Layer 7)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [windowSize]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Layer 1: Looping Aurora Gradients */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen animate-[pulse_10s_ease-in-out_infinite] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#06b6d4]/10 to-[#3b82f6]/0 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#3b82f6]/10 to-[#06b6d4]/0 blur-[100px]" />
      </div>

      {/* Layer 2: Moving Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />

      {/* Layer 4: Premium SVG Grain Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Layer 5: Moving glowing gradient orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#06b6d4]/5 blur-[150px] top-[20%] left-[30%] animate-[spin-slow_40s_linear_infinite]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#3b82f6]/5 blur-[180px] bottom-[20%] right-[25%] animate-[spin-slow_60s_linear_infinite_reverse]" />

      {/* Canvas for Layer 3, 6, and 7 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default BackgroundFX;
