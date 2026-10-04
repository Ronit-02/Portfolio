import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import { lifeContent, profile } from "../data";

const spring = { type: "spring", stiffness: 280, damping: 25 };

export default function LifeHomePage() {
  return (
    <SectionWrapper className="flex min-h-[calc(100dvh-82px)] items-center">
      <section className="w-full py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.08 }}
          className="flex min-w-0 items-center gap-2 xs:gap-4"
        >
          <span className="font-script text-4xl text-gray-500 dark:text-gray-300">
            {profile.firstName}
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <span className="min-w-0 text-right text-[11px] font-medium leading-tight text-[#4075F7] xs:text-xs">
            {lifeContent.eyebrow}
          </span>
        </motion.div>

        <div className="mt-10 grid gap-10 xs:mt-14 xs:gap-12 md:mt-20 md:grid-cols-[1fr_0.72fr] md:items-end md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.16 }}
          >
            <h1 className="max-w-3xl break-words text-[clamp(2.5rem,14vw,3rem)] font-medium leading-[0.95] tracking-[-0.055em] text-gray-900 sm:text-6xl md:text-7xl dark:text-white">
              {lifeContent.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
              {lifeContent.introduction}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.24 }}
            className="border-t border-gray-200 pt-5 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lifeContent.note}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-12 flex flex-wrap gap-x-4 gap-y-3 border-t border-gray-200 pt-6 text-sm text-gray-600 xs:mt-16 xs:gap-x-6 sm:mt-20 sm:gap-x-8 dark:border-gray-800 dark:text-gray-300"
        >
          {lifeContent.interests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </motion.div>
      </section>
    </SectionWrapper>
  );
}
