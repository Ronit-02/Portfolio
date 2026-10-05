import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CONCEPTS = [
  { id: "eclipse", label: "Eclipse", shortLabel: "01" },
  { id: "duality", label: "Duality", shortLabel: "02" },
  { id: "constellation", label: "Constellation", shortLabel: "03" },
  { id: "solar", label: "Solar", shortLabel: "04" },
  { id: "gyroscope", label: "Gyroscope", shortLabel: "05" },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2">
      {diagonal ? <path d="M5 15 15 5M7 5h8v8" /> : <path d="M4 10h11M11 5l5 5-5 5" />}
    </svg>
  );
}

function ConceptLabel({ children, light = false }) {
  return (
    <span className={`font-mono text-[9px] uppercase tracking-[0.18em] ${light ? "text-white/40" : "text-[#70747b]"}`}>
      {children}
    </span>
  );
}

function EclipseConcept() {
  const satellites = [
    { label: "Product", note: "Think in systems", position: { left: "8%", top: "19%" } },
    { label: "Frontend", note: "Build the feeling", position: { right: "8%", top: "16%" } },
    { label: "Visual", note: "Compose with intent", position: { left: "11%", bottom: "13%" } },
    { label: "Motion", note: "Explain through change", position: { right: "10%", bottom: "12%" } },
  ];

  return (
    <section className="relative h-full overflow-hidden rounded-[14px] bg-[#101010] text-white">
      <div className="absolute left-6 top-5 z-30 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#4075F7]" /><ConceptLabel light>Eclipse identity / 01</ConceptLabel></div>
      <div className="absolute right-6 top-5 z-30 hidden sm:block"><ConceptLabel light>Software engineer · visual artist</ConceptLabel></div>

      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full fill-none stroke-white/15 stroke-[1.1]">
        <ellipse cx="500" cy="280" rx="440" ry="214" />
        <ellipse cx="500" cy="280" rx="330" ry="156" strokeDasharray="4 8" />
        <circle cx="500" cy="280" r="118" stroke="#4075F7" strokeOpacity=".35" />
        <path d="M500 62v436M78 280h844" strokeOpacity=".07" />
      </svg>

      <div className="absolute z-20" style={{ left: "50%", top: "48%", transform: "translate(-50%, -50%)" }}>
        <motion.div whileHover={{ scale: 1.025 }} className="relative flex h-[clamp(240px,31vw,320px)] w-[clamp(240px,31vw,320px)] flex-col items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#181818] text-center shadow-[0_28px_80px_rgba(0,0,0,.5)]">
          <span className="absolute -right-[15%] top-[-8%] h-[116%] w-[64%] rounded-[50%] bg-[#4075F7] shadow-[-24px_0_50px_rgba(64,117,247,.2)]" />
          <span className="relative font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">Engineer × artist</span>
          <h2 className="relative mt-3 text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[0.78] tracking-[-0.07em]">RONIT<br /><span className="text-white/55">KHATRI</span></h2>
          <span className="relative mt-5 max-w-[190px] text-[10px] leading-relaxed text-white/55">Building useful products with an artist’s eye.</span>
        </motion.div>
      </div>

      {satellites.map((satellite) => (
        <motion.div key={satellite.label} whileHover={{ y: -5, borderColor: "rgba(64,117,247,.8)" }} className="absolute z-20 hidden w-[152px] rounded-full border border-white/15 bg-[#1c1c1c]/95 px-4 py-3 text-center shadow-[0_14px_34px_rgba(0,0,0,.28)] sm:block" style={satellite.position}>
          <span className="block text-xs font-semibold">{satellite.label}</span>
          <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">{satellite.note}</span>
        </motion.div>
      ))}

      <Link to="/projects" className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs text-white/70 backdrop-blur transition-colors hover:bg-white hover:text-[#101010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8eafff]">Enter my orbit <ArrowIcon /></Link>
    </section>
  );
}

function DualityConcept() {
  const poles = [
    { label: "Engineer", note: "logic · structure · scale", position: { left: "8%", top: "18%" }, accent: false },
    { label: "Artist", note: "rhythm · emotion · form", position: { right: "8%", top: "18%" }, accent: true },
    { label: "Systems", note: "make it reliable", position: { left: "16%", bottom: "13%" }, accent: false },
    { label: "Expression", note: "make it memorable", position: { right: "16%", bottom: "13%" }, accent: true },
  ];

  return (
    <section className="relative h-full overflow-hidden rounded-[14px] bg-[#f0eee8] text-[#17191d]">
      <div className="absolute left-6 top-5 z-30"><ConceptLabel>Dual orbit / 02</ConceptLabel></div>
      <div className="absolute right-6 top-5 z-30 hidden sm:block"><ConceptLabel>Two disciplines · one point of view</ConceptLabel></div>

      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full fill-none stroke-[1.5]">
        <ellipse cx="430" cy="280" rx="330" ry="158" transform="rotate(-13 430 280)" stroke="#26282d" strokeOpacity=".25" />
        <ellipse cx="570" cy="280" rx="330" ry="158" transform="rotate(13 570 280)" stroke="#4075F7" strokeOpacity=".5" />
        <path d="M500 70v420" stroke="#151515" strokeOpacity=".08" strokeDasharray="3 8" />
      </svg>

      <div className="absolute z-20 w-[min(54%,560px)] text-center" style={{ left: "50%", top: "46%", transform: "translate(-50%, -50%)" }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#4075F7]">Where both worlds overlap</span>
        <h2 className="mt-4 text-[clamp(2.8rem,6.4vw,6.5rem)] font-medium leading-[0.8] tracking-[-0.075em]">Code with<br /><span className="italic text-[#4075F7]">composition.</span></h2>
        <p className="mx-auto mt-5 max-w-[390px] text-xs leading-relaxed text-[#686d73]">I engineer the system and shape the experience so the final product works beautifully.</p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <Link to="/projects" className="flex items-center gap-3 rounded-full bg-[#17191d] px-4 py-2.5 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7]">Selected work <ArrowIcon /></Link>
          <Link to="/about" className="hidden rounded-full border border-black/15 px-4 py-2.5 text-xs sm:block">My approach</Link>
        </div>
      </div>

      {poles.map((pole) => (
        <motion.div key={pole.label} whileHover={{ scale: 1.06 }} className={`absolute z-20 hidden h-24 w-24 flex-col items-center justify-center rounded-full border text-center shadow-[0_12px_30px_rgba(20,20,20,.08)] sm:flex ${pole.accent ? "border-[#4075F7]/35 bg-[#4075F7] text-white" : "border-black/10 bg-[#f8f6f0]"}`} style={pole.position}>
          <span className="text-sm font-semibold">{pole.label}</span>
          <span className={`mt-1 font-mono text-[7px] uppercase tracking-[0.1em] ${pole.accent ? "text-white/55" : "text-black/35"}`}>{pole.note}</span>
        </motion.div>
      ))}
    </section>
  );
}

function ConstellationConcept() {
  const stars = [
    { label: "Product thinking", position: { left: "17%", top: "22%" } },
    { label: "Interface craft", position: { right: "19%", top: "17%" } },
    { label: "Frontend systems", position: { right: "10%", top: "48%" } },
    { label: "Creative code", position: { right: "22%", bottom: "12%" } },
    { label: "Visual direction", position: { left: "18%", bottom: "14%" } },
    { label: "Human detail", position: { left: "8%", top: "50%" } },
  ];

  return (
    <section className="relative h-full overflow-hidden rounded-[14px] bg-[#0c1420] text-white">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(255,255,255,.32)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute left-6 top-5 z-30"><ConceptLabel light>Constellation / 03</ConceptLabel></div>
      <div className="absolute right-6 top-5 z-30 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#4075F7]" /><ConceptLabel light>Six signals · one practice</ConceptLabel></div>

      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full fill-none stroke-white/22 stroke-[1.2]">
        <path d="M170 135 500 280 790 110 900 280 760 455 500 280 190 450 80 280 170 135" />
        <path d="M170 135C350 48 660 40 790 110M190 450C390 528 600 520 760 455" stroke="#4075F7" strokeOpacity=".34" strokeDasharray="4 8" />
        <circle cx="500" cy="280" r="128" stroke="#4075F7" strokeOpacity=".28" />
      </svg>

      <div className="absolute z-20 w-[min(58%,620px)] text-center" style={{ left: "50%", top: "48%", transform: "translate(-50%, -50%)" }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#88a8ff]">Software engineer + artist</span>
        <h2 className="mt-4 text-[clamp(2.7rem,6.3vw,6.2rem)] font-medium leading-[0.82] tracking-[-0.07em]">I connect<br />the <span className="text-[#4075F7]">technical</span><br />to the human.</h2>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs text-white/75 backdrop-blur transition-colors hover:bg-white hover:text-[#0c1420] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8eafff]">Follow the signal <ArrowIcon /></Link>
      </div>

      {stars.map((star, index) => (
        <motion.div key={star.label} whileHover={{ scale: 1.08 }} className="absolute z-20 hidden items-center gap-2 sm:flex" style={star.position}>
          <span className={`h-3 w-3 rounded-full border-2 border-[#0c1420] shadow-[0_0_0_1px_rgba(255,255,255,.28)] ${index % 2 === 0 ? "bg-[#4075F7]" : "bg-white"}`} />
          <span className="whitespace-nowrap text-[10px] font-medium text-white/65">{star.label}</span>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">Every point informs the product</div>
    </section>
  );
}

function SolarConcept() {
  const planets = [
    { label: "Research", size: 82, position: { left: "31%", top: "17%" } },
    { label: "Design", size: 104, position: { left: "36%", bottom: "10%" } },
    { label: "Build", size: 72, position: { right: "13%", top: "16%" } },
  ];

  return (
    <section className="relative h-full overflow-hidden rounded-[14px] bg-[#f7f4ed] text-[#181a1e]">
      <div className="absolute left-6 top-5 z-30"><ConceptLabel>Solar field / 04</ConceptLabel></div>
      <div className="absolute right-6 top-5 z-30 hidden sm:block"><ConceptLabel>Ideas have gravity</ConceptLabel></div>

      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full fill-none stroke-black/15 stroke-[1.2]">
        <ellipse cx="170" cy="300" rx="260" ry="170" />
        <ellipse cx="170" cy="300" rx="430" ry="250" />
        <ellipse cx="170" cy="300" rx="650" ry="330" strokeDasharray="5 8" />
      </svg>

      <div className="absolute left-1/2 top-[30%] z-10 -translate-x-1/2 -translate-y-1/2 sm:-left-[5%] sm:top-1/2 sm:translate-x-0">
        <motion.div whileHover={{ scale: 1.03 }} className="relative flex h-[clamp(230px,34vw,360px)] w-[clamp(230px,34vw,360px)] items-center justify-center rounded-full bg-[#4075F7] shadow-[0_30px_70px_rgba(64,117,247,.28)]">
          <span className="absolute inset-[12%] rounded-full border border-white/25" />
          <span className="absolute inset-[24%] rounded-full border border-white/15" />
          <span className="relative text-center">
            <b className="block text-[clamp(2.4rem,5vw,4.7rem)] font-medium leading-[0.78] tracking-[-0.07em] text-white">RONIT</b>
            <small className="mt-3 block font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">Creative engineer</small>
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-[7%] left-[8%] right-[8%] z-20 sm:bottom-auto sm:left-auto sm:right-[6%] sm:top-1/2 sm:w-[42%] sm:-translate-y-1/2">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#4075F7]">What everything revolves around</span>
        <h2 className="mt-4 text-[2.6rem] font-medium leading-[0.8] tracking-[-0.075em] sm:text-[clamp(3rem,6.6vw,6.8rem)]">Useful.<br />Beautiful.<br /><span className="italic text-[#4075F7]">Alive.</span></h2>
        <p className="mt-5 max-w-[390px] text-xs leading-relaxed text-[#666b72]">I design and engineer digital products that feel as considered as they are capable.</p>
        <Link to="/projects" className="mt-5 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-sm font-semibold transition-colors hover:text-[#4075F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7]">See what I’m building <ArrowIcon /></Link>
      </div>

      {planets.map((planet) => (
        <motion.div key={planet.label} whileHover={{ scale: 1.08 }} className="absolute z-20 hidden items-center justify-center rounded-full border border-black/15 bg-[#fffdf8] text-center text-[10px] font-semibold shadow-[0_12px_30px_rgba(30,30,30,.09)] sm:flex" style={{ ...planet.position, width: planet.size, height: planet.size }}>
          {planet.label}
        </motion.div>
      ))}
    </section>
  );
}

function GyroscopeConcept() {
  const axisNodes = [
    { label: "Systems", position: { left: "9%", top: "25%" } },
    { label: "Interfaces", position: { right: "8%", top: "24%" } },
    { label: "Code", position: { left: "13%", bottom: "18%" } },
    { label: "Art direction", position: { right: "10%", bottom: "16%" } },
  ];

  return (
    <section className="relative h-full overflow-hidden rounded-[14px] bg-[#15151a] text-white">
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-6 top-5 z-30"><ConceptLabel light>Creative gyroscope / 05</ConceptLabel></div>
      <div className="absolute right-6 top-5 z-30 flex items-center gap-2"><ConceptLabel light>Balance: active</ConceptLabel><span className="h-2 w-2 rounded-full bg-[#4075F7]" /></div>

      <div className="absolute left-[5%] top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">01 / discipline</span>
        <strong className="mt-2 block text-[clamp(2rem,4.2vw,4rem)] font-medium leading-none tracking-[-0.06em]">ENGINEER</strong>
      </div>
      <div className="absolute right-[5%] top-1/2 z-20 hidden -translate-y-1/2 text-right md:block">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">02 / instinct</span>
        <strong className="mt-2 block text-[clamp(2rem,4.2vw,4rem)] font-medium leading-none tracking-[-0.06em] text-[#4075F7]">ARTIST</strong>
      </div>

      <div className="absolute z-10 h-[clamp(330px,55vw,520px)] w-[clamp(330px,55vw,520px)]" style={{ left: "50%", top: "48%", transform: "translate(-50%, -50%)" }}>
        <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#202029] shadow-[0_0_60px_rgba(64,117,247,.15)]" />
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4075F7]/35" />
        <div className="absolute left-1/2 top-1/2 h-[38%] w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] rounded-[50%] border border-white/30" />
        <div className="absolute left-1/2 top-1/2 h-[38%] w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] rounded-[50%] border border-white/20" />
        <div className="absolute left-1/2 top-1/2 h-[88%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#4075F7]/55" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-[6%] rounded-full border border-dashed border-white/15">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#4075F7] shadow-[0_0_18px_rgba(64,117,247,.9)]" />
        </motion.div>
        <div className="absolute left-1/2 top-1/2 z-20 w-[55%] -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8eafff]">Ideas, balanced</span>
          <h2 className="mt-3 text-[clamp(2.4rem,5vw,4.7rem)] font-medium leading-[0.82] tracking-[-0.07em]">Built with<br />both sides.</h2>
          <Link to="/projects" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#4075F7] px-4 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8eafff]">View work <ArrowIcon /></Link>
        </div>
      </div>

      {axisNodes.map((node) => (
        <motion.div key={node.label} whileHover={{ scale: 1.06 }} className="absolute z-20 hidden rounded-full border border-white/15 bg-[#1d1d24]/95 px-4 py-2 text-[9px] text-white/55 shadow-lg sm:block" style={node.position}>
          {node.label}
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.17em] text-white/25">Logic keeps it steady · taste gives it direction</div>
    </section>
  );
}

const conceptComponents = {
  eclipse: EclipseConcept,
  duality: DualityConcept,
  constellation: ConstellationConcept,
  solar: SolarConcept,
  gyroscope: GyroscopeConcept,
};

export default function LifeHomePage() {
  const [activeConcept, setActiveConcept] = useState("eclipse");
  const ActiveConcept = conceptComponents[activeConcept];

  return (
    <div className="mx-auto h-[calc(100dvh-78px)] w-full max-w-[1440px] overflow-hidden px-3 py-3 font-satoshi sm:px-5 md:px-7">
      <div id="concept-panel" role="tabpanel" className="h-[calc(100%-64px)] outline-none">
        <div key={activeConcept} className="h-full">
          <ActiveConcept />
        </div>
      </div>

      <div role="tablist" aria-label="Orbital homepage concepts" className="scrollbar-hide mx-auto mt-3 flex h-[52px] max-w-max gap-1.5 overflow-x-auto rounded-full border border-gray-200 bg-white/90 p-1 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#202020]/90">
        {CONCEPTS.map((concept) => {
          const isActive = concept.id === activeConcept;
          return (
            <button
              key={concept.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="concept-panel"
              onClick={() => setActiveConcept(concept.id)}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4075F7] ${isActive ? "bg-[#4075F7] text-white" : "text-gray-500 hover:bg-gray-100 hover:text-[#4075F7] dark:text-gray-300 dark:hover:bg-white/[0.06]"}`}
            >
              <span className={`font-mono text-[10px] ${isActive ? "text-white/65" : "text-gray-400"}`}>{concept.shortLabel}</span>
              {concept.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
