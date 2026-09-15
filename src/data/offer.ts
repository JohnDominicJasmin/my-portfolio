/**
 * The offer: what is sold, how it is priced, and the promises the page makes.
 *
 * Every number in here is John's to set. A value left null hides the line that
 * would have shown it, so the page never publishes a price, a guarantee or a
 * timeline nobody agreed to.
 *
 * Prices set 2026-09-16, placed in the done-for-you band for contractors
 * ($297-897 a month plus $497-997 setup) rather than against the $39-299
 * self-serve tools, because this is set up, run and reported on for them.
 */

export type Tier = {
  name: string;
  forWho: string;
  /** Monthly price in USD. null renders "Priced on the Leak Check call". */
  monthly: number | null;
  features: string[];
  featured?: boolean;
};

export const offer = {
  /** The free first step. Every "book" button on the page points at it. */
  checkName: "Missed-Call Leak Check",

  /** One-time setup fee in USD. null shows the fee without a number. */
  setupFee: 997 as number | null,

  /** Days from paid start to live. null hides the promise. */
  goLiveDays: 7 as number | null,

  /**
   * Covers the first month's fee only. The setup fee pays for real build work,
   * so it is not part of the refund, and the wording says so.
   */
  guarantee: "30-day money-back guarantee on your first month's fee" as string | null,

  /**
   * Founding-client terms: setup waived in exchange for a case study, the way
   * the first references get made. Set to null once the places are taken.
   */
  founding:
    "Founding clients: setup waived for the first 3 businesses, in exchange for a case study with real numbers." as
      | string
      | null,

  tiers: [
    {
      name: "After-hours",
      forWho: "Covered in the day, losing the nights and weekends.",
      monthly: 297,
      features: [
        "Backup mode on your existing number",
        "Urgent calls flagged and sent to your on-call person",
        "Bookings straight into your calendar",
        "Monthly report: calls answered, jobs booked",
      ],
    },
    {
      name: "Front desk",
      forWho: "The phone never stops and nobody has time for it.",
      monthly: 597,
      featured: true,
      features: [
        "Everything in After-hours",
        "Every call answered, day and night",
        "Messenger and website inquiries too",
        "Follow-ups and reminders sent for you",
        "Leads and bookings synced to your CRM",
      ],
    },
    {
      name: "Multi-location",
      forWho: "More than one number, branch or crew.",
      monthly: 997,
      features: [
        "Everything in Front desk",
        "Each branch routed to its own team",
        "Connections to the tools you already run",
        "Priority changes and support",
      ],
    },
  ] as Tier[],

  /**
   * The AI front desk walkthrough: a real build answering, booking and
   * recovering from a failure. The same video the front desk case study uses.
   */
  demoLoom: "https://www.loom.com/embed/8166869bf3cb434da542254be79b5d19",

  /** Only what it connects to today. Add a tool here once it is built. */
  worksWithToday: [
    "Your existing phone number",
    "Google Calendar",
    "GoHighLevel",
    "Facebook Messenger",
    "Your website",
  ],
};

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
