import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { services } from "../data/services";
import InnerHero from "../components/layout/InnerHero";
import PremiumCarousel from "../components/ui/PremiumCarousel";
import SectionHeader from "../components/ui/SectionHeader";

// Services Images

const getCategoryImageUrl = (id) => {
  return `/assets/images/services/photo${id}.webp`;
};
// Extra sentence per service (Arabic + English)
const extraSentence = {
  1: {
    ar: "فريقنا متخصص في استعادة حركتك الكاملة.",
    en: "Our team specializes in fully restoring your mobility.",
  },
  2: {
    ar: "نعمل على تحسين حياتك من خلال برامج تأهيل  متكاملة.",
    en: "We work to improve your quality of life through comprehensive rehabilitation programs.",
  },
  3: {
    ar: "نوفر بيئة علاجية آمنة وممتعة تدعم نمو طفلك الحركي والمعرفي.",
    en: "We provide a safe and engaging therapeutic environment that supports your child's motor and cognitive growth.",
  },
  4: {
    ar: "نساعد كبار السن على العيش بشكل مستقل وآمن .",
    en: "We help seniors live independently and safely.",
  },
  5: {
    ar: "نضمن لك تعافياً سريعاً وآمناً للعودة لممارسة حياتك الطبيعية.",
    en: "We ensure a fast and safe recovery so you can return to your normal life activities.",
  },
  6: {
    ar: "نضع أهدافك الرياضية نصب أعيننا لنعيدك إلى الملعب بكامل قوتك.",
    en: "We keep your athletic goals in mind to get you back on the field at full strength.",
  },
  7: {
    ar: "برامجنا تجمع بين العلاج اليدوي والتمارين لتصحيح القوام وتقليل الألم.",
    en: "Our programs combine manual therapy and exercise to correct posture and reduce pain.",
  },
  8: {
    ar: "نهتم بصحة قلبك وجهازك التنفسي لضمان حياة نشطة وطويلة.",
    en: "We care for your heart and respiratory system to ensure an active and long life.",
  },
  9: {
    ar: "نستخدم أحدث تقنيات تأهيل الجلد لاستعادة الوظيفة والمظهر الطبيعي.",
    en: "We use the latest skin rehabilitation techniques to restore natural function and appearance.",
  },
  10: {
    ar: "خططنا الغذائية مصممة لتسريع الشفاء وتعزيز نتائج العلاج الطبيعي.",
    en: "Our dietary plans are designed to accelerate healing and enhance physical therapy outcomes.",
  },
  11: {
    ar: "تقنياتنا اليدوية المتخصصة تُعيد المرونة وتُخفف الألم بشكل فعّال وسريع.",
    en: "Our specialized manual techniques effectively and quickly restore flexibility and relieve pain.",
  },
  12: {
    ar: "برامجنا التمرينية المخصصة تبني القوة وتمنع تكرار الإصابة.",
    en: "Our customized exercise programs build strength and prevent injury recurrence.",
  },
  13: {
    ar: "نقدم رعاية شاملة ومتخصصة لدعم صحة المرأة في كل مراحل حياتها.",
    en: "We provide comprehensive, specialized care to support women's health at every stage of life.",
  },
  14: {
    ar: "العلاج المائي يُوفر بيئة مثالية للتعافي بأقل ضغط على المفاصل.",
    en: "Aquatic therapy provides an ideal recovery environment with minimal stress on the joints.",
  },
  15: {
    ar: "معالجونا المتخصصون يُساعدون في تحسين التواصل والتعبير لدى جميع الأعمار.",
    en: "Our specialized therapists help improve communication and expression for all age groups.",
  },
  16: {
    ar: "نبني مهارات طفلك الحركية والإدراكية بأساليب علمية وممتعة.",
    en: "We build your child's motor and cognitive skills using scientific and engaging methods.",
  },
  17: {
    ar: "هدفنا هو مساعدتك على العودة لممارسة أنشطتك اليومية باستقلالية تامة.",
    en: "Our goal is to help you return to daily activities with complete independence.",
  },
  18: {
    ar: "نوفر بيئة داعمة وآمنة لمساعدتك في تحقيق التوازن النفسي والسلوكي.",
    en: "We provide a supportive and safe environment to help you achieve psychological and behavioral balance.",
  },
  19: {
    ar: "برامجنا الحسية تُحسّن تركيز طفلك وقدرته على التعامل مع البيئة المحيطة.",
    en: "Our sensory programs improve your child's focus and ability to interact with the surrounding environment.",
  },
  20: {
    ar: "ندمج الجانبين الحسي والحركي لتحقيق نتائج تأهيلية متكاملة وفعّالة.",
    en: "We integrate sensory and motor aspects for comprehensive and effective rehabilitation outcomes.",
  },
};

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const half = Math.ceil(services.length / 2);
  const row1 = services.slice(0, half);
  const row2 = services.slice(half);

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar"
            ? "خدماتنا - مركز ناصف"
            : "Our Services - Nasif Center"}
        </title>
      </Helmet>

      {/* Premium Cinematic Hero — Services */}
      <InnerHero
        variant="services"
        badge={
          lang === "ar"
            ? "برامج التأهيل المتخصصة"
            : "Specialized Rehabilitation"
        }
        title={lang === "ar" ? "خدماتنا" : "Our Services"}
        description={
          <p>
            {lang === "ar"
              ? "نقدم مجموعة متكاملة من خدمات العلاج الطبيعي والتأهيل باستخدام أحدث التقنيات الطبية. صُممت برامجنا خصيصاً لتلبية احتياجات كل مريض لضمان استعادة كامل قدراته الحركية والوظيفية بأعلى معايير الجودة والاحترافية."
              : "We offer a comprehensive range of physical therapy and rehabilitation services using the latest medical technologies. Our programs are tailored to meet each patient's needs, ensuring full restoration of motor and functional abilities at the highest standards of quality."}
          </p>
        }
        image="/assets/images/clinic/Photo2.webp"
        imageAlt={lang === "ar" ? "خدمات التأهيل" : "Rehabilitation Services"}
        imageClass="aspect-[4/3] max-w-[480px]"
      />

      {/* Interactive Services Scroll Area */}
      <section className="py-20 bg-white dark:bg-dark-card relative border-t border-neutral-100 dark:border-dark-border min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative z-10">
          <SectionHeader
            subtitle={
              lang === "ar" ? "حلولنا العلاجية" : "Our Therapeutic Solutions"
            }
            title={lang === "ar" ? "تصفح تخصصاتنا" : "Browse Our Specialties"}
          />
        </div>

        {/* Row 1 */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 w-full">
          <ServiceRow services={row1} lang={lang} rowId="row1" />
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 w-full">
          <ServiceRow services={row2} lang={lang} rowId="row2" />
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   SERVICE ROW
   Unified via PremiumCarousel for exact About Page parity
────────────────────────────────────────────── */
function ServiceRow({ services, lang, rowId }) {
  return (
    <PremiumCarousel
      items={services}
      lang={lang}
      renderItem={(s) => (
        <div className="h-full flex flex-col">
          <div className="hidden lg:flex flex-col h-full">
            <ServiceCardDesktop service={s} lang={lang} />
          </div>
          <div className="flex lg:hidden flex-col h-full">
            <ServiceCardMobile service={s} lang={lang} />
          </div>
        </div>
      )}
    />
  );
}

function ServiceCardDesktop({ service: s, lang }) {
  const extra = extraSentence[s.id] || { ar: "", en: "" };
  const fullDescription = `${s.description[lang]} ${extra[lang]}`;

  return (
    <div className="flex flex-col w-full h-full shrink-0">
      {/* Card */}
      <div className="h-[400px] rounded-[1.5rem] overflow-hidden group/card relative border border-neutral-200/50 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] transition-all duration-500 bg-neutral-900">
        {/* Background Image */}
        <img
          src={getCategoryImageUrl(s.id)}
          alt={s.name[lang]}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:blur-[6px] opacity-80"
        />

        {/* Default state: gradient + title */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent group-hover/card:opacity-0 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 group-hover/card:opacity-0 transition-opacity duration-500 delay-100">
          <span className="inline-block px-3 py-1 text-[10px] font-bold font-body rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm mb-3">
            {s.category[lang]}
          </span>
          <h3 className="font-display font-bold text-2xl text-white leading-tight drop-shadow-md">
            {s.name[lang]}
          </h3>
        </div>

        {/* Hover state: description ONLY (no button) */}
        <div className="absolute inset-0 bg-neutral-950/75 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col justify-center p-8 text-center translate-y-4 group-hover/card:translate-y-0">
          <h3 className="font-display font-bold text-xl text-white mb-4 border-b border-white/20 pb-4">
            {s.name[lang]}
          </h3>
          <p className="font-body text-white/85 text-[13px] leading-relaxed font-light line-clamp-6">
            {fullDescription}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={`/contact?tab=booking&service=${encodeURIComponent(s.name[lang])}`}
        className="mt-3 btn-primary w-full py-3 text-sm text-center rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300"
      >
        {lang === "ar" ? "احجز هذه الخدمة" : "Book This Service"}
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE CARD
   • Description always visible (no hover needed)
   • Button always visible below image
   • Professional card layout
────────────────────────────────────────────── */
function ServiceCardMobile({ service: s, lang }) {
  const extra = extraSentence[s.id] || { ar: "", en: "" };
  const fullDescription = `${s.description[lang]} ${extra[lang]}`;

  return (
    <div className="flex flex-col w-full h-full rounded-[1.5rem] overflow-hidden border border-neutral-200/60 dark:border-white/8 shadow-lg bg-white dark:bg-dark-card">
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={getCategoryImageUrl(s.id)}
          alt={s.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 text-[10px] font-bold font-body rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm">
          {s.category[lang]}
        </span>

        {/* Icon overlay */}
        <span className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 text-3xl drop-shadow-lg">
          {s.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white leading-tight mb-3">
          {s.name[lang]}
        </h3>

        <p className="font-body text-neutral-600 dark:text-dark-muted text-[13px] leading-relaxed font-light flex-1 mb-4">
          {fullDescription}
        </p>

        {/* CTA Button */}
        <Link
          to={`/contact?tab=booking&service=${encodeURIComponent(s.name[lang])}`}
          className="btn-primary w-full py-3 text-sm text-center rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-300 active:scale-[0.98]"
        >
          {lang === "ar" ? "احجز هذه الخدمة" : "Book This Service"}
        </Link>
      </div>
    </div>
  );
}
