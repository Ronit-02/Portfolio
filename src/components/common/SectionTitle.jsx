import { motion } from "framer-motion";

export default function SectionTitle({ accent, rest }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.05 }}
      className="mx-auto mb-8 w-full max-w-4xl break-words px-4 text-center font-satoshi text-4xl font-bold leading-[0.95] tracking-[-0.03em] sm:mb-10 sm:text-5xl sm:leading-none md:mb-14 md:text-6xl"
    >
      <span className="text-[#4075F7]">{accent}</span>
      {rest && <span className="text-black dark:text-white"> {rest}</span>}
    </motion.h1>
  );
}
