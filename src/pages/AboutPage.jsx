import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { aboutContent } from "../data/about";
import { clinicImages, videos } from "../data/assets";
import InnerHero from "../components/layout/InnerHero";
import PremiumCarousel from "../components/ui/PremiumCarousel";
import SectionHeader from "../components/ui/SectionHeader";

const therapyEquipmentPhotos = [
  "/assets/images/devices/ultrasoundtherapy.webp",
  "/assets/images/devices/laser.webp",
  "/assets/images/devices/laser_therapy.webp",
  "/assets/images/devices/traction.webp",
  "/assets/images/devices/Red (2).webp",
  "/assets/images/devices/shockwave.webp",
  "/assets/images/devices/magnet.webp",
  "/assets/images/devices/cold_hold.webp",
  "/assets/images/devices/lymphatic.webp",
];

const rehabEquipmentPhotos = [
  "/assets/images/devices/Whisen.webp",
  "/assets/images/devices/Stationary.webp",
  "/assets/images/devices/Multi.webp",
  "/assets/images/devices/Weights.webp",
  "/assets/images/devices/Resistance.webp",
  "/assets/images/devices/Stability.webp",
  "/assets/images/devices/Climber.webp",
  "/assets/images/devices/Stretching.webp",
  "/assets/images/devices/Functional.webp",
];

