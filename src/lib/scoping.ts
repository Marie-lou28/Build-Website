/* ---------------------------------------------------------------------------
 * SCOPING PAGE CONTENT  —  ***DRAFT***
 *
 * Unlike `content.ts`, none of this is Marie-Louise's yet. It is a draft
 * written to give the page a shape to argue with: the structure is the
 * proposal, the words are a stand-in.
 *
 * The worked example below is INVENTED. No customer, team, or number in it
 * is real. It reads like a real engagement on purpose — that is what makes it
 * a useful skeleton — which is exactly why the page carries a visible draft
 * banner until the words are hers.
 *
 * To ship this page:
 *   1. Rewrite the copy below, ideally around a real engagement.
 *   2. Set `isDraft` to false. That removes the banner and nothing else.
 * ------------------------------------------------------------------------- */

export const page = {
  title: "Scoping an agent",
  /** Set to false once the copy below is Marie-Louise's own. */
  isDraft: true,
  draftNote:
    "Draft. The structure is real, the worked example is invented — placeholder text written by an assistant, not by me. Nothing here describes an actual customer.",
  lede:
    "Everyone asks for the same thing at first: an agent that handles everything. The job is to find the one narrow thing that is worth automating, and to say out loud what we are not building.",
} as const;

/** The vague ask that starts most engagements. Sets up everything below it. */
export const brief = {
  eyebrow: "The ask",
  quote: "Can we get an AI agent to handle our support tickets?",
  attribution: "The request, as it arrives",
  body:
    "This is not a scope. It is a symptom. Nine words that could mean a dozen different products, most of which would be a bad idea, and one of which is probably worth six weeks. The rest of this page is how I tell those apart.",
} as const;

/** The three stages mirror the doctor analogy on the home page. */
export const stages = [
  {
    id: "ask",
    verb: "Ask",
    lede: "The right first move is questions, not a proposal. These are the ones that earn their place.",
    groups: [
      {
        heading: "Who, and what exactly",
        questions: [
          "Who is asking for this, and who actually does the work today?",
          "Which requests do you mean? Show me the last twenty that came in.",
          "Walk me through what happens right now when one arrives.",
        ],
      },
      {
        heading: "Where it hurts",
        questions: [
          "Which part of this does the team dread?",
          "What takes longest, and what gets escalated?",
          "What does it cost you on the days it goes wrong?",
        ],
      },
      {
        heading: "What good looks like",
        questions: [
          "If this worked perfectly, what is different on Monday morning?",
          "How would you know it was working without having to ask anyone?",
          "What would make you turn it off?",
        ],
      },
    ],
  },
  {
    id: "map",
    verb: "Map",
    lede: "Then I write down how the work actually happens — not how the process document says it does. The pain is never spread evenly, and it is rarely where the ask pointed.",
    steps: [
      {
        step: "A ticket lands in a shared inbox.",
        hurts: false,
        note: "Works fine. Leave it alone.",
      },
      {
        step: "Someone reads it and decides which of nine queues it belongs in.",
        hurts: true,
        note: "Three or four minutes each, and wrong often enough that re-routing is somebody's whole morning.",
      },
      {
        step: "For account questions, they open the billing tool in a second tab and match the customer by hand.",
        hurts: true,
        note: "The single most-repeated action in the team, and the one nobody lists when you ask what they do.",
      },
      {
        step: "They write a reply, mostly from memory, occasionally from a saved snippet.",
        hurts: false,
        note: "Slow, but this is the part they are good at and the part customers notice.",
      },
      {
        step: "Anything about money goes to a senior for sign-off.",
        hurts: false,
        note: "A control, not a bottleneck. It stays.",
      },
    ],
    finding:
      "The ask was 'handle our tickets'. The pain is two steps in the middle — sorting, and looking things up in a second system. That is the thing worth building.",
  },
  {
    id: "treat",
    verb: "Treat",
    lede: "So the scope is narrow on purpose, and the out-of-scope list is written down before anyone starts.",
    inScope: [
      "Answers two question types — 'where is my order' and 'what am I being charged for' — by reading both systems itself.",
      "Hands off to a person the moment it is asked anything else, and says so plainly to the customer.",
      "Drafts replies for a human to send. It does not send anything for the first four weeks.",
    ],
    outOfScope: [
      "Refunds, credits, and anything else that moves money.",
      "Cancellations and account closures.",
      "The other seven queues — until this one is boring.",
    ],
    measures: [
      { metric: "Median time to first reply", detail: "On those two question types only. The number the customer actually feels." },
      { metric: "Share of drafts sent unedited", detail: "If people rewrite every draft, it is not working, however good the demo looked." },
      { metric: "Handoffs that should not have been", detail: "Watched in both directions — over-eager is a worse failure than over-cautious." },
    ],
  },
] as const;

export const closing = {
  heading: "Why so narrow",
  paragraphs: [
    "A narrow agent that people trust beats a broad one they check twice. The second one costs more than doing the work by hand, and it only has to be wrong loudly once.",
    "Everything on the out-of-scope list is a thing we might build next quarter. Writing it down is not saying no — it is making the first version small enough to be honest about.",
  ],
} as const;
