import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import SectionTitle from "../components/common/SectionTitle";
import { experience } from "../data";
import { cn } from "../utils/cn";

const R = 16;

// Keep the cards substantial while leaving enough room for the animated road.
const CARD_W_PCT = 0.37;


const ROAD_GAP = 16;

const BASE_TOP_PADDING = 16;
const DOT_REACH_TOLERANCE = 3;
const EXTRA_SVG_BOTTOM = 140;
const ROAD_END_EXTRA = 80;

const ROAD_BASE_STROKE_WIDTH = 3;
const ROAD_ACTIVE_STROKE_WIDTH = 3.75;

const ROAD_REVEAL_TRANSITION = {
  duration: 1.45,
  ease: [0.22, 1, 0.36, 1],
};

// The blue fill is now card-calibrated instead of section-percentage based.
// A card becomes active when its center is around the viewport center.
// Tune this slightly if you want the highlight earlier/later:
// 0.5 = exact viewport center, 0.56 = a little lower/earlier, 0.44 = a little higher/later.
const CARD_TRIGGER_VIEWPORT_RATIO = 0.5;

// Extra scroll room before the first dot and after the last dot so the line
// does not feel like it races through the timeline.
const PATH_INTRO_SCROLL_MIN = 180;
const PATH_INTRO_SCROLL_MAX = 360;
const PATH_INTRO_SCROLL_RATIO = 0.28;
const PATH_OUTRO_SCROLL_MIN = 180;
const PATH_OUTRO_SCROLL_MAX = 360;
const PATH_OUTRO_SCROLL_RATIO = 0.28;

// Switch to a single-column mobile timeline before the cards become too narrow.
const MOBILE_BREAKPOINT = 820;
const MOBILE_CARD_ROAD_GAP = 34;
const MOBILE_EXTRA_SVG_BOTTOM = 90;
const MOBILE_MIN_HEIGHT = 520;

// Wider road spread.
const MAX_ROAD_HALF_WIDTH_PCT = 0.31;
const MIN_ROAD_GAP_PX = 180;
const MAX_ROAD_GAP_PX = 300;

