import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "../../data";
import {
  AboutIcon,
  BlogIcon,
  ContactIcon,
  ExperienceIcon,
  HomeIcon,
  MoonIcon,
  MusicIcon,
  PhotosIcon,
  ProjectsIcon,
  SettingsIcon,
  SunIcon,
  XClose,
} from "../../icons";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../utils/cn";
import SocialRail from "../common/SocialRail";
import { COMMANDS_LIST, OUTPUTS } from "../terminal/terminalData";

const ICON_MAP = {
  home: HomeIcon,
  about: AboutIcon,
  experience: ExperienceIcon,
  projects: ProjectsIcon,
  blog: BlogIcon,
  photos: PhotosIcon,
  contact: ContactIcon,
  settings: SettingsIcon,
};

const INITIAL_COMMANDS = ["whoami", "ls projects", "social", "help"];
const INITIAL_SUGGESTIONS = INITIAL_COMMANDS.map((command) =>
  COMMANDS_LIST.find(({ cmd }) => cmd === command)
).filter(Boolean);

const MOBILE_BREAKPOINT = 640;
const DESKTOP_BREAKPOINT = 1024;
const MOBILE_PRIMARY_IDS = ["home", "about", "projects", "contact"];
const TABLET_PRIMARY_IDS = ["home", "about", "experience", "projects", "photos", "contact"];

const PILL_PHASE = {
  NAV: "nav",
  ICONS_OUT: "iconsOut",
  MORPH_TO_CMD: "morphToCmd",
  CMD: "cmd",
  CMD_OUT: "cmdOut",
  MORPH_TO_NAV: "morphToNav",
};

function getViewportWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

function useViewport() {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(getViewportWidth());

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const isTablet = viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < DESKTOP_BREAKPOINT;

  return { viewportWidth, isMobile, isTablet, isCompact: isMobile || isTablet };
}

function MoreIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.4" : "2.1"} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function NavSurface({ children, className = "" }) {
  return (
    <div className={cn("border border-black/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:border-[#3a3a3a] dark:bg-[#252525]", className)}>
      {children}
    </div>
  );
}