const parseEq = (text) => {
  const parts = text.split(" - ");
  return { title: parts[0], desc: parts[1] || "" };
};

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const galleryImages = Object.values(clinicImages);

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar" ? "من نحن - مركز ناصف" : "About Us - Nasif Center"}
        </title>
      </Helmet>

      {/* Premium Cinematic Hero — About Us */}
      <InnerHero
        variant="about"
        badge={lang === "ar" ? "نبذة عن المركز" : "About The Center"}
        title={t("about.title")}
        description={
          <div className="space-y-4">
            {aboutContent.intro[lang].split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        }
        image="/assets/images/clinic/Photo1.webp"
        imageAlt={
          lang === "ar"
            ? "مركز ناصف للعلاج الطبيعي"
            : "Nasif Rehabilitation Center"
        }
      />

      {/* Vision & Mission Side-by-Side Executive Layout */}
      <section className="section-padding bg-white dark:bg-dark-card border-y border-neutral-100 dark:border-dark-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 md:p-10 border-t-[3px] border-t-primary-500 flex flex-col h-full bg-neutral-50 dark:bg-dark-surface"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-bg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 border border-neutral-200 dark:border-dark-border shadow-sm">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {t("about.vision_title")}
              </h2>
              <p className="font-body text-[15px] text-neutral-600 dark:text-dark-muted leading-relaxed font-light">
                {aboutContent.vision[lang]}
              </p>
            </motion.div>

            {/* Mission Card - Fixed Contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-base p-8 md:p-10 border-t-[3px] border-t-accent-500 flex flex-col h-full bg-neutral-50 dark:bg-dark-surface"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-bg flex items-center justify-center text-accent-500 mb-6 border border-neutral-200 dark:border-dark-border shadow-sm">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {t("about.mission_title")}
              </h2>
              <div className="space-y-3">
                {aboutContent.mission[lang].split("\n\n").map((p, i, arr) => (
                  <p
                    key={i}
                    className={`font-body text-[15px] leading-relaxed ${i === arr.length - 1 ? "text-neutral-800 dark:text-dark-text font-medium mt-4" : "text-neutral-600 dark:text-dark-muted font-light"}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - High-End Floating Cards */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-bg overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader
            subtitle={lang === "ar" ? "مميزاتنا" : "Our Advantages"}
            title={t("about.why_choose")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutContent.whyChoose[lang].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group relative card-base p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-white/60 dark:bg-dark-card/60 flex flex-col items-center text-center"
              >
                {/* Smooth Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/5 dark:to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Icon System */}
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-dark-surface shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-neutral-100 dark:border-dark-border flex items-center justify-center mb-6 relative overflow-hidden group-hover:border-primary-200 dark:group-hover:border-primary-800 transition-colors duration-500">
                  <div className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="font-display font-bold text-xl text-primary-600 dark:text-primary-400 relative z-10">
                    0{i + 1}
                  </span>
                </div>

                <p className="font-body text-neutral-700 dark:text-dark-text text-[15px] leading-relaxed font-medium relative z-10">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapy Equipment - Horizontal Carousel */}
      <section className="py-16 bg-white dark:bg-dark-card border-t border-neutral-100 dark:border-dark-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle={lang === "ar" ? "أحدث التقنيات" : "Latest Technologies"}
            title={t("about.equipment_title")}
          />
        </div>
        <div className="w-full relative">
          <PremiumCarousel
            items={aboutContent.equipment.therapy}
            lang={lang}
            renderItem={(eq, i) => {
              const { title } = parseEq(eq[lang]);
              return (
                <div className="group/card relative h-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <img
                    src={
                      therapyEquipmentPhotos[i % therapyEquipmentPhotos.length]
                    }
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-end">
                    <span className="px-3 py-1 text-[10px] font-bold font-body rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 text-white">
                      {lang === "ar" ? "علاج طبيعي" : "Physical Therapy"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display font-bold text-lg text-white leading-tight drop-shadow-md text-center px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10">
                      {title}
                    </h3>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* Rehab Equipment - Horizontal Carousel */}
      <section className="py-16 bg-neutral-50 dark:bg-dark-bg border-t border-neutral-100 dark:border-dark-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle={lang === "ar" ? "برامج متخصصة" : "Specialized Programs"}
            title={t("about.rehab_equipment")}
          />
        </div>
        <div className="w-full relative">
          <PremiumCarousel
            items={aboutContent.equipment.rehab}
            lang={lang}
            renderItem={(eq, i) => {
              const { title, desc } = parseEq(eq[lang]);
              return (
                <div className="group/card relative h-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <img
                    src={rehabEquipmentPhotos[i % rehabEquipmentPhotos.length]}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-end">
                    <span className="px-3 py-1 text-[10px] font-bold font-body rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 text-white">
                      {lang === "ar" ? "تأهيل حركي" : "Rehabilitation"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display font-bold text-lg text-white leading-tight drop-shadow-md text-center px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 mb-2">
                      {title}
                    </h3>
                    {desc && (
                      <p className="font-body text-white/80 text-xs leading-relaxed font-light opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 line-clamp-2 text-center">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* Center Photos - Enhanced Gallery */}
      <section className="section-padding bg-white dark:bg-dark-card border-t border-neutral-100 dark:border-dark-border">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle={lang === "ar" ? "جولة في المركز" : "Center Tour"}
            title={lang === "ar" ? "صور المركز" : "Center Photos"}
          />
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 dark:border-dark-border"
              >
                <img
                  src={img}
                  alt={`Center view ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Global Video Cards Upgrade — Asymmetric Cinematic Layout */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-dark-bg border-t border-neutral-100 dark:border-dark-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">
            {/* Video 1: Clinic Tour (Landscape / Balanced) */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-neutral-200/50 dark:border-white/5 bg-white dark:bg-dark-card hover:-translate-y-1 transition-transform duration-500 p-2 sm:p-3"
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-black relative border border-white/10 dark:border-white/5 shadow-inner aspect-video">
                <video
                  controls
                  preload="none"
                  poster="/assets/images/clinic/Photo6.webp"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src={videos.clinic} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>

              <div className="mt-5 text-center px-4 mb-2">
                <h3 className="font-display font-bold text-lg lg:text-xl text-neutral-900 dark:text-white mb-1">
                  {lang === "ar"
                    ? "جولة تعريفية داخل المركز"
                    : "Center Explanatory Tour"}
                </h3>
                <p className="font-body text-[13px] text-neutral-500 dark:text-dark-muted">
                  {lang === "ar"
                    ? "تعرف على بيئة الرعاية التي نقدمها عن قرب"
                    : "Get to know our care environment up close"}
                </p>
              </div>
            </motion.div>

            {/* Video 2: Center Highlight (Portrait / Vertical Fit) */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-neutral-200/50 dark:border-white/5 bg-white dark:bg-dark-card hover:-translate-y-1 transition-transform duration-500 p-2 sm:p-3 max-w-[340px] mx-auto lg:max-w-none w-full"
            >
              {/* Aspect Ratio adjusted for Portrait Video (4/5 for premium cinematic vertical look) */}
              <div className="rounded-[1.5rem] overflow-hidden bg-black relative border border-white/10 dark:border-white/5 shadow-inner aspect-[4/5]">
                <video
                  controls
                  preload="none"
                  poster="/assets/images/clinic/Photo6.webp"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ objectPosition: "center top" }}
                >
                  <source src={videos.highlight} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>

              <div className="mt-5 text-center px-4 mb-2">
                <h3 className="font-display font-bold text-lg lg:text-xl text-neutral-900 dark:text-white mb-1">
                  {lang === "ar"
                    ? "مميزات وخدمات المركز"
                    : "Center Highlights & Services"}
                </h3>
                <p className="font-body text-[13px] text-neutral-500 dark:text-dark-muted">
                  {lang === "ar"
                    ? "نسعى دائماً لتقديم أفضل الخدمات الطبية"
                    : "Always striving to provide the best medical services"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
