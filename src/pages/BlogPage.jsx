import { useMemo, useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import FilterTabs from "../components/common/FilterTabs";
import BlogCard from "../components/cards/BlogCard";
import { blogs } from "../data";
import { createAlphabeticalFilterTabs } from "../utils/filterOptions";

// Derived once at module scope because blogs is constant and does not need recomputing.
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