function ToggleSwitch({ active, label, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative h-[22px] w-10 shrink-0 cursor-pointer rounded-full border-none transition-colors duration-200",
        active ? "bg-[#4075F7]" : "bg-gray-300"
      )}
      aria-pressed={active}
      aria-label={`Toggle ${label}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="absolute top-0.5 h-[17px] w-[17px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        animate={{ left: active ? 21 : 2 }}
      />
    </button>
  );
}

function SettingsContent({ onClose, onBack, showBack = false }) {
  const { dark, setDark, music, setMusic } = useTheme();
  const settings = [
    { label: "Dark Mode", icon: dark ? <MoonIcon /> : <SunIcon />, value: dark, setValue: setDark },
    { label: "Background Music", icon: <MusicIcon on={music} />, value: music, setValue: setMusic },
  ];

  return (
    <div>
      <div className={cn("flex items-center justify-between", showBack ? "mb-2.5" : "mb-4")}>
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-[#999] dark:text-[#666]"
              aria-label="Back to more menu"
            >
              <BackIcon />
            </button>
          )}
          <span className={cn("text-[#111] dark:text-[#f1f1f1]", showBack ? "text-xs font-normal" : "text-sm font-semibold")}>Settings</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer border-none bg-transparent p-0 text-[#999] dark:text-[#666]"
          aria-label="Close settings"
        >
          <XClose />
        </button>
      </div>

      {settings.map(({ label, icon, value, setValue }) => (
        <div key={label} className={cn("flex items-center justify-between", showBack ? "mb-2.5" : "mb-4")}>
          <div className={cn("flex items-center gap-2 font-normal text-[#111] dark:text-[#f1f1f1]", showBack ? "text-xs [&>svg]:h-4 [&>svg]:w-4" : "text-sm")}>
            {icon}
            <span>{label}</span>
          </div>
          <ToggleSwitch active={value} label={label} onToggle={() => setValue(!value)} />
        </div>
      ))}

      <div className={cn("border-t border-black/10 dark:border-white/10", showBack ? "pt-2" : "pt-3")}>
        <p className={cn("text-[#999] dark:text-[#666]", showBack ? "text-[10px]" : "text-xs")}>
          {profile.fullName} - {profile.portfolioLabel}
        </p>
      </div>
    </div>
  );
}

function SettingsPanel({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="pointer-events-auto absolute bottom-[calc(100%+0.75rem)] right-0 z-20 w-60 origin-bottom-right"
    >
      <NavSurface className="p-4 rounded-2xl">
        <SettingsContent onClose={onClose} />
      </NavSurface>
    </motion.div>
  );
}

function MenuRow({ active, accent, icon, label, trailing, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-lg border-none bg-transparent px-2 py-1 text-left font-satoshi transition-colors",
        active && "bg-[#4075F7]/10",
        accent && "bg-[#4075F7]/10 text-[#4075F7]",
        !active && !accent && "text-[#666] dark:text-[#888]"
      )}
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className={cn("text-xs font-normal", active || accent ? "text-[#4075F7]" : "text-[#111] dark:text-[#f1f1f1]")}>{label}</span>
      {trailing && <span className="ml-auto font-mono text-[13px] text-[#4075F7]/80">{trailing}</span>}
    </button>
  );
}

function CompactSheet({
  view,
  items,
  activePage,
  onNavigate,
  onShowSettings,
  onBackToMenu,
  onClose,
}) {
  return (
    <motion.div
      key="compact-sheet"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="pointer-events-auto absolute bottom-[calc(100%+0.5rem)] right-0 z-20 w-[min(240px,calc(100vw-24px))] origin-bottom-right sm:w-[260px]"
    >
      <NavSurface className="overflow-hidden rounded-2xl p-1.5 shadow-[0_10px_34px_rgba(0,0,0,0.14)]">
        <AnimatePresence mode="wait" initial={false}>
          {view === "settings" ? (
            <motion.div
              key="settings-view"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="p-2"
            >
              <SettingsContent showBack onBack={onBackToMenu} onClose={onClose} />
            </motion.div>
          ) : (
            <motion.div
              key="menu-view"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {items.map(({ id, label }) => {
                const Icon = ICON_MAP[id];
                const active = activePage === id;

                return (
                  <MenuRow
                    key={id}
                    active={active}
                    icon={Icon && <Icon active={active} />}
                    label={label}
                    onClick={() => onNavigate(id)}
                  />
                );
              })}

              <div className="h-px mx-2 my-1 bg-black/10 dark:bg-white/10" />

              <MenuRow icon={<SettingsIcon active={false} />} label="Settings" onClick={onShowSettings} />

              <SocialRail compact />
            </motion.div>
          )}
        </AnimatePresence>
      </NavSurface>
    </motion.div>
  );
}

function TerminalPrompt({ command, compact = false }) {
  return (
    <div className="min-w-0 truncate font-mono text-[13px] leading-5">
      {!compact && (
        <span className="font-semibold text-[#4075F7]">
          {profile.firstName.toLowerCase()}@portfolio
        </span>
      )}
      <span className="text-[#8b93a1] dark:text-[#747d8d]">
        {compact ? "~ $ " : ":~$ "}
      </span>
      {command && (
        <span className="font-semibold text-[#17191f] dark:text-[#f4f6fb]">
          {command}
        </span>
      )}
    </div>
  );
}

function TerminalRow({ row }) {
  return (
    <div className="grid grid-cols-[minmax(5.25rem,0.7fr)_auto_minmax(0,1.5fr)] items-start gap-x-2.5 py-1.5 font-mono text-[10px] uppercase leading-[1.5] xs:grid-cols-[minmax(6.25rem,0.72fr)_auto_minmax(0,1.5fr)] xs:text-[11px] sm:grid-cols-[minmax(8.25rem,0.72fr)_auto_minmax(0,1.55fr)] sm:text-[11px]">
      <span
        className={cn(
          "min-w-0 break-words font-medium tracking-[-0.01em] text-[#69717f] dark:text-[#7f8898]",
          row.accent === "key" && "text-[#4075F7] dark:text-[#7ea2ff]"
        )}
      >
        {row.key}
      </span>
      <span className="select-none text-[#9aa2af] dark:text-[#515a6b]">:</span>
      <span
        className={cn(
          "min-w-0 break-words font-semibold tracking-[-0.01em] text-[#20242c] dark:text-[#e8ebf2]",
          row.accent === "value" && "text-[#4075F7] dark:text-[#7ea2ff]",
          row.accent === "status" && "text-emerald-500 dark:text-emerald-400"
        )}
      >
        {row.value}
      </span>
    </div>
  );
}

function OutputCard({ output, onRunCommand, width, compact }) {
  const scrollRef = useRef(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const content = output.error
    ? {
        title: "command error",
        meta: "exit 127",
        rows: [
          { key: "error", value: `command not found: ${output.cmd}` },
          { key: "hint", value: "run help to list available commands", accent: "value" },
        ],
      }
    : OUTPUTS[output.cmd];

  const domeWidth = Math.max(width - (compact ? 20 : 48), 276);

  const updateScrollIndicator = useCallback(() => {
    const scrollArea = scrollRef.current;

    if (!scrollArea) return;

    setCanScrollDown(
      scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight > 2
    );
  }, []);

  useLayoutEffect(() => {
    const scrollArea = scrollRef.current;

    if (!scrollArea) return undefined;

    scrollArea.scrollTop = 0;
    updateScrollIndicator();

    const resizeObserver = new ResizeObserver(updateScrollIndicator);
    resizeObserver.observe(scrollArea);

    return () => resizeObserver.disconnect();
  }, [output.cmd, output.error, updateScrollIndicator]);

  return (
    <motion.div
      key={output.cmd + (output.error ? "e" : "")}
      initial={{ opacity: 0, y: 18, scaleY: 0.88 }}
      animate={{ opacity: 1, y: 0, scaleY: 1, width: domeWidth }}
      exit={{ opacity: 0, y: 14, scaleY: 0.92 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto relative z-0 -mb-px max-w-[calc(100vw-28px)] origin-bottom overflow-hidden rounded-t-[999px] rounded-b-none border border-b-0 border-[#4075F7]/55 bg-[linear-gradient(180deg,rgba(255,253,248,0.98),rgba(249,248,244,0.96))] shadow-[0_-12px_34px_rgba(37,43,55,0.08)] backdrop-blur-xl dark:border-[#7ea2ff]/70 dark:bg-[linear-gradient(180deg,rgba(25,28,35,0.97),rgba(18,21,28,0.93))] dark:shadow-[0_-14px_40px_rgba(0,0,0,0.34)]",
        compact ? "h-[min(38vh,15rem)] min-h-[12rem]" : "h-[min(40vh,15.5rem)] min-h-[13rem]"
      )}
    >
      <div className="absolute inset-x-[8%] bottom-5 top-[4.25rem] flex min-h-0 items-center xs:inset-x-[9%] sm:inset-x-[10%] sm:bottom-6">
        <div
          ref={scrollRef}
          onScroll={updateScrollIndicator}
          className={cn(
            "terminal-scrollbar max-h-full w-full overscroll-contain overflow-y-auto px-1 sm:px-2",
            canScrollDown && "pb-7"
          )}
        >
          <div className="mx-4 mb-3.5 flex items-center justify-between gap-4 font-mono sm:mx-7">
            <div className="min-w-0 truncate text-[11px] font-semibold sm:text-[12px]">
              <span className="mr-2 text-[#4075F7] dark:text-[#7ea2ff]">$</span>
              <span className="text-[#252932] dark:text-[#e8ebf2]">{output.cmd}</span>
            </div>
            <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-[#747d8a] dark:text-[#747d8d] sm:text-[10px]">
              {content.meta}
            </span>
          </div>

          <div className="border-t border-[#262b35]/10 pt-2.5 dark:border-white/[0.08]">
            {content.rows.map((row, index) => (
              <TerminalRow
                key={`${row.key}-${row.value}-${index}`}
                row={row}
              />
            ))}
          </div>

          {output.error && (
            <button
              type="button"
              onClick={() => onRunCommand("help")}
              className="mt-2 cursor-pointer border-none bg-transparent p-0 font-mono text-[12px] font-semibold text-[#4075F7] hover:underline dark:text-[#7ea2ff]"
            >
              [ run help ]
            </button>
          )}
        </div>

        <AnimatePresence>
          {canScrollDown && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 bottom-0 flex h-8 items-end justify-center bg-gradient-to-t from-[#faf8f3] via-[#faf8f3]/90 to-transparent pb-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#4075F7] dark:from-[#151820] dark:via-[#151820]/90 dark:text-[#7ea2ff]"
            >
              <span className="flex items-center gap-1.5 rounded-full border border-[#4075F7]/20 bg-[#fffdf8]/90 px-2 py-0.5 shadow-sm dark:bg-[#181b23]/90">
                scroll
                <span className="text-[10px] leading-none">↓</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SuggestionList({ suggestions, activeIdx, onSelect, width }) {
  if (!suggestions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0, width }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="pointer-events-auto mb-3 max-h-72 max-w-[calc(100vw-24px)] space-y-1.5 overflow-y-auto p-1 scrollbar-hide"
    >
      <div className="sticky top-0 z-10 flex items-baseline justify-between gap-3 rounded-full border border-black/10 bg-[#fffdf8]/95 px-4 py-2 font-mono shadow-[0_8px_24px_rgba(37,43,55,0.07)] backdrop-blur-xl dark:border-[#7ea2ff]/15 dark:bg-[#12151c]/95">
        <span className="text-[12px] font-bold text-[#252932] dark:text-[#e8ebf2]">
          <span className="mr-1.5 text-[#4075F7] dark:text-[#7ea2ff]">//</span>
          commands
        </span>
        <span className="text-[11px] font-normal text-[#8b93a1] dark:text-[#747d8d]">
          {suggestions.length} {suggestions.length === 1 ? "match" : "matches"}
        </span>
      </div>

      {suggestions.map((suggestion, index) => {
        const active = index === activeIdx;

        return (
          <button
            key={suggestion.cmd}
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              onSelect(suggestion.cmd);
            }}
            className={cn(
              "grid w-full cursor-pointer grid-cols-[0.75rem_minmax(5.5rem,0.8fr)_minmax(0,1.2fr)] items-baseline gap-1.5 rounded-full border px-4 py-2.5 text-left font-mono shadow-[0_5px_18px_rgba(0,0,0,0.06)] transition-all xs:grid-cols-[1rem_minmax(6.75rem,0.8fr)_minmax(0,1.2fr)] xs:gap-2 sm:grid-cols-[1rem_minmax(8.5rem,0.8fr)_minmax(0,1.2fr)]",
              active
                ? "border-[#4075F7]/35 bg-[#4075F7]/10"
                : "border-black/10 bg-[#fffdf8]/95 hover:border-[#4075F7]/25 hover:bg-[#fffefa] dark:border-white/10 dark:bg-[#12151c]/95 dark:hover:border-[#7ea2ff]/20"
            )}
          >
            <span className="select-none text-[12px] text-[#4075F7] dark:text-[#7ea2ff]">$</span>
            <span className={cn("min-w-0 break-words text-[12px] font-semibold sm:text-[13px]", active ? "text-[#4075F7] dark:text-[#7ea2ff]" : "text-[#252932] dark:text-[#e8ebf2]")}>{suggestion.cmd}</span>
            <span className="min-w-0 text-[11px] font-normal text-[#7c8492] dark:text-[#7f8898] sm:text-[12px]">{suggestion.desc}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default function BottomNav({ activePage, onNavigate }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [compactSheetView, setCompactSheetView] = useState("menu");
  const [termOpen, setTermOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [output, setOutput] = useState(null);
  const [, setCmdHistory] = useState([]);
  const [, setHistIdx] = useState(-1);
  const [pillPhase, setPillPhase] = useState(PILL_PHASE.NAV);
  const [navMetrics, setNavMetrics] = useState({ width: 0, height: 0 });
  const [orbitOffsets, setOrbitOffsets] = useState([]);

  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const navRef = useRef(null);
  const ringRef = useRef(null);
  const sugRef = useRef(INITIAL_SUGGESTIONS);
  const activeRef = useRef(-1);
  const timersRef = useRef([]);

  const { dark, setDark, setMusic } = useTheme();
  const { viewportWidth, isMobile, isTablet, isCompact } = useViewport();

  const clearPhaseTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const after = useCallback((ms, fn) => {
    const timer = setTimeout(fn, ms);
    timersRef.current.push(timer);
  }, []);

  useEffect(() => () => clearPhaseTimers(), [clearPhaseTimers]);

  const nonSettings = navItems.filter((item) => item.id !== "settings");
  const compactPrimaryIds = isMobile ? MOBILE_PRIMARY_IDS : TABLET_PRIMARY_IDS;
  const visibleItems = isCompact ? nonSettings.filter((item) => compactPrimaryIds.includes(item.id)) : nonSettings;
  const compactMoreItems = isCompact ? nonSettings.filter((item) => !compactPrimaryIds.includes(item.id)) : [];
  const compactVisibleIds = visibleItems.map((item) => item.id);

  useEffect(() => {
    if (!isCompact) {
      setMoreOpen(false);
      setCompactSheetView("menu");
    } else {
      setSettingsOpen(false);
    }
  }, [isCompact]);

  useLayoutEffect(() => {
    if (navRef.current && (pillPhase === PILL_PHASE.NAV || pillPhase === PILL_PHASE.ICONS_OUT)) {
      const next = { width: navRef.current.offsetWidth, height: navRef.current.offsetHeight };
      setNavMetrics((previous) => (previous.width === next.width && previous.height === next.height ? previous : next));
    }
  }, [pillPhase, activePage, settingsOpen, moreOpen, compactSheetView, dark, isMobile, isTablet, isCompact, viewportWidth]);

  const closeCompactSheet = useCallback(() => {
    setMoreOpen(false);
    setCompactSheetView("menu");
  }, []);

  const openTerm = useCallback(() => {
    clearPhaseTimers();

    const measuredWidth = navRef.current?.offsetWidth || navMetrics.width || 320;
    const measuredHeight = navRef.current?.offsetHeight || navMetrics.height || 64;

    setNavMetrics({ width: measuredWidth, height: measuredHeight });
    setTermOpen(true);
    setMoreOpen(false);
    setCompactSheetView("menu");
    setSettingsOpen(false);
    setInputVal("");
    setSuggestions(INITIAL_SUGGESTIONS);
    sugRef.current = INITIAL_SUGGESTIONS;
    setOutput(null);
    setActiveIdx(-1);
    activeRef.current = -1;
    setPillPhase(PILL_PHASE.ICONS_OUT);

    after(130, () => setPillPhase(PILL_PHASE.MORPH_TO_CMD));
    after(380, () => setPillPhase(PILL_PHASE.CMD));
    after(470, () => inputRef.current?.focus());
  }, [after, clearPhaseTimers, navMetrics.height, navMetrics.width]);

  const closeTerm = useCallback(() => {
    clearPhaseTimers();
    inputRef.current?.blur();
    setPillPhase(PILL_PHASE.CMD_OUT);
    after(110, () => setPillPhase(PILL_PHASE.MORPH_TO_NAV));
    after(390, () => {
      setTermOpen(false);
      setInputVal("");
      setSuggestions(INITIAL_SUGGESTIONS);
      sugRef.current = INITIAL_SUGGESTIONS;
      setOutput(null);
      setActiveIdx(-1);
      activeRef.current = -1;
      setPillPhase(PILL_PHASE.NAV);
    });
  }, [after, clearPhaseTimers]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", termOpen);

    return () => document.body.classList.remove("overflow-hidden");
  }, [termOpen]);

  useEffect(() => {
    const handleKey = (event) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.key === "/") {
        event.preventDefault();
        termOpen ? closeTerm() : openTerm();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [termOpen, openTerm, closeTerm]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        if (termOpen) closeTerm();
        setSettingsOpen(false);
        closeCompactSheet();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [termOpen, closeTerm, closeCompactSheet]);

  const handleNavigate = useCallback(
    (id) => {
      onNavigate(id);
      setSettingsOpen(false);
      closeCompactSheet();
    },
    [onNavigate, closeCompactSheet]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setInputVal(value);
    setOutput(null);
    setActiveIdx(-1);
    activeRef.current = -1;

    const query = value.trim().toLowerCase();
    const filtered = !query ? INITIAL_SUGGESTIONS : COMMANDS_LIST.filter((command) => command.cmd.startsWith(query) || command.cmd.includes(query));

    setSuggestions(filtered);
    sugRef.current = filtered;
  };

  const runCommand = useCallback(
    (cmdStr) => {
      const norm = cmdStr.trim().toLowerCase();
      if (!norm) return;

      setCmdHistory((history) => [norm, ...history.slice(0, 49)]);
      setHistIdx(-1);
      setInputVal("");
      setSuggestions(INITIAL_SUGGESTIONS);
      sugRef.current = INITIAL_SUGGESTIONS;
      setActiveIdx(-1);
      activeRef.current = -1;

      if (norm === "clear" || norm === "exit") {
        closeTerm();
        return;
      }

      const known = COMMANDS_LIST.find((command) => command.cmd === norm);

      if (!known && norm !== "help") {
        setOutput({ error: true, cmd: norm });
        return;
      }

      setOutput({ cmd: norm });

      if (norm === "dark mode") setDark(true);
      if (norm === "light mode") setDark(false);
      if (norm === "music on") setMusic(true);
      if (norm === "music off") setMusic(false);
      if (norm === "cat resume.pdf") setTimeout(() => window.open(profile.resumeUrl, "_blank"), 300);

      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [closeTerm, setDark, setMusic]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        closeTerm();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const items = sugRef.current;
        if (items.length > 0) setInputVal(items[0].cmd);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const index = activeRef.current;
        const items = sugRef.current;
        runCommand(index >= 0 && items[index] ? items[index].cmd : inputVal);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const items = sugRef.current;
        if (!items.length) return;
        const next = Math.min(activeRef.current + 1, items.length - 1);
        activeRef.current = next;
        setActiveIdx(next);
        setInputVal(items[next].cmd);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        if (activeRef.current > 0) {
          const next = activeRef.current - 1;
          activeRef.current = next;
          setActiveIdx(next);
          setInputVal(sugRef.current[next]?.cmd ?? "");
        } else {
          setCmdHistory((history) => {
            setHistIdx((historyIndex) => {
              const next = Math.min(historyIndex + 1, history.length - 1);
              if (history[next] !== undefined) setInputVal(history[next]);
              return next;
            });

            return history;
          });

          activeRef.current = -1;
          setActiveIdx(-1);
        }
      }
    },
    [inputVal, runCommand, closeTerm]
  );

  const ghostSuffix = (() => {
    if (!inputVal.trim()) return "";
    const match = COMMANDS_LIST.find((command) => command.cmd.startsWith(inputVal.toLowerCase()) && command.cmd !== inputVal.toLowerCase());
    return match ? match.cmd.slice(inputVal.length) : "";
  })();

  const desktopCmdWidth = navMetrics.width ? Math.max(navMetrics.width - 40, 300) : 320;
  const compactCmdWidth = Math.max(Math.min(viewportWidth - 24, 680), 280);
  const cmdWidth = isCompact ? compactCmdWidth : desktopCmdWidth;
  const cmdHeight = isMobile ? 58 : isTablet ? 60 : 64;
  const terminalReady = pillPhase === PILL_PHASE.CMD;
  const showNavItems = pillPhase === PILL_PHASE.NAV || pillPhase === PILL_PHASE.ICONS_OUT;
  const showCmdInput = pillPhase === PILL_PHASE.CMD || pillPhase === PILL_PHASE.CMD_OUT;
  const commandSized = pillPhase === PILL_PHASE.MORPH_TO_CMD || pillPhase === PILL_PHASE.CMD || pillPhase === PILL_PHASE.CMD_OUT;
  const targetWidth = commandSized ? cmdWidth : navMetrics.width || undefined;
  const targetHeight = commandSized ? cmdHeight : navMetrics.height || undefined;
  const activeIsHiddenInCompact = isCompact && activePage && !compactVisibleIds.includes(activePage);
  const moreActive = moreOpen || activeIsHiddenInCompact;

  useLayoutEffect(() => {
    if (termOpen || !navRef.current || !ringRef.current) return;

    const ringRect = ringRef.current.getBoundingClientRect();
    const ringScale = ringRect.height / ringRef.current.offsetHeight;
    const ringCenterX = ringRect.left + ringRect.width / 2;
    const ringCenterY = ringRect.top + ringRect.height / 2;
    const ringRadiusX = ringRect.width / 2;
    const ringRadiusY = ringRect.height / 2;
    const items = Array.from(navRef.current.querySelectorAll("[data-orbit-item]"));

    const nextOffsets = items.map((item) => {
      const sphere = item.querySelector("[data-orbit-sphere]");
      if (!sphere) return 0;

      const sphereRect = sphere.getBoundingClientRect();
      const sphereCenterX = sphereRect.left + sphereRect.width / 2;
      const sphereCenterY = sphereRect.top + sphereRect.height / 2;
      const currentOffset = Number(item.dataset.orbitOffset || 0);
      const unshiftedCenterY = sphereCenterY - currentOffset * ringScale;
      const distanceFromCenter = Math.min(Math.abs(sphereCenterX - ringCenterX), ringRadiusX);
      const normalizedX = distanceFromCenter / ringRadiusX;
      const targetCenterY = ringCenterY - ringRadiusY * Math.sqrt(Math.max(0, 1 - normalizedX ** 2));

      return Math.round((targetCenterY - unshiftedCenterY) / ringScale);
    });

    setOrbitOffsets((previous) => (
      previous.length === nextOffsets.length && previous.every((value, index) => value === nextOffsets[index])
        ? previous
        : nextOffsets
    ));
  }, [activePage, isCompact, isMobile, isTablet, termOpen, viewportWidth, visibleItems.length]);

  const navContentVariants = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.16, ease: "easeOut" } },
    hidden: { opacity: 0, y: 4, scale: 0.96, filter: "blur(3px)", transition: { duration: 0.12, ease: "easeIn" } },
  };

  const cmdContentVariants = {
    hidden: { opacity: 0, y: 4, scale: 0.98, filter: "blur(3px)", transition: { duration: 0.12, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.18, ease: "easeOut" } },
  };

  const renderNavButton = ({ key, active, label, icon, onClick, forceLabel = false, ariaLabel, orbitIndex = 0, orbitCount = 1, popover = null }) => {
    const showLabel = !isMobile || active || forceLabel;
    const orbitProgress = orbitCount > 1 ? orbitIndex / (orbitCount - 1) : 0.5;
    const orbitDistance = Math.abs(orbitProgress * 2 - 1);
    const orbitLift = isMobile ? 30 : isTablet ? 55 : 70;
    const orbitPeak = isMobile ? 29 : isTablet ? 43 : 54;
    const desktopItemPitch = 68;
    const desktopRingRadiusX = 400;
    const desktopRingRadiusY = 400;
    const desktopX = (orbitIndex - (orbitCount - 1) / 2) * desktopItemPitch;
    const desktopCircleY = desktopRingRadiusY * (1 - Math.sqrt(Math.max(0, 1 - (desktopX / desktopRingRadiusX) ** 2)));
    const calculatedOrbitOffset = isCompact
      ? Math.round(orbitLift * orbitDistance * orbitDistance - orbitPeak)
      : Math.round(desktopCircleY - 53);
    const orbitOffset = orbitOffsets[orbitIndex] ?? calculatedOrbitOffset;

    return (
      <div key={key} data-orbit-item data-orbit-offset={orbitOffset} className="relative" style={{ transform: `translateY(${orbitOffset}px)` }}>
        <motion.button
          type="button"
          onClick={onClick}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          aria-label={ariaLabel || label}
          className={cn(
            "group flex min-h-[3.75rem] cursor-pointer flex-col items-center justify-center border-none bg-transparent transition-colors duration-150",
            isMobile ? "w-10 px-0.5" : isTablet ? "min-w-[3.25rem] px-1.5" : "w-16 px-1",
            showLabel ? "gap-1.5" : "gap-0",
            active ? "text-[#4075F7]" : "text-[#666] hover:text-[#181a1e] dark:text-[#888] dark:hover:text-white"
          )}
        >
          <span
            data-orbit-sphere
            className={cn(
              "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out group-hover:scale-110 sm:h-10 sm:w-10 lg:h-12 lg:w-12",
              active
                ? "border-[#4075F7] bg-[#4075F7] text-white shadow-[0_6px_20px_rgba(64,117,247,0.34)]"
                : "border-black/[0.14] bg-[#fffdf8] text-current shadow-[0_5px_14px_rgba(30,37,52,0.08)] group-hover:border-[#4075F7]/50 dark:border-white/[0.16] dark:bg-[#202228]"
            )}
          >
            {active && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[6px] rounded-full border border-dashed border-[#4075F7]/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white bg-[#4075F7] shadow-[0_0_0_2px_rgba(64,117,247,0.16)] dark:border-[#191919]" />
              </motion.span>
            )}
            <span className="relative z-10 flex scale-[0.88]">{icon}</span>
          </span>
          <span className={cn("whitespace-nowrap font-mono text-[8px] uppercase leading-none tracking-[0.06em] sm:text-[9px]", showLabel ? "block" : "hidden", active ? "font-semibold text-[#4075F7]" : "font-medium")}>{label}</span>
        </motion.button>
        {popover}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {termOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-48 bg-[#f1eee7]/42 backdrop-blur-[3px] dark:bg-black/25"
            onClick={closeTerm}
          />
        )}
      </AnimatePresence>

      {!termOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-[75px] bg-white dark:bg-[#191919] sm:h-[120px] lg:h-[130px]"
        />
      )}

      <div ref={wrapRef} className="fixed bottom-0 left-0 right-0 z-50 flex pointer-events-none flex-col items-center pb-[calc(24px+env(safe-area-inset-bottom))]">
        <AnimatePresence mode="wait" initial={false}>
          {terminalReady && (
            output ? (
              <OutputCard
                key={`output-${output.cmd}-${output.error || "success"}`}
                output={output}
                onRunCommand={runCommand}
                width={cmdWidth}
                compact={isCompact}
              />
            ) : (
              <SuggestionList
                key="suggestions"
                suggestions={suggestions}
                activeIdx={activeIdx}
                onSelect={runCommand}
                width={cmdWidth}
              />
            )
          )}
        </AnimatePresence>

        <motion.div
          initial={false}
          animate={targetWidth && targetHeight ? { width: targetWidth, height: targetHeight } : {}}
          transition={{
            width: { type: "spring", stiffness: 230, damping: 30, mass: 0.9 },
            height: { type: "spring", stiffness: 230, damping: 30, mass: 0.9 },
          }}
          className={cn(
            "max-w-[calc(100vw-24px)] pointer-events-auto relative z-10 flex items-center justify-center overflow-visible",
            termOpen
              ? "overflow-hidden rounded-full border border-[#4075F7]/55 bg-[#fffdf8] shadow-[0_0_0_3px_rgba(64,117,247,0.06),0_10px_34px_rgba(35,40,52,0.12)] dark:border-[#7ea2ff]/75 dark:bg-[#202228] dark:shadow-[0_0_0_4px_rgba(64,117,247,0.08),0_12px_38px_rgba(0,0,0,0.32)]"
              : ""
          )}
        >
          {!termOpen && (
            <div
              ref={ringRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border-[1.25px] border-[#181a1e]/25 dark:border-white/25",
                isMobile
                  ? "-bottom-[22.5rem] h-[25rem] w-[25rem]"
                  : isTablet
                    ? "-bottom-[31.2rem] h-[36rem] w-[36rem]"
                    : "-bottom-[51.5rem] h-[57rem] w-[57rem]"
              )}
            />
          )}
          <AnimatePresence mode="sync" initial={false}>
            {showNavItems && (
              <motion.div
                key="nav-items"
                ref={navRef}
                variants={navContentVariants}
                initial={false}
                animate={pillPhase === PILL_PHASE.ICONS_OUT ? "hidden" : "visible"}
                exit="hidden"
                className={cn("relative z-10 box-border flex items-center", isMobile ? "gap-3 px-1 pb-2 pt-8" : isTablet ? "gap-1 px-2 pb-2 pt-8" : "gap-1 px-2 pb-1 pt-8")}
              >
                {visibleItems.map(({ id, label }, index) => {
                  const Icon = ICON_MAP[id];
                  const active = activePage === id;
                  const orbitCount = visibleItems.length + 1;

                  return renderNavButton({ key: id, active, label, icon: <Icon active={false} />, onClick: () => handleNavigate(id), orbitIndex: index, orbitCount });
                })}

                {isCompact ? (
                  renderNavButton({
                    key: "more",
                    active: moreActive,
                    label: "More",
                    icon: <MoreIcon active={moreActive} />,
                    onClick: () => {
                      setSettingsOpen(false);
                      setMoreOpen((value) => {
                        const next = !value;
                        if (!next) setCompactSheetView("menu");
                        return next;
                      });
                    },
                    ariaLabel: moreOpen ? "Close more menu" : "Open more menu",
                    orbitIndex: visibleItems.length,
                    orbitCount: visibleItems.length + 1,
                    popover: (
                      <AnimatePresence>
                        {moreOpen && !termOpen && (
                          <CompactSheet
                            key="compact-sheet"
                            view={compactSheetView}
                            items={compactMoreItems}
                            activePage={activePage}
                            onNavigate={handleNavigate}
                            onShowSettings={() => setCompactSheetView("settings")}
                            onBackToMenu={() => setCompactSheetView("menu")}
                            onClose={closeCompactSheet}
                          />
                        )}
                      </AnimatePresence>
                    ),
                  })
                ) : renderNavButton({
                  key: "settings",
                  active: settingsOpen,
                  label: "Settings",
                  icon: <SettingsIcon active={false} />,
                  onClick: () => setSettingsOpen((value) => !value),
                  orbitIndex: visibleItems.length,
                  orbitCount: visibleItems.length + 1,
                  popover: (
                    <AnimatePresence>
                      {settingsOpen && !termOpen && (
                        <SettingsPanel key="settings" onClose={() => setSettingsOpen(false)} />
                      )}
                    </AnimatePresence>
                  ),
                })}
              </motion.div>
            )}

            {showCmdInput && (
              <motion.div
                key="cmd-input"
                variants={cmdContentVariants}
                initial="hidden"
                animate={pillPhase === PILL_PHASE.CMD_OUT ? "hidden" : "visible"}
                exit="hidden"
                className={cn("box-border flex h-full w-full items-center", isCompact ? "gap-2 px-3.5" : "gap-2.5 px-[18px]")}
              >
                <TerminalPrompt compact={isCompact} />

                <div className="relative flex items-center flex-1 overflow-hidden">
                  <span aria-hidden="true" className="absolute inset-0 flex items-center font-mono text-sm whitespace-pre pointer-events-none select-none text-black/15 dark:text-white/20">
                    {inputVal}
                    {ghostSuffix}
                  </span>

                  <input
                    ref={inputRef}
                    value={inputVal}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="type a command..."
                    className="relative z-[1] w-full border-none bg-transparent font-mono text-sm text-[#111] caret-[#4075F7] outline-none dark:text-[#f1f1f1]"
                  />
                </div>

                {!isCompact && (
                  <span className="shrink-0 whitespace-nowrap font-mono text-[10px] text-black/30 dark:text-white/30">
                    tab · ↑↓ · esc
                  </span>
                )}

                <motion.button
                  type="button"
                  onClick={closeTerm}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close command menu"
                  className="flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#4075F7]/10 text-[#4075F7]"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {!termOpen && (
        <button
          type="button"
          onClick={openTerm}
          className="fixed bottom-9 right-7 z-50 hidden cursor-pointer items-center gap-2 border-none bg-transparent p-0 font-mono text-[8px] uppercase tracking-[0.16em] text-[#70747b] transition-colors hover:text-[#4075F7] dark:text-white/35 dark:hover:text-[#7ea2ff] min-[840px]:flex"
          aria-label="Open terminal"
        >
          Press <kbd className="[font:inherit] text-[#4075F7] dark:text-[#7ea2ff]">/</kbd> for terminal
          <span className="w-10 h-px bg-current opacity-35" />
        </button>
      )}
    </>
  );
}
