import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import FilterTabs from "../components/common/FilterTabs";
import { photos } from "../data";

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
  isLabelPinned,
  isSelected,
  onPhotoClick,
  onFocus,
  onBlur,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldLoadEarly = index < EAGER_IMAGE_COUNT;

  useEffect(() => {
    setIsLoaded(false);
  }, [photo.id]);

  return (
    <button
      type="button"
      onClick={() => onPhotoClick(photo.id)}
      onFocus={() => onFocus(photo.id)}
      onBlur={onBlur}
      aria-label={`View description for ${photo.alt}`}
      aria-pressed={isSelected}
      className="
        group cursor-pointer overflow-hidden rounded-xs bg-gray-100 text-left
        transition-transform duration-200 ease-out
        hover:scale-[1.01] active:scale-[0.99]
        dark:bg-gray-800
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7]
        focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black
        [content-visibility:auto] [contain-intrinsic-size:400px_532px]
      "
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
              absolute inset-0 h-full w-full object-cover
              transition-[opacity,transform] duration-500 ease-out
              group-hover:scale-[1.035]
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        )}

        <div
          className={`
            absolute right-3 top-3 z-10 max-w-[78%] rounded-full bg-white
            px-3.5 py-2 text-xs font-normal leading-snug tracking-[-0.01em]
            text-[#4075F7] antialiased shadow-[0_10px_30px_rgba(0,0,0,0.14)]
            transition-all duration-200 ease-out [font-synthesis:none]
            sm:right-4 sm:top-4 sm:px-4 sm:py-2.5 sm:text-sm
            group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
            ${
              isLabelPinned
                ? "translate-x-0 translate-y-0 opacity-100"
                : "pointer-events-none translate-x-2 -translate-y-2 opacity-0"
            }
          `}
        >
          {photo.alt}
        </div>
      </div>
    </button>
  );
});

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [focusedPhotoId, setFocusedPhotoId] = useState(null);

  const [randomizedPhotos] = useState(() => shuffleArray(photos));

  const canLoadImages = useDeferredImages(activeTab);

  const TABS = useMemo(() => {
    const years = photos.map((photo) => photo.year).filter(Boolean);

    return ["All", ...new Set(years)];
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "All") return randomizedPhotos;

    return randomizedPhotos.filter((photo) => photo.year === activeTab);
  }, [activeTab, randomizedPhotos]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelectedPhotoId(null);
    setFocusedPhotoId(null);
  }, []);

  const handlePhotoClick = useCallback((photoId) => {
    setSelectedPhotoId((currentId) =>
      currentId === photoId ? null : photoId
    );
  }, []);

  const handleFocus = useCallback((photoId) => {
    setFocusedPhotoId(photoId);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedPhotoId(null);
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle accent="Artistic" rest="Impressions" />

      <FilterTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredPhotos.map((photo, index) => {
          const isSelected = selectedPhotoId === photo.id;
          const isFocused = focusedPhotoId === photo.id;

          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              canLoadImages={canLoadImages}
              isSelected={isSelected}
              isLabelPinned={isSelected || isFocused}
              onPhotoClick={handlePhotoClick}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
