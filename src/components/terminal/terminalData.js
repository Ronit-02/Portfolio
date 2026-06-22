export const COMMANDS_LIST = [
  { cmd: "whoami", desc: "Who is Ronit?" },
  { cmd: "ls projects", desc: "List all projects" },
  { cmd: "skills", desc: "View tech stack" },
  { cmd: "cat resume.pdf", desc: "Open resume PDF" },
  { cmd: "contact", desc: "Get in touch" },
  { cmd: "music on", desc: "Enable background music" },
  { cmd: "music off", desc: "Disable background music" },
  { cmd: "dark mode", desc: "Switch to dark mode" },
  { cmd: "light mode", desc: "Switch to light mode" },
  { cmd: "help", desc: "Show all commands" },
];

export const OUTPUTS = {
  whoami: [
    { t: "primary", v: "Ronit Khatri - Technology Associate, ZS Associates" },
    { t: "muted", v: "Delhi, India  -  Full-stack developer" },
    { t: "", v: "" },
    { t: "blue", v: "Loves: music, coffee, late-night builds" },
    { t: "muted", v: "Hates: prop drilling, Comic Sans" },
  ],
  "ls projects": [
    { t: "primary", v: "Soundscape    - React Native, FastAPI, PostgreSQL" },
    { t: "primary", v: "Ink Rider     - React, Node.js, MongoDB" },
    { t: "primary", v: "FraudGuard    - Flask, scikit-learn, React" },
  ],
  skills: [
    { t: "blue", v: "Frontend  -- React, TypeScript, Next.js, Tailwind" },
    { t: "blue", v: "Backend   -- Python, FastAPI, Node, Express" },
    { t: "blue", v: "Cloud     -- AWS Lambda, Glue, Step Functions, S3" },
    { t: "blue", v: "Data      -- Pandas, PySpark, SQL, MongoDB" },
  ],
  "cat resume.pdf": [
    { t: "muted", v: "Fetching resume.pdf ..." },
    { t: "blue", v: "Opening in new tab" },
  ],
  contact: [
    { t: "primary", v: "ronitkhatri44@gmail.com" },
    { t: "blue", v: "linkedin.com/in/ronit-khatri" },
    { t: "blue", v: "github.com/ronitkhatri" },
  ],
  "music on": [{ t: "blue", v: "Background music enabled. Vibe unlocked." }],
  "music off": [{ t: "muted", v: "Music off. Back to silence." }],
  "dark mode": [{ t: "blue", v: "Switching to dark mode..." }],
  "light mode": [{ t: "blue", v: "Switching to light mode..." }],
};

OUTPUTS.help = COMMANDS_LIST.map((command) => ({
  t: "primary",
  v: `  ${command.cmd.padEnd(18)}${command.desc}`,
}));
