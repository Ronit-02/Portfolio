import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile, projects } from "../data";

const FEATURED_PROJECT = projects.find((project) => project.title === "Soundscape");

const CAPABILITIES = [
  {
    label: "Development",
    detail: "Full-stack systems",
    left: "19.28%",
    top: "24.48%",
    size: "h-[5.75rem] w-[5.75rem] sm:h-[7.5rem] sm:w-[7.5rem]",
  },
  {
    label: "Frontend",
    detail: "React · Next.js",
    left: "32.95%",
    top: "49.5%",
    size: "h-[5.25rem] w-[5.25rem] sm:h-[6.5rem] sm:w-[6.5rem]",
  },
  {
    label: "Backend",
    detail: "Node · FastAPI",
    left: "84.83%",
    top: "33.05%",
    size: "h-[5.25rem] w-[5.25rem] sm:h-[6.5rem] sm:w-[6.5rem]",
  },
  {
    label: "Cloud",
    detail: "AWS services",
    left: "75.4%",
    top: "60.9%",
    size: "h-[5rem] w-[5rem] sm:h-24 sm:w-24",
  },
  {
    label: "DevOps",
    detail: "CI/CD · Docker",
    left: "46.38%",
    top: "68.8%",
    size: "h-[5rem] w-[5rem] sm:h-24 sm:w-24",
  },
  {
    label: "Design",
    detail: "UI · Product",
    left: "65.85%",
    top: "38.67%",
    size: "h-[5.25rem] w-[5.25rem] sm:h-[6.5rem] sm:w-[6.5rem]",
  },
];

const MOBILE_ORBIT_POSITIONS = [
  { capabilityIndex: 0, left: "22%", top: "14%" },
  { capabilityIndex: 2, left: "80%", top: "14%" },
  { capabilityIndex: 1, left: "45%", top: "57%" },
  { capabilityIndex: 5, left: "68%", top: "91%" },
];

function OrbitField() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 360 340"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[8.25rem] h-[min(38vh,20rem)] w-full fill-none stroke-[#181a1e]/[0.2] stroke-[1.2] dark:stroke-white/[0.18] min-[520px]:top-[10.5rem] sm:hidden"
      >
        <path d="M -12 0 Q 180 130 372 0" />
        <path d="M -12 145 Q 180 245 372 145" strokeDasharray="10 9" />
        <path d="M -12 285 Q 180 355 372 285" strokeDasharray="3 11" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 820"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full fill-none stroke-[#181a1e]/[0.24] stroke-[1.5] dark:stroke-white/[0.2] sm:block"
      >
        <ellipse cx="600" cy="0" rx="450" ry="350" />
        <ellipse cx="600" cy="0" rx="530" ry="440" strokeDasharray="13 10" />
        <ellipse cx="600" cy="0" rx="650" ry="565" strokeDasharray="4 12" />
      </svg>
    </>
  );
}

function Capability({ capability, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 20,
        delay: 0.35 + index * 0.08,
      }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 max-[340px]:scale-[0.88]"
      style={{ left: capability.left, top: capability.top }}
    >
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.06,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 20 }}
        className={`flex ${capability.size} flex-col items-center justify-center rounded-full border border-black/[0.12] bg-[#fffdf8]/95 px-2 text-center text-[#181a1e] shadow-[0_16px_42px_rgba(32,40,58,0.10)] backdrop-blur-sm transition-colors dark:border-white/[0.12] dark:bg-[#202228]/95 dark:text-white`}
      >
        <span className="text-[11px] font-semibold leading-none sm:text-sm">
          {capability.label}
        </span>
        <span
          className="mt-1.5 text-[9px] font-medium uppercase leading-tight tracking-[0.045em] text-black/60 sm:text-[10px] dark:text-white/60"
        >
          {capability.detail}
        </span>
      </motion.div>
    </motion.div>
  );
}

