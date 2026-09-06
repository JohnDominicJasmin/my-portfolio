/**
 * Single place for the things that change when the business does.
 */

export const email = "johndominicjasmin@gmail.com";

/**
 * Public origin of the deployed site, no trailing slash — e.g.
 *   "https://johndominicjasmin.com"  or  "https://yoursite.netlify.app"
 *
 * Set this. While it is empty there is no canonical URL and no absolute
 * og:image, which means a link pasted into LinkedIn, Messenger or WhatsApp
 * shows a bare URL with no preview card. Given that pasting the link into
 * DMs IS the distribution plan, this is the highest-value line in the file.
 */
export const siteUrl = "https://johndominicjasmin.com";

/**
 * Cal.com booking link for the free audit call.
 *
 * Paste the full URL here once the event type exists, e.g.
 *   "https://cal.com/johndominic/audit"
 *
 * While this is empty every "Book a free audit" control falls back to email,
 * so the page is never broken — it just converts worse.
 */
export const bookingUrl = "https://cal.com/johndominic/audit";

/**
 * Endpoint the chat widget posts to: the "Portfolio-chatbot" workflow on the
 * n8n instance. A POST webhook, not a Chat Trigger — the Chat Trigger answers
 * no CORS preflight, so the browser never got as far as sending the message.
 *
 * While it is empty the widget still renders and opens, but says plainly
 * that the assistant is not connected and points at the booking link and
 * email instead. It never pretends something is answering.
 *
 * This URL ships in client JavaScript, so anyone can read it. Two things stop
 * that emptying the OpenAI balance: the workflow's origin allowlist, which
 * blocks another site's browser code outright, and its rate guard, which caps
 * a session at 20 messages an hour and the whole endpoint at 300.
 */
export const chatWebhookUrl =
  "https://n8n-workflows-6ig6.onrender.com/webhook/portfolio-chat";

/**
 * Endpoint the audit quiz posts to: the "Portfolio-audit" workflow. Same
 * shape and the same protections as the chat, with tighter caps because one
 * visitor has no reason to run it five times.
 *
 * This only writes the answer the visitor reads on screen. The lead itself
 * goes to Netlify Forms, which is a separate path on purpose: if n8n is
 * asleep or the OpenAI call fails, the inquiry still lands in the inbox.
 */
export const auditWebhookUrl =
  "https://n8n-workflows-6ig6.onrender.com/webhook/portfolio-audit";

/**
 * Endpoint the quiz beacons to when someone answers a question or two and
 * then leaves without finishing. Without it an abandoned quiz is invisible:
 * the only thing that ever reaches n8n is a completed run, so the questions
 * people quit on look exactly like questions nobody was asked.
 *
 * Deliberately writes nothing but a row — no model call — so an abandonment
 * costs nothing and a wave of them cannot run up a bill.
 */
export const dropoffWebhookUrl =
  "https://n8n-workflows-6ig6.onrender.com/webhook/portfolio-dropoff";

const mailtoFallback = `mailto:${email}?subject=${encodeURIComponent(
  "Free automation audit",
)}&body=${encodeURIComponent(
  "The job I'd most like to stop doing by hand:\n\n",
)}`;

export const booking = {
  href: bookingUrl || mailtoFallback,
  /** Only send people off-site when it's a real booking page. */
  external: Boolean(bookingUrl),
};
