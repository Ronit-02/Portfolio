import { useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import { XIcon, InstagramIcon, LinkedInIcon, BehanceIcon } from "../icons";

const SOCIALS = [
  { label: "X", href: "https://x.com/khatri_ronit1", Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/ronitxx9/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ronit-khatri/", Icon: LinkedInIcon },
  { label: "Behance", href: "https://www.behance.net/ronitkhatri", Icon: BehanceIcon },
];

const SOCIAL_POSITIONS = [
  "md:left-[7%] md:top-[24%] lg:left-[9%] xl:left-[11%]",
  "md:left-[1%] md:bottom-[22%] lg:left-[3%] xl:left-[5%]",
  "md:right-[7%] md:top-[24%] lg:right-[9%] xl:right-[11%]",
  "md:right-[1%] md:bottom-[22%] lg:right-[3%] xl:right-[5%]",
];

const TICKER_ITEMS = [
  { label: "Currently building", value: "Soundscape" },
  { label: "Currently learning", value: "Three Js" },
  { label: "Listening on loop", value: "Victory Lap" },
  { label: "Coffee count today", value: "☕ ☕ ☕" },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 50, suffix: "k+", label: "Lines of code" },
  { value: 147, suffix: "", label: "Cups of coffee ☕" },
];

function Counter({ value, suffix, label, delay }) {
  const ref = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay }}
      className="min-w-0 text-center"
    >
      <motion.span
        className="block text-3xl font-bold tracking-[-0.03em] text-[#4075F7] sm:text-4xl md:text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        <motion.span
          initial={{ value: 0 }}
          animate={{ value }}
          transition={{ duration: 1.6, ease: "easeOut", delay: delay + 0.2 }}
          onUpdate={(latest) => {
            if (ref.current) {
              ref.current.textContent = `${Math.floor(latest.value)}${suffix}`;
            }
          }}
        >
          <span ref={ref}>0{suffix}</span>
        </motion.span>
      </motion.span>

      <p className="mt-1 text-xs font-medium leading-snug text-gray-500 sm:text-sm dark:text-gray-400">
        {label}
      </p>
    </motion.div>
  );
}

function LiveTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-[#4075F7]/[0.12] bg-[#4075F7]/[0.06] py-3"
    >
      <motion.div
        className="flex w-max max-w-none items-center gap-8 whitespace-nowrap [will-change:transform] sm:gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="flex items-center flex-shrink-0 gap-2 px-2 text-xs sm:text-sm"
          >
            <span
              className="text-[10px] font-bold uppercase tracking-wider text-[#4075F7] sm:text-xs"
            >
              {item.label}
            </span>
            <span className="text-gray-400 dark:text-gray-500">-</span>
            <span className="text-gray-700 dark:text-gray-300">{item.value}</span>
            <span className="mx-2 text-gray-300 dark:text-gray-700 sm:mx-4">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const FIRST = "RONIT".split("");
const LAST = "KHATRI".split("");

function AnimatedName() {
  const letterVariants = {
    hidden: { opacity: 0, y: 48, rotateX: -40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: 0.15 + i * 0.07,
      },
    }),
  };

  return (
    <div
      className="w-full max-w-full min-w-0 overflow-x-clip text-center leading-[0.92] [perspective:600px]"
      aria-label="Ronit Khatri"
    >
      <div className="flex items-end justify-center max-w-full min-w-0 overflow-x-clip">
        {FIRST.map((ch, i) => (
          <motion.span
            key={`f-${i}`}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block shrink origin-bottom text-[clamp(2.75rem,15.5vw,10.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[#4075F7]"
            aria-hidden="true"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="flex items-end justify-center max-w-full min-w-0 overflow-x-clip">
        {LAST.map((ch, i) => (
          <motion.span
            key={`l-${i}`}
            custom={FIRST.length + i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block shrink origin-bottom text-[clamp(2.75rem,15.5vw,10.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-black dark:text-white"
            aria-hidden="true"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function FloatingSocials() {
  return (
    <div className="flex justify-center gap-3 mt-6 sm:gap-4 md:mt-0 md:block md:absolute md:inset-0 md:pointer-events-none md:z-10">
      {SOCIALS.map(({ label, href, Icon }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 1.15 + i * 0.08,
          }}
          className={`
            ${SOCIAL_POSITIONS[i]}
            relative md:absolute pointer-events-auto
            w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
          `}
        >
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{
              scale: 1.12,
              borderColor: "#4075F7",
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 18,
              mass: 0.5,
            }}
            className="flex items-center justify-center w-full h-full text-gray-600 transition-colors duration-75 border border-gray-300 rounded-full dark:border-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#0f0f0f] backdrop-blur-sm hover:text-blue-500"
          >
            <Icon />
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
}

const spring = { type: "spring", stiffness: 280, damping: 22 };

export default function HomePage() {
  return (
    <SectionWrapper>
      <div
        className="relative w-full max-w-full min-w-0 overflow-x-clip [contain:paint]"
      >
        <div className="flex flex-col items-center w-full max-w-full min-w-0 gap-6 sm:gap-8 md:gap-10 overflow-x-clip">
          {/* Subtitle row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.05 }}
            className="flex items-center w-full max-w-3xl min-w-0 gap-3 px-2 sm:gap-6"
          >
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            <p className="max-w-[72%] sm:max-w-none text-center text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 leading-snug sm:whitespace-nowrap">
              A versatile creator specializing in Design and Development
            </p>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          </motion.div>

          {/* Animated hero name with floating social icons */}
          <div className="relative w-full min-w-0 py-4 mx-auto max-w-7xl sm:py-8 md:py-6 overflow-x-clip">
            <AnimatedName />
            <FloatingSocials />
          </div>

          {/* Live ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="w-full max-w-full min-w-0 overflow-x-clip"
          >
            <LiveTicker />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 1.4 }}
            className="grid w-full max-w-full min-w-0 grid-cols-2 pt-4 pb-2 sm:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 sm:pt-6"
          >
            {STATS.map((stat, i) => (
              <Counter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={1.5 + i * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}