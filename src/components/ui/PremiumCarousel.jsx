import { useRef, useState, useEffect } from "react";

export default function PremiumCarousel({
  items,
  renderItem,
  lang,
  cardWidthClass = "w-[80vw] md:w-[300px] lg:w-[340px]",
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );
    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 320;
    const gap = window.innerWidth < 768 ? 16 : 24;
    const scrollAmount = cardWidth + gap;
    const scrollDir = lang === "ar" ? -dir : dir;
    container.scrollBy({ left: scrollAmount * scrollDir, behavior: "smooth" });
  };

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[index];
    if (child) {
      child.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="relative group w-full overflow-hidden">
      {/* Mobile Controls */}
      <div className="md:hidden flex items-center justify-center gap-6 mb-6 px-4">
        <button
          onClick={() => scroll(-1)}
          className="w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center text-primary-600 border border-neutral-100 dark:border-dark-border hover:bg-primary-50 transition-colors"
          aria-label="Previous"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
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
        <div className="flex gap-2 items-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-6 bg-primary-600" : "w-1.5 bg-neutral-300 dark:bg-dark-border hover:bg-primary-400"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center text-primary-600 border border-neutral-100 dark:border-dark-border hover:bg-primary-50 transition-colors"
          aria-label="Next"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
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

      {/* Desktop Arrows */}
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.1)] items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-neutral-100 dark:border-white/5"
        aria-label="Previous"
      >
        <svg
          className="w-6 h-6 rtl:rotate-180"
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
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.1)] items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-neutral-100 dark:border-white/5"
        aria-label="Next"
      >
        <svg
          className="w-6 h-6 rtl:rotate-180"
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

      {/* Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 w-full"
        style={{
          paddingInlineStart: isMobile ? "calc((100vw - 80vw) / 2)" : "1.5rem",
          paddingInlineEnd: isMobile ? "calc((100vw - 80vw) / 2)" : "1.5rem",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            data-index={i}
            className={`snap-center md:snap-start snap-always shrink-0 ${cardWidthClass}`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
