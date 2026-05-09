import { useRef, useEffect } from "react";

/**
 * InnerNetworkBG — reuses the SAME visual language as the Home hero's NetworkBackground
 * but with per-page configuration for particle count, speed, colours, and connection style.
 *
 * Props:
 *   particleCount  — number of nodes (default 70, lighter than Home's 120)
 *   maxSpeed       — max drift speed (default 0.35)
 *   connectDist    — max distance to draw a line between two nodes (default 180)
 *   palette        — array of {r,g,b} colour objects
 *   glowIntensity  — multiplier for the outer-glow radius (default 1)
 *   className      — extra classes
 */

const DEFAULT_PALETTE = [
  { r: 56, g: 189, b: 248 }, // sky-400
  { r: 6, g: 182, b: 212 }, // cyan-500
  { r: 147, g: 197, b: 253 }, // blue-300
  { r: 255, g: 255, b: 255 }, // white
];

export default function InnerNetworkBG({
  particleCount = 70,
  maxSpeed = 0.35,
  connectDist = 180,
  palette = DEFAULT_PALETTE,
  glowIntensity = 1,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    // Reduced-motion check
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    const init = () => {
      particles = [];
      // Clamp count on small screens for performance
      const count =
        window.innerWidth < 640 ? Math.min(particleCount, 40) : particleCount;

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.8 + 0.4;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * maxSpeed * depth,
          vy: (Math.random() - 0.5) * maxSpeed * depth,
          radius: (Math.random() * 2.5 + 1.5) * depth,
          col: pick(),
          depth,
          baseAlpha: Math.min(depth * 0.95, 1),
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const progress = 1 - dist / connectDist;
            const depthFactor = (a.depth + b.depth) / 2;
            const alpha = progress * progress * 0.7 * depthFactor;
            const { r, g, b: bl } = a.col;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = progress * 1.5 * depthFactor;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles + glow
      particles.forEach((p) => {
        const pulse = 0.85 + 0.15 * Math.sin(frame * 0.025 + p.pulseOffset);
        const r = p.radius * pulse;
        const alpha = p.baseAlpha * pulse;
        const { r: cr, g: cg, b: cb } = p.col;

        // Outer glow
        const grd = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          r * 5 * glowIntensity,
        );
        grd.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 5 * glowIntensity, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      });

      if (!prefersReduced) animId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);
    resize();
    init();

    if (prefersReduced) {
      // single frame
      draw();
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [particleCount, maxSpeed, connectDist, palette, glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
