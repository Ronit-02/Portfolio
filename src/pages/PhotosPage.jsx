import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import FilterTabs from "../components/common/FilterTabs";
import { photos } from "../data";

const TABS = ["All", "2024", "2023"];

export default function PhotosPage() {

  const images = Array.from(
    { length: 10 },
    (_, i) => `/gallery/image-${i + 1}.png`
  );
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? photos : photos.filter((p) => p.year === activeTab);

  return (
    <SectionWrapper>
      <SectionTitle accent="Artistic" rest="Impressions" />
      <FilterTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {/* Portrait grid — tall aspect ratio matching the original design screenshots */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: i * 0.06 }}
            whileHover={{ scale: 1.02 }}
            className="overflow-hidden bg-gray-100 cursor-pointer rounded-xs dark:bg-gray-800 group"
          >
            {/* Portrait ratio ~3:4 */}
            <div className="relative pb-[133%]">
              <img
                src={photo.image}
                alt={photo.alt}
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
