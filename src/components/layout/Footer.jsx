import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { clinicInfo } from "../../data/clinicInfo";
import { logos } from "../../data/assets";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const lang = i18n.language;
  const logo = theme === "dark" ? logos.dark : logos.light;

  const navLinks = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "team", path: "/team" },
    { key: "results", path: "/results" },
    { key: "contact", path: "/contact" },
  ];

  const footerRef = useRef(null);
  const [showWa, setShowWa] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowWa(entry.isIntersecting);
      },
      { rootMargin: "400px" },
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-neutral-900 dark:bg-dark-bg text-neutral-400 pt-16 pb-8 border-t border-neutral-800 dark:border-dark-border font-body relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12 gap-x-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1 flex flex-col items-center text-center md:items-start md:text-start">
            <img
              src={logo}
              alt={clinicInfo.name[lang]}
              className="h-24 w-auto object-contain mb-6 mx-auto md:mx-0"
            />
            <p className="text-sm leading-relaxed mb-8 max-w-sm md:max-w-none">
              {t("footer.description")}
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {clinicInfo.social.facebook.map((url, i) => (
                <a
                  key={`fb-${i}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300 text-white/80 shadow-sm"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              ))}
              <a
                href={clinicInfo.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300 text-white/80 shadow-sm"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
                </svg>
              </a>
              {/* Gmail Icon */}
              <a
                href={`mailto:${clinicInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300 text-white/80 shadow-sm"
                aria-label="Email"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-start pt-4 md:pt-0 border-t border-white/5 md:border-none">
            <h4 className="text-white font-display font-semibold text-lg mb-6">
              {t("nav.home")}
            </h4>
            <ul className="grid grid-cols-2 md:flex md:flex-col gap-x-12 gap-y-4 md:gap-y-3 w-full max-w-[280px] md:max-w-none mx-auto md:mx-0 text-start">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors text-sm flex items-center justify-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0"></span>
                    <span className="truncate">{t(`nav.${link.key}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Egypt Branch */}
          <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 border-t border-white/5 md:border-none">
            <h4 className="text-white font-display font-semibold text-lg mb-6 text-center md:text-start">
              {clinicInfo.branches[0].name[lang]}
            </h4>
            <ul className="space-y-4 text-sm w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
              <li className="flex items-start justify-start gap-3.5 text-start">
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-relaxed">
                  {clinicInfo.branches[0].address[lang]}
                </span>
              </li>
              <li className="flex items-center justify-start gap-3.5 text-start">
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="hover:text-primary-400 transition-colors"
                  dir="ltr"
                >
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-start justify-start gap-3.5 text-start">
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="leading-relaxed">
                  {clinicInfo.workingHours[lang]}
                  <br />
                  {clinicInfo.workingDays[lang]}
                </span>
              </li>
            </ul>
          </div>

          {/* Saudi Branch */}
          <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 border-t border-white/5 md:border-none">
            <h4 className="text-white font-display font-semibold text-lg mb-6 text-center md:text-start">
              {clinicInfo.branches[1].name[lang]}
            </h4>
            <ul className="space-y-4 text-sm w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
              <li className="flex items-start justify-start gap-3.5 text-start">
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-relaxed">
                  {clinicInfo.branches[1].address[lang]}
                </span>
              </li>
              <li className="flex items-center justify-start gap-3.5 text-start">
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="hover:text-primary-400 transition-colors break-all text-xs"
                >
                  {clinicInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 text-center md:text-start">
          <p>
            © {new Date().getFullYear()} {clinicInfo.name[lang]}.{" "}
            {t("footer.rights")}.
          </p>
          <p>
            Made with <span className="text-red-500"></span> for better health
          </p>
        </div>
      </div>

      {/* Dynamic WhatsApp CTA */}
      <AnimatePresence>
        {showWa && (
          <motion.a
            href="https://wa.me/201090677084"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-6 rtl:left-6 ltr:right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
            aria-label="WhatsApp Chat"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-body font-medium text-[11px] px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
              {lang === "ar" ? "تواصل معنا" : "Chat with us"}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  );
}
