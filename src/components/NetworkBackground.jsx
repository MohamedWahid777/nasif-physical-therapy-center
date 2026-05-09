import React, { useRef, useEffect } from "react";

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    // ── Config ──────────────────────────────────────────────
    const PARTICLE_COUNT = 120;
    const CONNECTION_DIST = 200;
    const MOUSE_REPEL_DIST = 130;
    const MOUSE_REPEL_STR = 2.5;
    const MAX_SPEED = 0.55;
    const COLOR_PALETTE = [
      { r: 56, g: 189, b: 248 }, // sky-400
      { r: 6, g: 182, b: 212 }, // cyan-500
      { r: 147, g: 197, b: 253 }, // blue-300
      { r: 255, g: 255, b: 255 }, // white
    ];
    // ────────────────────────────────────────────────────────

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const randColor = () =>
      COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const depth = Math.random() * 0.8 + 0.4; // 0.4 – 1.2
        const col = randColor();
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * MAX_SPEED * depth,
          vy: (Math.random() - 0.5) * MAX_SPEED * depth,
          radius: (Math.random() * 2.5 + 1.5) * depth, // 1.5 – 4.8 px
          col,
          depth,
          baseAlpha: Math.min(depth * 0.9, 1),
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    // Mouse move
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Update positions ──
      particles.forEach((p) => {
        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_DIST && dist > 0) {
            const force =
              ((MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST) * MOUSE_REPEL_STR;
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          }
        }

        // Damping so speed doesn't explode
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED * p.depth * 2) {
          p.vx = (p.vx / speed) * MAX_SPEED * p.depth * 2;
          p.vy = (p.vy / speed) * MAX_SPEED * p.depth * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap-around edges (seamless)
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      // ── Draw connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const progress = 1 - dist / CONNECTION_DIST;
            const depthFactor = (a.depth + b.depth) / 2;
            // opacity: 0.12 at far edge → 0.65 at close range
            const alpha = progress * progress * 0.65 * depthFactor;

            const { r, g, b: bl } = a.col;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = progress * 1.4 * depthFactor;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Draw particles ──
      particles.forEach((p) => {
        // Subtle pulse
        const pulse = 0.85 + 0.15 * Math.sin(frame * 0.025 + p.pulseOffset);
        const r = p.radius * pulse;
        const alpha = p.baseAlpha * pulse;

        const { r: cr, g: cg, b: cb } = p.col;

        // Outer glow (soft, wide)
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
        glow.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
        glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });

    resizeCanvas();
    initParticles();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9, pointerEvents: "auto" }}
    />
  );
};

export default NetworkBackground;
