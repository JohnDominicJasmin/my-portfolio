import Link from "next/link";
import BeforeAfterPanel from "@/components/BeforeAfterPanel";
import ChatWidget from "@/components/ChatWidget";
import Counters from "@/components/Counters";
import { booking, email } from "@/data/site";

const bookingAttrs = booking.external
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

/* ---------------------------------------------------------------- data --- */

type Tick = { time: string; tone: string; text: string };

const ticker: Tick[] = [
  {
    time: "02:14",
    tone: "var(--l-amber)",
    text: "Missed call returned, qualified, booked for Tuesday 9am",
  },
  {
    time: "03:02",
    tone: "var(--l-amber)",
    text: "Messenger enquiry answered in 30 seconds, quote sent",
  },
  {
    time: "04:37",
    tone: "var(--l-mint)",
    text: "Web form scored hot, routed to the closer with a draft reply",
  },
  {
    time: "06:11",
    tone: "var(--l-amber)",
    text: "Old lead reopened after 4 months, replied, back in pipeline",
  },
  {
    time: "07:45",
    tone: "var(--l-mint)",
    text: "Appointment reminder sent, customer confirmed",
  },
  {
    time: "08:20",
    tone: "var(--l-amber)",
    text: "Duplicate submission rejected before it hit the ledger",
  },
];

/**
 * `said: true` marks an outcome the client claimed rather than one measured off
 * the system. Rendered in italic so a reader can tell a quote from a metric.
 */
const cases = [
  {
    business: "Andres Moto Parts",
    sector: "MOTO PARTS AND SERVICE",
    before:
      "Replies going out days later, with leads quietly lost in the backlog.",
    after:
      "Enquiries answered in seconds at any hour, and the appointment booked in the same conversation.",
    // Before comes from their own quote ("replied to customers days later"),
    // after from the system's own response time. Both sourced, so upright.
    change: "Days to 30s",
    note: "reply time",
  },
  {
    business: "AVMoto",
    sector: "MOTO PARTS AND SERVICE",
    before:
      "The team buried after hours and at weekends, older messages crowding out the new ones.",
    after:
      "Customers answered and booked whether or not anyone on the team is online.",
    change: "Under 30s",
    note: "to reply, any hour",
  },
  {
    business: "GlamBeauty",
    sector: "BEAUTY SALON AND SPA",
    before:
      "Calls missed when everyone was busy with a client, or when the shop was shut.",
    after:
      "A voice agent answers around the clock, so a caller gets an answer instead of a ring-out.",
    change: "“Fewer missed”",
    note: "their words",
    said: true,
  },
  {
    business: "Property business",
    sector: "REAL ESTATE",
    before:
      "Inbound calls after hours going to voicemail, with no record that the lead ever existed.",
    after:
      "A voice agent picks up, qualifies the caller, and books the viewing straight into the calendar.",
    change: "Under 5s",
    note: "to answer",
  },
  {
    business: "Sales team",
    sector: "B2B PIPELINE",
    before:
      "Every lead getting the same generic reply and the same queue slot, ready buyers behind browsers.",
    after:
      "Each lead scored, given a personal reply, and routed to the right pipeline before anyone logs in.",
    change: "Under 2s",
    note: "to sort and route",
  },
  {
    business: "Bookkeeping workflow",
    sector: "BACK OFFICE",
    before:
      "Duplicate charges slipping through unnoticed, one outage taking the whole run down with it.",
    after:
      "Duplicates rejected outright, and a failing service gets dropped instead of dragging everything down.",
    change: "Zero",
    note: "double-processing",
  },
];

const fixes = [
  {
    label: "It answers",
    title: "Calls, messages, and forms, instantly",
    body: "No hold music, no voicemail, no waiting for someone to finish what they are doing.",
  },
  {
    label: "It decides",
    title: "Who is serious and who is browsing",
    body: "It asks the questions your best person would ask, then sorts the queue before anyone opens it.",
  },
  {
    label: "It finishes",
    title: "Books the job and follows up",
    body: "Straight into the calendar, with reminders and updates going out without anyone remembering to send them.",
  },
];


