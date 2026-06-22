import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import BackButton from "../components/common/BackButton";

export default function BlogDetailPage({ blog, onBack }) {
  return (
    <SectionWrapper>
      <BackButton label="Back to Blog" onClick={onBack} />
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
        <span>{blog.date}</span>
        <span>{blog.readTime}</span>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800"
      >
        <img src={blog.image} alt={blog.title} className="h-[280px] w-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.08 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-400">{blog.category}</span>
          <div className="h-px w-16 bg-gray-200 dark:bg-gray-700" />
        </div>
        <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-10">{blog.title}</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{blog.content}</p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
