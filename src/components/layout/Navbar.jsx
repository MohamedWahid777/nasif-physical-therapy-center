import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { logos } from "../../data/assets";

const navLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "team", path: "/team" },
  { key: "results", path: "/results" },
  { key: "contact", path: "/contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lang = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll(); // Initialize state correctly on first render
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <>
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-500 flex justify-center px-4 md:px-6 pointer-events-none ${
          scrolled ? "top-3 md:top-4" : "top-5 md:top-6"
        }`}
      >
        {/* Floating Pill Container */}
        <div className="bg-white/80 dark:bg-dark-card/85 backdrop-blur-xl border border-neutral-200/60 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-4 md:px-6 h-[60px] md:h-[68px] flex items-center justify-between w-full max-w-6xl pointer-events-auto transition-colors duration-500">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 w-32 h-10 flex items-center group"
          >
            <img
              src={theme === "dark" ? logos.dark : logos.light}
              alt={t("hero.title")}
              className="h-18 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full font-body font-medium text-[14px] transition-all duration-300 border border-transparent ${
                    isActive
                      ? "bg-neutral-100 dark:bg-dark-surface text-primary-700 dark:text-primary-300 border-neutral-200/80 dark:border-dark-border shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      : "text-neutral-600 dark:text-dark-muted hover:text-primary-600 dark:hover:text-white hover:bg-neutral-50/80 dark:hover:bg-white/5 hover:border-neutral-200/50 dark:hover:border-white/5"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                  {/* Subtle active glow dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Lang Toggle */}
            <button
              onClick={switchLang}
              className="flex items-center rounded-full p-1 text-[11px] font-bold font-body transition-all duration-300 bg-neutral-100/80 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border hover:border-neutral-300 dark:hover:border-neutral-600"
            >
              <span
                className={`px-3 py-1.5 rounded-full transition-colors ${lang === "ar" ? "bg-white dark:bg-dark-card text-primary-700 dark:text-white shadow-sm" : "text-neutral-500 dark:text-dark-muted"}`}
              >
                AR
              </span>
              <span
                className={`px-3 py-1.5 rounded-full transition-colors ${lang === "en" ? "bg-white dark:bg-dark-card text-primary-700 dark:text-white shadow-sm" : "text-neutral-500 dark:text-dark-muted"}`}
              >
                EN
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 bg-neutral-100/80 dark:bg-dark-surface text-neutral-600 dark:text-dark-muted border border-neutral-200 dark:border-dark-border hover:text-primary-600 dark:hover:text-primary-300 hover:border-neutral-300 dark:hover:border-neutral-600"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              >
                {theme === "dark" ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.div>
            </button>

            <Link
              to="/contact"
              className="btn-primary text-[13px] px-6 py-2 ml-1"
            >
              {lang === "ar" ? "احجز موعد" : "Book Appointment"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-dark-muted bg-neutral-100 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border"
            >
              {theme === "dark" ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 text-neutral-800 dark:text-dark-text"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform" />
              <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Premium Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] sm:w-[60%] md:w-[45%] h-full bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl z-50 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] lg:hidden flex flex-col border-l border-white/20 dark:border-white/5"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <div className="p-6 flex items-center justify-between border-b border-neutral-100 dark:border-dark-border">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-dark-surface transition-colors"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  onClick={switchLang}
                  className="text-xs font-bold text-neutral-600 dark:text-dark-muted bg-neutral-100 dark:bg-dark-surface border border-neutral-200 dark:border-dark-border px-4 py-1.5 rounded-full transition-all hover:bg-neutral-200 dark:hover:bg-dark-border"
                >
                  {lang === "ar" ? "EN" : "عربي"}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-5 py-3.5 rounded-xl font-body font-medium text-[15px] transition-all border border-transparent ${
                          isActive
                            ? "bg-neutral-100 dark:bg-dark-surface text-primary-600 dark:text-white border-neutral-200/50 dark:border-white/5 shadow-sm"
                            : "text-neutral-700 dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {t(`nav.${link.key}`)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-6 border-t border-neutral-100 dark:border-dark-border">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full text-center py-3.5"
                >
                  {lang === "ar" ? "احجز موعدك الآن" : "Book Appointment Now"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
