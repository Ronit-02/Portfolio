import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

function ChevronIcon({ direction }) {
  const path =
    direction === "left" ? "m12.5 5-5 5 5 5" : "m7.5 5 5 5-5 5";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FilterTabs({
  tabs,
  activeTab,
  onChange,
  ariaLabel = "Content filters",
}) {
  const filterRowId = useId();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollCues = useCallback(() => {
    const scrollRow = scrollRef.current;

    if (!scrollRow) return;

    const maxScrollLeft = scrollRow.scrollWidth - scrollRow.clientWidth;

    setCanScrollLeft(scrollRow.scrollLeft > 2);
    setCanScrollRight(
      maxScrollLeft > 2 && scrollRow.scrollLeft < maxScrollLeft - 2
    );
  }, []);

  useEffect(() => {
    const scrollRow = scrollRef.current;

    if (!scrollRow) return undefined;

    const frameId = window.requestAnimationFrame(updateScrollCues);
    const resizeObserver = new ResizeObserver(updateScrollCues);

    resizeObserver.observe(scrollRow);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [tabs, updateScrollCues]);

  const scrollFilters = (direction) => {
    const scrollRow = scrollRef.current;

    if (!scrollRow) return;

    scrollRow.scrollBy({
      left: direction * Math.max(scrollRow.clientWidth * 0.7, 160),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative -mx-4 mb-8 sm:mx-0 sm:mb-10">
      <div
        id={filterRowId}
        ref={scrollRef}
        role="group"
        aria-label={ariaLabel}
        onScroll={updateScrollCues}
        className="scrollbar-hide flex w-full items-center gap-2 overflow-x-auto whitespace-nowrap px-4 pb-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <motion.button
              key={tab}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(tab)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm",
                active
                  ? "border-[#4075F7] bg-[#4075F7] text-white"
                  : "border-[#ddd] bg-transparent text-[#555] hover:border-[#4075F7]/40 hover:text-[#4075F7] dark:border-gray-800 dark:text-gray-400 dark:hover:border-[#4075F7]/40"
              )}
            >
              {tab}
            </motion.button>
          );
        })}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Show previous filters"
          aria-controls={filterRowId}
          onClick={() => scrollFilters(-1)}
          className="absolute left-0 top-0 z-10 flex h-8 w-12 items-center justify-start bg-gradient-to-r from-white via-white/95 to-transparent pl-2 sm:hidden dark:from-[#191919] dark:via-[#191919]/95"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[#4075F7] shadow-sm dark:border-gray-700 dark:bg-[#1c1c1e]">
            <ChevronIcon direction="left" />
          </span>
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Show more filters"
          aria-controls={filterRowId}
          onClick={() => scrollFilters(1)}
          className="absolute right-0 top-0 z-10 flex h-8 w-14 items-center justify-end bg-gradient-to-l from-white via-white/95 to-transparent pr-2 sm:hidden dark:from-[#191919] dark:via-[#191919]/95"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4075F7]/25 bg-white text-[#4075F7] shadow-sm dark:border-[#4075F7]/40 dark:bg-[#1c1c1e]">
            <ChevronIcon direction="right" />
          </span>
        </button>
      )}
    </div>
  );
}
