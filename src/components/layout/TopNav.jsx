import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function BlinkingSeparator({ delay = 0 }) {
  return (
    <motion.span
      className="mx-0.5 text-[#4075F7] sm:mx-1"
      animate={{ opacity: [0.25, 1, 0.25] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay }}
    >
      :
    </motion.span>
  );
}

function ClockDigit({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.45, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
    >
      {value}
    </motion.span>
  );
}

export default function TopNav() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");

      setTime({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full overflow-x-hidden border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-[#0f0f0f]"
    >
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-6 sm:py-2.5 md:px-12 md:py-4">
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

        <motion.div
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="flex flex-col items-end min-w-0 text-right"
        >
          {/* <div className="whitespace-nowrap text-[11px] font-light tracking-[clamp(0.1em,1.4vw,0.22em)] text-gray-400 [font-variant-numeric:tabular-nums] sm:text-xs md:text-sm">
            <ClockDigit value={time.h} />
            <BlinkingSeparator />
            <ClockDigit value={time.m} />
            <BlinkingSeparator delay={0.12} />
            <ClockDigit value={time.s} />
          </div> */}

          <motion.div
            whileHover={{ scale: 1.03, borderColor: "rgba(64,117,247,0.35)" }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-2 py-1 text-gray-700 sm:mt-2 sm:gap-2 sm:px-3 dark:border-gray-800 dark:bg-white/[0.04] dark:text-gray-300"
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
        </motion.div>
      </header>
    </motion.div>
  );
}
