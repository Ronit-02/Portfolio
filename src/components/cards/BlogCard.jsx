import { motion } from "framer-motion";
import HoverImageCard from "./HoverImageCard";
import { formatDisplayDate } from "../../utils/formatDate";

export default function BlogCard({ blog, onClick, index = 0 }) {
  const blogDate = formatDisplayDate(blog.date || blog.publishedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.07 }}
      className="cursor-pointer"
      onClick={() => onClick(blog)}
    >
      <HoverImageCard
        image={blog.image}
        title={blog.title}
        imageClassName="h-72 xs:h-80 sm:h-[400px]"
        cursorSize={56}
      />

      <div className="space-y-2">
        <div className="flex min-w-0 items-start gap-2 text-xs font-semibold leading-relaxed text-[#4075F7] xs:text-sm dark:text-blue-400">
          <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4075F7] dark:bg-blue-400" />
          <span className="min-w-0 break-words">{blog.category}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-black dark:text-white">
          {blog.title}
        </h3>

        {(blogDate || blog.readTime) && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400 dark:text-gray-500">
            {blogDate && <time dateTime={blog.date || blog.publishedAt}>{blogDate}</time>}
            {blogDate && blog.readTime && <span className="text-gray-300 dark:text-gray-600">.</span>}
            {blog.readTime && <span>{blog.readTime}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
