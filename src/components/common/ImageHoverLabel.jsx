import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export default function ImageHoverLabel({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const labelId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsidePress = (event) => {
      const surface = triggerRef.current?.closest(".photo-hover-surface");

      if (surface && !surface.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isOpen]);

  return (
    <>
      <figcaption
        id={labelId}
        className={cn(
          "photo-hover-label pointer-events-none absolute right-3 top-3 z-10 max-w-[78%] rounded-full bg-white/95 px-3.5 py-2 text-xs font-normal leading-snug tracking-[-0.01em] text-[#4075F7] shadow-[0_10px_30px_rgba(0,0,0,0.14)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-200 ease-out [font-synthesis:none] dark:bg-[#171717]/95 dark:text-[#8EADFF] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] dark:ring-white/10 sm:right-4 sm:top-4 sm:px-4 sm:py-2.5 sm:text-sm motion-reduce:transition-none",
          isOpen && "is-touch-visible"
        )}
      >
        {children}
      </figcaption>

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={labelId}
        aria-label={isOpen ? "Hide image information" : "Show image information"}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
        className="photo-info-trigger absolute inset-0 z-20 cursor-pointer border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/90"
      />
    </>
  );
}
