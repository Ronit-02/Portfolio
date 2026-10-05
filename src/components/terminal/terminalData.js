import { profile, projects, skillGroups, socialLinks } from "../../data";

const row = (key, value, accent = null) => ({ key, value, accent });
const output = (title, meta, rows) => ({ title, meta, rows });

export const COMMANDS_LIST = [
  { cmd: "whoami", desc: `Who is ${profile.firstName}?` },
  { cmd: "ls projects", desc: "List all projects" },
  { cmd: "skills", desc: "View tech stack" },
  { cmd: "cat resume.pdf", desc: "Open resume PDF" },
  { cmd: "contact", desc: "Get in touch" },
  { cmd: "social", desc: "View social profiles" },
  { cmd: "music on", desc: "Enable background music" },
  { cmd: "music off", desc: "Disable background music" },
  { cmd: "dark mode", desc: "Switch to dark mode" },
  { cmd: "light mode", desc: "Switch to light mode" },
  { cmd: "help", desc: "Show all commands" },
];

export const OUTPUTS = {
  whoami: output("identity", "profile", [
    row("name", profile.firstName.toUpperCase()),
    row("role", profile.terminalRole.toUpperCase()),
    row("location", profile.location.toUpperCase()),
    row("status", "●  AVAILABLE", "status"),
  ]),
  "ls projects": output(
    "projects",
    `${projects.length} entries`,
    projects.map((project, index) =>
      row(
        `${String(index + 1).padStart(2, "0")} ${project.title}`,
        project.code.stack.join(", "),
        "key"
      )
    )
  ),
  skills: output(
    "skills",
    `${skillGroups.length} groups`,
    skillGroups.map((group) =>
      row(group.label.toLowerCase(), group.items.join(", "))
    )
  ),
  "cat resume.pdf": output("file", "resume.pdf", [
    row("source", "~/documents/resume.pdf"),
    row("status", "opening in a new tab", "value"),
  ]),
  contact: output("contact", "direct", [
    row("email", profile.email, "value"),
  ]),
  social: output(
    "social",
    `${socialLinks.length} profiles`,
    socialLinks.map((social) =>
      row(
        social.label.toLowerCase(),
        social.href.replace(/^https?:\/\/(www\.)?/, ""),
        "value"
      )
    )
  ),
  "music on": output("system", "updated", [
    row("setting", "background_music"),
    row("status", "enabled", "value"),
  ]),
  "music off": output("system", "updated", [
    row("setting", "background_music"),
    row("status", "disabled", "value"),
  ]),
  "dark mode": output("appearance", "updated", [
    row("theme", "dark"),
    row("status", "active", "value"),
  ]),
  "light mode": output("appearance", "updated", [
    row("theme", "light"),
    row("status", "active", "value"),
  ]),
};

OUTPUTS.help = output(
  "commands",
  `${COMMANDS_LIST.length} available`,
  COMMANDS_LIST.map((command) => row(command.cmd, command.desc, "key"))
);
