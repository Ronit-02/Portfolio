import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "../../icons";
import { cn } from "../../utils/cn";

export default function HoverImageCard({
  image,
  title,
  imageClassName = "h-64",
  cursorSize = 64,
}) {
  const [portalNode, setPortalNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCursorPosition, setHasCursorPosition] = useState(false);

  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);

  const half = cursorSize / 2;

  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  const updateCursorPosition = (event) => {
    cursorX.set(event.clientX - half);
    cursorY.set(event.clientY - half);
  };

  const handleMouseEnter = (event) => {
    updateCursorPosition(event);
    setHasCursorPosition(true);
    setIsVisible(true);
  };

  const handleMouseMove = (event) => {
    updateCursorPosition(event);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const cursor =
    portalNode && hasCursorPosition
      ? createPortal(
          <motion.div
            className={cn(
              "pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.18)] will-change-transform",
              cursorSize === 56 ? "h-14 w-14" : "h-16 w-16"
            )}
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={false}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.82,
            }}
            transition={{
              opacity: {
                duration: 0.16,
                ease: "easeOut",
              },
              scale: {
                type: "spring",
                stiffness: 520,
                damping: 28,
              },
            }}
          >
            <ArrowUpRight size={cursorSize === 56 ? 18 : 22} color="#111" />
          </motion.div>,
          portalNode
        )
      : null;

  return (
    <>
      <div
        className="relative mb-4 overflow-hidden bg-gray-100 group/image cursor-none rounded-xs dark:bg-gray-800"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full transform-gpu object-cover transition-transform duration-700 ease-out group-hover/image:scale-105",
            imageClassName
          )}
          loading="lazy"
        />

        <div className="absolute inset-0 transition-colors duration-500 ease-out bg-black/0 group-hover/image:bg-black/15" />
      </div>

      {cursor}
    </>
  );
}