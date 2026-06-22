import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function FilterTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="scrollbar-hide -mx-4 mb-8 flex w-full items-center gap-2 overflow-x-auto whitespace-nowrap px-4 pb-2 sm:mx-0 sm:mb-10 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <motion.button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={cn(
              "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 sm:px-6 sm:py-2.5 sm:text-base",
              active
                ? "border-[#4075F7] bg-[#4075F7] text-white"
                : "border-[#ddd] bg-transparent text-[#555] hover:border-[#4075F7]/40 hover:text-[#4075F7] dark:border-gray-800 dark:text-gray-400 dark:hover:border-[#4075F7]/40"
            )}
          >
            {tab}
          </motion.button>
        );
      })}
    </div>
  );
}
