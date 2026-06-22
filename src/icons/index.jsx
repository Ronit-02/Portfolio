const iconProps = (active, size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: active ? "#4075F7" : "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const HomeIcon = ({ active }) => (
  <svg {...iconProps(active)}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);

export const AboutIcon = ({ active }) => (
  <svg {...iconProps(active)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export const ProjectsIcon = ({ active }) => (
  <svg {...iconProps(active)}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

export const ExperienceIcon = ({ active }) => (
  <svg {...iconProps(active)}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);

export const BlogIcon = ({ active }) => (
  <svg {...iconProps(active)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
);

export const PhotosIcon = ({ active }) => (
  <svg {...iconProps(active)}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
);

export const ContactIcon = ({ active }) => (
  <svg {...iconProps(active)}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);

export const SettingsIcon = ({ active }) => (
  <svg {...iconProps(active)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);

export const ArrowUpRight = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);

export const ChevronDown = ({ rotated }) => (
  <svg className={`transition-transform duration-200 ${rotated ? "rotate-180" : "rotate-0"}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);

export const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);

export const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#4075F7]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export const MusicIcon = ({ on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#4075F7" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
);

export const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);

export const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);

export const XClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

export const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 50 50" fill="currentColor"><path d="M16 3C8.832 3 3 8.832 3 16v18c0 7.168 5.832 13 13 13h18c7.168 0 13-5.832 13-13V16c0-7.168-5.832-13-13-13H16zm0 2h18c6.086 0 11 4.914 11 11v18c0 6.086-4.914 11-11 11H16C9.914 45 5 40.086 5 34V16C5 9.914 9.914 5 16 5zm21 6a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-12 3c-6.063 0-11 4.937-11 11s4.937 11 11 11 11-4.937 11-11-4.937-11-11-11zm0 2c4.982 0 9 4.018 9 9s-4.018 9-9 9-9-4.018-9-9 4.018-9 9-9z" /></svg>;
export const XIcon = () => <svg width="18" height="18" viewBox="0 0 50 50" fill="currentColor"><path d="M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z" /></svg>;
export const LinkedInIcon = () => <svg width="18" height="18" viewBox="0 0 45.959 45.959" fill="currentColor"><path d="M5.392.492C2.268.492 0 2.647 0 5.614c0 2.966 2.223 5.119 5.284 5.119 1.588 0 2.956-.515 3.957-1.489.96-.935 1.489-2.224 1.488-3.653C10.659 2.589 8.464.492 5.392.492zm2.455 7.319c-.62.603-1.507.922-2.563.922C3.351 8.733 2 7.451 2 5.614c0-1.867 1.363-3.122 3.392-3.122 1.983 0 3.293 1.235 3.338 3.123-.001.862-.314 1.641-.883 2.196zM.959 45.467h8.988V12.422H.959v33.045zm2-31.045h4.988v29.044H2.959V14.422zm30.689-2c-4.168 0-6.72 1.439-8.198 2.792l-.281-2.792H15v33.044h9.959V28.099c0-.748.303-2.301.493-2.711 1.203-2.591 2.826-2.591 5.284-2.591 2.831 0 5.223 2.655 5.223 5.797v16.874h10v-18.67c0-9.878-6.382-14.376-12.311-14.376zm10.311 31.045h-6V28.593c0-4.227-3.308-7.797-7.223-7.797-2.512 0-5.358 0-7.099 3.75-.359.775-.679 2.632-.679 3.553v15.368H17V14.422h6.36l.408 4.044h1.639l.293-.473c.667-1.074 2.776-3.572 7.948-3.572 4.966 0 10.311 3.872 10.311 12.374v16.672z" /></svg>;
export const BehanceIcon = () => <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor"><path d="M5.5 10C3.585 10 2 11.585 2 13.5v21C2 36.415 3.585 38 5.5 38h11c4.677 0 8.5-3.823 8.5-8.5 0-2.956-1.62-5.445-3.926-6.969C22.802 21.253 24 19.3 24 17c0-3.848-3.152-7-7-7H5.5zm28.012 2a1.5 1.5 0 0 0 0 3h8a1.5 1.5 0 1 0 0-3h-8zM5.5 13H17c2.228 0 4 1.772 4 4 0 2.228-1.772 4-4 4H5v-7.5c0-.295.205-.5.5-.5zm31.496 4c-5.337 0-9.549 4.433-9.877 9.867a1.5 1.5 0 0 0 0 1.27C27.45 33.57 31.661 38 36.996 38c3.485 0 6.926-1.773 8.772-4.695a1.5 1.5 0 1 0-2.536-1.604C42.03 33.605 39.406 35 36.996 35c-3.347 0-6.049-2.566-6.717-6h14.205c1.472 0 2.663-1.318 2.49-2.791v-.002C46.373 21.052 42.127 17 36.997 17zm0 3c3.355 0 6.163 2.565 6.832 6H30.28c.668-3.434 3.369-6 6.717-6zM5 24h11.5c3.055 0 5.5 2.445 5.5 5.5S19.555 35 16.5 35h-11a.478.478 0 0 1-.5-.5V24z" /></svg>;