const THEMES = {
  light: {
    roadBase: "#e6e8ec",
    roadActive: "#4075F7",

    dotHalo: "rgba(64,117,247,0.12)",
    dotInactiveFill: "#ffffff",
    dotInactiveStroke: "#d8dce3",
  },

  dark: {
    roadBase: "#3a3a3a",
    roadActive: "#60A5FA",

    dotHalo: "rgba(96,165,250,0.16)",
    dotInactiveFill: "#191919",
    dotInactiveStroke: "#5a5a5a",
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getInitialSvgWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth || 1024;
}

function getIsCompactLayout(W) {
  return W < MOBILE_BREAKPOINT;
}

function getMobileRoadX(W) {
  return Math.round(clamp(W * 0.08, 24, 42));
}

function getMobileCardInset(W) {
  const cardGap = W < 360 ? 24 : MOBILE_CARD_ROAD_GAP;

  return getMobileRoadX(W) + cardGap;
}

function getMobileRightPadding(W) {
  return W < 420 ? 4 : 12;
}

function getIsDarkMode() {
  if (typeof window === "undefined") return false;

  const root = document.documentElement;
  const body = document.body;

  if (root.classList.contains("dark") || body.classList.contains("dark")) {
    return true;
  }

  if (root.classList.contains("light") || body.classList.contains("light")) {
    return false;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function rectsAreClose(a, b, tolerance = 0.5) {
  if (a.length !== b.length) return false;

  return a.every((ra, i) => {
    const rb = b[i];

    if (!ra || !rb) return false;

    return (
      Math.abs(ra.top - rb.top) <= tolerance &&
      Math.abs(ra.bottom - rb.bottom) <= tolerance &&
      Math.abs(ra.left - rb.left) <= tolerance &&
      Math.abs(ra.right - rb.right) <= tolerance
    );
  });
}

function getRoadRails(cardRects, W) {
  const rects = [...cardRects].sort((a, b) => a.top - b.top);

  const leftRects = rects.filter((_, i) => i % 2 === 0);
  const rightRects = rects.filter((_, i) => i % 2 !== 0);

  const CX = W / 2;

  const maxHalfWidth = W * MAX_ROAD_HALF_WIDTH_PCT;
  const minRoadGap = Math.min(
    MAX_ROAD_GAP_PX,
    Math.max(MIN_ROAD_GAP_PX, W * 0.18)
  );

  const rawLX = leftRects.length
    ? Math.max(...leftRects.map((r) => r.right)) + ROAD_GAP
    : CX - minRoadGap / 2;

  const rawRX = rightRects.length
    ? Math.min(...rightRects.map((r) => r.left)) - ROAD_GAP
    : CX + minRoadGap / 2;

  const LX = clamp(rawLX, CX - maxHalfWidth, CX - minRoadGap / 2);
  const RX = clamp(rawRX, CX + minRoadGap / 2, CX + maxHalfWidth);

  return { LX, RX };
}

function getSideX(side, LX, RX) {
  return side === "left" ? LX : RX;
}

function getSideForIndex(index) {
  return index % 2 === 0 ? "left" : "right";
}

function getCardSegmentBounds(rect) {
  return {
    T: Math.max(0, rect.top - ROAD_GAP),
    C: (rect.top + rect.bottom) / 2,
    B: rect.bottom + ROAD_GAP,
  };
}

function buildRoadPath(cardRects, W, isCompact = false) {
  if (!cardRects.length) return "";

  const rects = [...cardRects].sort((a, b) => a.top - b.top);

  if (isCompact) {
    const x = getMobileRoadX(W);

    // On smaller screens, keep one clean rail beside the stacked cards.
    // The dot still sits at each card's exact vertical center.
    let d = `M ${x} 0`;

    rects.forEach((rect, i) => {
      const { T, B } = getCardSegmentBounds(rect);
      const isLast = i === rects.length - 1;

      d += ` L ${x} ${T}`;
      d += ` L ${x} ${B}`;

      if (isLast) {
        d += ` L ${x} ${B + ROAD_END_EXTRA}`;
      }
    });

    return d;
  }

  const { LX, RX } = getRoadRails(rects, W);

  const firstSide = getSideForIndex(0);
  const firstX = getSideX(firstSide, LX, RX);

  // Start on the first card's side rail instead of dropping from the center.
  let d = `M ${firstX} 0`;

  rects.forEach((rect, i) => {
    const side = getSideForIndex(i);
    const x = getSideX(side, LX, RX);
    const { T, B } = getCardSegmentBounds(rect);
    const isLast = i === rects.length - 1;

    // Each card owns a local vertical segment from T to B.
    // Because T and B are based on the card top/bottom with equal padding,
    // the card center and dot sit in the middle of that vertical road section.
    d += ` L ${x} ${T}`;
    d += ` L ${x} ${B}`;

    if (isLast) {
      // Keep the road ending on the same side as the last card.
      d += ` L ${x} ${B + ROAD_END_EXTRA}`;
      return;
    }

    const nextRect = rects[i + 1];
    const nextSide = getSideForIndex(i + 1);
    const nextX = getSideX(nextSide, LX, RX);
    const { T: nextT } = getCardSegmentBounds(nextRect);

    const gap = Math.max(2 * R, nextT - B);
    const turnRadius = Math.min(R, gap / 2);
    const turnY = B + gap / 2;
    const movingRight = nextX > x;
    const exitX = movingRight ? x + turnRadius : x - turnRadius;
    const entryX = movingRight ? nextX - turnRadius : nextX + turnRadius;

    // Move across in the vertical gap between cards, not at the previous
    // card's bottom. This keeps every card centered on its own rail section.
    d += ` L ${x} ${turnY - turnRadius}`;
    d += ` Q ${x} ${turnY} ${exitX} ${turnY}`;
    d += ` L ${entryX} ${turnY}`;
    d += ` Q ${nextX} ${turnY} ${nextX} ${turnY + turnRadius}`;
  });

  return d;
}

function getPointerPoints(cardRects, W, isCompact = false) {
  if (!cardRects.length) return [];

  const rects = [...cardRects].sort((a, b) => a.top - b.top);

  if (isCompact) {
    const x = getMobileRoadX(W);

    return rects.map((rect) => {
      const { C } = getCardSegmentBounds(rect);

      return {
        x,
        y: C,
      };
    });
  }

  const { LX, RX } = getRoadRails(rects, W);

  // Pointer is placed at the exact vertical center of each measured card.
  return rects.map((rect, i) => {
    const side = getSideForIndex(i);
    const { C } = getCardSegmentBounds(rect);

    return {
      x: getSideX(side, LX, RX),
      y: C,
    };
  });
}

function getClosestLengthOnPath(pathEl, target, totalLength) {
  let bestLength = 0;
  let bestDist = Infinity;

  const samples = 350;

  for (let i = 0; i <= samples; i++) {
    const length = (totalLength * i) / samples;
    const point = pathEl.getPointAtLength(length);

    const dx = point.x - target.x;
    const dy = point.y - target.y;
    const dist = dx * dx + dy * dy;

    if (dist < bestDist) {
      bestDist = dist;
      bestLength = length;
    }
  }

  const windowSize = totalLength / samples;
  let start = Math.max(0, bestLength - windowSize);
  let end = Math.min(totalLength, bestLength + windowSize);

  for (let i = 0; i < 16; i++) {
    const m1 = start + (end - start) / 3;
    const m2 = end - (end - start) / 3;

    const p1 = pathEl.getPointAtLength(m1);
    const p2 = pathEl.getPointAtLength(m2);

    const d1 =
      (p1.x - target.x) * (p1.x - target.x) +
      (p1.y - target.y) * (p1.y - target.y);

    const d2 =
      (p2.x - target.x) * (p2.x - target.x) +
      (p2.y - target.y) * (p2.y - target.y);

    if (d1 < d2) {
      end = m2;
    } else {
      start = m1;
    }
  }

  return (start + end) / 2;
}

function countReachedDots(lengths, activeLength) {
  let count = 0;

  for (const length of lengths) {
    if (activeLength >= length - DOT_REACH_TOLERANCE) {
      count += 1;
    }
  }

  return count;
}

export default function ExperiencePage() {
  const containerRef = useRef(null);
  const cardRefs = useRef(experience.map(() => null));
  const pathMeasureRef = useRef(null);
  const activePathRef = useRef(null);

  const resizeRafRef = useRef(null);
  const scrollRafRef = useRef(null);

  const progressRef = useRef(0);
  const roadRevealRef = useRef(0);
  const pathLenRef = useRef(1);
  const dotLengthsRef = useRef([]);
  const activeDotCountRef = useRef(0);
  const revealedDotCountRef = useRef(0);

  const [isDark, setIsDark] = useState(() => getIsDarkMode());
  const [cardRectData, setCardRectData] = useState([]);
  const [svgW, setSvgW] = useState(() => getInitialSvgWidth());
  const [svgH, setSvgH] = useState(800);
  const [pathLen, setPathLen] = useState(1);
  const [dotLengths, setDotLengths] = useState([]);
  const topRoadPadding = BASE_TOP_PADDING;
  const [layoutReady, setLayoutReady] = useState(false);
  const [pathReady, setPathReady] = useState(false);
  const [activeDotCount, setActiveDotCount] = useState(0);
  const [revealedDotCount, setRevealedDotCount] = useState(0);

  const theme = isDark ? THEMES.dark : THEMES.light;
  const isCompact = getIsCompactLayout(svgW);
  const extraSvgBottom = isCompact ? MOBILE_EXTRA_SVG_BOTTOM : EXTRA_SVG_BOTTOM;
  const mobileCardInset = getMobileCardInset(svgW);
  const mobileRightPadding = getMobileRightPadding(svgW);

  const syncRoadProgress = useCallback(() => {
    const visibleProgress = Math.min(progressRef.current, roadRevealRef.current);
    const totalLength = pathLenRef.current || 1;
    const activeLength = totalLength * visibleProgress;
    const revealedLength = totalLength * roadRevealRef.current;

    if (activePathRef.current) {
      activePathRef.current.setAttribute(
        "stroke-dashoffset",
        String(totalLength - activeLength)
      );
    }

    const nextActiveDotCount = countReachedDots(
      dotLengthsRef.current,
      activeLength
    );

    if (activeDotCountRef.current !== nextActiveDotCount) {
      activeDotCountRef.current = nextActiveDotCount;
      setActiveDotCount(nextActiveDotCount);
    }

    const nextRevealedDotCount = countReachedDots(
      dotLengthsRef.current,
      revealedLength
    );

    if (revealedDotCountRef.current !== nextRevealedDotCount) {
      revealedDotCountRef.current = nextRevealedDotCount;
      setRevealedDotCount(nextRevealedDotCount);
    }
  }, []);

  const measureScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const winH = window.innerHeight || 1;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const sectionTop = scrollY + cRect.top;

    const totalLength = pathLenRef.current || 1;
    const lengths = dotLengthsRef.current;
    const sortedRects = [...cardRectData].sort((a, b) => a.top - b.top);

    if (!sortedRects.length || !lengths.length) {
      progressRef.current = 0;
      syncRoadProgress();
      return;
    }

    // Better than using one section-wide percentage: build scroll keyframes.
    // Each dot's path length is reached exactly when that card's vertical
    // center reaches the viewport playhead. This keeps highlights synced to
    // the card the user is actually looking at, while the line still fills
    // smoothly between cards.
    const triggerOffset = winH * CARD_TRIGGER_VIEWPORT_RATIO;
    const triggerScrolls = sortedRects.map((rect) => {
      const cardCenterY = (rect.top + rect.bottom) / 2;
      return sectionTop + cardCenterY - triggerOffset;
    });

    const introScroll = clamp(
      winH * PATH_INTRO_SCROLL_RATIO,
      PATH_INTRO_SCROLL_MIN,
      PATH_INTRO_SCROLL_MAX
    );

    const outroScroll = clamp(
      winH * PATH_OUTRO_SCROLL_RATIO,
      PATH_OUTRO_SCROLL_MIN,
      PATH_OUTRO_SCROLL_MAX
    );

    const keyframes = [
      {
        scrollY: triggerScrolls[0] - introScroll,
        length: 0,
      },
      ...triggerScrolls.map((triggerScroll, i) => ({
        scrollY: triggerScroll,
        length: lengths[i] ?? 0,
      })),
      {
        scrollY: triggerScrolls[triggerScrolls.length - 1] + outroScroll,
        length: totalLength,
      },
    ];

    let activeLength = 0;

    if (scrollY <= keyframes[0].scrollY) {
      activeLength = 0;
    } else if (scrollY >= keyframes[keyframes.length - 1].scrollY) {
      activeLength = totalLength;
    } else {
      for (let i = 1; i < keyframes.length; i++) {
        const prevFrame = keyframes[i - 1];
        const nextFrame = keyframes[i];

        if (scrollY <= nextFrame.scrollY) {
          const span = Math.max(1, nextFrame.scrollY - prevFrame.scrollY);
          const localProgress = clamp(
            (scrollY - prevFrame.scrollY) / span,
            0,
            1
          );

          activeLength =
            prevFrame.length +
            (nextFrame.length - prevFrame.length) * localProgress;
          break;
        }
      }
    }

    progressRef.current = clamp(activeLength / totalLength, 0, 1);

    syncRoadProgress();
  }, [cardRectData, syncRoadProgress]);

  const updateProgress = useCallback(() => {
    if (scrollRafRef.current) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      measureScrollProgress();
    });
  }, [measureScrollProgress]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(getIsDarkMode());
    };

    updateTheme();

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", updateTheme);
    } else if (mediaQuery?.addListener) {
      mediaQuery.addListener(updateTheme);
    }

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", updateTheme);
      } else if (mediaQuery?.removeListener) {
        mediaQuery.removeListener(updateTheme);
      }

      observer.disconnect();
    };
  }, []);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    if (!W || !H) return;

    const rects = cardRefs.current.map((el) => {
      if (!el) return null;

      const r = el.getBoundingClientRect();

      return {
        top: r.top - cRect.top,
        bottom: r.bottom - cRect.top,
        left: r.left - cRect.left,
        right: r.right - cRect.left,
      };
    });

    if (!rects.every(Boolean)) return;

    setSvgW((prev) => (Math.abs(prev - W) > 0.5 ? W : prev));
    setSvgH((prev) => (Math.abs(prev - H) > 0.5 ? H : prev));

    setCardRectData((prev) => {
      if (rectsAreClose(prev, rects)) return prev;
      return rects;
    });

    setLayoutReady(true);
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (resizeRafRef.current) {
      cancelAnimationFrame(resizeRafRef.current);
    }

    resizeRafRef.current = requestAnimationFrame(() => {
      resizeRafRef.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    measure();

    let rafTwo = null;

    const rafOne = requestAnimationFrame(() => {
      measure();
      rafTwo = requestAnimationFrame(measure);
    });

    window.addEventListener("resize", scheduleMeasure);

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleMeasure);

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      cardRefs.current.forEach((el) => {
        if (el) resizeObserver.observe(el);
      });
    }

    return () => {
      cancelAnimationFrame(rafOne);

      if (rafTwo) {
        cancelAnimationFrame(rafTwo);
      }

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      window.removeEventListener("resize", scheduleMeasure);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [measure, scheduleMeasure]);

  const pathD = useMemo(() => {
    if (!layoutReady || !cardRectData.length) return "";
    return buildRoadPath(cardRectData, svgW, isCompact);
  }, [layoutReady, cardRectData, svgW, isCompact]);

  const dotPoints = useMemo(() => {
    if (!layoutReady || !cardRectData.length) return [];
    return getPointerPoints(cardRectData, svgW, isCompact);
  }, [layoutReady, cardRectData, svgW, isCompact]);

  useLayoutEffect(() => {
    if (!pathMeasureRef.current || !pathD || !dotPoints.length) {
      setPathReady(false);
      return;
    }

    try {
      const totalLength = pathMeasureRef.current.getTotalLength();

      const lengths = dotPoints.map((point) =>
        getClosestLengthOnPath(pathMeasureRef.current, point, totalLength)
      );

      pathLenRef.current = totalLength;
      dotLengthsRef.current = lengths;
      activeDotCountRef.current = 0;
      revealedDotCountRef.current = 0;
      roadRevealRef.current = 0;

      setPathLen(totalLength);
      setDotLengths(lengths);
      setActiveDotCount(0);
      setRevealedDotCount(0);
      setPathReady(true);
    } catch {
      setPathReady(false);
    }
  }, [pathD, dotPoints]);

  useLayoutEffect(() => {
    measureScrollProgress();
  }, [measureScrollProgress, pathReady, svgH, topRoadPadding, dotLengths, extraSvgBottom]);

  useEffect(() => {
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [updateProgress]);

  const dotReached = experience.map((_, i) => i < activeDotCount);
  const dotRevealed = experience.map((_, i) => i < revealedDotCount);

  const showRoad = layoutReady && pathD;

  return (
    <SectionWrapper className="pb-60">
      <SectionTitle accent="My Story" rest="Unfolds" />

      <motion.div
        ref={containerRef}
        className="relative min-h-[var(--experience-min-height)] pb-[var(--experience-pad-bottom)] pt-[var(--experience-pad-top)]"
        animate={{
          "--experience-pad-top": `${topRoadPadding}px`,
          "--experience-pad-bottom": `${extraSvgBottom}px`,
          "--experience-min-height": `${isCompact ? MOBILE_MIN_HEIGHT : 600}px`,
        }}
        transition={{ duration: 0 }}
      >
        {showRoad && (
          <svg
            className="absolute top-0 left-0 z-0 w-full overflow-visible pointer-events-none"
            width="100%"
            height={svgH + extraSvgBottom}
            viewBox={`0 0 ${svgW} ${svgH + extraSvgBottom}`}
            preserveAspectRatio="none"
          >
            <path
              ref={pathMeasureRef}
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
              opacity="0"
            />

            {pathReady && (
              <>
                <motion.path
                  key={`road-base-${pathD}`}
                  d={pathD}
                  fill="none"
                  stroke={theme.roadBase}
                  strokeWidth={ROAD_BASE_STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={ROAD_REVEAL_TRANSITION}
                  onAnimationStart={() => {
                    roadRevealRef.current = 0;
                    revealedDotCountRef.current = 0;
                    setRevealedDotCount(0);
                    syncRoadProgress();
                  }}
                  onUpdate={(latest) => {
                    const next =
                      typeof latest.pathLength === "number"
                        ? clamp(latest.pathLength, 0, 1)
                        : 0;

                    roadRevealRef.current = next;
                    syncRoadProgress();
                  }}
                  onAnimationComplete={() => {
                    roadRevealRef.current = 1;
                    syncRoadProgress();
                  }}
                />

                <path
                  ref={activePathRef}
                  d={pathD}
                  fill="none"
                  stroke={theme.roadActive}
                  strokeWidth={ROAD_ACTIVE_STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={pathLen}
                  strokeDashoffset={pathLen}
                />

                {dotPoints.map((point, index) => (
                  <g
                    key={`${point.x}-${point.y}-${index}`}
                    className="transition-opacity duration-200"
                    opacity={dotRevealed[index] ? 1 : 0}
                  >
                    {dotReached[index] && (
                      <circle cx={point.x} cy={point.y} r={13} fill={theme.dotHalo} />
                    )}

                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={7}
                      fill={
                        dotReached[index]
                          ? theme.roadActive
                          : theme.dotInactiveFill
                      }
                      stroke={
                        dotReached[index]
                          ? theme.roadActive
                          : theme.dotInactiveStroke
                      }
                      strokeWidth="2"
                      className="transition-[fill,stroke] duration-500"
                    />
                  </g>
                ))}
              </>
            )}
          </svg>
        )}

        {experience.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const active = dotReached[index];
          const rowMarginBottom = index === experience.length - 1 ? 0 : isCompact ? 56 : 80;

          return (
            <motion.div
              key={exp.id}
              className={cn(
                "relative z-[1] mb-[var(--row-margin)] flex box-border items-center",
                isCompact
                  ? "justify-start pl-[var(--mobile-card-inset)] pr-[var(--mobile-right-padding)]"
                  : isLeft
                    ? "justify-start pl-[3.5%]"
                    : "justify-end pr-[3.5%]"
              )}
              animate={{
                "--mobile-card-inset": `${mobileCardInset}px`,
                "--mobile-right-padding": `${mobileRightPadding}px`,
                "--row-margin": `${rowMarginBottom}px`,
              }}
              transition={{ duration: 0 }}
            >
              <motion.div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="relative w-[var(--card-width)]"
                animate={{ "--card-width": isCompact ? "100%" : `${CARD_W_PCT * 100}%` }}
                transition={{ duration: 0 }}
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={cn(
                    "group relative box-border w-full overflow-hidden rounded-[1.4rem] border [overflow-wrap:break-word] transition-[border-color,background-color,box-shadow] duration-300",
                    "bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_36px_rgba(15,23,42,0.045)]",
                    "hover:border-[#4075F7]/35 hover:shadow-[0_18px_48px_rgba(64,117,247,0.13)]",
                    "dark:bg-[#202020] dark:shadow-[0_1px_2px_rgba(0,0,0,0.18),0_14px_34px_rgba(0,0,0,0.16)] dark:hover:border-blue-400/40 dark:hover:bg-[#242424] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.24)]",
                    isCompact ? "px-4 py-5 xs:px-5" : "px-7 py-6",
                    active
                      ? "border-[#4075F7]/30 bg-[#fbfcff] shadow-[0_16px_44px_rgba(64,117,247,0.11)] dark:border-blue-400/35 dark:bg-[#232830]"
                      : "border-gray-200/80 dark:border-[#373737]"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 left-0 w-1 origin-bottom rounded-r-full bg-[#4075F7] transition-transform duration-500 dark:bg-blue-400",
                      active
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-100"
                    )}
                  />

                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#4075F7]/[0.07] blur-2xl transition-opacity duration-500 dark:bg-blue-400/[0.08]",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  />

                  <div className="relative flex items-center justify-between gap-2 xs:gap-4">
                    <time
                      className={cn(
                        "rounded-full border px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                        active
                          ? "border-[#4075F7]/20 bg-[#4075F7]/[0.07] text-[#4075F7] dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300"
                          : "border-gray-200 bg-gray-50 text-gray-500 group-hover:border-[#4075F7]/20 group-hover:text-[#4075F7] dark:border-[#404040] dark:bg-[#292929] dark:text-[#aaa9a6] dark:group-hover:border-blue-400/30 dark:group-hover:text-blue-300"
                      )}
                    >
                      {exp.year}
                    </time>

                    <span className="font-mono text-[10px] tracking-[0.14em] text-gray-300 dark:text-[#696866]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "relative mt-6 font-bold leading-[1.08] tracking-[-0.03em] text-gray-950 transition-colors duration-300 dark:text-[#e3e2e0]",
                      "group-hover:text-[#4075F7] dark:group-hover:text-blue-300",
                      isCompact ? "text-[1.2rem]" : "text-[1.35rem]"
                    )}
                  >
                    {exp.title}
                  </h3>

                  <div className="relative mt-3 flex items-center gap-2.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow] duration-300",
                        active
                          ? "bg-[#4075F7] shadow-[0_0_0_4px_rgba(64,117,247,0.1)] dark:bg-blue-400 dark:shadow-[0_0_0_4px_rgba(96,165,250,0.12)]"
                          : "bg-gray-300 group-hover:bg-[#4075F7] dark:bg-gray-600 dark:group-hover:bg-blue-400"
                      )}
                    />
                    <p
                      className={cn(
                        "text-[10px] font-bold uppercase text-gray-500 transition-colors duration-300 dark:text-[#aaa9a6]",
                        "group-hover:text-gray-700 dark:group-hover:text-gray-200",
                        isCompact ? "tracking-[0.14em]" : "tracking-[0.18em]"
                      )}
                    >
                      {exp.company}
                    </p>
                  </div>
                </motion.article>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
