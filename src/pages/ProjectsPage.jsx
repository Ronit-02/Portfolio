import { useMemo, useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import FilterTabs from "../components/common/FilterTabs";
import ProjectCard from "../components/cards/ProjectCard";
import { projects } from "../data";
import { createAlphabeticalFilterTabs } from "../utils/filterOptions";

const ALL_TAB = "All";

const magazineLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
];

function getProjectCategories(project) {
  if (Array.isArray(project.categories)) return project.categories;
  if (Array.isArray(project.tags)) return project.tags;
  if (project.category) return [project.category];

  return [];
}

export default function ProjectsPage({ onSelectProject }) {
  const [activeTab, setActiveTab] = useState(ALL_TAB);

  const tabs = useMemo(() => {
    const categories = projects.flatMap((project) =>
      getProjectCategories(project)
    );

    return createAlphabeticalFilterTabs(categories);
  }, []);

  const filtered =
    activeTab === ALL_TAB
      ? projects
      : projects.filter((project) =>
          getProjectCategories(project).includes(activeTab)
        );

  return (
    <SectionWrapper>
      <SectionTitle accent="Project" rest="Spotlight" />

      <FilterTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Filter projects by category"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[minmax(220px,auto)] gap-4">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={`${magazineLayout[i % magazineLayout.length]} min-h-[220px]`}
          >
            <ProjectCard
              project={project}
              onClick={onSelectProject}
              index={i}
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
