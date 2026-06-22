import { useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import FilterTabs from "../components/common/FilterTabs";
import BlogCard from "../components/cards/BlogCard";
import { blogs } from "../data";

const TABS = ["All", "Personal", "Travel", "Technical"];

export default function BlogPage({ onSelectBlog }) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeTab);

  return (
    <SectionWrapper>
      <SectionTitle accent="Mindful" rest="Reflections" />

      <FilterTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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