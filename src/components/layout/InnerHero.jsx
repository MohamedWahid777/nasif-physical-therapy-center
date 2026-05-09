import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import InnerNetworkBG from "../InnerNetworkBG";

/**
 * Per-page network configuration — keeps all heroes unified
 * while giving each page a unique subtle identity.
 */
const VARIANT_CONFIG = {
  about: {
    particleCount: 85,
    maxSpeed: 0.4,
    connectDist: 190,
    glowIntensity: 1.1,
    palette: [
      { r: 56, g: 189, b: 248 },
      { r: 147, g: 197, b: 253 },
      { r: 96, g: 165, b: 250 },
      { r: 255, g: 255, b: 255 },
    ],
  },
  services: {
    particleCount: 95,
    maxSpeed: 0.45,
    connectDist: 170,
    glowIntensity: 0.9,
    palette: [
      { r: 14, g: 165, b: 233 },
      { r: 56, g: 189, b: 248 },
      { r: 6, g: 182, b: 212 },
      { r: 255, g: 255, b: 255 },
    ],
  },
  team: {
    particleCount: 90,
    maxSpeed: 0.45,
    connectDist: 200,
    glowIntensity: 1.2,
    palette: [
      { r: 147, g: 197, b: 253 },
      { r: 96, g: 165, b: 250 },
      { r: 56, g: 189, b: 248 },
      { r: 255, g: 255, b: 255 },
    ],
  },
  results: {
    particleCount: 85,
    maxSpeed: 0.5,
    connectDist: 175,
    glowIntensity: 1.0,
    palette: [
      { r: 56, g: 189, b: 248 },
      { r: 125, g: 211, b: 252 },
      { r: 6, g: 182, b: 212 },
      { r: 255, g: 255, b: 255 },
    ],
  },
  contact: {
    particleCount: 80,
    maxSpeed: 0.35,
    connectDist: 200,
    glowIntensity: 1.0,
    palette: [
      { r: 96, g: 165, b: 250 },
      { r: 147, g: 197, b: 253 },
      { r: 56, g: 189, b: 248 },
      { r: 255, g: 255, b: 255 },
    ],
  },
};

export default function InnerHero({
  variant = "about",
  badge,
  title,
  description,
  image,
  imageAlt = "",
  imageClass = "aspect-[4/5] max-w-[420px]",
  minHeight = "min-h-[60vh]",
  children,
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG.about;

  return (
    <section
      className={`relative ${minHeight} flex items-center justify-center pt-28 pb-16 overflow-hidden bg-neutral-900`}
    >
      {/* Animated Network Background — same system as Home hero */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-neutral-950">
        <InnerNetworkBG
          particleCount={cfg.particleCount}
          maxSpeed={cfg.maxSpeed}
          connectDist={cfg.connectDist}
          palette={cfg.palette}
          glowIntensity={cfg.glowIntensity}
        />
        {/* Gradient overlay matching Home hero exactly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950/80 pointer-events-none" />
      </div>

      {/* Foreground content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Text Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-start"
          >
            {/* Badge — identical to Home hero badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <span className="font-body text-[11px] font-semibold text-white/90 tracking-widest uppercase">
                  {badge}
                </span>
              </div>
            )}

            {/* Heading — matches Home gradient style */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-display font-bold text-white leading-[1.15] mb-5 tracking-tight drop-shadow-sm">
              {title}
            </h1>

            {/* Description */}
            <div className="relative mb-8">
              <div className="absolute top-1 rtl:-right-4 ltr:-left-4 w-1 h-[calc(100%-8px)] bg-gradient-to-b from-accent-400/60 to-transparent rounded-full opacity-70 hidden md:block" />

              <div className="font-body text-white/70 text-[15px] md:text-base leading-relaxed space-y-5 font-light md:rtl:pr-5 md:ltr:pl-5 max-w-md mx-auto lg:mx-0">
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            </div>

            {/* Optional extra content (CTAs, etc.) */}
            {children}
          </motion.div>

          {/* ── Image Column ── */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: lang === "ar" ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative w-full mt-10 lg:mt-0"
            >
              <div
                className={`relative z-10 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 ${imageClass} mx-auto lg:mx-0 lg:ml-auto rtl:lg:ml-0 rtl:lg:mr-auto`}
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover opacity-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
