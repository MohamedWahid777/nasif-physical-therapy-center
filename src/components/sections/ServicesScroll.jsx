import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../ui/ServiceCard";
import { services } from "../../data/services";

export default function ServicesScroll() {
  const { t, i18n } = useTranslation();
  const scrollRef = useRef(null);
  const lang = i18n.language;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 320;
    const scrollDir = lang === "ar" ? -dir : dir;
    scrollRef.current.scrollBy({
      left: amount * scrollDir,
      behavior: "smooth",
    });
  };

  const half = Math.ceil(services.length / 2);
  const row1 = services.slice(0, half);
  const row2 = services.slice(half);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t("services.title")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t("services.subtitle")}
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 transition-all"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 transition-all"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar scroll-smooth"
        >
          <div className="flex flex-col gap-4 min-w-max pb-4">
            <div className="flex gap-4">
              {row1.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
            <div className="flex gap-4">
              {row2.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i + half} />
              ))}
            </div>
          </div>
        </div>
        {/* Mobile scroll buttons */}
        <div className="flex sm:hidden justify-center gap-3 mt-6">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
            aria-label="Scroll left"
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
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
            aria-label="Scroll right"
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
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
