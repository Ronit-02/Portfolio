import { motion } from "framer-motion";
import { ChevronDown } from "../../icons";

export default function TopNav({
  portfolioSide = "work",
  onSwitchPortfolio,
  switchDisabled = false,
}) {
  const isLifeSide = portfolioSide === "life";
  const switchLabel = isLifeSide
    ? "Return to work portfolio"
    : "Open personal portfolio";

  const handlePullEnd = (_, info) => {
    if (switchDisabled) return;

    if (info.offset.y > 10 || info.velocity.y > 140) {
      onSwitchPortfolio?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full overflow-x-hidden border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-[#0f0f0f]"
    >
      <header className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-6 sm:py-2.5 md:px-12 md:py-4">
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex cursor-default shrink-0"
        >
          <motion.span
            variants={{
              rest: { rotate: 0, scale: 1 },
              hover: {
                rotate: -2,
                scale: 1.04,
                transition: { type: "spring", stiffness: 420, damping: 18 },
              },
            }}
            className="select-none font-script text-[2rem] font-normal leading-none text-gray-600 xs:text-4xl sm:text-4xl md:text-4xl dark:text-gray-300"
          >
            Ronit
          </motion.span>

          <motion.span
            variants={{
              rest: { scaleX: 0, opacity: 0 },
              hover: {
                scaleX: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 380, damping: 24 },
              },
            }}
            className="absolute -bottom-1 left-1 right-1 h-[2px] origin-left rounded-full bg-[#4075F7]"
          />
        </motion.div>

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <motion.button
            type="button"
            onClick={onSwitchPortfolio}
            onDragEnd={handlePullEnd}
            disabled={switchDisabled}
            aria-label={switchLabel}
            title={switchLabel}
            drag={switchDisabled ? false : "y"}
            dragConstraints={{ top: 0, bottom: 18 }}
            dragElastic={0.24}
            dragMomentum={false}
            dragSnapToOrigin
            whileHover={switchDisabled ? undefined : { y: 2 }}
            whileTap={switchDisabled ? undefined : { scale: 0.96 }}
            whileDrag={switchDisabled ? undefined : { scale: 1.04 }}
            transition={{ type: "spring", stiffness: 430, damping: 25 }}
            className="group flex h-7 w-11 cursor-grab items-center justify-center rounded-b-xl border-x border-b border-gray-200 bg-white/95 text-gray-500 shadow-[0_5px_16px_rgba(18,24,38,0.07)] outline-none backdrop-blur-sm hover:border-[#4075F7]/35 hover:text-[#4075F7] focus-visible:ring-2 focus-visible:ring-[#4075F7] focus-visible:ring-offset-2 active:cursor-grabbing disabled:cursor-default disabled:opacity-60 dark:border-gray-800 dark:bg-[#0f0f0f]/95 dark:text-gray-400 dark:hover:border-[#4075F7]/45 dark:hover:text-[#7ea2ff] dark:focus-visible:ring-offset-[#0f0f0f]"
          >
            <motion.span
              aria-hidden="true"
              className="flex scale-75"
              animate={{ y: 0 }}
              whileHover={switchDisabled ? undefined : { y: 1.5 }}
              transition={{ type: "spring", stiffness: 520, damping: 24 }}
            >
              <ChevronDown />
            </motion.span>
          </motion.button>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2 text-right sm:gap-3">
          <motion.div
            whileHover={{ scale: 1.03, borderColor: "rgba(64,117,247,0.35)" }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="hidden max-w-full items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-2 py-1 text-gray-700 xs:inline-flex sm:gap-2 sm:px-3 dark:border-gray-800 dark:bg-white/[0.04] dark:text-gray-300"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#4075F7]"
                animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4075F7] sm:h-2 sm:w-2" />
            </span>

            <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[clamp(0.08em,1vw,0.16em)] sm:text-[10px] md:text-xs">
              Delhi, India
            </span>
          </motion.div>

        </div>
      </header>
    </motion.div>
  );
}
