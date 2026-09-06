import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cvFonts } from "./fonts";
import "./portfolio.css";

/**
 * There was no not-found route, so a bad URL fell through to a bare page with
 * no landmark, no skip link, and the site's default title — a lost visitor's
 * browser tab claimed they were on the homepage.
 */
export const metadata: Metadata = {
  title: "Page not found | John Dominic Jasmin",
  description: "That page does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={`cv-root ${cvFonts}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <section className="detail-hero">
          <div className="container">
            <span className="eyebrow">404</span>
            <h1 className="detail-hero__title">This page does not exist.</h1>
            <p className="detail-hero__intro">
              The link may be out of date, or the page may have moved when the
              site was rebuilt.
            </p>
            <div
              className="hero__ctas"
              style={{ justifyContent: "flex-start" }}
            >
              <Link href="/" className="btn btn--primary">
                Go to the homepage
              </Link>
              <Link href="/cv#portfolio" className="btn btn--ghost">
                See the work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
