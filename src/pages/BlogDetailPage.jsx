import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import BackButton from "../components/common/BackButton";

export default function BlogDetailPage({ blog, onBack }) {
  return (
    <SectionWrapper>
      <BackButton label="Back to Blog" onClick={onBack} />
      <div className="mb-4 flex flex-wrap justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
        <span>{blog.date}</span>
        <span>{blog.readTime}</span>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800"
      >
        <img src={blog.image} alt={blog.title} className="h-52 w-full object-cover xs:h-60 sm:h-[280px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.08 }}
      >
        <div className="mb-6 flex min-w-0 items-center justify-center gap-2 xs:gap-4">
          <div className="h-px max-w-16 flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="min-w-0 break-words text-center text-xs text-gray-400 xs:text-sm">{blog.category}</span>
          <div className="h-px max-w-16 flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>
        <h1 className="mb-10 break-words text-center text-2xl font-bold leading-tight text-black xs:text-3xl dark:text-white">{blog.title}</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{blog.content}</p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