const quotes = [
  {
    who: "Andres Moto Parts",
    label: "Answers and books, around the clock",
    body: [
      "“Before working with John, we often replied to customers days later and missed potential leads. Now, our automation works 24/7, answers customer inquiries, and helps book appointments.",
      "We are responding to more customers, getting more bookings, and seeing more customers come into the shop. Our monthly revenue has increased as well.”",
    ],
  },
  {
    who: "AVMoto",
    label: "Covers nights and weekends",
    body: [
      "“Our customer service team used to get overwhelmed with messages, especially after business hours and weekends. Some inquiries were missed while trying to catch up with older messages.",
      "John helped us automate customer inquiries, so customers can get a response even when our team is unavailable. This reduced our team’s workload, helped us handle more customers, and increased our revenue.”",
    ],
  },
  {
    who: "GlamBeauty",
    label: "Voice agent on the phones",
    body: [
      "“Before working with John, we often missed calls when everyone was busy or when customers called outside business hours. We knew some of those calls could be potential customers.",
      "John helped us set up an AI voice agent that answers calls 24/7. Now, customers can get answers even when our team is unavailable.",
      "We are missing fewer opportunities, handling more calls, and turning more inquiries into actual business.”",
    ],
  },
];

const faqs = [
  {
    q: "How much does this cost?",
    a: "It depends what you're automating — one Messenger flow is not the same job as a voice agent across three branches. You get a number on the audit call, before you commit to anything.",
  },
  {
    q: "How long before it's actually live?",
    a: "You see a working demo on your own data inside the first week. The full build depends on scope, but the demo comes first, so you're never paying on faith.",
  },
  {
    q: "Will it sound like a robot to my customers?",
    a: "It's built from how your best person already answers. Most customers don't ask. The ones who do get told plainly, and handed to a human the moment they want one.",
  },
  {
    q: "What if it gets something wrong?",
    a: "It escalates instead of guessing. Anything outside what it knows goes to your team with the whole conversation attached, so nobody restarts from zero.",
  },
  {
    q: "Do I have to change the tools we already use?",
    a: "No. It sits on top of what you have — Messenger, your phone line, your calendar, your CRM. If you're running on a notebook and a group chat, that works too, and it's worth saying on the call.",
  },
  {
    q: "What happens if you disappear?",
    a: "You own the accounts and the workflows, not me. I document what was built and how to change it, and I monitor it after launch instead of handing over files and going quiet.",
  },
];


/* ------------------------------------------------------------ component --- */

