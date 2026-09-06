import Link from "next/link";
import { booking, email } from "@/data/site";
import { salesFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../sales.css";

const bookingAttrs = booking.external
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

export const metadata = {
  ...pageMeta({
    title: "Got it | John Dominic Jasmin",
    description: "Your details came through.",
    path: "/thanks",
  }),
  // A confirmation page has nothing to offer a search result.
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <div className={`sales ${salesFonts}`}>
      <main id="main">
        <section className="l-cta l-wrap" style={{ paddingTop: 120 }}>
          <span className="l-eyebrow">Got it</span>
          <h1 className="l-cta__title">That came through.</h1>
          <p className="l-cta__sub">
            I read these myself, usually the same day. If it is urgent, book a
            slot and we can talk sooner.
          </p>
          <a className="l-btn l-btn--solid" href={booking.href} {...bookingAttrs}>
            Book a free audit
          </a>
          <p className="l-cta__mail">
            Or reply straight to me: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="l-form__note" style={{ marginTop: 34 }}>
            <Link href="/">Back to the site</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
