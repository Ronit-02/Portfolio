import { useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import { XIcon, InstagramIcon, LinkedInIcon, BehanceIcon } from "../icons";
import { homeContent, profile, socialLinks } from "../data";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  x: XIcon,
  behance: BehanceIcon,
  linkedin: LinkedInIcon,
};

const SOCIALS = socialLinks
  .filter(({ id }) => SOCIAL_ICONS[id])
  .map((social) => ({ ...social, Icon: SOCIAL_ICONS[social.id] }));

const SOCIAL_POSITIONS = [
  "md:left-[7%] md:top-[24%] lg:left-[9%] xl:left-[11%]",
  "md:left-[1%] md:bottom-[22%] lg:left-[3%] xl:left-[5%]",
  "md:right-[7%] md:top-[24%] lg:right-[9%] xl:right-[11%]",
  "md:right-[1%] md:bottom-[22%] lg:right-[3%] xl:right-[5%]",
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
  const items = [...homeContent.tickerItems, ...homeContent.tickerItems];

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-[#4075F7]/[0.12] bg-[#4075F7]/[0.06] py-3">
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4075F7] sm:text-xs">
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

const FIRST = profile.firstName.toUpperCase().split("");
const LAST = profile.lastName.toUpperCase().split("");

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

  const baseLetterClass =
    "inline-block shrink-0 origin-bottom -ml-[0.065em] first:ml-0 font-medium leading-[0.88] md:-ml-[0.045em] md:text-[clamp(2.75rem,15.5vw,10.5rem)] md:leading-[0.95]";

  const firstNameClass = `${baseLetterClass} text-[clamp(5.15rem,27vw,10.5rem)] text-[#4075F7]`;
  const lastNameClass = `${baseLetterClass} text-[clamp(4.85rem,24.5vw,10.5rem)] text-black dark:text-white`;

  return (
    <div
      className="w-full max-w-full min-w-0 overflow-hidden text-center leading-[0.84] [perspective:600px] md:leading-[0.92]"
      aria-label={profile.fullName}
    >
      <div className="flex w-full items-end justify-center overflow-hidden pr-[0.065em]">
        {FIRST.map((ch, i) => (
          <motion.span
            key={`f-${i}`}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={firstNameClass}
            aria-hidden="true"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="flex w-full items-end justify-center overflow-hidden pr-[0.065em]">
        {LAST.map((ch, i) => (
          <motion.span
            key={`l-${i}`}
            custom={FIRST.length + i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={lastNameClass}
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
    <div className="mt-6 flex justify-center gap-2.5 xs:gap-4 sm:mt-7 sm:gap-5 md:pointer-events-none md:absolute md:inset-0 md:z-10 md:mt-0 md:block">
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
            pointer-events-auto relative
            h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 md:absolute md:h-14 md:w-14 lg:h-16 lg:w-16
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
            className="flex h-full w-full items-center justify-center rounded-full border border-gray-300 bg-white/70 text-gray-600 backdrop-blur-sm transition-colors duration-75 hover:text-blue-500 dark:border-[#373737] dark:bg-[#202020] dark:text-[#c7c6c3]"
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
      <div className="relative w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-full min-w-0 gap-6 overflow-hidden sm:gap-8 md:gap-10">
          {/* Subtitle row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.05 }}
            className="flex items-center justify-center w-full max-w-3xl min-w-0 gap-3 px-2 sm:gap-6"
          >
            <div className="flex-1 hidden h-px bg-gray-300 dark:bg-gray-700 sm:block" />

            <p className="max-w-[18rem] text-center text-sm leading-tight text-gray-900 xs:text-base sm:max-w-none sm:whitespace-nowrap sm:text-sm md:text-base md:text-gray-500 dark:text-gray-200 md:dark:text-gray-400">
              {profile.headline}
            </p>

            <div className="flex-1 hidden h-px bg-gray-300 dark:bg-gray-700 sm:block" />
          </motion.div>

          {/* Animated hero name with floating social icons */}
          <div className="relative w-full max-w-full min-w-0 py-5 overflow-hidden md:mx-auto md:max-w-7xl md:py-6">
            <AnimatedName />
            <FloatingSocials />
          </div>

          {/* Live ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="w-full max-w-full min-w-0 overflow-hidden"
          >
            <LiveTicker />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 1.4 }}
            className="grid w-full max-w-full min-w-0 grid-cols-2 gap-x-2 gap-y-6 pb-2 pt-4 xs:gap-x-4 sm:grid-cols-4 sm:gap-6 sm:pt-6"
          >
            {homeContent.stats.map((stat, i) => (
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
