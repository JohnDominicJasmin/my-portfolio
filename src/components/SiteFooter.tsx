import Link from "next/link";
import { email } from "@/data/site";

/**
 * Was a copyright line and a text tag, with no links at all. A recruiter who
 * reaches the bottom of /cv or a case study had nowhere to go and no way to
 * contact him without scrolling back up.
 */
export default function SiteFooter() {
  return (
    <div className="container">
      <footer className="footer">
        <div className="footer__top">
          <div>
            <span className="footer__name">John Dominic Jasmin</span>
            <p className="footer__line">
              AI Automation Engineer. Voice agents, chatbots and lead-routing
              pipelines running in production, plus a live SaaS of my own.
            </p>
            <p className="footer__meta">
              Philippines &middot; GMT+8 &middot; open to remote, available now
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <div>
              <span className="footer__label">This page</span>
              <Link href="/cv#about">About</Link>
              <Link href="/cv#skills">Skills</Link>
              <Link href="/cv#portfolio">Work</Link>
              <Link href="/cv#capabilities">Capabilities</Link>
            </div>
            <div>
              <span className="footer__label">Elsewhere</span>
              <Link href="/">Automation services</Link>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume (PDF)
              </a>
              <a
                href="https://www.linkedin.com/in/john-dominic-jasmin-56645a1b0"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/JohnDominicJasmin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </nav>
        </div>

        <div className="footer__base">
          <span>&copy; 2026 John Dominic Jasmin</span>
          <span className="footer__tag">AI Automation Engineer</span>
        </div>
      </footer>
    </div>
  );
}
