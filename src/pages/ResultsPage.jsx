import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { testimonials } from "../data/testimonials";
import { beforeAfterImages, clinicImages, videos } from "../data/assets";
import InnerHero from "../components/layout/InnerHero";
import SectionHeader from "../components/ui/SectionHeader";

// Showing exactly 2 videos for the side-by-side premium layout
const resultVideos = [
  {
    src: videos.beforeAfter,
    poster: "/assets/images/clinic/Photo6.webp",
    title: { ar: "نتائج التأهيل الحركي", en: "Motor Rehabilitation Results" },
  },
  {
    src: "/assets/videos/vid2.MP4",
    poster: "/assets/images/clinic/Photo6.webp",
    title: { ar: "رحلة التعافي بالمركز", en: "Recovery Journey at the Center" },
  },
];

export default function ResultsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const stats = [
    { num: "10+", label: lang === "ar" ? "سنوات خبرة" : "Years Experience" },
    { num: "500+", label: lang === "ar" ? "حالة تم علاجها" : "Cases Treated" },
    {
      num: "98%",
      label: lang === "ar" ? "نسبة رضا المرضى" : "Patient Satisfaction",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar" ? "نتائجنا - مركز ناصف" : "Our Results - Nasif Center"}
        </title>
      </Helmet>

      {/* Premium Cinematic Hero — Results */}
      <InnerHero
        variant="results"
        badge={
          lang === "ar" ? "قصص نجاح وإنجازات" : "Success Stories & Achievements"
        }
        title={t("results.title")}
        description={
          <p>
            {lang === "ar"
              ? "نفخر في مركز ناصف بالنتائج الاستثنائية التي يحققها مرضانا. بفضل خطط العلاج المخصصة وأحدث تقنيات التأهيل، نساعدك على استعادة عافيتك والعودة لممارسة حياتك الطبيعية بأعلى مستويات الجودة والأمان."
              : "At Nasif Center, we are proud of the exceptional results achieved by our patients. Through customized treatment plans and the latest rehabilitation technologies, we help you regain your well-being and return to your normal life with the highest levels of quality and safety."}
          </p>
        }
        image="/assets/images/clinic/Photo3.webp"
        imageAlt={lang === "ar" ? "تعافي المريض" : "Patient Recovery"}
      />

      {/* Infinite Moving Stats Bar */}
      <section className="relative z-20 py-6 bg-white/60 dark:bg-dark-card/60 backdrop-blur-2xl border-y border-neutral-200/50 dark:border-white/10 overflow-hidden flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        {/* Soft Lighting Gradient Overlays for edges (Fade out effect) */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-dark-bg to-transparent z-10 pointer-events-none" />

        {/* Ambient Glow behind the bar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-gradient-to-r from-primary-400/0 via-primary-400/5 to-primary-400/0 dark:from-primary-900/0 dark:via-primary-900/20 dark:to-primary-900/0 blur-2xl pointer-events-none" />

        <div className="w-full flex overflow-hidden" dir="ltr">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            className="flex w-max items-center"
          >
            {[...Array(2)].map((_, setIdx) => (
              <div
                key={setIdx}
                className="flex items-center gap-64 md:gap-96 px-4 md:px-8"
              >
                {[...stats, ...stats, ...stats].map((stat, i) => (
                  <div
                    key={`${setIdx}-${i}`}
                    className="flex items-center gap-4 shrink-0 group flex-row"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] relative">
                      <div className="absolute inset-0 rounded-full bg-accent-400 animate-ping opacity-40" />
                    </div>
                    <div className="flex items-baseline gap-3 flex-row whitespace-nowrap">
                      <span className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white drop-shadow-md group-hover:text-primary-500 transition-colors duration-500">
                        {stat.num}
                      </span>
                      <span className="text-neutral-500 dark:text-dark-muted font-body font-semibold uppercase tracking-widest text-[11px] md:text-[13px]">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before / After Images */}
      <section className="section-padding bg-white dark:bg-dark-card border-b border-neutral-100 dark:border-dark-border">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle={lang === "ar" ? "رحلة التعافي" : "Recovery Journey"}
            title={t("results.subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-2 sm:p-3 overflow-hidden group hover:-translate-y-1 transition-transform duration-500 bg-neutral-50 dark:bg-dark-surface"
              >
                <div className="relative rounded-[1.25rem] h-64 w-full overflow-hidden border border-neutral-200/50 dark:border-white/5">
                  <img
                    src={img}
                    alt={`Treatment result ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="absolute top-4 left-0 right-0 px-4 pointer-events-none">
                    {/* After Label (Physical Left Side) */}
                    <span className="absolute left-4 top-0 inline-block px-4 py-1.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md text-green-600 dark:text-green-400 text-[11px] font-bold font-body rounded-full shadow-sm border border-green-100 dark:border-green-900/30 tracking-wide pointer-events-auto">
                      {t("results.after")}
                    </span>

                    {/* Before Label (Physical Right Side) */}
                    <span className="absolute right-4 top-0 inline-block px-4 py-1.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md text-red-600 dark:text-red-400 text-[11px] font-bold font-body rounded-full shadow-sm border border-red-100 dark:border-red-900/30 tracking-wide pointer-events-auto">
                      {t("results.before")}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center bg-transparent">
                  <p className="font-display text-neutral-800 dark:text-white font-bold text-[17px] mb-1">
                    {i === 2
                      ? lang === "ar"
                        ? "حالة خضعت للعلاج الطبيعي"
                        : "Physical therapy case"
                      : lang === "ar"
                        ? "حالة خضعت للتغذية العلاجية"
                        : "Case underwent therapeutic nutrition"}
                  </p>
                  <p className="font-body text-[13px] text-neutral-500 dark:text-dark-muted font-light">
                    {lang === "ar"
                      ? "برنامج تأهيلي مكثف"
                      : "Intensive rehabilitation program"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Videos - Premium Side-by-Side Modern Redesign */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-bg border-b border-neutral-100 dark:border-dark-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle={lang === "ar" ? "شاهد التعافي" : "Watch Recovery"}
            title={lang === "ar" ? "فيديوهات النتائج" : "Results Videos"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start justify-center">
            {resultVideos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative w-full flex flex-col"
              >
                {/* Global Premium Video Container */}
                <div className="rounded-[2rem] p-2 sm:p-3 bg-white dark:bg-dark-card border border-neutral-200/60 dark:border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500 relative z-10">
                  <div className="rounded-[1.5rem] overflow-hidden bg-black relative border border-white/10 dark:border-white/5 shadow-inner aspect-video">
                    <video
                      controls
                      preload="none"
                      poster={video.poster}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    {/* Subtle glass overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Title Below Video */}
                <div className="mt-6 text-center px-4">
                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {video.title[lang]}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle={
              lang === "ar" ? "ماذا يقولون عنا" : "What They Say About Us"
            }
            title={t("testimonials.title")}
            description={t("testimonials.subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <motion.div
                key={tm.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-5 md:p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 bg-white/60 dark:bg-dark-card/60 backdrop-blur-xl border border-neutral-200/50 dark:border-white/5"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-2xl group-hover:bg-primary-200/50 dark:group-hover:bg-primary-900/20 transition-colors pointer-events-none" />
                <div className="absolute top-6 rtl:left-6 ltr:right-6 text-6xl leading-none font-serif text-primary-200/50 dark:text-white/5 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  "
                </div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(tm.rating)].map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 text-accent-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="font-body text-[15px] text-neutral-600 dark:text-dark-text leading-relaxed mb-8 font-light italic">
                    "{tm.text[lang]}"
                  </p>

                  {/* Source */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white dark:bg-dark-bg flex items-center justify-center shrink-0 border border-neutral-200 dark:border-dark-border text-primary-600 dark:text-primary-400 shadow-sm">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display font-bold text-[15px] text-neutral-900 dark:text-white mb-0.5">
                        {lang === "ar" ? "مريض بالمركز" : "Center Patient"}
                      </div>
                      <div className="font-body text-primary-600 dark:text-primary-400 font-medium text-[11px] uppercase tracking-wider">
                        {tm.source[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
