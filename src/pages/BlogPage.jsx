import { useMemo, useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import FilterTabs from "../components/common/FilterTabs";
import BlogCard from "../components/cards/BlogCard";
import { blogs } from "../data";
import { createAlphabeticalFilterTabs } from "../utils/filterOptions";

// derived once at module scope — blogs is a constant, no need to recompute
const ALL_TABS = createAlphabeticalFilterTabs(
  blogs.map((blog) => blog.category)
);

export default function BlogPage({ onSelectBlog }) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    if (activeTab === "All") return blogs;
    return blogs.filter((blog) => blog.category === activeTab);
  }, [activeTab]);

  return (
    <SectionWrapper>
      <SectionTitle accent="Mindful" rest="Reflections" />
      <FilterTabs
        tabs={ALL_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Filter blog posts by category"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((blog, i) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={onSelectBlog}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
