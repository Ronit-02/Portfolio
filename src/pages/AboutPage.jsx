import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import ImageHoverLabel from "../components/common/ImageHoverLabel";
import TagBadge from "../components/common/TagBadge";
import { ChevronDown } from "../icons";
import { aboutContent, faqs, profile } from "../data";
import ProfileImage from "../images/profile-pic.jpg";

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
  const [isPortraitHoverDismissed, setIsPortraitHoverDismissed] = useState(false);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SectionWrapper>
      {/* Editorial About Hero */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-5xl gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-[0.85fr_300px_0.95fr] lg:items-stretch lg:gap-12"
      >
        {/* Left Identity */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col justify-between"
        >
          <div className="flex flex-col gap-4">

            <p className="mt-4 text-base font-medium text-gray-600 dark:text-gray-400">
              {aboutContent.roleLabel}
            </p>

            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {aboutContent.introduction}
            </p>
          </div>

          <div className="mt-10 lg:mt-0">

            <div className="flex max-w-sm flex-wrap gap-2 xs:gap-3">
              {aboutContent.focusAreas.map((area) => (
                <TagBadge key={area}>
                  {area}
                </TagBadge>
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
            <figure
              onPointerDown={() => setIsPortraitHoverDismissed(true)}
              onPointerLeave={() => setIsPortraitHoverDismissed(false)}
              className={`photo-hover-surface relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm dark:bg-gray-900${
                isPortraitHoverDismissed ? " is-hover-dismissed" : ""
              }`}
            >
              <img
                src={ProfileImage}
                alt={profile.fullName}
                className="photo-hover-media aspect-[4/5] w-full object-cover object-center transition-transform duration-500 ease-out motion-reduce:transition-none"
              />
              <ImageHoverLabel>{aboutContent.portraitLabel}</ImageHoverLabel>
            </figure>

            <div className="flex items-center justify-center gap-2 mt-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {aboutContent.principle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Narrative */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col justify-between lg:items-end"
        >
          <div className="max-w-sm lg:mt-10">

            {aboutContent.narrative.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-base leading-relaxed text-gray-600 first:mt-0 lg:first:mt-5 dark:text-gray-400"
              >
                {paragraph}
              </p>
            ))}
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
        className="mx-auto mt-12 max-w-4xl sm:mt-16"
      >
        <div className="mb-8">

          <h3 className="text-xl font-medium leading-snug text-gray-900 xs:text-2xl dark:text-white">
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
                  className="group flex w-full items-center justify-between gap-3 py-5 text-left xs:gap-6 xs:py-6"
                >
                  <div className="flex min-w-0 items-start gap-3 xs:gap-5">
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
                        className="max-w-2xl pb-6 pl-8 text-sm leading-relaxed text-gray-500 xs:pl-12 xs:text-base dark:text-gray-400"
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
