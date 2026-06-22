import { motion } from "framer-motion";

export default function SectionWrapper({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26, duration: 0.45 }}
      className={`mx-auto w-full max-w-5xl px-8 pb-36 pt-6 font-satoshi md:px-12 ${className}`}
    >
      {children}
    </motion.div>
  );
}
