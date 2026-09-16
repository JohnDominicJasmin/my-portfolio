import Link from "next/link";
import type { ReactNode } from "react";
import ChatWidget from "@/components/ChatWidget";
import LeakCalculator from "@/components/LeakCalculator";
import {
  DemoSection,
  Fit,
  HowWeWork,
  Pricing,
  WorksAroundYou,
  type Item,
} from "@/components/OfferSections";
import { booking, email } from "@/data/site";
import { offer } from "@/data/offer";

/**
 * One landing page per trade. The home page speaks to every service business
 * at once, which is exactly why an HVAC owner or a restoration company does
 * not see themselves in it. These pages use their words for their calls, and
 * the outreach links point here rather than at the general page.
 */

export type NicheContent = {
  slug: string;
  flag: string;
  title: ReactNode;
  sub: string;
  notFor: string;
  handlesTitle: string;
  handles: Item[];
  around: Item[];
  intake?: { eyebrow: string; title: string; items: string[]; note: string };
  calc: { calls: number; job: number; rate: number; jobLabel: string };
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

const bookingAttrs = booking.external
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

const commonFaqs = [
  {
    q: "Do I have to change my phone number?",
    a: "No. Your number stays. In backup mode your phone rings first and only the calls you miss go to the AI. It is a forwarding setting on your line, and you can switch it off any time.",
  },
  {
    q: "Will it sound like a robot to my customers?",
    a: "It is built from how your best person already answers. Most callers do not ask. The ones who do get told plainly, and handed to a human the moment they want one.",
  },
  {
    q: "What does it cost?",
    a: "One flat monthly price with unlimited calls, plus a one-time setup fee, half up front. The plans are above, and the free check tells you which one fits.",
  },
  {
    q: "What happens if you disappear?",
    a: "You own the accounts and the workflows, not me. I document what was built and how to change it, and I monitor it after launch instead of handing over files and going quiet.",
  },
];

export default function NichePage({ content }: { content: NicheContent }) {
  const faqs = [...content.faqs, ...commonFaqs];

  return (
    <div className="sales">
      <a className="l-skip" href="#main">
        Skip to content
      </a>

      <nav className="l-nav l-wrap">
        <span className="l-nav__brand">
          <Link href="/business">John Dominic Jasmin</Link>
        </span>
        <div className="l-nav__links">
          <details className="l-nav__menu">
            <summary>Menu</summary>
            <div className="l-nav__menu-items">
              <a href="#demo">Hear it</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
          </details>
          <a
            href={booking.href}
            {...bookingAttrs}
            className="l-btn l-btn--solid l-btn--small"
          >
            Free Leak Check
          </a>
        </div>
      </nav>

      <header className="l-hero l-wrap l-rise">
        <span className="l-hero__flag">{content.flag}</span>
        <h1 className="l-hero__title">{content.title}</h1>
        <p className="l-hero__sub">{content.sub}</p>
        <div className="l-hero__ctas">
          <a href={booking.href} {...bookingAttrs} className="l-btn l-btn--solid">
            Book a free {offer.checkName}
          </a>
          <a href="#leak-check" className="l-btn l-btn--ghost">
            Work out your leak
          </a>
        </div>
        <p className="l-hero__notfor">{content.notFor}</p>
      </header>

      <main id="main">
        <section className="l-fix l-wrap" style={{ borderTop: "1px solid var(--l-line)" }}>
          <div className="l-center" style={{ marginBottom: 48 }}>
            <span className="l-eyebrow">What it handles</span>
            <h2 className="l-h2">{content.handlesTitle}</h2>
          </div>
          <div className="l-grid-3">
            {content.handles.map((item) => (
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

        {content.intake ? (
          <section className="l-band l-wrap">
            <div className="l-center" style={{ marginBottom: 40 }}>
              <span className="l-eyebrow">{content.intake.eyebrow}</span>
              <h2 className="l-h2">{content.intake.title}</h2>
            </div>
            <ul className="l-intake">
              {content.intake.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="l-intake__note">{content.intake.note}</p>
          </section>
        ) : null}

        <WorksAroundYou items={content.around} />

        <section className="l-section l-wrap">
          <LeakCalculator
            defaults={{
              calls: content.calc.calls,
              job: content.calc.job,
              rate: content.calc.rate,
            }}
            jobLabel={content.calc.jobLabel}
          />
        </section>

        <DemoSection page={content.slug} />

        <HowWeWork />

        <Fit />

        <Pricing />

        <section id="faq" className="l-band l-wrap">
          <div className="l-center" style={{ marginBottom: 46 }}>
            <span className="l-eyebrow">Before you ask</span>
            <h2 className="l-h2">The questions owners actually ask.</h2>
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

        <section id="book" className="l-cta l-wrap">
          <h2 className="l-cta__title">{content.ctaTitle}</h2>
          <p className="l-cta__sub">
            Bring the number to a 30 minute call. If I cannot help, I will say so
            and point you somewhere that can.
          </p>
          <a className="l-btn l-btn--solid" href={booking.href} {...bookingAttrs}>
            Book a free {offer.checkName}
          </a>
          <p className="l-cta__mail">
            Or just email me: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="l-cta__mail">
            <Link href="/business#results">See what it changed for other businesses</Link>
          </p>
        </section>
      </main>

      <footer className="l-foot l-wrap">
        <div className="l-foot__top">
          <div className="l-foot__brand">
            <span className="l-foot__name">John Dominic Jasmin</span>
            <p className="l-foot__line">
              Systems that answer your customers when nobody is available. Voice,
              Messenger, and web inquiries, any hour.
            </p>
          </div>
          <nav className="l-foot__nav" aria-label="Footer">
            <div>
              <span className="l-foot__label">Built for</span>
              <Link href="/hvac">HVAC companies</Link>
              <Link href="/restoration">Restoration companies</Link>
              <Link href="/business">Every service business</Link>
            </div>
            <div>
              <span className="l-foot__label">Elsewhere</span>
              <Link href="/cv#portfolio">Past work</Link>
              <Link href="/privacy">Privacy</Link>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </nav>
        </div>
        <div className="l-foot__base">
          <span>&copy; 2026 John Dominic Jasmin</span>
          <span>Philippines &middot; GMT+8 &middot; working with US clients</span>
        </div>
      </footer>

      <ChatWidget variant="sales" />
    </div>
  );
}
