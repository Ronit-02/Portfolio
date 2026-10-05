import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import { BehanceIcon, CheckIcon, InstagramIcon, LinkedInIcon, XIcon } from "../icons";
import { contactContent, profile, socialLinks } from "../data";
import { cn } from "../utils/cn";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  x: XIcon,
  behance: BehanceIcon,
  linkedin: LinkedInIcon,
};

const SOCIALS = socialLinks
  .filter(({ id }) => SOCIAL_ICONS[id])
  .map((social) => ({ ...social, Icon: SOCIAL_ICONS[social.id] }));

const inputBase = "w-full rounded-xl border px-4 py-3 text-base text-gray-800 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[#4075F7] sm:px-5 dark:bg-[#1a1a1a] dark:text-gray-100 dark:placeholder:text-gray-600";

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-[#e24b4a]">{children}</p>;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.message.trim()) nextErrors.message = "Message is required";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSent(true);
  };

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  const inputStateClass = (field) => (errors[field] ? "border-[#e24b4a]" : "border-[#e0e0e0] dark:border-gray-800");

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-9 sm:gap-12 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.08 }}
          className="shrink-0 md:w-64"
        >
          <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {contactContent.introduction}
          </p>

          <div className="mb-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Email</p>
            <a href={`mailto:${profile.email}`} className="break-all text-sm text-gray-700 transition-colors hover:text-[#4075F7] dark:text-gray-300">
              {profile.email}
            </a>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Socials</p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ label, href, Icon, handle }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="flex min-w-0 items-center gap-3 text-sm text-gray-600 transition-colors hover:text-[#4075F7] dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700">
                    <Icon />
                  </span>
                  <span className="min-w-0 break-all">{handle}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.12 }}
          className="flex-1"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="py-16 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF0FF]">
                  <CheckIcon />
                </div>
                <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">{contactContent.successTitle}</p>
                <p className="mb-6 text-sm text-gray-500">{contactContent.successMessage}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="cursor-pointer border-none bg-transparent text-sm text-[#4075F7]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    className={cn(inputBase, inputStateClass("name"))}
                  />
                  <FieldError>{errors.name}</FieldError>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className={cn(inputBase, inputStateClass("email"))}
                  />
                  <FieldError>{errors.email}</FieldError>
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className={cn(inputBase, "resize-none", inputStateClass("message"))}
                  />
                  <FieldError>{errors.message}</FieldError>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="w-full cursor-pointer rounded-xl border-none bg-[#4075F7] py-3 font-semibold text-white"
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
