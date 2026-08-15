/* ---------------------------------------------------------------------------
 * PAGE CONTENT
 *
 * Every word below is Marie-Louise's, lightly edited for reading on a page.
 * Nothing here is invented. If a claim isn't in this file, it isn't on the
 * site — so this is the one file to edit when the wording should change, and
 * no component needs touching to do it.
 * ------------------------------------------------------------------------- */

export const intro = {
  /** Sits directly under her name. */
  tagline:
    "I work at the intersection of product and customers, translating business pains into real solutions.",
} as const;

/** The analogy is the centrepiece of the page, so it gets its own structure. */
export const analogy = {
  headline: "I'm like a doctor, but for software.",
  steps: [
    {
      verb: "Ask",
      from: "The patient",
      to: "The customer",
      body: "I ask a lot of questions.",
    },
    {
      verb: "Map",
      from: "The symptoms",
      to: "The workflow and the pain points",
      body: "How the work really happens today, and where it hurts.",
    },
    {
      verb: "Treat",
      from: "The treatment",
      to: "The solution",
      body: "Something that addresses the actual problem, not the reported one.",
    },
  ],
} as const;

export const likes = {
  heading: "What I like about it",
  items: [
    "Problem solving.",
    "Working with smart people who support a good culture.",
    "Talking to customers and helping them reach a better state for their business outcomes.",
  ],
  /** Given visual weight — it is the closest thing on the page to a personal creed. */
  pullQuote:
    "I'm at my best when I collaborate. Culture matters to me, and the way of working I picked up at Google has stuck.",
} as const;

export const facts = [
  { label: "Based in", value: "London, UK" },
  { label: "German", value: "Native" },
  { label: "English", value: "Fluent" },
  { label: "Spanish", value: "Fluent" },
] as const;

export const outsideWork = {
  heading: "Outside work",
  paragraphs: [
    "I love nature and being outdoors — a hike or a long stroll at the weekend, ideally with good coffee, good company and a great book.",
    "I keep fit and active. The gym regularly, and I'm aiming to pick tennis back up for social play. Saturday mornings are parkrun, currently in Henley-on-Thames; I like the energy of being active early and starting the weekend that way.",
    "And then there are the lazy days, where I do nothing much and just watch something. Balance is the key.",
  ],
} as const;
