import { motion } from "framer-motion";

export default function SectionHeader({
  subtitle,
  title,
  description,
  className = "",
  titleClass = "",
}) {
  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const dividerVars = {
    hidden: { width: 0, opacity: 0 },
    show: {
      width: "60px",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-col items-center justify-center text-center mx-auto w-full max-w-3xl mb-12 md:mb-16 ${className}`}
    >
      {/* Subtitle */}
      {subtitle && (
        <motion.h4
          variants={itemVars}
          className="font-body font-bold text-primary-600 dark:text-primary-400 tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 md:mb-4"
        >
          {subtitle}
        </motion.h4>
      )}

      {/* Main Title */}
      <motion.h2
        variants={itemVars}
        className={`section-title mb-5 md:mb-6 ${titleClass}`}
      >
        {title}
      </motion.h2>

      {/* Luxury Divider */}
      <motion.div
        variants={dividerVars}
        className="h-[3px] bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full mb-6"
      />

      {/* Optional Description */}
      {description && (
        <motion.p
          variants={itemVars}
          className="font-body text-neutral-600 dark:text-neutral-400 text-sm md:text-[15px] leading-relaxed max-w-2xl px-4"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
