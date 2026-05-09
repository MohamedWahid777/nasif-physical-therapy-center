import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import NetworkBackground from "../components/NetworkBackground";
import { aboutContent } from "../data/about";
import { conditions } from "../data/conditions";
import { teamMembers } from "../data/team";
import { videos } from "../data/assets";
import SectionHeader from "../components/ui/SectionHeader";

const faqs = {
  ar: [
    {
      q: "ما هي تخصصات مركز ناصف؟",
      a: "يتخصص المركز في العلاج الطبيعي والتأهيل، التخاطب وأمراض النطق، التكامل الحسي، والعلاج الوظيفي لجميع الأعمار.",
    },
    {
      q: "كيف أحجز موعداً في المركز؟",
      a: "يمكنك الحجز عن طريق الاتصال على رقم 01090677084 أو من خلال نموذج الحجز في صفحة تواصل معنا.",
    },
    {
      q: "هل يقدم المركز خدماته للأطفال؟",
      a: "نعم، لدينا أقسام متخصصة لعلاج الأطفال تشمل العلاج الطبيعي للأطفال، التخاطب، التكامل الحسي، وتنمية المهارات.",
    },
    {
      q: "ما هي أوقات عمل المركز؟",
      a: "يعمل المركز من السبت إلى الخميس، من الساعة 9 صباحاً حتى 7 مساءً.",
    },
    {
      q: "أين يقع مركز ناصف؟",
      a: "لدينا فرعان: فرع مصر في كفر الشيخ، الحامول، شارع العاشر من رمضان، برج غانم منصور، الدور الرابع. وفرع السعودية في المدينة المنورة، آخر شارع السلام بجوار محطة الدريس.",
    },
    {
      q: "هل تستخدمون أجهزة علاج حديثة؟",
      a: "نعم، نستخدم أحدث أجهزة العلاج الطبيعي مثل الشوك ويف، الليزر العلاجي، الموجات فوق الصوتية، والتنبيه الكهربائي للعضلات والأعصاب.",
    },
    {
      q: "هل يتم تصميم خطة علاجية لكل حالة بشكل منفصل؟",
      a: "بالتأكيد، كل مريض يحصل على خطة علاجية فردية مصممة خصيصاً لحالته واحتياجاته مع متابعة مستمرة لضمان أفضل النتائج.",
    },
  ],
  en: [
    {
      q: "What are Nasif Center's specialties?",
      a: "The center specializes in physical therapy and rehabilitation, speech therapy, sensory integration, and occupational therapy for all ages.",
    },
    {
      q: "How do I book an appointment?",
      a: "You can book by calling 01090677084 or through the booking form on our Contact page.",
    },
    {
      q: "Does the center provide services for children?",
      a: "Yes, we have specialized departments for pediatric care including pediatric physical therapy, speech therapy, sensory integration, and skills development.",
    },
    {
      q: "What are the center's working hours?",
      a: "The center operates Saturday to Thursday, from 9:00 AM to 7:00 PM.",
    },
    {
      q: "Where is Nasif Center located?",
      a: "We have two branches: Egypt branch in Kafr El-Sheikh, El-Hamoul, 10th of Ramadan St., Ghanem Mansour Tower, 4th Floor. Saudi Arabia branch in Madinah, End of Al-Salam Street, Next to Al-Drees Station.",
    },
    {
      q: "Do you use modern therapy equipment?",
      a: "Yes, we use the latest physical therapy devices including shockwave therapy, laser therapy, ultrasound, and electrical muscle/nerve stimulation.",
    },
    {
      q: "Is a separate treatment plan designed for each case?",
      a: "Absolutely. Each patient receives an individually tailored treatment plan designed specifically for their condition and needs, with continuous follow-up to ensure the best results.",
    },
  ],
};

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const introText = aboutContent.intro[lang].split("\n\n")[0];
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar"
            ? "مركز ناصف للعلاج الطبيعي والتأهيل"
            : "Nasif Physical Therapy & Rehabilitation Center"}
        </title>
      </Helmet>

      {/* Cinematic Premium Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-neutral-900">
        {/* Premium 2D Animated Network Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-neutral-950">
          <NetworkBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950/80 pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <span className="font-body text-[11px] font-semibold text-white/90 tracking-widest uppercase">
                  {lang === "ar"
                    ? "الرعاية الطبية المتميزة"
                    : "Premium Medical Care"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-display font-bold text-white leading-[1.15] mb-5 tracking-tight drop-shadow-sm">
                <span className="block">
                  {t("hero.title").split(" ")[0]}{" "}
                  {t("hero.title").split(" ")[1]}
                </span>
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-primary-200">
                  {t("hero.title").split(" ").slice(2).join(" ")}
                </span>
              </h1>

              <p className="font-body text-white/70 text-[15px] md:text-base leading-relaxed mb-8 max-w-md font-light mx-auto lg:mx-0">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link to="/contact" className="btn-primary text-center px-7">
                  {lang === "ar"
                    ? "احجز استشارتك الآن"
                    : "Book Consultation Now"}
                </Link>
                <Link
                  to="/services"
                  className="relative flex items-center justify-center overflow-hidden bg-white/5 text-white font-body font-medium text-sm px-7 py-2.5 rounded-full transition-all duration-300 border border-white/10 shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/10 hover:border-white/20 text-center"
                >
                  {lang === "ar" ? "اكتشف خدماتنا" : "Explore Services"}
                </Link>
              </div>
            </motion.div>

            {/* Right Premium Medical Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: lang === "ar" ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative w-full mt-10 lg:mt-0"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 aspect-[4/5] max-w-[380px] mx-auto lg:mx-0 lg:ml-auto rtl:lg:ml-0 rtl:lg:mr-auto">
                <img
                  src={teamMembers[0].image}
                  alt="Lead Doctor"
                  className="w-full h-full object-cover object-top opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                {/* Floating Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: [0, -8, 0], opacity: 1 }}
                  transition={{
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    opacity: { duration: 0.8, delay: 0.6 },
                  }}
                  className="absolute bottom-6 rtl:right-6 ltr:left-6 bg-white/10 backdrop-blur-xl p-3.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-3 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center text-accent-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-[13px] text-white tracking-wide">
                      {lang === "ar" ? "رعاية معتمدة" : "Certified Care"}
                    </p>
                    <p className="font-body text-[10px] text-white/60 mt-0.5">
                      {lang === "ar"
                        ? "أعلى معايير الجودة"
                        : "Highest Quality Standards"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Animated Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute -top-6 -right-6 w-32 h-32 opacity-30 pointer-events-none"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-white"
                  fill="currentColor"
                >
                  <pattern
                    id="dots"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="2" />
                  </pattern>
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="url(#dots)"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved Above About, Horizontal Row, Floating Cards */}
      <section className="relative z-20 -mt-10 mb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                num: "10+",
                label: lang === "ar" ? "سنوات خبرة" : "Years Experience",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                num: "20+",
                label: lang === "ar" ? "خدمة متخصصة" : "Specialized Services",
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
              },
              {
                num: "2",
                label:
                  lang === "ar"
                    ? "فروع (مصر والسعودية)"
                    : "Branches (Egypt & KSA)",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ y: [0, -6, 0] }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.1 },
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  },
                }}
                className="bg-white/80 dark:bg-dark-card/90 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-[1.25rem] p-5 flex flex-col items-center text-center group hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={stat.icon}
                    />
                  </svg>
                </div>
                <div className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-1">
                  {stat.num}
                </div>
                <div className="text-neutral-500 dark:text-dark-muted font-body text-[11px] uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Refined Editorial Layout */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-bg relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle={t("about.subtitle")}
            title={t("about.title")}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* One Side -> Professional Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative order-2 lg:order-none"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-neutral-200/60 dark:border-dark-border relative max-w-[380px] mx-auto lg:max-w-none">
                <img
                  src="/assets/images/clinic/Photo5.webp"
                  alt={t("about.title")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>

              {/* Subtle Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-100 dark:bg-accent-900/20 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Other Side -> Content */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-1 lg:order-none flex flex-col items-center text-center lg:items-start lg:text-start"
            >
              <div className="relative mb-8 w-full">
                {/* Decorative Accent Line */}
                <div className="absolute top-1 rtl:-right-4 ltr:-left-4 w-1 h-[calc(100%-8px)] bg-gradient-to-b from-primary-500/80 to-transparent rounded-full opacity-70 hidden md:block" />

                <div className="font-body text-neutral-600 dark:text-dark-muted text-[16px] leading-relaxed space-y-5 font-light md:rtl:pr-5 md:ltr:pl-5 max-w-lg">
                  <p className="mx-0">{introText}</p>

                  <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-neutral-100 dark:border-dark-border shadow-sm mt-4">
                    <div className="flex flex-row items-start gap-4">
                      <div className="text-accent-500 w-11 h-11 shrink-0 bg-accent-50 dark:bg-accent-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="font-medium text-neutral-800 dark:text-dark-text leading-relaxed mt-1 text-[14px]">
                        {lang === "ar"
                          ? "رؤيتنا هي تقديم رعاية طبية متكاملة تعيد لك جودة حياتك بأعلى المعايير، من خلال فريق طبي استشاري وأحدث الأجهزة العالمية."
                          : "Our vision is to provide comprehensive medical care that restores your quality of life to the highest standards, through a consulting medical team and the latest global equipment."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn-primary inline-flex px-8">
                {t("about.read_more")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cases We Treat - Refined Modern Cards */}
      <section className="section-padding bg-white dark:bg-dark-card border-t border-neutral-100 dark:border-dark-border">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle={lang === "ar" ? "مجالات التخصص" : "Areas of Expertise"}
            title={
              lang === "ar" ? "بعض الحالات التي نعالجها" : "Cases We Treat"
            }
          />
          <div className="flex justify-center mb-10 -mt-6">
            <Link
              to="/services"
              className="text-primary-600 dark:text-primary-400 font-body text-[14px] font-semibold flex items-center gap-2 hover:gap-3 transition-all bg-primary-50 dark:bg-primary-900/20 px-5 py-2 rounded-full border border-primary-100 dark:border-primary-800/30"
            >
              {lang === "ar" ? "عرض كل الخدمات" : "View All Services"}
              <svg
                className="w-4 h-4 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[280px] rounded-[1.5rem] overflow-hidden bg-neutral-900 cursor-pointer shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.03)] transition-all duration-500 border border-neutral-200/50 dark:border-white/5"
              >
                <img
                  src={c.image}
                  alt={c.name[lang]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />

                {/* Default State Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-[19px] font-display font-bold text-white mb-2">
                    {c.name[lang]}
                  </h3>
                </div>

                {/* Elegant Hover State (Treatment Methods ONLY) Perfectly Centered */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-neutral-900/60 backdrop-blur-md">
                  <h3 className="text-[19px] font-display font-bold text-white mb-3 border-b border-white/20 pb-3 w-full text-center">
                    {c.name[lang]}
                  </h3>

                  <div className="flex flex-col items-center w-full">
                    <p className="text-[10px] font-bold text-accent-400 uppercase tracking-widest mb-2">
                      {lang === "ar" ? "طرق العلاج" : "Treatment Methods"}
                    </p>
                    <p className="text-white/85 text-[13px] font-body leading-relaxed max-w-[200px]">
                      {c.treatment[lang]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refined FAQ Section */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-bg border-t border-neutral-100 dark:border-dark-border">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            subtitle={lang === "ar" ? "مركز المساعدة" : "Help Center"}
            title={
              lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"
            }
          />

          <div className="space-y-3">
            {faqs[lang].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-card rounded-xl border border-neutral-200/80 dark:border-dark-border overflow-hidden transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-start focus:outline-none group"
                >
                  <span
                    className={`font-body font-medium text-[15px] transition-colors ${activeFaq === i ? "text-primary-600 dark:text-primary-400" : "text-neutral-800 dark:text-dark-text group-hover:text-primary-600"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${activeFaq === i ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rotate-180" : "bg-neutral-50 dark:bg-dark-surface text-neutral-400 dark:text-dark-muted border border-neutral-200 dark:border-dark-border"}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 md:px-5 pb-5 pt-1 text-neutral-500 dark:text-dark-muted font-body leading-relaxed text-[13px] font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
