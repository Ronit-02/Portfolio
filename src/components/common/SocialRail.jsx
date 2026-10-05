import { motion } from "framer-motion";
import {
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "../../icons";
import { socialLinks } from "../../data";
import { cn } from "../../utils/cn";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
};

const SOCIALS = socialLinks
  .filter(({ id }) => ["instagram", "x", "linkedin"].includes(id))
  .map((social) => ({ ...social, Icon: SOCIAL_ICONS[social.id] }));

export default function SocialRail({ className = "", compact = false }) {
  const links = (
    <div
      className={cn(
        "flex",
        compact
          ? "w-full items-center justify-between"
          : "flex-col items-start gap-1 min-[1210px]:flex-row min-[1210px]:items-center min-[1210px]:gap-0"
      )}
    >
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "group flex min-w-0 items-center text-[#5f6672] transition-colors hover:text-[#4075F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7]/60 dark:text-white/50 dark:hover:text-[#7ea2ff]",
            compact
              ? "gap-1 px-0.5 py-1.5"
              : "gap-2 py-0.5 min-[1210px]:ml-4 min-[1210px]:gap-1.5 min-[1210px]:border-l min-[1210px]:border-black/15 min-[1210px]:pl-4 min-[1210px]:py-0 min-[1210px]:first:ml-0 min-[1210px]:first:border-l-0 min-[1210px]:first:pl-0 dark:min-[1210px]:border-white/15"
          )}
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5"
          >
            <Icon />
          </span>
          <span
            className={cn(
              "min-w-0 flex-1 truncate font-mono font-medium uppercase tracking-[0.08em]",
              compact ? "text-[9px] font-normal" : "text-[9px]"
            )}
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className={cn("border-t border-black/10 px-2 py-1 dark:border-white/10", className)}>
        {links}
      </div>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.35, ease: "easeOut" }}
      aria-label="Social links"
      className={cn("items-start gap-2 min-[1210px]:items-center min-[1210px]:gap-3", className)}
    >
      <span className="mt-1 h-8 w-px shrink-0 bg-current text-black/20 min-[1210px]:mt-0 min-[1210px]:h-px min-[1210px]:w-7 dark:text-white/20" />
      {links}
    </motion.aside>
  );
}
