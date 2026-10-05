import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import FilterTabs from "../components/common/FilterTabs";
import ImageHoverLabel from "../components/common/ImageHoverLabel";
import { photos } from "../data";
import { createNewestFirstFilterTabs } from "../utils/filterOptions";

const IMAGE_LOAD_DELAY_MS = 180;
const EAGER_IMAGE_COUNT = 3;

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
};

function useDeferredImages(resetKey) {
  const [canLoadImages, setCanLoadImages] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let frameId = null;
    let timeoutId = null;
    let idleId = null;
    let isCancelled = false;

    setCanLoadImages(false);

    const enableImages = () => {
      if (!isCancelled) {
        setCanLoadImages(true);
      }
    };

    frameId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(enableImages, {
            timeout: 700,
          });
        } else {
          enableImages();
        }
      }, IMAGE_LOAD_DELAY_MS);
    });

    return () => {
      isCancelled = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [resetKey]);

  return canLoadImages;
}

const PhotoCard = memo(function PhotoCard({
  photo,
  index,
  canLoadImages,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHoverDismissed, setIsHoverDismissed] = useState(false);
  const shouldLoadEarly = index < EAGER_IMAGE_COUNT;

  useEffect(() => {
    setIsLoaded(false);
  }, [photo.id]);

  return (
    <figure
      onPointerDown={() => setIsHoverDismissed(true)}
      onPointerLeave={() => setIsHoverDismissed(false)}
      className={`
        photo-hover-surface overflow-hidden rounded-xs bg-gray-100 text-left
        transition-transform duration-200 ease-out
        dark:bg-gray-800
        [content-visibility:auto] [contain-intrinsic-size:400px_532px]
        motion-reduce:transition-none
        ${isHoverDismissed ? "is-hover-dismissed" : ""}
      `}
    >
      <div className="relative overflow-hidden pb-[133%]">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" />
        )}

        {canLoadImages && (
          <img
            src={photo.image}
            alt={photo.alt}
            loading={shouldLoadEarly ? "eager" : "lazy"}
            fetchpriority={shouldLoadEarly ? "high" : "low"}
            decoding="async"
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
            className={`
              photo-hover-media absolute inset-0 h-full w-full object-cover
              transition-[opacity,transform] duration-500 ease-out
              motion-reduce:transition-none
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        )}

        <ImageHoverLabel>{photo.alt}</ImageHoverLabel>
      </div>
    </figure>
  );
});

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState("All");

  const [randomizedPhotos] = useState(() => shuffleArray(photos));

  const canLoadImages = useDeferredImages(activeTab);

  const TABS = useMemo(() => {
    const years = photos.map((photo) => photo.year).filter(Boolean);

    return createNewestFirstFilterTabs(years);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "All") return randomizedPhotos;

    return randomizedPhotos.filter((photo) => photo.year === activeTab);
  }, [activeTab, randomizedPhotos]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <SectionWrapper>
      <FilterTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
        ariaLabel="Filter photos by year"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            canLoadImages={canLoadImages}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
