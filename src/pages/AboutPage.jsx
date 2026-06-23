import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import { ChevronDown } from "../icons";
import { faqs } from "../data";
import ProfileImage from "../images/profile-pic.jpg";

const focusAreas = [
  "Interface Design",
  "Full Stack Development",
  "Design Systems",
];

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
    },
  },
};

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SectionWrapper>
      <SectionTitle accent="My" rest="Narrative" />

      {/* Editorial About Hero */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-5xl gap-10 py-8 lg:grid-cols-[0.85fr_300px_0.95fr] lg:items-stretch lg:gap-12"
      >
        {/* Left Identity */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col justify-between"
        >
          <div className="flex flex-col gap-4">

            <p className="mt-4 text-base font-medium text-gray-600 dark:text-gray-400">
              Designer / Developer
            </p>

            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              I design the feeling of a product, then build the system that
              makes it real.
            </p>
          </div>

          <div className="mt-10 lg:mt-0">

            <div className="flex flex-wrap max-w-sm gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-300 border border-blue-100 rounded-full bg-blue-50 hover:border-blue-200 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center Portrait */}
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-[300px]">
            <div className="overflow-hidden bg-gray-100 shadow-sm rounded-2xl dark:bg-gray-900">
              <img
                src={ProfileImage}
                alt="Ronit Khatri"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Clear, useful, intentional.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Narrative */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col justify-between lg:items-end"
        >
          <div className="max-w-sm mt-10">

            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              I&apos;m focused on creating digital experiences that feel calm,
              useful, and considered. My work sits between visual design and 
              development, where ideas become interfaces people can
              actually use.
            </p>

            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              I care about clarity first: the structure of a page, the rhythm of
              an interaction, and the quiet details that make a product feel
              polished without feeling overdone.
            </p>
          </div>

        </motion.div>
      </motion.section>

      {/* Notes / FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          delay: 0.2,
        }}
        className="max-w-4xl mx-auto mt-16"
      >
        <div className="mb-8">

          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            A few details about how I think and work.
          </h3>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const number = String(i + 1).padStart(2, "0");
            const answerId = `about-faq-${i}`;

            return (
              <div
                key={faq.q || i}
                className="border-b border-gray-200 first:border-t dark:border-gray-800"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex items-center justify-between w-full gap-6 py-6 text-left group"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                      {number}
                    </span>

                    <span className="text-base font-medium text-gray-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-gray-100 md:text-lg">
                      {faq.q}
                    </span>
                  </div>

                  <span className="text-gray-400 shrink-0">
                    <ChevronDown rotated={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -6 }}
                        animate={{ y: 0 }}
                        exit={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-2xl pb-6 pl-12 text-base leading-relaxed text-gray-500 dark:text-gray-400"
                      >
                        {faq.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>
    </SectionWrapper>
  );
}