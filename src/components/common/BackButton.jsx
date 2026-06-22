import { motion } from "framer-motion";
import { ChevronLeft } from "../../icons";

export default function BackButton({ label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="mb-8 flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <ChevronLeft />
      {label}
    </motion.button>
  );
}