export default function SalesPage() {
  return (
    <div className="sales">
      <a className="l-skip" href="#main">
        Skip to content
      </a>

      {/* NAV */}
      <nav className="l-nav l-wrap">
        <span className="l-nav__brand">John Dominic Jasmin</span>
        <div className="l-nav__links">
          <a href="#results">Results</a>
          <a href="#the-fix">The fix</a>
          <a href="#in-their-words">In their words</a>
          <a href="#faq">FAQ</a>
          <Link href="/cv">CV</Link>
          <a
            href={booking.href}
            {...bookingAttrs}
            className="l-btn l-btn--solid l-btn--small"
          >
            Book a free audit
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="l-hero l-wrap l-rise">
        <span className="l-hero__flag">
          <span className="l-dot" aria-hidden="true" />
          AI automation for service businesses
        </span>
        <h1 className="l-hero__title">
          The lead you missed at 2am <em>already hired someone else</em>.
        </h1>
        <p className="l-hero__sub">
          I build the system that answers instantly, asks the right questions,
          and books the job, whether it is a Tuesday afternoon or a public
          holiday at 3am.
        </p>
        <div className="l-hero__ctas">
          <a href={booking.href} {...bookingAttrs} className="l-btn l-btn--solid">
            Book a free audit
          </a>
          <a href="#results" className="l-btn l-btn--ghost">
            See the results
          </a>
        </div>
        <p className="l-hero__note">
          Thirty minutes, one workflow, an honest answer.
        </p>
      </header>

      <main id="main">
      {/* TICKER */}
      <section className="l-ticker" aria-label="Example overnight activity">
        <p className="l-ticker__label">
          <span className="l-dot l-dot--sm" aria-hidden="true" />
          WHAT A SYSTEM LIKE THIS HANDLES OVERNIGHT · EXAMPLE ACTIVITY
        </p>
        <div className="l-ticker__track">
          {[...ticker, ...ticker].map((tick, i) => (
            <div className="l-tick" key={`${tick.time}-${i}`} aria-hidden={i >= ticker.length}>
              <span className="l-tick__time" style={{ color: tick.tone }}>
                {tick.time}
              </span>
              <span className="l-tick__text">{tick.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTERS — client island */}
      <Counters />

      {/* BEFORE / AFTER TABLE */}
      <section id="results" className="l-band l-wrap">
        <div style={{ marginBottom: 46 }}>
          <span className="l-eyebrow">What changed for them</span>
          <h2 className="l-h2">Each of these was somebody&rsquo;s daily headache.</h2>
        </div>

        <div className="l-cases__head">
          <span>THE BUSINESS</span>
          <span>BEFORE</span>
          <span>AFTER</span>
          <span>THE OUTCOME</span>
        </div>

        {cases.map((c) => (
          <article className="l-case" key={c.business}>
            <div>
              <div className="l-case__name">{c.business}</div>
              <div className="l-case__sector">{c.sector}</div>
            </div>
            <p className="l-case__before">{c.before}</p>
            <p className="l-case__after">{c.after}</p>
            <div className="l-case__change">
              <div
                className={`l-case__delta${c.said ? " l-case__delta--said" : ""}`}
              >
                {c.change}
              </div>
              <div className="l-case__note">{c.note}</div>
            </div>
          </article>
        ))}

        <p className="l-cases__foot">
          OUTCOMES IN ITALICS ARE THE CLIENT&rsquo;S OWN WORDS. REMAINING NAMES
          WITHHELD UNDER AGREEMENT, AND I AM HAPPY TO WALK THROUGH ANY OF THESE
          ON A CALL.
        </p>
      </section>

      {/* FLOW DIAGRAM */}
      <section className="l-flow l-wrap">
        <div className="l-center" style={{ marginBottom: 40 }}>
          <span className="l-eyebrow">How it fits together</span>
          <h2 className="l-h2">One flow, from first contact to booked job.</h2>
        </div>

        <svg
          className="l-flow__svg"
          viewBox="0 0 1296 380"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Diagram: calls, messages and forms flow into the system, which books jobs, routes leads and logs the conversation"
        >
          <path className="l-flow-line l-flow-1" d="M300 76 C 420 76, 470 190, 566 190" fill="none" stroke="#d99a3d" strokeWidth="2" />
          <path className="l-flow-line l-flow-2" d="M300 190 L 566 190" fill="none" stroke="#d99a3d" strokeWidth="2" />
          <path className="l-flow-line l-flow-3" d="M300 304 C 420 304, 470 190, 566 190" fill="none" stroke="#d99a3d" strokeWidth="2" />
          <path className="l-flow-line l-flow-4" d="M730 190 C 826 190, 876 76, 996 76" fill="none" stroke="#4ec9a5" strokeWidth="2" />
          <path className="l-flow-line l-flow-5" d="M730 190 L 996 190" fill="none" stroke="#4ec9a5" strokeWidth="2" />
          <path className="l-flow-line l-flow-6" d="M730 190 C 826 190, 876 304, 996 304" fill="none" stroke="#4ec9a5" strokeWidth="2" />

          <g>
            <rect className="l-node" x="40" y="44" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="66" y="70" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="rgba(242,239,233,0.5)">INBOUND</text>
            <text x="66" y="92" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">A phone call at 2am</text>
          </g>
          <g>
            <rect className="l-node l-node-2" x="40" y="158" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="66" y="184" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="rgba(242,239,233,0.5)">INBOUND</text>
            <text x="66" y="206" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">A message or SMS</text>
          </g>
          <g>
            <rect className="l-node l-node-3" x="40" y="272" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="66" y="298" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="rgba(242,239,233,0.5)">INBOUND</text>
            <text x="66" y="320" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">A form on your site</text>
          </g>

          <circle className="l-ring" cx="648" cy="190" r="40" fill="none" stroke="#d99a3d" strokeWidth="1.5" />
          <rect className="l-core" x="566" y="128" width="164" height="124" rx="8" fill="#d99a3d" stroke="#f0b256" strokeWidth="2" />
          <text x="648" y="166" textAnchor="middle" className="l-svg-mono"fontSize="10" letterSpacing="1.8" fill="#12100d">THE SYSTEM</text>
          <text x="648" y="192" textAnchor="middle" className="l-svg-sans"fontSize="15" fontWeight="600" fill="#12100d">Answers</text>
          <text x="648" y="212" textAnchor="middle" className="l-svg-sans"fontSize="15" fontWeight="600" fill="#12100d">Decides</text>
          <text x="648" y="232" textAnchor="middle" className="l-svg-sans"fontSize="15" fontWeight="600" fill="#12100d">Finishes</text>

          <g>
            <rect className="l-node l-node-out" x="996" y="44" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="1022" y="70" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="#4ec9a5">OUTCOME</text>
            <text x="1022" y="92" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">Job in your calendar</text>
          </g>
          <g>
            <rect className="l-node l-node-out-2" x="996" y="158" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="1022" y="184" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="#4ec9a5">OUTCOME</text>
            <text x="1022" y="206" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">Lead in the right list</text>
          </g>
          <g>
            <rect className="l-node l-node-out-3" x="996" y="272" width="260" height="64" rx="6" fill="#1c1915" stroke="rgba(242,239,233,0.22)" strokeWidth="1.5" />
            <text x="1022" y="298" className="l-svg-mono"fontSize="10" letterSpacing="1.6" fill="#4ec9a5">OUTCOME</text>
            <text x="1022" y="320" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">A note of what was said</text>
          </g>
        </svg>

        <p className="l-flow__caption">
          Nothing waits for someone to be free. Nothing sits unanswered until
          morning.
        </p>
      </section>

      {/* THE FIX */}
      <section id="the-fix" className="l-fix l-wrap">
        <div className="l-center" style={{ marginBottom: 48 }}>
          <span className="l-eyebrow">The fix</span>
          <h2 className="l-h2">
            One system doing the job of a very attentive employee.
          </h2>
        </div>
        <div className="l-grid-3">
          {fixes.map((fix) => (
            <article className="l-card" key={fix.label}>
              <div className="l-card__label">{fix.label}</div>
              <h3 className="l-card__title">{fix.title}</h3>
              <p className="l-card__body">{fix.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE BEFORE / AFTER */}
      <section className="l-band l-wrap">
        <div className="l-center" style={{ marginBottom: 40 }}>
          <span className="l-eyebrow">Click between them</span>
          <h2 className="l-h2">Same enquiry. Two very different days.</h2>
        </div>

        {/* Toggle and panel — client island */}
        <BeforeAfterPanel />
      </section>

      {/* TESTIMONIALS */}
      <section id="in-their-words" className="l-quotes l-wrap">
        <div className="l-center" style={{ marginBottom: 46 }}>
          <span className="l-eyebrow">In their words</span>
          <h2 className="l-h2">Three owners on what changed.</h2>
        </div>
        <div className="l-grid-3">
          {quotes.map((quote) => (
            <blockquote className="l-quote" key={quote.who}>
              <span className="l-quote__mark" aria-hidden="true">
                &ldquo;
              </span>
              <div className="l-quote__label">{quote.label}</div>
              {quote.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
              <cite className="l-quote__who">{quote.who}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="l-proof l-wrap">
        <div className="l-proof__grid">
          <div>
            <span className="l-eyebrow">Why trust me with it</span>
            <h2 className="l-h2" style={{ marginBottom: 22 }}>
              I run one of these as <em style={{ color: "var(--l-amber)" }}>my own business</em>.
            </h2>
            <p className="l-proof__body">
              LiquidityHQ is my product, with customers paying for it every
              month. It runs on the same foundations I would build yours on, so
              when something breaks at 3am it is my problem, not a client&rsquo;s.
            </p>
            <p className="l-proof__body">
              Under that sits six years of production engineering, which is why
              these systems are built to keep running rather than to demo well
              once.
            </p>
            <a
              className="l-proof__link"
              href="https://liquidity-hq.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              See liquidity-hq.com &rarr;
            </a>
          </div>
          <div>
            <a
              className="l-proof__shot"
              href="https://liquidity-hq.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/liquidity-hq-cover.webp"
                width={1400}
                height={755}
                loading="lazy"
                decoding="async"
                alt="The LiquidityHQ dashboard: a live crypto intelligence product with a signal panel, price ticker and squeeze scores."
              />
            </a>
            <p className="l-proof__caption">
              liquidity-hq.com &middot; live, paid, and mine
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="l-band l-wrap">
        <div className="l-center" style={{ marginBottom: 46 }}>
          <span className="l-eyebrow">Before you ask</span>
          <h2 className="l-h2">The questions people actually ask.</h2>
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

      {/* CTA */}
      <section id="book" className="l-cta l-wrap">
        <h2 className="l-cta__title">What is the one job nobody wants?</h2>
        <p className="l-cta__sub">
          Usually the one worth automating first. Bring it to a thirty minute
          call. If I cannot help, I will say so and point you somewhere that can.
        </p>
        <a className="l-btn l-btn--solid" href={booking.href} {...bookingAttrs}>
          Book a free audit
        </a>
        <p className="l-cta__mail">
          Or just email me: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="l-foot l-wrap">
        <span>&copy; 2026 John Dominic Jasmin</span>
        <span>
          <Link href="/cv">CV and portfolio</Link>
        </span>
      </footer>

      <ChatWidget />
    </div>
  );
}
