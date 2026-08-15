/* ---------------------------------------------------------------------------
 * SITE CONFIG — start here.
 *
 * Almost everything personal about this site lives in this one file. Change a
 * value here and it updates across every page, the nav, the footer and the
 * SEO metadata. You should not need to touch component code to make the site
 * yours.
 * ------------------------------------------------------------------------- */

export const site = {
  /** Your name, as it should appear in the header and page titles. */
  name: "Marie-Lou Mueller",

  /** One line under your name on the home page. Keep it concrete. */
  role: "AI Solutions & Automation",

  /** The single sentence you want someone to remember. */
  tagline:
    "I scope and ship agent-based automation — deciding what a system should own, what a human keeps, and how you know it is working.",

  /** Two or three sentences for the home page intro and meta description. */
  intro:
    "I work at the seam between messy operational processes and the systems meant to replace them. That means writing the spec as carefully as the code: what the agent decides, where a human stays in the loop, and what evidence tells us it is safe to widen the scope.",

  /** Where the site will live. Used for canonical URLs and social cards. */
  url: "https://marie-lou.dev",

  /** City / timezone line shown on the contact page. */
  location: "Berlin, Germany",

  /** Set to false to hide the "available for work" pill on the home page. */
  availableForWork: true,
  availabilityNote: "Open to new roles and select consulting work.",

  /* Links. Every one of these is used by the footer and the contact page.
     Delete an entry and it disappears from the UI automatically. */
  links: {
    email: "mlmueller2810@gmail.com",
    github: "https://github.com/marie-lou28",
    linkedin: "https://www.linkedin.com/in/marie-lou-mueller",
  },

  /** Path to the CV PDF served from /public. See scripts/generate-cv-pdf.mjs. */
  cvPdf: "/cv/marie-lou-mueller-cv.pdf",
} as const;

/* --------------------------------------------------------------------------
 * Navigation. Reorder, rename or remove entries — the header and the mobile
 * menu both read from this array.
 * ------------------------------------------------------------------------ */
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/graphs", label: "Graphs" },
  { href: "/personal", label: "Personal" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
