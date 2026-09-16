import Link from "next/link";
import { email } from "@/data/site";
import { offer } from "@/data/offer";
import { salesFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../sales.css";
import "../offer.css";

export const metadata = pageMeta({
  title: "White-Label AI Front Desk for Agencies | John Dominic Jasmin",
  description:
    "You close the client. I build the AI front desk under your brand, then run it, monitor it and fix what breaks. For agencies with paying clients.",
  path: "/partners",
});

/**
 * The same front desk, sold through agencies that close clients but do not
 * build. There are deliberately no prices on this page: the partner price list
 * goes out after the intake, so an agency's cost never sits where its own
 * clients can find it. The intake form is a real Netlify POST, registered from
 * the exported HTML like the other forms.
 */

type Card = { label: string; title: string; body: string; alert?: boolean };

const resell: Card[] = [
  {
    label: "Answers",
    title: "Calls, Messenger and web chat, any hour",
    body: "Your client's customers get an answer in seconds, day or night, in your client's name.",
  },
  {
    label: "Books",
    title: "Jobs straight into their calendar",
    body: "Bookings land in Google Calendar or GoHighLevel with the details filled in, and reminders go out on their own.",
  },
  {
    label: "Escalates",
    title: "Urgent calls go to a person",
    body: "Emergencies are flagged and sent to whoever is on call, with the whole conversation attached. It hands over instead of guessing.",
    alert: true,
  },
  {
    label: "Syncs",
    title: "Every lead lands in the CRM",
    body: "Leads and bookings are written to the CRM, so your client's team starts from the details, not from zero.",
  },
  {
    label: "Reports",
    title: "A monthly report you forward",
    body: "Calls answered, after-hours calls caught and jobs booked, with no name on it, so it goes out under yours.",
  },
  {
    label: "Recovers",
    title: "Built for the day something breaks",
    body: "Duplicate checks, fallbacks and alerts. If a service fails, the customer still gets a reply and I get the alert.",
  },
];

const proof = [
  "One engineer on every build, from intake to the monthly report. No hand-off to someone you have never met.",
  "Checks, fallbacks and alerts are part of every build, not an upsell.",
  "US evenings and nights are my working day (Philippines, GMT+8), so an after-hours problem is caught while I am at my desk.",
  "Three client testimonials on the main site, and my first client referred my second.",
];

const steps = [
  {
    n: "01",
    title: "Intake",
    body: "Tell me about the client you have signed: their trade, their tools, what they need. If it is a fit, you get the partner price list.",
    meta: "Free",
  },
  {
    n: "02",
    title: "Build",
    body: "I set it up on your client's number, calendar and CRM, in your client's name. You see it working before it goes live.",
    meta:
      offer.goLiveDays !== null
        ? `Half the setup to start · Live in ${offer.goLiveDays} days`
        : "Half the setup to start",
  },
  {
    n: "03",
    title: "Run",
    body: "I run it, watch it and fix what breaks. Your client only ever hears from you.",
    meta: "Monthly license per client",
  },
  {
    n: "04",
    title: "Report",
    body: "Each month you get the numbers for every client, ready to forward under your brand.",
    meta: "Monthly report",
  },
];

const fitYes = [
  "You have at least one paying client who needs this",
  "You handle the selling and the client relationship",
  "You want it running and supported, not just built",
  "Your clients are service businesses that live on the phone",
];

const fitNo = [
  "You have no paying clients yet",
  "You want a free build to show a prospect",
  "You want the source code handed over (that is a custom build, quoted separately)",
  "You need it live tomorrow with no intake",
];

const terms = [
  "A setup fee per client: half to start, half at go-live.",
  "A monthly license per client, with call minutes included. Extra minutes are billed at a rate agreed up front.",
  "A 90-day minimum per client, then month to month.",
  "You set your client's price. What you charge them is yours.",
  "I never contact your clients, and you never take the system to someone else. Both ways, in writing.",
  "Anything outside the agreed scope is quoted before any work starts.",
  "Your client keeps their phone number, calendar, CRM and customer data. The system itself is licensed, not sold.",
  "Payments follow the build milestones, not your client's payment schedule.",
];

const faqs = [
  {
    q: "Is it really white-label?",
    a: "Yes. The AI answers in your client's name, the reports carry no name, and I never contact your clients. If your client asks who built it, that is yours to answer.",
  },
  {
    q: "Who owns what?",
    a: "Your client keeps their phone number, calendar, CRM and customer data. The system is licensed per client, which is how I can keep maintaining and improving it. If you need the code handed over, that is a custom build, quoted separately.",
  },
  {
    q: "What happens when something breaks?",
    a: "I get the alert, usually before anyone notices, and fixing it is part of the monthly license. If a change on your side caused it, I tell you what happened and quote the fix first.",
  },
  {
    q: "Will you talk to my client?",
    a: "Only if you want me to. Client communication is yours. If you want me on a call with them, we book it ahead and it is billed.",
  },
  {
    q: "Can you fix something we already built?",
    a: "Yes. If a client's automation keeps breaking, send it through the form. I quote a fixed price to find the cause and fix it before anything else.",
  },
  {
    q: "What does it cost?",
    a: "A setup fee and a monthly license per client, with call minutes included. The price list goes out after the intake, so your margins stay private.",
  },
];

export default function PartnersPage() {
  return (
    <div className={`sales ${salesFonts}`}>
      <a className="l-skip" href="#main">
        Skip to content
      </a>

      <nav className="l-nav l-wrap">
        <span className="l-nav__brand">
          <Link href="/">John Dominic Jasmin</Link>
        </span>
        <div className="l-nav__links">
          <details className="l-nav__menu">
            <summary>Menu</summary>
            <div className="l-nav__menu-items">
              <a href="#resell">What you resell</a>
              <a href="#terms">Terms</a>
              <a href="#faq">FAQ</a>
            </div>
          </details>
          <a href="#apply" className="l-btn l-btn--solid l-btn--small">
            Apply to partner
          </a>
        </div>
      </nav>

      <header className="l-hero l-wrap l-rise">
        <span className="l-hero__flag">For AI and marketing agencies</span>
        <h1 className="l-hero__title">
          You close the client. <em>I build it and keep it running.</em>
        </h1>
        <p className="l-hero__sub">
          A white-label AI front desk your clients never see my name on. It
          answers calls and messages, books jobs into their calendar, and sends
          urgent calls to a person. I run it, watch it and fix it, so your
          support inbox stays quiet.
        </p>
        <div className="l-hero__ctas">
          <a href="#apply" className="l-btn l-btn--solid">
            Apply to partner
          </a>
          <a href="#watch" className="l-btn l-btn--ghost">
            Watch it run
          </a>
        </div>
        <p className="l-hero__notfor">
          For agencies with paying clients. Not a course, not a template pack.
        </p>
      </header>

      <main id="main">
        <section
          id="resell"
          className="l-fix l-wrap"
          style={{ borderTop: "1px solid var(--l-line)" }}
        >
          <div className="l-center" style={{ marginBottom: 48 }}>
            <span className="l-eyebrow">What you resell</span>
            <h2 className="l-h2">A front desk that answers, books and hands over.</h2>
          </div>
          <div className="l-grid-3">
            {resell.map((item) => (
              <article
                className={`l-card${item.alert ? " l-card--alert" : ""}`}
                key={item.label}
              >
                <div className="l-card__label">{item.label}</div>
                <h3 className="l-card__title">{item.title}</h3>
                <p className="l-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="l-band l-wrap">
          <div className="l-center" style={{ marginBottom: 40 }}>
            <span className="l-eyebrow">Why agencies bring me in</span>
            <h2 className="l-h2">
              Most builds break in the first busy week. That lands on you.
            </h2>
            <p className="l-lede">
              I&rsquo;m a software engineer with 6 years of experience, including
              banking apps connected to secured backend APIs, and 2 years building
              AI automation. I build these the same way: every step checked, every
              failure caught, and the alert on my phone, not in your client&rsquo;s
              inbox.
            </p>
          </div>
          <ul className="l-intake">
            {proof.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="l-intake__note">
            <Link href="/#in-their-words">Read what the clients said</Link>
          </p>
        </section>

        <section id="watch" className="l-section l-wrap">
          <div className="l-center" style={{ marginBottom: 40 }}>
            <span className="l-eyebrow">Watch it run</span>
            <h2 className="l-h2">The real system: answering, booking, recovering.</h2>
          </div>
          <div className="l-watch">
            <div className="l-demo__video">
              <iframe
                src={offer.demoLoom}
                title="Walkthrough of an AI front desk answering, booking and recovering from a failure"
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <p className="l-demo__caption">
              The same system your clients get, under their name
            </p>
          </div>
        </section>

        <section id="how-it-works" className="l-section l-wrap">
          <div className="l-center" style={{ marginBottom: 44 }}>
            <span className="l-eyebrow">How it works</span>
            <h2 className="l-h2">You sell it. I build it, run it and report on it.</h2>
          </div>
          <ol className="l-steps">
            {steps.map((step) => (
              <li className="l-stepcard" key={step.n}>
                <span className="l-stepcard__n">{step.n}</span>
                <h3 className="l-stepcard__title">{step.title}</h3>
                <p className="l-stepcard__body">{step.body}</p>
                <p className="l-stepcard__meta">{step.meta}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="fit" className="l-band l-wrap">
          <div className="l-center" style={{ marginBottom: 44 }}>
            <span className="l-eyebrow">Fit</span>
            <h2 className="l-h2">Which agencies this is for, and which it is not.</h2>
          </div>
          <div className="l-fit">
            <div className="l-fit__col l-fit__col--yes">
              <h3>A good fit</h3>
              <ul className="l-fit__list">
                {fitYes.map((line) => (
                  <li key={line}>
                    <span className="l-fit__mark" aria-hidden="true">
                      ✓
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="l-fit__col l-fit__col--no">
              <h3>Not a fit</h3>
              <ul className="l-fit__list">
                {fitNo.map((line) => (
                  <li key={line}>
                    <span className="l-fit__mark" aria-hidden="true">
                      ✕
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="terms" className="l-section l-wrap">
          <div className="l-center" style={{ marginBottom: 40 }}>
            <span className="l-eyebrow">Partner terms</span>
            <h2 className="l-h2">Plain terms, in writing, before anything is built.</h2>
          </div>
          <ul className="l-terms">
            {terms.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="l-terms__note">
            The partner price list goes out after the intake, so your cost never
            sits on a page your clients can find.
          </p>
        </section>

        <section id="apply" className="l-section l-wrap">
          <div className="l-apply">
            <div className="l-center" style={{ marginBottom: 34 }}>
              <span className="l-eyebrow">Apply to partner</span>
              <h2 className="l-h2">Tell me about the client you have signed.</h2>
              <p className="l-lede">
                Five minutes. If it is a fit, the partner price list is in your
                inbox within one working day. If it is not, I will say so.
              </p>
            </div>

            <form
              name="partner-intake"
              method="POST"
              action="/partners/thanks"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="l-form__grid"
            >
              <input type="hidden" name="form-name" value="partner-intake" />
              <p className="l-form__pot" aria-hidden="true">
                <label>
                  Leave this empty
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="l-field">
                <label htmlFor="p-name">Your name</label>
                <input id="p-name" name="name" type="text" required autoComplete="name" />
              </div>

              <div className="l-field">
                <label htmlFor="p-email">Email</label>
                <input id="p-email" name="email" type="email" required autoComplete="email" />
              </div>

              <div className="l-field">
                <label htmlFor="p-agency">Agency</label>
                <input
                  id="p-agency"
                  name="agency"
                  type="text"
                  required
                  autoComplete="organization"
                />
              </div>

              <div className="l-field">
                <div className="l-field__head">
                  <label htmlFor="p-website">Agency website</label>
                  <span className="l-field__opt">optional</span>
                </div>
                <input id="p-website" name="website" type="text" inputMode="url" />
              </div>

              <div className="l-field">
                <label htmlFor="p-clients">Paying clients right now</label>
                <select id="p-clients" name="paying_clients" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>None yet</option>
                  <option>1 to 2</option>
                  <option>3 to 5</option>
                  <option>6 or more</option>
                </select>
              </div>

              <div className="l-field">
                <label htmlFor="p-timeline">When it needs to be live</label>
                <select id="p-timeline" name="timeline" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>This month</option>
                  <option>In 1 to 3 months</option>
                  <option>Just exploring</option>
                </select>
              </div>

              <div className="l-field l-field--wide">
                <label htmlFor="p-niches">Your clients&rsquo; trades</label>
                <input
                  id="p-niches"
                  name="niches"
                  type="text"
                  required
                  placeholder="HVAC, water damage restoration, clinics..."
                />
              </div>

              <div className="l-field l-field--wide">
                <div className="l-field__head">
                  <label htmlFor="p-tools">Tools they already run</label>
                  <span className="l-field__opt">optional</span>
                </div>
                <input
                  id="p-tools"
                  name="tools"
                  type="text"
                  placeholder="GoHighLevel, Google Calendar, ServiceTitan..."
                />
              </div>

              <div className="l-field l-field--wide">
                <label htmlFor="p-need">What your client needs</label>
                <textarea
                  id="p-need"
                  name="need"
                  rows={4}
                  required
                  placeholder="What goes wrong today, and what they want answered or booked."
                />
              </div>

              <div className="l-field--wide">
                <button type="submit" className="l-btn l-btn--solid l-form__send">
                  Send it
                </button>
                <p className="l-form__note">I read these myself. No sales sequence.</p>
              </div>
            </form>
          </div>
        </section>

        <section id="faq" className="l-band l-wrap">
          <div className="l-center" style={{ marginBottom: 46 }}>
            <span className="l-eyebrow">Before you ask</span>
            <h2 className="l-h2">The questions agencies actually ask.</h2>
          </div>
          <dl className="l-faq">
            {faqs.map((item) => (
              <div className="l-faq__item" key={item.q}>
                <dt className="l-faq__q">{item.q}</dt>
                <dd className="l-faq__a">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="l-foot l-wrap">
        <div className="l-foot__top">
          <div className="l-foot__brand">
            <span className="l-foot__name">John Dominic Jasmin</span>
            <p className="l-foot__line">
              White-label builds for agencies: AI front desks and the automation
              behind them, kept running after launch.
            </p>
          </div>
          <nav className="l-foot__nav" aria-label="Footer">
            <div>
              <span className="l-foot__label">This page</span>
              <a href="#resell">What you resell</a>
              <a href="#how-it-works">How it works</a>
              <a href="#terms">Terms</a>
              <a href="#apply">Apply</a>
            </div>
            <div>
              <span className="l-foot__label">Elsewhere</span>
              <Link href="/">For service businesses</Link>
              <Link href="/cv">CV and portfolio</Link>
              <Link href="/privacy">Privacy</Link>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </nav>
        </div>
        <div className="l-foot__base">
          <span>&copy; 2026 John Dominic Jasmin</span>
          <span>Philippines &middot; GMT+8 &middot; working with US agencies</span>
        </div>
      </footer>
    </div>
  );
}
