import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import SectionWrapper from "../components/common/SectionWrapper";
import TagBadge from "../components/common/TagBadge";
import { cn } from "../utils/cn";

const TAB_DESIGN = "design";
const TAB_CODE = "code";

function SectionHeading({ children }) {
  return <h3 className="mt-10 mb-4 text-xl font-bold text-black first:mt-0 dark:text-white">{children}</h3>;
}

function InfoCard({ children }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-[#f7f7f8] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-colors xs:p-5 dark:border-white/[0.08] dark:bg-[#1a1a1a]">
      {children}
    </div>
  );
}

function NumberedInfoCard({ index, title, description }) {
  return (
    <InfoCard>
      <div className="flex items-start gap-3 xs:gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white font-mono text-[11px] font-semibold text-gray-500 shadow-sm dark:border-white/[0.09] dark:bg-[#252525] dark:text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="mb-1.5 text-sm font-semibold text-[#171717] dark:text-[#f1f1f1]">
            {title}
          </p>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </InfoCard>
  );
}

function ModeIcon({ mode, active }) {
  const color = active ? "#4075F7" : "currentColor";

  if (mode === TAB_DESIGN) {
    return (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="1.5" width="5.5" height="5.5" rx="1.5" stroke={color} strokeWidth="1.5" />
        <rect x="9.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke={color} strokeWidth="1.5" />
        <rect x="3" y="8" width="5.5" height="5.5" rx="1.5" stroke={color} strokeWidth="1.5" />
        <circle cx="12.25" cy="10.75" r="2.75" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6.5 4.5-4 4 4 4" />
      <path d="m11.5 4.5 4 4-4 4" />
      <path d="m10 2.75-2 11.5" />
    </svg>
  );
}

function DesignTab({ d, category }) {
  return (
    <motion.div
      key="design"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <SectionHeading>The Problem</SectionHeading>
      <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">{d.problem}</p>

      <SectionHeading>Design Solution</SectionHeading>
      <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">{d.solution}</p>

      <SectionHeading>Key UX Decisions</SectionHeading>
      <div className="flex flex-col gap-4 mb-10">
        {d.uxDecisions.map((item, index) => (
          <NumberedInfoCard
            key={item.title}
            index={index}
            title={item.title}
            description={item.desc}
          />
        ))}
      </div>

      <SectionHeading>Screen Gallery</SectionHeading>
      <div className={`${category === "Mobile" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 md:grid-cols-2"} place-items-center gap-8 sm:gap-6 lg:gap-8`}>
        {d.screens.map((screen) => (
          <div key={screen.label} className="w-full min-w-0">
            <div className={`${category === "Mobile" ? "mx-auto aspect-[1/2] w-full max-w-44 sm:max-w-36" : "h-52 w-full sm:h-64"} overflow-hidden rounded-2xl border border-neutral-200 bg-white xs:rounded-3xl dark:border-neutral-800 dark:bg-neutral-900`}>
              <img
                src={screen.image}
                alt={screen.label}
                className="object-cover w-full h-full"
              />
            </div>

            <p className="mt-3 break-words text-center text-xs text-neutral-500 xs:mt-4 xs:text-sm">
              {screen.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CodeTab({ c }) {
  return (
    <motion.div
      key="code"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <SectionHeading>Why This Stack?</SectionHeading>
      <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">{c.why}</p>

      <SectionHeading>Architecture Overview</SectionHeading>
      <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">{c.architecture}</p>

      <SectionHeading>Tech Decision Log</SectionHeading>
      <div className="flex flex-col gap-4 mb-10">
        {c.techChoices.map((item) => (
          <InfoCard key={item.tech}>
            <div className="flex items-center gap-3 mb-2">
              <TagBadge>{item.tech}</TagBadge>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.reason}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Engineering Challenges</SectionHeading>
      <div className="flex flex-col gap-4 mb-10">
        {c.challenges.map((item, index) => (
          <NumberedInfoCard
            key={item.title}
            index={index}
            title={item.title}
            description={item.desc}
          />
        ))}
      </div>

      <SectionHeading>Full Stack</SectionHeading>
      <div className="flex flex-wrap gap-2">
        {c.stack.map((stackItem) => <TagBadge key={stackItem}>{stackItem}</TagBadge>)}
      </div>
    </motion.div>
  );
}

export default function ProjectDetailPage({ project, onBack }) {
  const [tab, setTab] = useState(TAB_DESIGN);

  return (
    <SectionWrapper>
      <BackButton label="Back to Projects" onClick={onBack} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="mb-8 overflow-hidden bg-gray-100 rounded-2xl dark:bg-gray-800"
      >
        <img src={project.image} alt={project.title} className="h-52 w-full object-cover xs:h-64 sm:h-[340px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.08 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-2 break-words text-3xl font-bold leading-tight text-black sm:text-4xl dark:text-white">{project.title}</h1>
        <p className="mb-6 text-base text-gray-500 dark:text-gray-400">{project.subtitle}</p>
        <p className="max-w-2xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-400">{project.intro}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.12 }}
        className="mb-10 grid grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0 sm:pb-10 dark:divide-gray-800 dark:border-gray-800"
      >
        {[["CATEGORY", project.category], ["SERVICE", project.service], ["YEAR", project.year]].map(([key, value]) => (
          <div
            key={key}
            className="grid min-w-0 grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 py-4 text-left sm:block sm:px-4 sm:py-0 sm:text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:mb-2 sm:text-xs sm:tracking-widest">{key}</p>
            <p className="break-words text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">{value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.16 }}
        role="tablist"
        aria-label="Project case study view"
        className="mx-auto mb-10 grid w-full max-w-[430px] grid-cols-2 gap-1 rounded-[14px] border border-black/[0.08] bg-[#f1f1f3] p-1 dark:border-white/[0.08] dark:bg-[#191919]"
      >
        {[
          { key: TAB_DESIGN, label: "Design", detail: "Case study" },
          { key: TAB_CODE, label: "Code", detail: "Engineering" },
        ].map(({ key, label, detail }) => {
          const active = tab === key;

          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(key)}
              className={cn(
                "relative flex min-w-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-[10px] border-none bg-transparent px-2 py-2.5 text-left transition-colors xs:gap-2.5 xs:px-4",
                active ? "text-[#171717] dark:text-[#f5f5f5]" : "text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
              )}
            >
              {active && (
                <motion.span
                  layoutId="project-detail-active-tab"
                  className="absolute inset-0 rounded-[10px] border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[#292929] dark:shadow-[0_4px_12px_rgba(0,0,0,0.28)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex shrink-0">
                <ModeIcon mode={key} active={active} />
              </span>
              <span className="relative z-10 min-w-0 leading-tight">
                <span className="block text-sm font-semibold">{label}</span>
                <span className="hidden text-[10px] font-medium text-gray-400 sm:block dark:text-gray-500">
                  {detail}
                </span>
              </span>
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {tab === TAB_DESIGN ? <DesignTab key="design" category={project.category} d={project.design} /> : <CodeTab key="code" category={project.category} c={project.code} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}