function MobileCapability({ capability, index, left, top }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 230,
          damping: 20,
          delay: 0.24 + index * 0.06,
        }}
        className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-black/[0.12] bg-[#fffdf8]/95 px-2 text-center text-[#181a1e] shadow-[0_12px_30px_rgba(32,40,58,0.09)] backdrop-blur-sm dark:border-white/[0.12] dark:bg-[#202228]/95 dark:text-white"
      >
        <span className="text-[10px] font-semibold leading-none">
          {capability.label}
        </span>
        <span className="mt-1.5 text-[8px] font-medium uppercase leading-tight tracking-[0.04em] text-black/60 dark:text-white/60">
          {capability.detail}
        </span>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-white text-[#181a1e] dark:bg-[#191919] dark:text-white">
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(24,26,30,.16)_1px,transparent_1px)] [background-size:30px_30px] dark:opacity-[0.08]" />
      <OrbitField />

      <div className="absolute left-7 top-7 z-30 hidden items-center gap-3 lg:flex">
        <span className="h-2 w-2 rounded-full bg-[#4075F7]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#70747b] dark:text-white/45">
          Creative engineer · Delhi
        </span>
      </div>

      <div className="absolute right-7 top-7 z-30 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#70747b] dark:text-white/45 lg:block">
        Building across the stack
      </div>

      <div className="absolute top-0 z-10 -mt-8 -translate-x-1/2 left-1/2">
        <motion.div
          initial={{ y: "-58%", scale: 0.9 }}
          animate={{ y: "-50%", scale: 1 }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          className="relative flex h-[clamp(18rem,72vw,24rem)] w-[clamp(18rem,72vw,24rem)] items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_68%,#5b88fb_0%,#4075F7_48%,#3568e4_100%)] shadow-[0_30px_90px_rgba(64,117,247,.34)] sm:h-[26rem] sm:w-[26rem] lg:h-[clamp(26rem,42vw,34rem)] lg:w-[clamp(26rem,42vw,34rem)]"
        >
          <div className="absolute left-1/2 top-[75%] w-full -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <strong className="block text-[2.35rem] font-medium leading-[0.78] tracking-[-0.02em] min-[420px]:text-[clamp(2.35rem,8vw,3.25rem)] sm:text-[3.5rem] lg:text-[clamp(3.5rem,6vw,5.2rem)]">
              {profile.firstName.toUpperCase()}
            </strong>
            <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 min-[420px]:text-[10px] sm:mt-4 sm:text-[11px]">
              Full-stack developer
            </span>
          </div>
        </motion.div>
      </div>

      <div className="hidden sm:block">
        {CAPABILITIES.map((capability, index) => (
          <Capability key={capability.label} capability={capability} index={index} />
        ))}
      </div>

      <div className="absolute inset-x-0 top-[8.25rem] z-20 h-[min(38vh,20rem)] min-[520px]:top-[10.5rem] sm:hidden">
        {MOBILE_ORBIT_POSITIONS.map(({ capabilityIndex, left, top }, index) => (
          <MobileCapability
            key={CAPABILITIES[capabilityIndex].label}
            capability={CAPABILITIES[capabilityIndex]}
            index={index}
            left={left}
            top={top}
          />
        ))}
      </div>

      <div className="relative z-30 mx-auto w-[calc(100%-2rem)] max-w-[28rem] pb-32 pt-[calc(8.25rem+min(38vh,20rem)+3rem)] min-[520px]:pt-[calc(10.5rem+min(38vh,20rem)+3rem)] sm:hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
          className="mb-4"
        >
          <p className="max-w-sm text-[13px] font-normal leading-relaxed text-black/65 dark:text-white/65">
            I design thoughtful interfaces and build the systems behind them. Based in Delhi, usually building something new.
          </p>
          <Link
            to={`/projects/${FEATURED_PROJECT.id}`}
            state={{ project: FEATURED_PROJECT }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fffdf8]/80 p-3 transition-colors hover:border-[#4075F7]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7] dark:border-white/10 dark:bg-[#202228]/80"
          >
            <img
              src={FEATURED_PROJECT.image}
              alt="Soundscape music app preview"
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#4075F7] dark:text-[#8EADFF]">Currently building</p>
              <h2 className="mt-1 text-sm font-medium">Soundscape</h2>
              <p className="mt-1 text-[11px] leading-relaxed text-black/55 dark:text-white/55">A music companion for your mood and moment.</p>
            </div>
            <span aria-hidden="true" className="text-[#4075F7]">↗</span>
          </Link>
        </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.35, ease: "easeOut" }}
        className="flex items-center justify-between gap-2 rounded-[1.25rem] border border-dashed border-black/[0.12] bg-white/35 px-3 py-3 backdrop-blur-[2px] dark:border-white/[0.14] dark:bg-white/[0.025]"
      >
        <div className="min-w-0 text-left">
          <p className="text-[11px] font-semibold leading-tight tracking-[-0.01em] text-[#181a1e] dark:text-white min-[360px]:text-xs">
            Have an idea in orbit?
          </p>
          <p className="mt-1 text-[8px] leading-tight text-black/50 dark:text-white/50 min-[360px]:text-[9px]">
            Let&apos;s shape it into something real.
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#4075F7] px-3 py-2 text-[10px] font-semibold text-white shadow-[0_8px_20px_rgba(64,117,247,0.22)] transition-transform active:scale-95 min-[360px]:px-3.5 min-[360px]:text-[11px]"
        >
          View projects
          <span aria-hidden="true" className="ml-1.5">→</span>
        </Link>
      </motion.div>
      </div>

    </section>
  );
}
