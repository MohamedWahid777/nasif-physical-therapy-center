import { useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// ─── Image list (10 photos) ────────────────────────────────────────────────────
const images = Array.from(
  { length: 10 },
  (_, i) => `/assets/images/PhotoTeams/photo${i + 1}.webp.jpg`,
);

// ─── Doubled for seamless looping: wrap at halfWidth ─────────────────────────
const doubled = [...images, ...images];

// ─── Auto-scroll speed ────────────────────────────────────────────────────────
const AUTO_SPEED_PX_S = 65; // pixels per second

// ─────────────────────────────────────────────────────────────────────────────
//  InsideCenter — RAF-driven infinite marquee
//
//  Core design:
//    • posRef    = raw pixel offset (always negative, wraps at -halfWidth)
//    • One RAF loop runs forever and owns applyTransform
//    • Auto-scroll only happens when no interaction is active
//    • Drag/wheel/touch mutate posRef directly — RAF picks it up next frame
//    • Wrap math keeps posRef in [-halfWidth, 0) at all times (true infinite)
//
//  Why RAF instead of Framer Motion animate():
//    • FM animate() works in percentage-space → can't do true infinite drag
//    • FM pause/resume requires stop+restart → causes micro-jitter on resume
//    • RAF owns the single source of truth (posRef) → zero fighting
// ─────────────────────────────────────────────────────────────────────────────
export default function InsideCenter() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);

  // ── Single source of truth: pixel position ────────────────────────────────
  const posRef = useRef(0); // current translateX in px  (0 → -halfWidth)
  const halfRef = useRef(0); // = track.scrollWidth / 2 (one full set width)

  // ── Interaction flags (all refs — zero re-renders) ────────────────────────
  const isHovered = useRef(false); // desktop hover
  const isDragging = useRef(false); // mouse or touch drag
  const isWheeling = useRef(false); // trackpad / mouse wheel
  const wheelTimer = useRef(null);

  // ── Drag tracking ─────────────────────────────────────────────────────────
  const lastClientX = useRef(0);

  // ── Touch tracking ────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchClaimed = useRef(false);
  const lastTouchX = useRef(0);

  // ─────────────────────────────────────────────────────────────────────────
  //  Wrap helper — keeps posRef in [-halfWidth, 0)
  //  Uses while loops so it handles multi-wrap from fast wheel/drag too.
  // ─────────────────────────────────────────────────────────────────────────
  const wrapPos = useCallback(() => {
    const hw = halfRef.current;
    if (!hw) return;
    // Scrolled past the seam → jump back
    while (posRef.current < -hw) posRef.current += hw;
    // Dragged backward past 0 → jump to equivalent point in second set
    while (posRef.current >= 0) posRef.current -= hw;
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  //  RAF loop — the single place that writes style.transform
  //  Only auto-advances position when not interacting.
  //  Runs forever from mount to unmount.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure half-width after layout and on resize
    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let lastTime = performance.now();

    const loop = (now) => {
      // Cap delta at 50ms so tab-switch / long pause doesn't cause a lurch
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Only auto-scroll when no interaction is active
      const interacting =
        isHovered.current || isDragging.current || isWheeling.current;
      if (!interacting) {
        posRef.current -= (AUTO_SPEED_PX_S * dt) / 1000;
        wrapPos();
      }

      // Write transform — this is the ONLY place we touch the DOM
      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [wrapPos]);

  // ─────────────────────────────────────────────────────────────────────────
  //  DESKTOP: Hover — pause / resume auto-scroll
  //  No click needed — just entering the wrapper pauses.
  // ─────────────────────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    isHovered.current = true;
  };
  const handleMouseLeave = () => {
    isHovered.current = false;
    isDragging.current = false; // safety: clear drag if mouse leaves mid-drag
  };

  // ─────────────────────────────────────────────────────────────────────────
  //  DESKTOP: Mouse drag
  //  Delta-based: each move adds the raw pixel delta to posRef.
  //  No snapshot needed — accumulates naturally, wraps infinitely.
  // ─────────────────────────────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastClientX.current = e.clientX;
    e.preventDefault(); // prevent text selection
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const delta = e.clientX - lastClientX.current;
      lastClientX.current = e.clientX;
      posRef.current += delta;
      wrapPos();
    },
    [wrapPos],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Global listeners so drag works even when cursor leaves the wrapper
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // ─────────────────────────────────────────────────────────────────────────
  //  DESKTOP: Mouse wheel / trackpad horizontal scroll
  //  Attaches non-passive wheel listener directly to the wrapper element.
  //  Only reacts to predominantly horizontal deltaX.
  //  Auto-scroll resumes 150ms after wheel activity stops.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Only handle if deltaX dominates (trackpad horizontal / horizontal wheel)
      const horizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
      if (!horizontal || Math.abs(e.deltaX) < 2) return;

      e.preventDefault();
      isWheeling.current = true;

      posRef.current -= e.deltaX * 1.2;
      wrapPos();

      // Reset the wheeling flag 150ms after last wheel event
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        isWheeling.current = false;
      }, 150);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimer.current);
    };
  }, [wrapPos]);

  // ─────────────────────────────────────────────────────────────────────────
  //  MOBILE: Touch drag (non-passive touchmove for preventDefault to work)
  //  Direction detection decides ownership:
  //    abs(dy) >= abs(dx)  → vertical gesture → page scrolls normally
  //    abs(dx)  > abs(dy)  → horizontal gesture → gallery drags, scroll blocked
  //  Delta-based (same as mouse) → true infinite, no clamping.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      const t0 = e.touches[0];
      touchStartX.current = t0.clientX;
      touchStartY.current = t0.clientY;
      lastTouchX.current = t0.clientX;
      touchClaimed.current = false;
    };

    const onTouchMove = (e) => {
      const t0 = e.touches[0];
      const dx = t0.clientX - touchStartX.current;
      const dy = t0.clientY - touchStartY.current;

      // Direction decision on first significant movement
      if (!touchClaimed.current) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return; // not moved enough yet
        if (Math.abs(dy) >= Math.abs(dx)) return; // vertical — leave it alone
        // Horizontal dominant: claim it
        touchClaimed.current = true;
        isDragging.current = true;
        lastTouchX.current = t0.clientX; // reset delta base
      }

      // Block page scroll for our claimed gesture
      e.preventDefault();

      const delta = t0.clientX - lastTouchX.current;
      lastTouchX.current = t0.clientX;
      posRef.current += delta;
      wrapPos();
    };

    const onTouchEnd = () => {
      if (touchClaimed.current) {
        touchClaimed.current = false;
        isDragging.current = false;
        // Auto-scroll resumes automatically — RAF sees isDragging = false
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [wrapPos]);

  // ─────────────────────────────────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section className="py-20 bg-white dark:bg-dark-card border-t border-neutral-100 dark:border-dark-border overflow-hidden">
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body font-bold text-primary-600 dark:text-primary-400 tracking-widest uppercase text-[11px] mb-3"
        >
          {t("team.inside_center.title")}
        </motion.h4>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white"
        >
          {t("team.inside_center.subtitle")}
        </motion.h2>
      </div>

      {/* ── Marquee Wrapper ────────────────────────────────────────────────── */}
      {/*
          dir="ltr" — pixel delta math is always left-to-right,
                      regardless of RTL page language.
          overflow-hidden — clips the doubled track
          cursor-grab — signals draggability
          touchAction pan-y default — overridden per-gesture by non-passive listener
      */}
      <div
        ref={wrapperRef}
        dir="ltr"
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{ touchAction: "pan-y" }}
      >
        {/*
            Plain <div> (not motion.div) — transform is written directly by RAF.
            willChange: transform  hints the browser to promote to its own GPU layer.
        */}
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-5 w-max"
          style={{ willChange: "transform" }}
        >
          {doubled.map((img, i) => (
            <GalleryCard key={i} src={img} index={i % images.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  GalleryCard — portrait proportions with background-blur fill
//
//  Smart image fit strategy (unchanged from previous iteration):
//    Layer 1 — blurred + scaled copy fills every pixel of the card
//    Layer 2 — real image with object-contain (fully visible, no cropping)
//    Layer 3 — depth gradient on hover
//    Layer 4 — subtle colour tint on hover
// ─────────────────────────────────────────────────────────────────────────────
function GalleryCard({ src, index }) {
  return (
    <div className="relative shrink-0 w-52 md:w-64 rounded-2xl overflow-hidden group shadow-sm border border-neutral-200/60 dark:border-white/5 bg-neutral-900 dark:bg-dark-surface aspect-[3/4]">
      {/* Layer 1: Blurred fill — hides empty space for any image shape */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50 dark:opacity-35 pointer-events-none select-none"
      />

      {/* Layer 2: Main image — fully visible, no crop */}
      <img
        src={src}
        alt={`Inside Center ${index + 1}`}
        loading="lazy"
        draggable="false"
        className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-700 ease-out group-hover:scale-[1.04] select-none"
      />

      {/* Layer 3: Depth gradient on hover */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Layer 4: Premium colour tint on hover */}
      <div className="absolute inset-0 z-20 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
