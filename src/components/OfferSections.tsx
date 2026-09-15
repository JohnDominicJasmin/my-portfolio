import { booking } from "@/data/site";
import { money, offer } from "@/data/offer";

/**
 * The sections that turn the page from "here is what I built" into an offer a
 * business can say yes to: how it works around their team, a live demo, the
 * process, who it is and is not for, and the price.
 *
 * Shared by the home page and the niche pages, so HVAC and restoration read
 * the same terms as everyone else. Server components with no state. The demo
 * form is a real POST that Netlify registers from the exported HTML.
 */

const bookingAttrs = booking.external
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

export type Item = { label: string; title: string; body: string; alert?: boolean };

/* ------------------------------------------------- works around you --- */

const aroundDefault: Item[] = [
  {
    label: "Backup mode",
    title: "Your phone rings first",
    body: "The AI only answers the calls you miss or cannot take. You keep your number. It is a call-forwarding setting, not a new line.",
  },
  {
    label: "Urgent calls",
    title: "Sent to a person, straight away",
    body: "Anything urgent is flagged, and whoever is on call gets an alert on their phone with the name, the details and what is wrong.",
    alert: true,
  },
  {
    label: "Knows its limits",
    title: "It escalates instead of guessing",
    body: "Anything outside what it knows goes to your team with the whole conversation attached, so nobody starts from zero.",
  },
  {
    label: "Your team",
    title: "Anyone can take over",
    body: "Your staff can step into any conversation at any time, and the AI steps back.",
  },
];

