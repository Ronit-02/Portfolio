import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import SectionWrapper from "../components/common/SectionWrapper";
import { cn } from "../utils/cn";

const TAB_DESIGN = "design";
const TAB_CODE = "code";

function StackBadge({ label }) {
  return (
    <span className="rounded-full border border-[#4075F7]/20 bg-[#4075F7]/10 px-3 py-1 text-xs font-semibold text-[#4075F7]">
      {label}
    </span>
  );
}

function SectionHeading({ children }) {
  return <h3 className="mt-10 mb-4 text-xl font-bold text-black first:mt-0 dark:text-white">{children}</h3>;
}

function InfoCard({ children, muted = false }) {
  return <div className={cn("rounded-2xl border border-gray-200 p-5 dark:border-gray-800", muted && "bg-gray-50 dark:bg-gray-900")}>{children}</div>;
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
        {d.uxDecisions.map((item) => (
          <InfoCard key={item.title} muted>
            <p className="mb-1 text-sm font-bold text-black dark:text-white">{item.title}</p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.desc}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Screen Gallery</SectionHeading>
      <div className={`${category === "Mobile" ? "grid grid-cols-2 md:grid-cols-3" : "grid grid-cols-1 md:grid-cols-2"} gap-8 place-items-center`}>
        {d.screens.map((screen) => (
          <div key={screen.label}>
            <div className={`${category === "Mobile" ? "w-36 h-72" : "w-full h-64"} overflow-hidden bg-white border rounded-3xl border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900`}>
              <img
                src={screen.image}
                alt={screen.label}
                className="object-cover w-full h-full"
              />
            </div>

            <p className="mt-4 text-sm text-center text-neutral-500">
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
              <StackBadge label={item.tech} />
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.reason}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Engineering Challenges</SectionHeading>
      <div className="flex flex-col gap-4 mb-10">
        {c.challenges.map((item) => (
          <InfoCard key={item.title} muted>
            <p className="mb-1 text-sm font-bold text-black dark:text-white"><span aria-hidden="true">&#9889;</span> {item.title}</p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.desc}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Full Stack</SectionHeading>
      <div className="flex flex-wrap gap-2">
        {c.stack.map((stackItem) => <StackBadge key={stackItem} label={stackItem} />)}
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
        <img src={project.image} alt={project.title} className="h-[340px] w-full object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.08 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-2 text-4xl font-bold text-black dark:text-white">{project.title}</h1>
        <p className="mb-6 text-base text-gray-500 dark:text-gray-400">{project.subtitle}</p>
        <p className="max-w-2xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-400">{project.intro}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.12 }}
        className="flex justify-around pb-10 mb-10 border-b border-gray-200 dark:border-gray-800"
      >
        {[["CATEGORY", project.category], ["SERVICE", project.service], ["YEAR", project.year]].map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">{key}</p>
            <p className="text-base text-gray-700 dark:text-gray-300">{value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.16 }}
        className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-gray-200 bg-black/[0.03] p-1 dark:border-gray-800 dark:bg-white/[0.03]"
      >
        {[
          { key: TAB_DESIGN, label: "\uD83C\uDFA8  Design Case Study" },
          { key: TAB_CODE, label: "\u2699\uFE0F  Engineering Deep Dive" },
        ].map(({ key, label }) => {
          const active = tab === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "cursor-pointer rounded-full border-none px-6 py-2.5 text-sm font-semibold transition-all duration-200",
                active ? "bg-[#4075F7] text-white" : "bg-transparent text-[#888]"
              )}
            >
              {label}
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
