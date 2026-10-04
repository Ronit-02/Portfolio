import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function PortfolioLayerTransition({ children, onComplete }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-white [will-change:clip-path] dark:bg-[#191919]"
        initial={
          reduceMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0% 0% 0%)" }
        }
        animate={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(100% 0% 0% 0%)" }
        }
        transition={
          reduceMotion
            ? { duration: 0.2, ease: "easeOut" }
            : {
                duration: 0.96,
                ease: [0.76, 0, 0.24, 1],
              }
        }
        onAnimationComplete={onComplete}
      >
        <div className="h-full overflow-hidden">{children}</div>

      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#4075F7]/45 to-transparent shadow-[0_-14px_30px_rgba(64,117,247,0.12)]"
          initial={{ y: "0vh", opacity: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
          transition={{
            y: { duration: 0.96, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.96, times: [0, 0.08, 0.9, 1] },
          }}
        />
      )}
    </div>
  );
}
