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

const COMMAND_HINT_STORAGE_KEY = "bottom-nav-command-hint-seen";
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

function TerminalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
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

function CommandHint({ isCompact, onHintClick, onDismiss }) {
  return (
    <motion.div
      key="command-hint"
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="pointer-events-auto mb-2 flex max-w-[calc(100vw-32px)] cursor-pointer select-none items-center gap-2.5 rounded-full border border-black/10 bg-white py-2 pl-3 pr-2 text-xs text-[#111] shadow-[0_8px_28px_rgba(0,0,0,0.12)] dark:border-[#3a3a3a] dark:bg-[#252525] dark:text-[#e3e2e0]"
      onClick={onHintClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onHintClick();
        }
      }}
    >
      <span className={cn("shrink-0 font-bold text-[#4075F7]", !isCompact && "font-mono")}>
        {isCompact ? "Tip" : "/"}
      </span>
      <span className="truncate whitespace-nowrap">
        {isCompact ? "Open More for command menu" : "Press / or tap here for commands"}
      </span>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDismiss();
        }}
        aria-label="Dismiss command hint"
        className="flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/[0.04] p-0 text-[#666] dark:bg-white/[0.06] dark:text-[#888]"
      >
        <XClose />
      </button>
    </motion.div>
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
      <div className="flex items-center justify-between mb-4">
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
          <span className="text-sm font-semibold text-[#111] dark:text-[#f1f1f1]">Settings</span>
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
        <div key={label} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-[#111] dark:text-[#f1f1f1]">
            {icon}
            <span>{label}</span>
          </div>
          <ToggleSwitch active={value} label={label} onToggle={() => setValue(!value)} />
        </div>
      ))}

      <div className="pt-3 border-t border-black/10 dark:border-white/10">
        <p className="text-xs text-[#999] dark:text-[#666]">
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
      className="mb-3 pointer-events-auto w-60"
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
        "flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-[14px] border-none bg-transparent px-3.5 py-[11px] text-left font-satoshi transition-colors",
        active && "bg-[#4075F7]/10",
        accent && "bg-[#4075F7]/10 text-[#4075F7]",
        !active && !accent && "text-[#666] dark:text-[#888]"
      )}
    >
      {icon}
      <span className={cn("text-sm", active || accent ? "font-semibold text-[#4075F7]" : "font-medium text-[#111] dark:text-[#f1f1f1]")}>{label}</span>
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
  onOpenCommand,
}) {
  return (
    <motion.div
      key="compact-sheet"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="pointer-events-auto mb-3 w-[min(360px,calc(100vw-24px))] sm:w-[min(420px,calc(100vw-40px))]"
    >
      <NavSurface className="overflow-hidden rounded-3xl p-2 shadow-[0_10px_34px_rgba(0,0,0,0.14)]">
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

              <div className="mx-2 my-1.5 h-px bg-black/10 dark:bg-white/10" />

              <MenuRow icon={<SettingsIcon active={false} />} label="Settings" onClick={onShowSettings} />
              <MenuRow accent icon={<TerminalIcon />} label="Command Menu" trailing="/" onClick={onOpenCommand} />
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

function TerminalRow({ row, index, total }) {
  const isLast = index === total - 1;

  return (
    <div className="grid grid-cols-[1.1rem_minmax(5rem,0.8fr)_auto_minmax(0,1.4fr)] items-start gap-x-1 py-1 font-mono text-[11px] leading-[1.55] xs:grid-cols-[1.25rem_minmax(5.75rem,0.8fr)_auto_minmax(0,1.4fr)] xs:text-[12px] sm:grid-cols-[1.25rem_minmax(7.5rem,0.75fr)_auto_minmax(0,1.5fr)] sm:text-[13px]">
      <span
        aria-hidden="true"
        className="select-none text-[#a7afbd] dark:text-[#515a6b]"
      >
        {isLast ? "└─" : "├─"}
      </span>
      <span
        className={cn(
          "min-w-0 break-words font-semibold text-[#252932] dark:text-[#e8ebf2]",
          row.accent === "key" && "text-[#4075F7] dark:text-[#7ea2ff]"
        )}
      >
        {row.key}
      </span>
      <span className="select-none text-[#a7afbd] dark:text-[#515a6b]">:</span>
      <span
        className={cn(
          "min-w-0 break-words font-normal text-[#5d6470] dark:text-[#aeb5c2]",
          row.accent === "value" && "text-[#4075F7] dark:text-[#7ea2ff]"
        )}
      >
        {row.value}
      </span>
    </div>
  );
}

function OutputCard({ output, onClose, onRunCommand, width }) {
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

  return (
    <motion.div
      key={output.cmd + (output.error ? "e" : "")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, width }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      role="status"
      aria-live="polite"
      className="pointer-events-auto mb-2 max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-black/15 bg-[#fbfcff] shadow-[inset_0_2px_0_rgba(64,117,247,0.85),0_10px_34px_rgba(0,0,0,0.12)] dark:border-white/[0.12] dark:bg-[#12151c] dark:shadow-[inset_0_2px_0_rgba(126,162,255,0.9),0_12px_38px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.08] px-3 py-2.5 xs:px-4 dark:border-white/[0.08]">
        <TerminalPrompt command={output.cmd} />
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] font-medium text-[#8b93a1] transition-colors hover:text-[#4075F7] dark:text-[#747d8d] dark:hover:text-[#7ea2ff]"
          aria-label="Close command output"
        >
          [x]
        </button>
      </div>

      <div className="max-h-[min(52vh,28rem)] overflow-y-auto px-3 py-3 scrollbar-hide xs:px-4">
        <div className="mb-2 flex items-baseline justify-between gap-3 font-mono">
          <h3 className="min-w-0 truncate text-[13px] font-bold text-[#252932] dark:text-[#e8ebf2]">
            <span className="mr-1.5 text-[#4075F7] dark:text-[#7ea2ff]">//</span>
            {content.title}
          </h3>
          <span className="shrink-0 text-[11px] font-normal text-[#8b93a1] dark:text-[#747d8d]">
            {content.meta}
          </span>
        </div>

        <div>
          {content.rows.map((row, index) => (
            <TerminalRow
              key={`${row.key}-${row.value}-${index}`}
              row={row}
              index={index}
              total={content.rows.length}
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
      className="pointer-events-auto mb-2 max-h-60 max-w-[calc(100vw-24px)] overflow-y-auto rounded-xl border border-black/15 bg-[#fbfcff] shadow-[inset_0_2px_0_rgba(64,117,247,0.85),0_10px_34px_rgba(0,0,0,0.1)] scrollbar-hide dark:border-white/[0.12] dark:bg-[#12151c] dark:shadow-[inset_0_2px_0_rgba(126,162,255,0.9),0_12px_38px_rgba(0,0,0,0.35)]"
    >
      <div className="sticky top-0 z-10 flex items-baseline justify-between gap-3 border-b border-black/[0.08] bg-[#fbfcff]/95 px-3 py-2 font-mono backdrop-blur-sm xs:px-4 dark:border-white/[0.08] dark:bg-[#12151c]/95">
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
              "grid w-full cursor-pointer grid-cols-[0.75rem_minmax(5.5rem,0.8fr)_minmax(0,1.2fr)] items-baseline gap-1.5 border-none px-3 py-2 text-left font-mono transition-colors xs:grid-cols-[1rem_minmax(6.75rem,0.8fr)_minmax(0,1.2fr)] xs:gap-2 xs:px-4 sm:grid-cols-[1rem_minmax(8.5rem,0.8fr)_minmax(0,1.2fr)]",
              active ? "bg-[#4075F7]/10" : "bg-transparent hover:bg-black/[0.025] dark:hover:bg-white/[0.035]"
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
  const [showCommandHint, setShowCommandHint] = useState(false);
  const [pillPhase, setPillPhase] = useState(PILL_PHASE.NAV);
  const [navMetrics, setNavMetrics] = useState({ width: 0, height: 0 });

  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const navRef = useRef(null);
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

  const dismissCommandHint = useCallback(() => {
    setShowCommandHint(false);
    window.localStorage?.setItem(COMMAND_HINT_STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    const alreadySeen = window.localStorage?.getItem(COMMAND_HINT_STORAGE_KEY);
    if (alreadySeen) return undefined;

    const showTimer = setTimeout(() => setShowCommandHint(true), 1200);
    const hideTimer = setTimeout(() => setShowCommandHint(false), 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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
    dismissCommandHint();
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
  }, [after, clearPhaseTimers, dismissCommandHint, navMetrics.height, navMetrics.width]);

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

  const handleCommandHintClick = useCallback(() => {
    dismissCommandHint();

    if (isCompact) {
      setSettingsOpen(false);
      setMoreOpen(true);
      setCompactSheetView("menu");
      return;
    }

    openTerm();
  }, [dismissCommandHint, isCompact, openTerm]);

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
  const cmdHeight = navMetrics.height ? Math.max(navMetrics.height - (isCompact ? 4 : 10), 52) : 52;
  const terminalReady = pillPhase === PILL_PHASE.CMD;
  const showNavItems = pillPhase === PILL_PHASE.NAV || pillPhase === PILL_PHASE.ICONS_OUT;
  const showCmdInput = pillPhase === PILL_PHASE.CMD || pillPhase === PILL_PHASE.CMD_OUT;
  const commandSized = pillPhase === PILL_PHASE.MORPH_TO_CMD || pillPhase === PILL_PHASE.CMD || pillPhase === PILL_PHASE.CMD_OUT;
  const targetWidth = commandSized ? cmdWidth : navMetrics.width || undefined;
  const targetHeight = commandSized ? cmdHeight : navMetrics.height || undefined;
  const activeIsHiddenInCompact = isCompact && activePage && !compactVisibleIds.includes(activePage);
  const moreActive = moreOpen || activeIsHiddenInCompact;
  const shouldShowCommandHint = showCommandHint && !termOpen && !moreOpen && !settingsOpen;

  const navContentVariants = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.16, ease: "easeOut" } },
    hidden: { opacity: 0, y: 4, scale: 0.96, filter: "blur(3px)", transition: { duration: 0.12, ease: "easeIn" } },
  };

  const cmdContentVariants = {
    hidden: { opacity: 0, y: 4, scale: 0.98, filter: "blur(3px)", transition: { duration: 0.12, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.18, ease: "easeOut" } },
  };

  const renderNavButton = ({ key, active, label, icon, onClick, forceLabel = false, ariaLabel }) => {
    const showLabel = !isMobile || active || forceLabel;

    return (
      <motion.button
        key={key}
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        aria-label={ariaLabel || label}
        className={cn(
          "flex min-h-11 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-transparent transition-colors duration-150",
          isMobile ? "min-w-11 px-2 py-2 xs:min-w-12 xs:px-2.5" : isTablet ? "min-w-14 px-3 py-2" : "px-3.5 py-2",
          showLabel ? "gap-1" : "gap-0",
          active && isCompact && "bg-[#4075F7]/10",
          active ? "text-[#4075F7]" : "text-[#666] dark:text-[#888]"
        )}
      >
        {icon}
        <span className={cn("whitespace-nowrap text-[10px] leading-none", showLabel ? "block" : "hidden", active ? "font-semibold" : "font-medium")}>{label}</span>
      </motion.button>
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
            className="fixed inset-0 z-48 bg-black/20 backdrop-blur-[3px]"
            onClick={closeTerm}
          />
        )}
      </AnimatePresence>

      <div ref={wrapRef} className="fixed bottom-0 left-0 right-0 z-50 flex pointer-events-none flex-col items-center pb-[calc(16px+env(safe-area-inset-bottom))]">
        <AnimatePresence>
          {settingsOpen && !termOpen && !isCompact && <SettingsPanel key="settings" onClose={() => setSettingsOpen(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {moreOpen && isCompact && !termOpen && (
            <CompactSheet
              key="compact-sheet"
              view={compactSheetView}
              items={compactMoreItems}
              activePage={activePage}
              onNavigate={handleNavigate}
              onShowSettings={() => setCompactSheetView("settings")}
              onBackToMenu={() => setCompactSheetView("menu")}
              onClose={closeCompactSheet}
              onOpenCommand={openTerm}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {terminalReady && (
            output ? (
              <OutputCard
                key={`output-${output.cmd}-${output.error || "success"}`}
                output={output}
                onClose={() => {
                  setOutput(null);
                  setTimeout(() => inputRef.current?.focus(), 30);
                }}
                onRunCommand={runCommand}
                width={cmdWidth}
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

        <AnimatePresence>
          {shouldShowCommandHint && <CommandHint key="command-hint" isCompact={isCompact} onHintClick={handleCommandHintClick} onDismiss={dismissCommandHint} />}
        </AnimatePresence>

        <motion.div
          initial={false}
          animate={targetWidth && targetHeight ? { width: targetWidth, height: targetHeight } : {}}
          transition={{
            width: { type: "spring", stiffness: 230, damping: 30, mass: 0.9 },
            height: { type: "spring", stiffness: 230, damping: 30, mass: 0.9 },
          }}
          className={cn(
            "max-w-[calc(100vw-24px)] pointer-events-auto flex items-center justify-center overflow-hidden rounded-full bg-white dark:bg-[#252525]",
            termOpen
              ? "border-[1.5px] border-[#4075F7] shadow-[0_0_0_4px_rgba(64,117,247,0.12),0_4px_28px_rgba(0,0,0,0.14)]"
              : "border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:border-white/10"
          )}
        >
          <AnimatePresence mode="sync" initial={false}>
            {showNavItems && (
              <motion.div
                key="nav-items"
                ref={navRef}
                variants={navContentVariants}
                initial={false}
                animate={pillPhase === PILL_PHASE.ICONS_OUT ? "hidden" : "visible"}
                exit="hidden"
                className={cn("box-border flex items-center", isMobile ? "gap-0.5 px-1.5 py-[7px] xs:gap-1 xs:px-2.5" : isTablet ? "gap-[3px] px-3 py-2" : "gap-0.5 px-4 py-2")}
              >
                {visibleItems.map(({ id, label }) => {
                  const Icon = ICON_MAP[id];
                  const active = activePage === id;

                  return renderNavButton({ key: id, active, label, icon: <Icon active={active} />, onClick: () => handleNavigate(id) });
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
                  })
                ) : (
                  <>
                    {renderNavButton({
                      key: "settings",
                      active: settingsOpen,
                      label: "Settings",
                      icon: <SettingsIcon active={settingsOpen} />,
                      onClick: () => setSettingsOpen((value) => !value),
                    })}
                    {renderNavButton({
                      key: "command",
                      active: false,
                      label: "/",
                      icon: <TerminalIcon />,
                      onClick: openTerm,
                      forceLabel: true,
                      ariaLabel: "Open command menu",
                    })}
                  </>
                )}
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
    </>
  );
}
