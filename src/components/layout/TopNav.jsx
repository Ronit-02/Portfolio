import { profile } from "../../data";

const PAGE_META = {
  about: { accent: "My", rest: "Narrative", orbit: "01" },
  experience: { accent: "My Story", rest: "Unfolds", orbit: "02" },
  projects: { accent: "Project", rest: "Spotlight", orbit: "03" },
  blog: { accent: "Mindful", rest: "Reflections", orbit: "04" },
  photos: { accent: "Artistic", rest: "Impressions", orbit: "05" },
  contact: { accent: "Get In", rest: "Touch", orbit: "06" },
};

export default function TopNav({ activePage = "about" }) {
  const pageMeta = PAGE_META[activePage] || PAGE_META.about;

  return (
    <>
      <header
        className="relative z-40 h-[9.75rem] w-full overflow-hidden bg-white/75 dark:bg-[#191919]/75 sm:h-44"
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.17] [background-image:radial-gradient(circle,rgba(24,26,30,.2)_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-[0.07]" />

      <div className="absolute left-4 top-5 z-20 hidden items-center gap-2.5 sm:left-7 sm:top-7 lg:flex">
        <span className="h-2 w-2 rounded-full bg-[#4075F7]" />
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#70747b] dark:text-white/45 lg:inline">
          Creative engineer · {profile.location}
        </span>
      </div>

      <div className="absolute right-7 top-7 z-20 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#70747b] dark:text-white/45 lg:block">
        Building across the stack
      </div>

      <div className="absolute top-0 -translate-x-1/2 left-1/2">
        <div className="h-[clamp(15rem,68vw,20rem)] w-[clamp(15rem,68vw,20rem)] -translate-y-[56%] rounded-full bg-[radial-gradient(circle_at_50%_72%,#5b88fb_0%,#4075F7_48%,#3568e4_100%)] sm:h-[26rem] sm:w-[26rem] sm:-translate-y-[65%] lg:h-[35rem] lg:w-[35rem] lg:-translate-y-[70%]" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white -translate-y-8 sm:-translate-y-10 lg:-translate-y-6">
        <span className="mb-1 font-mono text-[6px] uppercase tracking-[0.2em] text-white/60 sm:text-[8px] lg:text-[9px]">
          Orbit {pageMeta.orbit}
        </span>
        <h1 className="whitespace-nowrap text-[clamp(1.4rem,5.2vw,2rem)] font-medium leading-none tracking-[-0.055em] sm:text-[clamp(2rem,4vw,2.7rem)]">
          {pageMeta.accent} {pageMeta.rest}
        </h1>
      </div>

      </header>
    </>
  );
}
