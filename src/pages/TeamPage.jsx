import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { doctorInfo, teamMembers } from "../data/team";
import { medicalTeamHero } from "../data/assets";
import InsideCenter from "../components/sections/InsideCenter";
import InnerHero from "../components/layout/InnerHero";
import SectionHeader from "../components/ui/SectionHeader";

export default function TeamPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const half = Math.ceil(teamMembers.length / 2);
  const row1 = teamMembers.slice(0, half);
  const row2 = teamMembers.slice(half);

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar"
            ? "فريقنا الطبي - مركز ناصف"
            : "Medical Team - Nasif Center"}
        </title>
      </Helmet>

      {/* Premium Cinematic Hero — Medical Team */}
      <InnerHero
        variant="team"
        badge={
          lang === "ar" ? "خبرة طبية متميزة" : "Outstanding Medical Expertise"
        }
        title={lang === "ar" ? "فريقنا الطبي" : "Our Medical Team"}
        description={
          <p>
            {lang === "ar"
              ? "نضم في مركز ناصف نخبة من أفضل الأطباء والأخصائيين المعتمدين في مجالات العلاج الطبيعي والتأهيل، لنقدم لك رعاية صحية متكاملة بأسلوب إنساني واحترافي."
              : "At Nasif Center, we host an elite group of the best certified doctors and specialists in physical therapy and rehabilitation, to provide you with comprehensive healthcare in a human and professional manner."}
          </p>
        }
        image={medicalTeamHero}
        imageAlt={lang === "ar" ? "الفريق الطبي" : "Medical Team"}
        imageClass="aspect-[16/9] max-w-[420px]"
      />

      {/* Executive Doctor Spotlight */}
      <section className="section-padding bg-white dark:bg-dark-card relative overflow-hidden border-t border-neutral-100 dark:border-dark-border">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative px-4 lg:px-0 order-2 lg:order-none lg:col-span-5"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] max-w-[340px] mx-auto shadow-2xl border-8 border-neutral-50 dark:border-dark-surface bg-neutral-100 dark:bg-dark-bg">
                <img
                  src={teamMembers[0].image}
                  alt={doctorInfo.name[lang]}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[15px] text-neutral-900 dark:text-white">
                        {doctorInfo.title[lang]}
                      </h4>
                      <p className="font-body text-xs text-neutral-500 dark:text-dark-muted mt-1">
                        {doctorInfo.experience[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-none lg:col-span-7 lg:pl-8 rtl:lg:pr-8 rtl:lg:pl-0"
            >
              <h4 className="font-body font-bold text-primary-600 tracking-widest uppercase text-xs mb-3">
                {lang === "ar" ? "المدير الطبي" : "Medical Director"}
              </h4>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                {doctorInfo.name[lang]}
              </h2>
              <div className="font-body text-neutral-600 dark:text-dark-muted leading-relaxed text-[15px] mb-10 space-y-4 font-light">
                {doctorInfo.bio[lang].split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctorInfo.specializations[lang].map((spec, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-dark-surface border border-neutral-100 dark:border-dark-border hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 shadow-sm cursor-default relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-card shadow-sm border border-neutral-100 dark:border-white/5 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors duration-300 shrink-0 relative z-10">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="font-body font-medium text-neutral-700 dark:text-dark-text text-[13px] leading-tight relative z-10">
                      {spec}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Infinite Marquee Section */}
      {/*
        DESKTOP: الكروت تبدأ من أول الشاشة (لا padding/container)
                 hover يوقف + يسمح بسكرول يمين/شمال + يكمل من نفس المكان
        MOBILE:  لا ضباب على الأطراف + كل كارت يوصل المنتصف يوقف 500ms
                 الصفين يبدأوا مع بعض فوراً
      */}
      <section className="py-20 bg-neutral-50 dark:bg-dark-bg relative border-t border-neutral-100 dark:border-dark-border overflow-hidden">
        {/* Header — محاط بـ container عادي */}
        <div className="max-w-[80rem] mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle={lang === "ar" ? "فريقنا الطبي" : "Our Medical Team"}
            title={
              lang === "ar"
                ? "نخبة المتخصصين لرعايتك"
                : "Elite Specialists for Your Care"
            }
          />
        </div>

        {/* ─── DESKTOP: FM Animation Marquee — full-width, no container ─── */}
        <div className="hidden lg:flex flex-col gap-8 w-full mt-12">
          {/* ROW 1 — Left direction */}
          <DesktopMarqueeRow items={row1} lang={lang} direction="left" />

          {/* ROW 2 — Right direction */}
          {row2.length > 0 && (
            <DesktopMarqueeRow items={row2} lang={lang} direction="right" />
          )}
        </div>

        {/* ─── MOBILE: Auto-scrolling rows — no fog ─── */}
        <div className="lg:hidden flex flex-col gap-8 w-full mt-12">
          <MobileMarqueeRow items={row1} lang={lang} direction="left" />
          {row2.length > 0 && (
            <MobileMarqueeRow items={row2} lang={lang} direction="right" />
          )}
        </div>
      </section>

      <InsideCenter />
    </>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP MARQUEE ROW
   - Full width (no container constraint)
   - Hover: pause animation + enable free horizontal scroll
   - Resume from exact position after mouse leave
────────────────────────────────────────────── */
function DesktopMarqueeRow({ items, lang, direction }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const halfRef = useRef(0);
  const rafRef = useRef(null);

  const isClicked = useRef(false);
  const isDragging = useRef(false);
  const isWheeling = useRef(false);
  const wheelTimer = useRef(null);
  const lastClientX = useRef(0);
  const mouseDownX = useRef(0);
  const mouseDownY = useRef(0);

  const speed = direction === "left" ? -50 : 50; // px per second

  const wrapPos = useCallback(() => {
    const hw = halfRef.current;
    if (!hw) return;
    while (posRef.current < -hw) posRef.current += hw;
    while (posRef.current >= 0) posRef.current -= hw;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let lastTime = performance.now();
    const loop = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      const interacting =
        isClicked.current || isDragging.current || isWheeling.current;
      if (!interacting) {
        posRef.current += (speed * dt) / 1000;
        wrapPos();
      }

      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [speed, wrapPos]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    isClicked.current = true;
    lastClientX.current = e.clientX;
    mouseDownX.current = e.clientX;
    mouseDownY.current = e.clientY;
    e.preventDefault();
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

  const handleMouseUp = useCallback((e) => {
    isDragging.current = false;
    // If mouse didn't move much → it's a click → keep paused
    const dx = Math.abs(e.clientX - mouseDownX.current);
    const dy = Math.abs(e.clientY - mouseDownY.current);
    const isRealClick = dx < 5 && dy < 5;
    if (!isRealClick) {
      // Was a drag, resume immediately
      isClicked.current = false;
    }
    // If real click: stay paused until next mousedown anywhere outside
  }, []);

  // Release pause when user clicks anywhere outside the wrapper
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        isClicked.current = false;
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Wheel / Trackpad support
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const horizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
      if (!horizontal || Math.abs(e.deltaX) < 2) return;
      e.preventDefault();
      isWheeling.current = true;
      posRef.current -= e.deltaX * 1.2;
      wrapPos();
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

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden cursor-default select-none"
      dir="ltr"
      onMouseDown={handleMouseDown}
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={trackRef}
        style={{ willChange: "transform" }}
        className="flex w-max items-center gap-6 px-6"
      >
        {[...items, ...items].map((m, i) => (
          <div key={`desktop-${i}`} className="shrink-0">
            <TeamMemberCard member={m} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE MARQUEE ROW
   - No edge fog (gradients removed for mobile)
   - Cards start immediately on page load, both rows together
   - When any card reaches the horizontal center of the screen,
     BOTH rows pause for 500ms then resume
   - Manual touch drag still works and resumes after 1.5s
────────────────────────────────────────────── */

// Shared pause signal between the two mobile rows so they sync
const mobileRowPauseCallbacks = [];

function broadcastMobilePause(duration) {
  mobileRowPauseCallbacks.forEach((cb) => cb(duration));
}

function MobileMarqueeRow({ items, lang, direction }) {
  const scrollRef = useRef(null);
  const isSwiping = useRef(false);       // swipe جاري
  const isTapPaused = useRef(false);     // توقف بسبب tap
  const isProgrammaticScroll = useRef(false);
  const isPaused = useRef(false);        // broadcast pause
  const resumeTimer = useRef(null);
  const rafId = useRef(null);
  const lastTime = useRef(performance.now());
  const initialized = useRef(false);

  // تتبع نقطة بداية اللمس لتحديد tap vs swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const CARD_WIDTH = 280 + 16;
  const baseSpeed = direction === "left" ? 1.5 : -1.5;

  // broadcast pause من الصف الثاني
  useEffect(() => {
    const handler = (duration) => {
      isPaused.current = true;
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, duration);
    };
    mobileRowPauseCallbacks.push(handler);
    return () => {
      const idx = mobileRowPauseCallbacks.indexOf(handler);
      if (idx !== -1) mobileRowPauseCallbacks.splice(idx, 1);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const tripledWidth = items.length * CARD_WIDTH;

    if (!initialized.current) {
      container.scrollLeft = tripledWidth;
      initialized.current = true;
    }

    const screenMultiplier =
      window.innerWidth < 480 ? 0.7 : window.innerWidth < 768 ? 0.9 : 1;
    const adaptiveSpeed = baseSpeed * screenMultiplier;

    const step = (time) => {
      const delta = time - lastTime.current;
      lastTime.current = time;

      const paused = isSwiping.current || isTapPaused.current || isPaused.current;
      if (!paused && scrollRef.current) {
        const c = scrollRef.current;
        const move = adaptiveSpeed * (delta / 16.67);
        isProgrammaticScroll.current = true;
        c.scrollLeft += move;

        if (c.scrollLeft >= tripledWidth * 2) {
          c.scrollLeft -= tripledWidth;
        } else if (c.scrollLeft <= 0) {
          c.scrollLeft += tripledWidth;
        }
      }

      rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [items, direction, baseSpeed]);

  // Manual scroll (swipe detection via scroll event)
  const handleScroll = () => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
      return;
    }
    isSwiping.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isSwiping.current = false;
    }, 1500);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchMoved.current = false;
  };

  const handleTouchMove = () => {
    touchMoved.current = true;
  };

  const handleTouchEnd = (e) => {
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    const isRealTap = dx < 8 && dy < 8 && !touchMoved.current;

    if (isRealTap) {
      // Tap → toggle pause
      isTapPaused.current = !isTapPaused.current;
    }
    // Swipe → يكمل تلقائي بعد 1500ms عن طريق handleScroll
  };

  // لو tap خارج الصف → يكمل
  useEffect(() => {
    const onDocTouch = (e) => {
      if (scrollRef.current && !scrollRef.current.contains(e.target)) {
        isTapPaused.current = false;
      }
    };
    document.addEventListener("touchstart", onDocTouch);
    return () => document.removeEventListener("touchstart", onDocTouch);
  }, []);

  const tripled = [...items, ...items, ...items];

  return (
    <div
      ref={scrollRef}
      dir="ltr"
      className="flex overflow-x-auto hide-scrollbar gap-4 px-4 select-none touch-pan-x overscroll-x-contain relative z-10"
      style={{ willChange: "scroll-position" }}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {tripled.map((m, i) => (
        <div key={i} className="shrink-0" data-mobile-card>
          <TeamMemberCard member={m} lang={lang} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TEAM MEMBER CARD
────────────────────────────────────────────── */
function TeamMemberCard({ member, lang }) {
  const initials = member.name[lang]
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="w-[280px] h-[360px] rounded-[1.5rem] overflow-hidden flex flex-col group relative border border-neutral-200/60 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.03)] transition-all duration-700 bg-neutral-900 will-change-transform">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name[lang]}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-600 transition-transform duration-700 group-hover:scale-105 opacity-90">
            <span className="text-6xl font-display font-bold text-white/30">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-center z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

        <div className="relative flex flex-col items-center">
          <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-200 font-body backdrop-blur-sm">
            {member.category[lang]}
          </span>
          <h3 className="font-display font-bold text-[22px] text-white leading-tight mb-2 drop-shadow-lg">
            {member.name[lang]}
          </h3>
          <p className="font-body text-white/80 text-[13px] leading-relaxed font-light line-clamp-3">
            {member.specialty[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}