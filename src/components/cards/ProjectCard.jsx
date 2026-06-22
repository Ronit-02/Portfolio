import { motion } from "framer-motion";
import HoverImageCard from "./HoverImageCard";
import { formatDisplayDate } from "../../utils/formatDate";

function getCategoryLabel(project) {
  if (Array.isArray(project.categories) && project.categories.length > 0) {
    return project.categories.join(" / ");
  }

  if (Array.isArray(project.tags) && project.tags.length > 0) {
    return project.tags.join(" / ");
  }

  if (project.category) return project.category;
  if (project.type) return project.type;

  return "Project";
}

export default function ProjectCard({ project, onClick, index = 0 }) {
  const categoryLabel = getCategoryLabel(project);
  const projectDate = formatDisplayDate(project.date || project.year);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.08 }}
      className="cursor-pointer"
      onClick={() => onClick(project)}
    >
      <HoverImageCard image={project.image} title={project.title} imageClassName="h-64" />

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#4075F7] dark:text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4075F7] dark:bg-blue-400" />
          {categoryLabel}
        </div>

        <h3 className="text-2xl font-bold leading-snug text-black dark:text-white">
          {project.title}
        </h3>

        {projectDate && (
          <time dateTime={project.date || project.year} className="block text-sm text-gray-400 dark:text-gray-500">
            {projectDate}
          </time>
        )}
      </div>
    </motion.div>
  );
}
