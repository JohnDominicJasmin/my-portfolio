import Link from "next/link";
import AuditQuiz from "@/components/AuditQuiz";
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
    text: "Missed call rung back, asked what they needed, booked for Tuesday 9am",
  },
  {
    time: "03:02",
    tone: "var(--l-amber)",
    text: "Messenger enquiry answered in 30 seconds, quote sent",
  },
  {
    time: "04:37",
    tone: "var(--l-mint)",
    text: "Enquiry from your website marked urgent, sent to you with a reply ready",
  },
  {
    time: "06:11",
    tone: "var(--l-amber)",
    text: "Customer who went quiet four months ago got back in touch and booked",
  },
  {
    time: "07:45",
    tone: "var(--l-mint)",
    text: "Appointment reminder sent, customer confirmed",
  },
  {
    time: "08:20",
    tone: "var(--l-amber)",
    text: "Same order came in twice, second one caught before it billed",
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
      "Replies going out days later, with customers quietly lost in the backlog.",
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
    sector: "PROPERTY AND VIEWINGS",
    before:
      "Calls after hours going to voicemail, with no record the person ever rang.",
    after:
      "A voice agent picks up, asks what they are after, and books the viewing straight into the calendar.",
    change: "Under 5s",
    note: "to answer",
  },
  {
    business: "Sales team",
    sector: "ENQUIRIES AND FOLLOW-UP",
    before:
      "Everyone getting the same generic reply in the same order, ready buyers stuck behind window-shoppers.",
    after:
      "Each enquiry answered personally and put in front of the right person before anyone logs in.",
    change: "Under 2s",
    note: "to sort an enquiry",
  },
  {
    business: "Bookkeeping",
    sector: "INVOICES AND PAYMENTS",
    before:
      "Duplicate charges slipping through unnoticed, one outage taking the whole run down with it.",
    after:
      "Duplicates caught outright, and one broken service gets skipped instead of taking the whole run down.",
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
    title: "Who needs you now and who is still looking",
    body: "It asks what your best person would ask, so the urgent ones are already at the top when you open your phone.",
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
        {/* The pulsing dot is gone. It read as a live-status light on a line
            that reports no status, and a blink next to the first words on the
            page pulls the eye off the headline. */}
        <span className="l-hero__flag">
          AI automation for service businesses
        </span>
        <h1 className="l-hero__title">
          {/* Was "The lead you missed at 2am already hired someone else."
              Two problems: it opened by telling the owner they had already
              failed, and nobody "hires" a parts shop or a salon — that is
              agency vocabulary for agency clients. Same loss, stated as
              something customers do rather than something you got wrong. */}
          The customer who called at 2am <em>booked with whoever picked up</em>.
        </h1>
        <p className="l-hero__sub">
          I build the system that answers straight away, asks what they need,
          and puts the booking in your calendar — Tuesday afternoon or a public
          holiday at 3am, same thing.
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
          aria-label="Diagram: calls, messages and forms flow into the system, which books jobs, sorts enquiries and logs what was said"
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
            <text x="1022" y="206" className="l-svg-sans"fontSize="16" fontWeight="500" fill="#f2efe9">Enquiry in the right list</text>
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
            One system covering the hours nobody is in the shop.
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

      {/* BEFORE / AFTER, THE SAME NIGHT */}
      <section className="l-band l-wrap">
        <div className="l-center" style={{ marginBottom: 40 }}>
          <span className="l-eyebrow">One call, both ways</span>
          <h2 className="l-h2">Same enquiry. Two very different days.</h2>
        </div>

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
              {/* Was "six years of production engineering". A shop owner does
                  not buy your years — that is a hiring credential and it lives
                  on /cv. The standard is the part they care about. */}
              That is the standard these are built to: something that keeps
              running when nobody is watching, not something that demos well
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

      {/* AUDIT QUIZ — client island. Sits before the CTA on purpose: someone
          who has just been told what to fix first is a warmer reader of the
          booking link underneath it than someone arriving cold. */}
      <section className="l-quizband l-wrap">
        <AuditQuiz />
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

        {/* Booking a call is a bigger ask than typing a phone number, and
            everyone in between was being lost. This is a real POST, not JS:
            Netlify picks the form up from the exported HTML at deploy time,
            so it keeps working with no server and even if scripts fail. */}
        <div className="l-form">
          <p className="l-form__lede">
            Not ready for a call? Leave your details and I will come back to
            you with what I would automate first.
          </p>

          <form
            name="audit"
            method="POST"
            action="/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="l-form__grid"
          >
            <input type="hidden" name="form-name" value="audit" />
            <p className="l-form__pot" aria-hidden="true">
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="l-field">
              <label htmlFor="lf-name">Name</label>
              <input id="lf-name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="l-field">
              <div className="l-field__head">
                <label htmlFor="lf-business">Business</label>
                <span className="l-field__opt">optional</span>
              </div>
              <input id="lf-business" name="business" type="text" autoComplete="organization" />
            </div>

            <div className="l-field">
              <label htmlFor="lf-email">Email</label>
              <input id="lf-email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="l-field">
              <div className="l-field__head">
                <label htmlFor="lf-phone">Phone or WhatsApp</label>
                <span className="l-field__opt">optional</span>
              </div>
              <input id="lf-phone" name="phone" type="tel" autoComplete="tel" />
            </div>

            <div className="l-field l-field--wide">
              <div className="l-field__head">
                <label htmlFor="lf-job">What is the job nobody wants?</label>
                <span className="l-field__opt">optional</span>
              </div>
              <textarea id="lf-job" name="job" rows={3} />
            </div>

            <div className="l-field--wide">
              <button type="submit" className="l-btn l-btn--solid l-form__send">
                Send it over
              </button>
              <p className="l-form__note">
                Goes straight to me. No list, no sequence, no sharing it on.
              </p>
            </div>
          </form>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      {/* Someone who scrolled this far is the most qualified reader on the
          page. The footer used to be a copyright line and one link, so it
          gave them nowhere to go. */}
      <footer className="l-foot l-wrap">
        <div className="l-foot__top">
          <div className="l-foot__brand">
            <span className="l-foot__name">John Dominic Jasmin</span>
            <p className="l-foot__line">
              Systems that answer your customers when nobody is available.
              Voice, Messenger, and web enquiries, any hour.
            </p>
            <a
              href={booking.href}
              {...bookingAttrs}
              className="l-btn l-btn--solid l-btn--small"
            >
              Book a free audit
            </a>
          </div>

          <nav className="l-foot__nav" aria-label="Footer">
            <div>
              <span className="l-foot__label">This page</span>
              <a href="#results">What changed for them</a>
              <a href="#the-fix">How it works</a>
              <a href="#in-their-words">In their words</a>
              <a href="#faq">Questions</a>
              <a href="#book">Book a call</a>
            </div>
            <div>
              <span className="l-foot__label">Elsewhere</span>
              <Link href="/cv">CV and portfolio</Link>
              <a
                href="https://liquidity-hq.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LiquidityHQ
              </a>
              <a
                href="https://www.linkedin.com/in/john-dominic-jasmin-56645a1b0"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </nav>
        </div>

        <div className="l-foot__base">
          <span>&copy; 2026 John Dominic Jasmin</span>
          <span>Philippines &middot; GMT+8 &middot; working with clients worldwide</span>
        </div>
      </footer>

      <ChatWidget variant="sales" />
    </div>
  );
}