export function WorksAroundYou({ items = aroundDefault }: { items?: Item[] }) {
  return (
    <section id="works-around-you" className="l-section l-wrap">
      <div className="l-center" style={{ marginBottom: 44 }}>
        <span className="l-eyebrow">Works around you</span>
        <h2 className="l-h2">It fills the gaps. It does not take over.</h2>
      </div>
      <div className="l-grid-4">
        {items.map((item) => (
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

      <div className="l-tools" aria-label="Works with">
        {offer.worksWithToday.map((tool) => (
          <span className="l-tool" key={tool}>
            {tool}
          </span>
        ))}
      </div>
      <p className="l-tools__note">
        Running Jobber, Housecall Pro or ServiceTitan? Say so on the call and we
        will look at connecting it for your setup.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------- demo --- */

export function DemoSection({ page }: { page: string }) {
  return (
    <section id="demo" className="l-section l-wrap">
      <div className="l-center" style={{ marginBottom: 40 }}>
        <span className="l-eyebrow">Hear it work</span>
        <h2 className="l-h2">A real system, running. Not slides.</h2>
      </div>

      <div className="l-demo">
        <div>
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
            The AI front desk: how it answers, books, and recovers when something
            fails
          </p>
        </div>

        <div className="l-demo__form">
          <p className="l-demo__lede">
            Rather hear it on your own phone? Leave your number and I will set up
            a live demo call for your kind of business.
          </p>
          <form
            name="demo-call"
            method="POST"
            action="/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="l-form__grid"
          >
            <input type="hidden" name="form-name" value="demo-call" />
            <input type="hidden" name="page" value={page} />
            <p className="l-form__pot" aria-hidden="true">
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="l-field">
              <label htmlFor={`demo-name-${page}`}>Name</label>
              <input
                id={`demo-name-${page}`}
                name="name"
                type="text"
                required
                autoComplete="name"
              />
            </div>

            <div className="l-field">
              <label htmlFor={`demo-phone-${page}`}>Phone</label>
              <input
                id={`demo-phone-${page}`}
                name="phone"
                type="tel"
                required
                autoComplete="tel"
              />
            </div>

            <div className="l-field">
              <div className="l-field__head">
                <label htmlFor={`demo-business-${page}`}>Business</label>
                <span className="l-field__opt">optional</span>
              </div>
              <input
                id={`demo-business-${page}`}
                name="business"
                type="text"
                autoComplete="organization"
              />
            </div>

            <div>
              <button type="submit" className="l-btn l-btn--solid l-form__send">
                Set up my demo call
              </button>
              <p className="l-form__note">
                I set it up and tell you when it will ring. No sales sequence.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ how we work --- */

export function HowWeWork() {
  const build = [
    offer.setupFee !== null
      ? `Setup ${money.format(offer.setupFee)}, half to start`
      : "One-time setup, half to start",
    offer.goLiveDays !== null ? `Live in ${offer.goLiveDays} days` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const steps = [
    {
      n: "01",
      title: offer.checkName,
      body: "30 minutes. We look at where calls and messages go unanswered today, and put a number on it.",
      meta: "Free",
    },
    {
      n: "02",
      title: "Build",
      body: "I set it up on your number, calendar and tools. You see it working on your own business before it goes live.",
      meta: build,
    },
    {
      n: "03",
      title: "Prove",
      body: "Every month you get a report: calls answered, after-hours calls caught and jobs booked, against where you started.",
      meta: "Monthly report",
    },
    {
      n: "04",
      title: "Improve",
      body: "I run it, watch it and tune what underperforms. When something fails, I get the alert before a customer notices.",
      meta: "Monthly plan",
    },
  ];

  return (
    <section id="how-we-work" className="l-section l-wrap">
      <div className="l-center" style={{ marginBottom: 44 }}>
        <span className="l-eyebrow">How we work</span>
        <h2 className="l-h2">Check it, build it, prove it, keep it running.</h2>
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
  );
}

/* -------------------------------------------------------------- fit --- */

const fitYes = [
  "A missed call means a job goes to someone else",
  "Calls come in after hours, at weekends or while you are on a job",
  "You can forward your phone line and share your calendar",
  "Someone will call back, or turn up, for what it books",
];

const fitNo = [
  "You want a free custom build before deciding",
  "You want a guaranteed revenue number",
  "You will not connect your phone or calendar",
  "You want fake reviews or spam sent in your name",
];

export function Fit() {
  return (
    <section id="fit" className="l-band l-wrap">
      <div className="l-center" style={{ marginBottom: 44 }}>
        <span className="l-eyebrow">Fit</span>
        <h2 className="l-h2">Who this is for, and who it is not.</h2>
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
  );
}

/* ---------------------------------------------------------- pricing --- */

export function Pricing() {
  return (
    <section id="pricing" className="l-section l-wrap">
      <div className="l-center" style={{ marginBottom: 44 }}>
        <span className="l-eyebrow">Pricing</span>
        <h2 className="l-h2">One flat monthly price. No per-minute bills.</h2>
        <p className="l-lede">
          Unlimited calls on every plan, so a storm week or a heat wave never
          doubles the bill.
        </p>
      </div>

      <div className="l-prices">
        {offer.tiers.map((tier) => (
          <article
            className={`l-price${tier.featured ? " l-price--featured" : ""}`}
            key={tier.name}
          >
            {tier.featured ? (
              <span className="l-price__tag">Recommended</span>
            ) : null}
            <h3 className="l-price__name">{tier.name}</h3>
            <p className="l-price__for">{tier.forWho}</p>
            {tier.monthly !== null ? (
              <div className="l-price__amount">
                {money.format(tier.monthly)}
                <small> / month</small>
              </div>
            ) : (
              <div className="l-price__tbd">Priced on the Leak Check call</div>
            )}
            <ul className="l-price__list">
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              className={`l-btn ${tier.featured ? "l-btn--solid" : "l-btn--ghost"} l-price__btn`}
              href={booking.href}
              {...bookingAttrs}
            >
              Start with the free check
            </a>
          </article>
        ))}
      </div>

      <p className="l-prices__foot">
        {offer.setupFee !== null ? (
          <>
            One-time setup: <strong>{money.format(offer.setupFee)}</strong>, half
            to start.{" "}
          </>
        ) : (
          <>One-time setup fee, half to start. </>
        )}
        {offer.guarantee ? (
          <>
            <strong>{offer.guarantee}.</strong>{" "}
          </>
        ) : null}
        You own the accounts and the workflows.
      </p>
      {offer.founding ? (
        <p className="l-prices__founding">{offer.founding}</p>
      ) : null}
    </section>
  );
}
