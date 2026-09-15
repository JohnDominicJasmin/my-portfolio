import Link from "next/link";
import { email } from "@/data/site";
import { salesFonts } from "../../fonts";
import { pageMeta } from "../../metadata";
import "../../sales.css";

export const metadata = {
  ...pageMeta({
    title: "Got it | John Dominic Jasmin",
    description: "Your partner intake came through.",
    path: "/partners/thanks",
  }),
  // A confirmation page has nothing to offer a search result.
  robots: { index: false, follow: true },
};

/**
 * Separate from /thanks on purpose: that page sends a business owner to the
 * Leak Check, which means nothing to an agency that just applied to partner.
 */
export default function PartnerThanksPage() {
  return (
    <div className={`sales ${salesFonts}`}>
      <main id="main">
        <section className="l-cta l-wrap" style={{ paddingTop: 120 }}>
          <span className="l-eyebrow">Got it</span>
          <h1 className="l-cta__title">That came through.</h1>
          <p className="l-cta__sub">
            I read these myself. If it is a fit, the partner price list is in your
            inbox within one working day. If it is not, I will say so.
          </p>
          <p className="l-cta__mail">
            Or reply straight to me: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="l-form__note" style={{ marginTop: 34 }}>
            <Link href="/partners">Back to the partner page</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
