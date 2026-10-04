import { cn } from "../../utils/cn";

export default function TagBadge({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-semibold leading-5 text-[#4075F7] shadow-sm",
        "dark:border-white/[0.09] dark:bg-[#252525] dark:text-[#7ea2ff]",
        className
      )}
    >
      {children}
    </span>
  );
}
